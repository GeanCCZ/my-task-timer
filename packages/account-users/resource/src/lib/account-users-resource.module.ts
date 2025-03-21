import { Module } from '@nestjs/common';
import { AuthController, UserController } from './controller';
import {
  AuthRepository,
  SignupUseCase,
  SignUpMapper
} from '@my-task-timer/account-users-domain';
import { AuthRepositoryImpl} from '@my-task-timer/account-users-data-source';

@Module({
  controllers: [AuthController, UserController],
  providers: [
    SignupUseCase,
    SignUpMapper,
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
  ],
  exports: [AuthRepository],
})
export class AccountUsersResourceModule {}
