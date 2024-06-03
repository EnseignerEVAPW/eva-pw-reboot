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
}
