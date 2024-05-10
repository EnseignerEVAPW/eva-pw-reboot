import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { CodeforcesService } from "src/codeforces/codeforces.service";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly codeforcesService;
    constructor(usersService: UsersService, jwtService: JwtService, codeforcesService: CodeforcesService);
    register({ password, username, passwordConfirmation }: RegisterDto): Promise<{
        message: string;
    }>;
    login({ username, password }: LoginDto): Promise<{
        token: string;
        username: string;
    }>;
}
