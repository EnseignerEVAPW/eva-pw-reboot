/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { UserRole } from "./user-role.enum";

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 25, unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  lastSeen: Date;

  @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
  role: User;

  @ManyToOne(() => User, coach => coach.students, {nullable:true})
  coach: User;
  
  @Column({nullable: true})
  coachId : string;

  @OneToMany(() => User, student => student.coach)
  students: User[];
}
