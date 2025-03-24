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
} from '@nestjs/common';
import { FindOneUseCase } from '@my-task-timer/account-users-domain';
import { AuthenticatedRequest } from '@my-task-timer/shared-interfaces';
import { AccessTokenGuard } from '@my-task-timer/shared-resource';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly findOneUseCase: FindOneUseCase) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findOne(@Req() req: AuthenticatedRequest) {
    const id = req.user.userID;
    return await this.findOneUseCase.execute(id);
  }
}
