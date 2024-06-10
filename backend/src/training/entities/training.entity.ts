/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "src/team/entities/team.entity";
import { Board } from "src/board/entities/board.entity";

@Entity()
export class Training {
  @PrimaryColumn() 
  id: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' }) 
  creationDate: Date;

  @Column('json', { nullable: true })
  chat: object[];

  @Column('json', { nullable: true })
  comments: object[];

  @Column('json', {nullable:true})
  feedback: {
    comment:string;
    satisfaction:number;
    time:string;
  }

  @ManyToOne(() => Team, team => team.trainings)
  @JoinColumn({ name: 'teamId'})
  team: Team;

  @Column()
  teamId: string;

  @OneToMany(() => Board, board => board.training)
  boards: Board[];
}
