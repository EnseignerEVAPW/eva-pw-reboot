import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Training } from "src/training/entities/training.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  image: string; // Suponiendo que la imagen se almacena como una URL o una referencia a un archivo en la base de datos

  @Column({ nullable: true })
  time: string; // Suponiendo que el tiempo se almacena en formato de cadena (por ejemplo, "10:05" para 10 minutos y 5 segundos)

  @ManyToOne(() => Training, training => training.boards)
  training: Training;
}
