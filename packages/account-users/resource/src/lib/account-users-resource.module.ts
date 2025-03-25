import { Module } from '@nestjs/common';
import { AuthController, UserController } from './controller';
import {
  AccountRepository,
  SignUpUseCase,
  SignUpMapper,
  CryptoService,
  JwtTokenService,
  SignInUseCase,
  AccessTokenStrategy,
  RefreshTokenStrategy,
  FindOneUseCase,
  UserMapper,
  UpdateUseCase,
  DeleteUseCase,
} from '@my-task-timer/account-users-domain';
import { AccountRepositoryImpl } from '@my-task-timer/account-users-data-source';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController, UserController],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    FindOneUseCase,
    UpdateUseCase,
    DeleteUseCase,
    SignUpMapper,
    UserMapper,
    JwtTokenService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    { provide: 'CryptoServiceInterface', useClass: CryptoService },
    { provide: AccountRepository, useClass: AccountRepositoryImpl },
  ],
  exports: [AccountRepository],
})
export class AccountUsersResourceModule {}
