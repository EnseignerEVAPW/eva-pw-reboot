/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';
import { Team } from 'src/team/entities/team.entity';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) { }

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const { teamId, id, chat, comments, feedback } = createTrainingDto;
    const team = await this.teamRepository.findOne({ where: { id: parseInt(teamId) } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const training = new Training();
    training.team = team;
    training.creationDate = new Date();
    training.chat = chat;
    training.comments = comments;
    training.feedback = feedback;
    training.id = id;

    return this.trainingRepository.save(training);
  }

  async findAll(): Promise<Training[]> {
    return this.trainingRepository.find({ relations: ['team'] });
  }

  async findOne(id: string): Promise<Training> {
    const training = await this.trainingRepository.findOne({ where: { id }, relations: ['team'] });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return training;
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const training = await this.trainingRepository.preload({
      id,
      ...updateTrainingDto,
    });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return this.trainingRepository.save(training);
  }

  async remove(id: string): Promise<void> {
    const training = await this.trainingRepository.findOne({ where: { id } });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    await this.trainingRepository.remove(training);
  }

  async addChat(id: string, chat: object[]): Promise<Training> {
    const training = await this.trainingRepository.findOne({ where: { id } });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    training.chat = chat;
    return this.trainingRepository.save(training);
  }

  async addComments(id: string, comments: object[]): Promise<Training> {
    const training = await this.trainingRepository.findOne({ where: { id } });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    training.comments = comments;
    return this.trainingRepository.save(training);
  }

  async getTrainingsOf(teamId: string): Promise<Training[]> {
    const results = await this.trainingRepository.find({ where: { teamId } });
    if (results.length === 0) {
      throw new NotFoundException(`Trainings for Team with ID ${teamId} not found`);
    }
    return results;
  }

  async getFeedback(teamId: string) {
    const training = await this.trainingRepository.findOne({ where: { teamId } });
    if (!training) {
      throw new Error('Training not found');
    }
    return training.feedback;
  }

  async addFeedback(id: string, feedback: FeedbackDto) {
    const training = await this.trainingRepository.findOne({ where: { id } });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    training.feedback = feedback;
    return this.trainingRepository.save(training);
  }
}
