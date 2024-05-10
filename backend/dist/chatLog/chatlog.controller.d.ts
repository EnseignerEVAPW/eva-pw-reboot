import { ChatLogService } from './chatlog.service';
import { Response } from 'express';
export declare class ChatLogController {
    private chatlogService;
    constructor(chatlogService: ChatLogService);
    getAllSChatlog(): import("src/chatLog/chatlog.entity").ChatLog[];
    createChatlog(newChatLog: any): {
        id: string;
        name: string;
        createdAt: Date;
        content: string;
    };
    deleteChatlog(id: string): void;
    updateChatlog(id: string, updatedItem: any): import("src/chatLog/chatlog.entity").ChatLog;
    uploadChatlog(newChatLog: any, image: any, res: Response): Promise<any>;
}
