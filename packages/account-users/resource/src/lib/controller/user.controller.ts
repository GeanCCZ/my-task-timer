import {
    Controller,
    HttpCode,
    HttpStatus,
    Get,
    UseGuards,
    Param,
} from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor() { }

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        return {
            name: 'test',
            email: 'test',
            password: 'test',
        };
    }

    async findOne(@Param('id') id: string) {
        return {
            name: 'test',
            email: 'test',
            password: 'test',
        }
    }
}