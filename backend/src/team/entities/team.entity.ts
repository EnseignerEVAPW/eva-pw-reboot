import { Column, Entity, ManyToOne,CreateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;
}
