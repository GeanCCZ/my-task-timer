import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  SignUpUseCase,
  SignUpDto,
  SignInUseCase,
  SignInDto,
} from '@my-task-timer/account-users-domain';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async signIn(@Body() input: SignInDto) {
    return await this.signInUseCase.execute(input);
  }

  @Post('signup')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async signup(@Body() input: SignUpDto) {
    return await this.signUpUseCase.execute(input);
  }
}
