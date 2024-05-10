import { CodeforcesService } from './codeforces.service';
export declare class CodeforcesController {
    private readonly codeforcesService;
    constructor(codeforcesService: CodeforcesService);
    getUserInfo(username: string): Promise<any>;
}
