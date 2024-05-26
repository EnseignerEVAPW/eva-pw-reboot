import { IsNotEmpty } from 'class-validator';

export class CreateTrainingDto {
  @IsNotEmpty()
  teamId: number;
}
