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
  Delete,
} from '@nestjs/common';
import {
  DeleteUseCase,
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
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findOne(@Req() req: AuthenticatedRequest) {
    const id = req.user.userID;
    return await this.findOneUseCase.execute(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async update(@Req() req: AuthenticatedRequest, @Body() input: UserDto) {
    const id = req.user.userID;
    return await this.updateUseCase.execute({ id, input });
  }

  @UseGuards(AccessTokenGuard)
  @Delete()
  async delete(@Req() req: AuthenticatedRequest) {
    const id = req.user.userID;
    return await this.deleteUseCase.execute(id);
  }
}
