import { IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTrainingDto {
  @IsNotEmpty()
  teamId: string;

  @IsNotEmpty() // Asegura que se proporcione un ID al crear una nueva instancia de Training
  id: string;

  // Campos opcionales o necesarios para crear un Training
  // Por ejemplo:

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Object)
  chat: object[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @IsOptional()
  comments?: object[];
}
