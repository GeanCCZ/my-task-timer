import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SignupUseCase, AccountDto } from '@my-task-timer/account-users-domain';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly signUpUsecase: SignupUseCase) {}

  @Post()
  async signIn() {
    return 'User singed up';
  }

  @Post('signup')
  async signup(@Body() input: AccountDto) {
    return await this.signUpUsecase.execute(input);
  }

  @Post('create-user')
  async createUser() {
    return 'User created';
  }
}
