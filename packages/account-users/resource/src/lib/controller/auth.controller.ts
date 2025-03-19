import { Body, Controller, Post } from '@nestjs/common';
import { SignupUseCase } from '@my-task-timer/account-users-domain';

@Controller('authentication')
export class AuthController {
  constructor(private readonly signUpUsecase: SignupUseCase) {}

  @Post()
  async signIn() {
    return 'User singed up';
  }

  @Post('signup')
  async signup(
    @Body() input: { email: string; username: string; password: string }
  ) {
    return await this.signUpUsecase.execute(input);
  }

  @Post('create-user')
  async createUser() {
    return 'User created';
  }
}
