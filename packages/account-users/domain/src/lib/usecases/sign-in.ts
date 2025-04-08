import { Inject, Injectable } from '@nestjs/common';
import {
  CryptoServiceInterface,
  Usecase,
} from '@my-task-timer/shared-interfaces';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthTokensDto } from '../dtos/auth-token.dto';
import { AccountRepository } from '../repository/account.repository';
import { JwtTokenService } from '../service/jwt-token.service';
import {
  tryCatch,
  NotFoundException,
  InternalServerError,
  UnauthorizedException,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class SignInUseCase implements Usecase<SignInDto, AuthTokensDto> {
  constructor(
    private readonly accountRepository: AccountRepository,
    @Inject('CryptoServiceInterface')
    private readonly crypto: CryptoServiceInterface,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  async execute(input: SignInDto): Promise<AuthTokensDto> {
    const user = await this.findUser(input.email, input.username);

    await this.verifyPassword(input.password, user.password);

    return this.generateTokens(user.id as string);
  }

  private async findUser(email?: string, username?: string) {
    const { data, error } = await tryCatch(
      this.accountRepository.findByEmailOrUsername(email, username)
    );

    if (error) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const { data, error } = await tryCatch(
      this.crypto.compare(plainPassword, hashedPassword)
    );

    if (error || !data) {
      throw new UnauthorizedException('Password does not match');
    }
  }

  private async generateTokens(userId: string): Promise<AuthTokensDto> {
    try {
      return {
        accessToken: this.jwtTokenService.generateAccessToken({ sub: userId }),
        refreshToken: this.jwtTokenService.generateRefreshToken({
          sub: userId,
        }),
      };
    } catch (error) {
      throw new InternalServerError('Token generation failed: ' + error);
    }
  }
}
