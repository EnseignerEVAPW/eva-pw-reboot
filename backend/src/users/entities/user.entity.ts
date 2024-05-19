import { Column, Entity, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.enum";
import { ChatLog } from "src/chatLog/entities/chatlog.entity";
import { Image } from "src/images/entities/images.entity";
import { Team } from "src/team/entities/team.entity"; // Importa la entidad Team

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' }) 
  lastSeen: Date;

  @OneToMany(()=> ChatLog, chatlog => chatlog.user)
  chatlogs: ChatLog[];

  @OneToMany(()=> Image, image => image.user)
  images: Image[];

  @ManyToMany(() => Team, team => team.contestants) // Definición de la relación ManyToMany en User
  teamsAsContestant: Team[]; // Define la propiedad teamsAsContestant que representa los equipos a los que el usuario pertenece como concursante
}
