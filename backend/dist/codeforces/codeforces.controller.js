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
exports.CodeforcesController = void 0;
const common_1 = require("@nestjs/common");
const codeforces_service_1 = require("./codeforces.service");
let CodeforcesController = class CodeforcesController {
    constructor(codeforcesService) {
        this.codeforcesService = codeforcesService;
    }
    async getUserInfo(username) {
        return this.codeforcesService.getUserInfo(username);
    }
};
exports.CodeforcesController = CodeforcesController;
__decorate([
    (0, common_1.Get)('user/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CodeforcesController.prototype, "getUserInfo", null);
exports.CodeforcesController = CodeforcesController = __decorate([
    (0, common_1.Controller)('codeforces'),
    __metadata("design:paramtypes", [codeforces_service_1.CodeforcesService])
], CodeforcesController);
//# sourceMappingURL=codeforces.controller.js.map