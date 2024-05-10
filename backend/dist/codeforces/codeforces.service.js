"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeforcesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let CodeforcesService = class CodeforcesService {
    async getUserInfo(username) {
        const response = await axios_1.default.get(`https://codeforces.com/api/user.status?count=10&handle=${username}`);
        console.log(response.data.result);
        return response.data.result[0];
    }
    async getRandomProblem() {
        const response = await axios_1.default.get('https://codeforces.com/api/problemset.problems');
        const problems = response.data.result.problems;
        const randomProblemIndex = Math.floor(Math.random() * problems.length);
        return problems[randomProblemIndex];
    }
    async checkCompilationError(username, contestId, indexProblem) {
        const response = await axios_1.default.get(`https://codeforces.com/api/user.status?handle=${username}&count=3`);
        for (const submission of response.data.result) {
            const submissionTime = new Date(submission.creationTimeSeconds * 1000);
            const currentTime = new Date();
            const diff = (currentTime.getTime() - submissionTime.getTime()) / 1000;
            console.log('contestId', submission.problem.contestId, 'index', submission.problem.index, 'diff', diff, 'verdict', submission.verdict);
            console.log(submission.problem.contestId == contestId, submission.problem.index === indexProblem, diff < 120, submission.verdict === 'COMPILATION_ERROR');
            if (submission.problem.contestId == contestId && submission.problem.index == indexProblem && diff < 120 && submission.verdict == 'COMPILATION_ERROR') {
                return true;
            }
        }
        return false;
    }
    async checkAuthenticationName(username) {
        const response = await axios_1.default.get(`https://codeforces.com/api/user.info?handles=${username}`);
        console.log(response.data.result[0].firstName);
        return (response.data.result[0].firstName == "P2P-Auth");
    }
};
exports.CodeforcesService = CodeforcesService;
exports.CodeforcesService = CodeforcesService = __decorate([
    (0, common_1.Injectable)()
], CodeforcesService);
//# sourceMappingURL=codeforces.service.js.map