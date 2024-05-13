/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatLogController } from './chatlog.controller';
import { ChatLogService } from './chatlog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatLog } from './entities/chatlog.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatLog, User])],
  controllers: [ChatLogController],
  providers: [ChatLogService],
})
export class ChatLogModule {}
