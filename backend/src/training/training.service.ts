import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';
import { Team } from 'src/team/entities/team.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const { teamId } = createTrainingDto;
    const team = await this.teamRepository.findOne({ where: { id: teamId } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const training = new Training();
    training.team = team;
    training.creationDate = new Date();

    return this.trainingRepository.save(training);
  }

  async findAll(): Promise<Training[]> {
    return this.trainingRepository.find({ relations: ['team'] });
  }

  async findOne(id: number): Promise<Training> {
    const training = await this.trainingRepository.findOne({ where: { id }, relations: ['team'] });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return training;
  }

  async update(id: number, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const training = await this.trainingRepository.preload({
      id,
      ...updateTrainingDto,
    });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return this.trainingRepository.save(training);
  }

  async remove(id: number): Promise<void> {
    const training = await this.trainingRepository.findOne({ where: { id } });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    await this.trainingRepository.remove(training);
  }
}
