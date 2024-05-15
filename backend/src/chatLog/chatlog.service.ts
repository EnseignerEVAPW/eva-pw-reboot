/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {v4} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatLog } from './entities/chatlog.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChatLogService {
    constructor(
        @InjectRepository(ChatLog)
        private chatLogRepository: Repository<ChatLog>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(newChatLog: any, userId: any): Promise<ChatLog> {
        const user = await this.userRepository.findOne(userId);
        if(!user){
            throw new Error('User not found');
        }
        const chatLog = new ChatLog();
        chatLog.content = newChatLog.content;
        chatLog.name = newChatLog.name;
        chatLog.user = user;

        const newChatlog = await this.chatLogRepository.save(chatLog);
        return newChatlog;
    }

    async findAll(): Promise<ChatLog[]> {
        return await this.chatLogRepository.find();
    }

    private items: ChatLog[] = [{
        id: '1',
        name: 'chatlog1',
        createdAt: new Date(),
        content: '/example',
        userId: 1,
        user: null
    }]
    getAllChatlog(){
        return this.items
    }
    async getAllChatlogs(): Promise<ChatLog[]> {
        return this.chatLogRepository.find({ relations: ['user']});
    }

    async createChatlog(name: string, content: string, userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        
        const newItem = new ChatLog();
        newItem.name = name;
        newItem.content = content;
        newItem.userId = userId;
        newItem.user = user;

        return this.chatLogRepository.save(newItem);
     }
    
    getChatlogById(id: string): ChatLog {
        return this.items.find(item => item.id === id)
    }

    updateChatlog(id: string, updatedFields: any) : ChatLog { 
        const itemchat = this.getChatlogById(id)
        if(itemchat){
            itemchat.content += "* " + updatedFields.content;
            return itemchat; 
        }else{
            const newImg = Object.assign(itemchat, updatedFields)
            this.items = this.items.map(item => item.id === id ? newImg : item)
            return newImg;
        }
        
    }

    deleteChatlog(id: string) {
        this.items = this.items.filter(item => item.id !== id)
     }
}
