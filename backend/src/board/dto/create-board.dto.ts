import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  trainingId: string;

  @IsNotEmpty()
  @IsString()
  imagePath: string;

  @IsString()
  time?: string;
}
