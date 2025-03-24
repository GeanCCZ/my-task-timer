import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { FindOneUseCase } from '@my-task-timer/account-users-domain';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly findOneUseCase: FindOneUseCase) {}

  @Get()
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.findOneUseCase.execute(id);
  }

  async update() {
    return {};
  }
}
