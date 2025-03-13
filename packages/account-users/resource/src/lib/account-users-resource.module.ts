import { Module } from '@nestjs/common';
import { AuthController, UserController } from './controller';

@Module({
  controllers: [AuthController, UserController],
  providers: [],
  exports: [],
})
export class AccountUsersResourceModule { }
