import { Module } from '@nestjs/common';
import { AuthController, UserController } from './controller';
import {
  AuthRepository,
  SignUpUseCase,
  SignUpMapper,
  CryptoService,
  JwtTokenService,
  SignInUseCase,
  AccessTokenStrategy,
  RefreshTokenStrategy,
  FindOneUseCase,
  UserMapper,
} from '@my-task-timer/account-users-domain';
import { AuthRepositoryImpl } from '@my-task-timer/account-users-data-source';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController, UserController],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    FindOneUseCase,
    SignUpMapper,
    UserMapper,
    JwtTokenService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    { provide: 'CryptoServiceInterface', useClass: CryptoService },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
  ],
  exports: [AuthRepository],
})
export class AccountUsersResourceModule {}
