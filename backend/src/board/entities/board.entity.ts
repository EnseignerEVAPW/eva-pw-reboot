import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Training } from "src/training/entities/training.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  imagePath: string; // Almacenará el path de la imagen en lugar de los datos binarios

  @Column({ nullable: true })
  time: string;

  @ManyToOne(() => Training, training => training.boards, { cascade: ['insert', 'update'] })
  training: Training;
}
