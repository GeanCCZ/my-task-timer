import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  SignUpUseCase,
  SignUpDto,
  SignInUseCase,
  SignInDto,
} from '@my-task-timer/account-users-domain';
import { AccessTokenGuard } from '@my-task-timer/shared-resource';
import { AuthenticatedRequest } from '@my-task-timer/shared-interfaces';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly signUpUsecase: SignUpUseCase,
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

  @UseGuards(AccessTokenGuard)
  @Post('create-user')
  async createUser(@Req() req: AuthenticatedRequest) {
    const id = req.user.userID;
    return id;
  }
}
