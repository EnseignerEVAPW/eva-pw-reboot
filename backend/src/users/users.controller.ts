/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ChatLog } from 'src/chatLog/entities/chatlog.entity';
import { Image } from 'src/images/entities/images.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('coach/:coachId/students')
  async findStudentByCoachId(@Param('coachId') coachId: string): Promise<User[]> {
    return this.usersService.findStudentByCoachId(coachId);
  }

  @Get(':userId/chatlogs')
  async findChatLogsByUserId(@Param('userId') userId: number): Promise<ChatLog[]> {
    return this.usersService.findChatLogsByUserId(userId);
  }

  @Get(':userId/images')
  async findImagesByUserId(@Param('userId') userId: number): Promise<Image[]> {
    return this.usersService.findImagesByUserId(userId);
  }

  @Get(':username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findOneByUsername(username);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUser: any): Promise<User> {
    return this.usersService.update(id, updateUser);
  }
}
