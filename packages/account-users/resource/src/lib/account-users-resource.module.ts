import { Module } from '@nestjs/common';
import { AuthController, UserController } from './controller';
import {
  AuthRepository,
  SignupUseCase,
  SignUpMapper,
  CryptoService,
  JwtTokenService,
  SignInUseCase,
} from '@my-task-timer/account-users-domain';
import { AuthRepositoryImpl } from '@my-task-timer/account-users-data-source';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController, UserController],
  providers: [
    SignInUseCase,
    SignupUseCase,
    SignUpMapper,
    JwtTokenService,
    { provide: 'CryptoServiceInterface', useClass: CryptoService },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
  ],
  exports: [AuthRepository],
})
export class AccountUsersResourceModule {}
