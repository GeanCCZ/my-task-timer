import { Module } from '@nestjs/common';
import { AuthController, UserController } from './controller';
import {
  AuthRepository,
  SignupUseCase,
} from '@my-task-timer/account-users-domain';
import { AuthRepositoryImpl } from '../../../data-source/src/lib/repository/auth.repository.impl';

@Module({
  controllers: [AuthController, UserController],
  providers: [
    SignupUseCase,
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
  ],
  exports: [],
})
export class AccountUsersResourceModule {}
