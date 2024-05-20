import { Entity, Column, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Training } from 'src/training/entities/training.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  nombre: string;

  @ManyToMany(() => User) // No es necesario definir la relación ManyToMany aquí
  @JoinTable()
  contestants: User[];

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  coach: User; // Definición de la relación con el entrenador

  @OneToMany(() => Training, training => training.team)
  trainings: Training[];

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
