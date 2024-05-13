/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";

@Entity()
export class Image extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column()
    userId: number;
    
    @ManyToOne(() => User, user => user.images)
    user: User;

}