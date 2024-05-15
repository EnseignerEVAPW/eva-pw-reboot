import { Column, Entity, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Training } from "src/training/entities/training.entity";

@Entity()
export class Team {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 50, nullable: false })
  nombre: string;

  @ManyToOne(() => User)
  contestan1: User;

  @ManyToOne(() => User)
  contestan2: User;

  @ManyToOne(() => User)
  coach: User;

  @OneToMany(() => Training, training => training.team)
  trainings: Training[];

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' }) 
  creationDate: Date;
}
