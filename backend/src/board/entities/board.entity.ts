import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Training } from "src/training/entities/training.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'blob', nullable: false })
  image: Buffer; // Almacenará los datos binarios de la imagen en la base de datos

  @Column({ nullable: true })
  time: string;

  @ManyToOne(() => Training, training => training.boards)
  training: Training;
}
