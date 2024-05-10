"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLogService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let ChatLogService = class ChatLogService {
    constructor() {
        this.items = [{
                id: '1',
                name: 'chatlog1',
                createdAt: new Date(),
                content: '/example',
            }];
    }
    getAllChatlog() {
        return this.items;
    }
    createChatlog(name, content) {
        const newItem = {
            id: (0, uuid_1.v4)(),
            name,
            createdAt: new Date(),
            content
        };
        this.items.push(newItem);
        return newItem;
    }
    uploadChatlog(name, content2) {
        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            console.log(existingItem);
            existingItem.content += "* " + content2;
            return existingItem;
        }
        else {
            console.log("creo que era falso");
            const newItem = {
                id: (0, uuid_1.v4)(),
                name,
                createdAt: new Date(),
                content: content2,
            };
            this.items.push(newItem);
            return newItem;
        }
    }
    getChatlogById(id) {
        return this.items.find(item => item.id === id);
    }
    updateChatlog(id, updatedFields) {
        const itemchat = this.getChatlogById(id);
        if (itemchat) {
            itemchat.content += "* " + updatedFields.content;
            return itemchat;
        }
        else {
            const newImg = Object.assign(itemchat, updatedFields);
            this.items = this.items.map(item => item.id === id ? newImg : item);
            return newImg;
        }
    }
    deleteChatlog(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
};
exports.ChatLogService = ChatLogService;
exports.ChatLogService = ChatLogService = __decorate([
    (0, common_1.Injectable)()
], ChatLogService);
//# sourceMappingURL=chatlog.service.js.map