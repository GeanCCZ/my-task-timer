import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  SignUpUseCase,
  SignUpDto,
  SignInUseCase,
  SignInDto,
} from '@my-task-timer/account-users-domain';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly signUpUsecase: SignUpUseCase,
    private readonly signInUsecase: SignInUseCase
  ) { }

  @Post()
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async signIn(@Body() input: SignInDto) {
    return await this.signInUsecase.execute(input);
  }

  @Post('signup')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async signup(@Body() input: SignUpDto) {
    return await this.signUpUsecase.execute(input);
  }
}
