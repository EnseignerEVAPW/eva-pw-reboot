import { IsNotEmpty } from 'class-validator';
import { Buffer } from 'buffer';

export class CreateBoardDto {
  @IsNotEmpty()
  image: Buffer; // Propiedad para contener los datos binarios de la imagen

  time?: string; // Propiedad opcional para el tiempo
}
