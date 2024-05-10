export declare class CodeforcesService {
    getUserInfo(username: string): Promise<any>;
    getRandomProblem(): Promise<any>;
    checkCompilationError(username: string, contestId: string, indexProblem: string): Promise<boolean>;
    checkAuthenticationName(username: string): Promise<boolean>;
}
