/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Post, Get, UploadedFile, HttpException, HttpStatus, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/images.helper';
import { BoardService } from './board.service';
import { join } from 'path';
import { Response } from 'express';

@Controller('boards')
export class BoardController {
  // importtas los servicios que se van a utilizar
  constructor(private readonly boardService: BoardService) {}

  @Get('dummy')
  async dummyFunction() {
    return 1;
    return this.boardService.dummyFunction(); // Llama al método dummyFunction del servicio TrainingService
  }

  @Post('upload/:trainingId') // Agrega el parámetro trainingId en la ruta
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
          destination: './uploads',
          filename: renameImage
      }),
      fileFilter: fileFilter
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File, 
    @Param('trainingId') trainingId: string, // Agrega el parámetro trainingId al método
  ): Promise<any>{
    const savedImage = await this.boardService.create(
      {imagePath : file.filename, trainingId: trainingId} // Cambia el objeto a enviar al servicio
    ); 
    
     if(!savedImage) {
      throw new HttpException('No se guardo imagen', HttpStatus.BAD_REQUEST);
     }

     return{
      message: 'Imagen guardada',
      data: savedImage
     }
  }

}
