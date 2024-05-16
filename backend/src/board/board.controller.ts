import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // 'image' es el nombre del campo de la imagen en la solicitud
  async create(@UploadedFile() image, @Body() createBoardDto: CreateBoardDto) {
    createBoardDto.image = image; // Asigna el archivo cargado al campo de imagen en el DTO
    return this.boardService.create(createBoardDto);
  }

  // Los métodos restantes del controlador permanecen sin cambios
}
