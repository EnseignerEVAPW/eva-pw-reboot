import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';
import { Training } from 'src/training/entities/training.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Training])
  ],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
