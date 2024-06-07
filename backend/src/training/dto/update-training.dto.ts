import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingDto } from './create-training.dto';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @IsOptional()
  comments?: object[];
}
