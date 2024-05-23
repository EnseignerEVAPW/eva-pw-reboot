import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async create(@Body() createTrainingDto: CreateTrainingDto) {
    const training = await this.trainingService.create(createTrainingDto);
    return training;
  }

  @Get()
  async findAll() {
    return this.trainingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trainingService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    return this.trainingService.update(+id, updateTrainingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trainingService.remove(+id);
  }

  @Get('dummy')
  getEjemplo(): string {
    return '¡Hola desde el endpoint ejemplo!';
  }
}
