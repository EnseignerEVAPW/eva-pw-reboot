/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository,MoreThanOrEqual } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { ChatLog } from "src/chatLog/entities/chatlog.entity";
import { Image } from "src/images/entities/images.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }
  
  async findStudentByCoachId(coachId: string): Promise<User[]> {
    return await this.usersRepository.find({ where: { coachId } });
  }

  async findChatLogsByUserId(userId: number): Promise<ChatLog[]> {
    const user = await this.usersRepository.findOne({ 
      where: { id: userId }, 
      relations: ['chatlogs'] 
    });
    return user ? user.chatlogs: [];
  }

  async findImagesByUserId(userId: number): Promise<Image[]> {
    const user = await this.usersRepository.findOne({ 
      where: { id: userId }, 
      relations: ['chatlogs'] 
    });
    return user? user.images: [];
  }

  async findAllOnlineUsers(): Promise<User[]> {
    const fifteenMinutesAgo = new Date();
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);

    return this.usersRepository.find({
      where: {
        lastSeen: MoreThanOrEqual(fifteenMinutesAgo),
      },
    });
  }
  
}