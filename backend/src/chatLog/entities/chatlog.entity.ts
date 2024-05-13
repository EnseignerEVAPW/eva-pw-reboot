/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class ChatLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    createdAt: Date;

  @Column()
  content: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.chatlogs)
  user: User;

}

