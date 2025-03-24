import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Body,
} from '@nestjs/common';
import {
  FindOneUseCase,
  UpdateUseCase,
  UserDto,
} from '@my-task-timer/account-users-domain';
import { AuthenticatedRequest } from '@my-task-timer/shared-interfaces';
import { AccessTokenGuard } from '@my-task-timer/shared-resource';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly findOneUseCase: FindOneUseCase,
    private readonly updateUseCase: UpdateUseCase
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findOne(@Req() req: AuthenticatedRequest) {
    const id = req.user.userID;
    return await this.findOneUseCase.execute(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put('update')
  async update(@Req() req: AuthenticatedRequest, @Body() input: UserDto) {
    const id = req.user.userID;
    return await this.updateUseCase.execute({ id, input });
  }
}
