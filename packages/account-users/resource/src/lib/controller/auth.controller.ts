import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  SignupUseCase,
  SignUpDto,
  SignInUseCase,
  SignInDto,
} from '@my-task-timer/account-users-domain';
import { input } from 'zod';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly signUpUsecase: SignupUseCase,
    private readonly signInUsecase: SignInUseCase
  ) {}

  @Post()
  async signIn(@Body() input: SignInDto) {
    return await this.signInUsecase.execute(input);
  }

  @Post('signup')
  async signup(@Body() input: SignUpDto) {
    return await this.signUpUsecase.execute(input);
  }

  @Post('create-user')
  async createUser() {
    return 'User created';
  }
}
