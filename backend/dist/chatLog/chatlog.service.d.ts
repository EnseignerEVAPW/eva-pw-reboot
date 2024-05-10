import { ChatLog } from './chatlog.entity';
export declare class ChatLogService {
    private items;
    getAllChatlog(): ChatLog[];
    createChatlog(name: string, content: string): {
        id: string;
        name: string;
        createdAt: Date;
        content: string;
    };
    uploadChatlog(name: string, content2: string): ChatLog;
    getChatlogById(id: string): ChatLog;
    updateChatlog(id: string, updatedFields: any): ChatLog;
    deleteChatlog(id: string): void;
}
