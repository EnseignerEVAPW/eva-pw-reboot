import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { Training } from './entities/training.entity';
import { Team } from 'src/team/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training, Team])],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
