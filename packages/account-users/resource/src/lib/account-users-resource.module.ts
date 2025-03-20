import { Module } from '@nestjs/common';
import { AuthController, UserController } from './controller';
import {
  AuthRepository,
  SignupUseCase,
  SignUpMapper,
  CryptoService,
} from '@my-task-timer/account-users-domain';
import { AuthRepositoryImpl } from '@my-task-timer/account-users-data-source';
import { CryptoServiceInterface} from '@my-task-timer/shared-interfaces';

@Module({
  controllers: [AuthController, UserController],
  providers: [
    SignupUseCase,
    SignUpMapper,
    { provide: 'CryptoServiceInterface', useClass: CryptoService },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
  ],
  exports: [AuthRepository],
})
export class AccountUsersResourceModule {}
