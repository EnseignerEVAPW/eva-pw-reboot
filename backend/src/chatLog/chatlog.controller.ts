/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { ChatLogService } from './chatlog.service';

@Controller('chatlog')
export class ChatLogController {
    constructor(private chatlogService: ChatLogService){}   //así podemos inyectar la clase ChatlogService

    @Get()
    getAllSChatlog(){
        return this.chatlogService.getAllChatlog()
    }

    @Post()
    createChatlog(@Body() newChatLog: any){  //body es json
        return this.chatlogService.createChatlog(newChatLog.name, newChatLog.content, newChatLog.userId);
    }

    @Delete(':id')
    deleteChatlog(@Param('id') id: string){
        this.chatlogService.deleteChatlog(id)
    }

    @Patch(':id')
    updateChatlog(@Param('id') id: string, @Body() updatedItem: any){ 
        return this.chatlogService.updateChatlog(id, updatedItem)
    }
}