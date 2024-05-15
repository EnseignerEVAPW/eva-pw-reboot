/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository,MoreThanOrEqual,LessThan } from "typeorm";
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

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }
  
  async update(id: number, updateAnyFields: any) {
    const item = await this.usersRepository.update(id, updateAnyFields);
    if(item.affected === 1) {
      return this.getUserById(id);
    }else{
      return null;
    }
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({ where: {username} });
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

  async findAllOfflineUsers(): Promise<User[]> {
    const fifteenMinutesAgo = new Date();
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);
    return this.usersRepository.find({
      where: {
        lastSeen: LessThan(fifteenMinutesAgo),
      },
    });
  }
  
}