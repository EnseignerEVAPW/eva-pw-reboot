"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLogController = void 0;
const common_1 = require("@nestjs/common");
const chatlog_service_1 = require("./chatlog.service");
const platform_express_1 = require("@nestjs/platform-express");
let ChatLogController = class ChatLogController {
    constructor(chatlogService) {
        this.chatlogService = chatlogService;
    }
    getAllSChatlog() {
        return this.chatlogService.getAllChatlog();
    }
    createChatlog(newChatLog) {
        return this.chatlogService.createChatlog(newChatLog.name, newChatLog.content);
    }
    deleteChatlog(id) {
        this.chatlogService.deleteChatlog(id);
    }
    updateChatlog(id, updatedItem) {
        return this.chatlogService.updateChatlog(id, updatedItem);
    }
    async uploadChatlog(newChatLog, image, res) {
        const newChatlog = await this.chatlogService.uploadChatlog(newChatLog, image);
        return res.json(newChatlog);
    }
};
exports.ChatLogController = ChatLogController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatLogController.prototype, "getAllSChatlog", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatLogController.prototype, "createChatlog", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatLogController.prototype, "deleteChatlog", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChatLogController.prototype, "updateChatlog", null);
__decorate([
    (0, common_1.Post)('uploadChatlog'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatLogController.prototype, "uploadChatlog", null);
exports.ChatLogController = ChatLogController = __decorate([
    (0, common_1.Controller)('chatlog'),
    __metadata("design:paramtypes", [chatlog_service_1.ChatLogService])
], ChatLogController);
//# sourceMappingURL=chatlog.controller.js.map