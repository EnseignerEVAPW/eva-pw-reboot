import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Training } from 'src/training/entities/training.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
  ) {}

  async dummyFunction(): Promise<any> {
    const entrenamientos = await this.trainingRepository.find();
    return entrenamientos;
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const { trainingId } = createBoardDto;
    const board = this.boardRepository.create(createBoardDto);
    const training = await this.trainingRepository.findOne({where: {id: trainingId}});
    if (!training) {
      throw new NotFoundException(`Training with ID ${trainingId} not found`);
    }
    board.training = training; // Asigna el training al tablero
    return this.boardRepository.save(board);
}


  async getImagesByTrainingId(id: string): Promise<string> {
    const training = await this.trainingRepository.findOne({ 
        where: { id },
        relations: ['boards'] // Cargar la relación 'boards'
    });
    if (!training) {
        throw new NotFoundException(`Training with ID ${id} not found`);
    }
    const primero = training.boards;
    const rutasImagenes = primero.map(board => board.imagePath);
    return rutasImagenes[0];
  }

}
