import { IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTrainingDto {
  @IsNotEmpty()
  teamId: string;

  @IsNotEmpty() // Asegura que se proporcione un ID al crear una nueva instancia de Training
  id: string;

  // Otros campos opcionales o necesarios para crear un Training
  // Por ejemplo:

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Object)
  chat: object[];

  // También podrías incluir otros campos como 'name', 'description', etc.
}
