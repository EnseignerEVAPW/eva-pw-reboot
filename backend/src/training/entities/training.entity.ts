/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "src/team/entities/team.entity";
import { Board } from "src/board/entities/board.entity";

@Entity()
export class Training {
  @PrimaryColumn() // Por ejemplo, un valor predeterminado de 1
  id: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' }) 
  creationDate: Date;

  // Aquí puedes definir otras propiedades de tu entidad Training
  @Column('json', { nullable: true })
  chat: object[];

  @ManyToOne(() => Team, team => team.trainings)
  @JoinColumn({ name: 'teamId'})
  team: Team;

  @Column()
  teamId: string;

  @OneToMany(() => Board, board => board.training)
  boards: Board[];
}
