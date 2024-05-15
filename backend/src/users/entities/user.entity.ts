/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, BeforeInsert } from "typeorm";
import { UserRole } from "./user-role.enum";
import { ChatLog } from "src/chatLog/entities/chatlog.entity";
import { Image } from "src/images/entities/images.entity";

@Entity()
export class User {
  @Column({ primary: true, generated: true })
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

}
