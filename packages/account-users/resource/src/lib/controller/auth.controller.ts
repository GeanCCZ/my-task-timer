import { Controller, Post } from "@nestjs/common";
import { access } from "fs";

@Controller('authentication')
export class AuthController {

    constructor() { }

    @Post()
    async signIn() {
        return {
            accessToken: 'test',
            refreshToken: 'test',
        };
    }

    @Post('signup')
    async singUp() {
        return "User singed up";
    }

    @Post('create-user')
    async createUser() {
        return "User created";
    }
}
