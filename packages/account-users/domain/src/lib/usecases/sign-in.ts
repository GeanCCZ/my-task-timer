import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CryptoServiceInterface,
  Usecase,
} from '@my-task-timer/shared-interfaces';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthTokensDto } from '../dtos/auth-token.dto';
import { AccountRepository } from '../repository/account.repository';
import { JwtTokenService } from '../service/jwt-token.service';

@Injectable()
export class SignInUseCase implements Usecase<SignInDto, AuthTokensDto> {
  constructor(
    private readonly accountRepository: AccountRepository,
    @Inject('CryptoServiceInterface')
    private readonly crypto: CryptoServiceInterface,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  async execute(input: SignInDto): Promise<AuthTokensDto> {
    const user = await this.accountRepository.findByEmailOrUsername(
      input.email,
      input.username
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const passWordMatch = await this.crypto.compare(
      input.password,
      user.password
    );

    if (!passWordMatch) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtTokenService.generateAccessToken({ sub: user.id }),
      refreshToken: this.jwtTokenService.generateRefreshToken({ sub: user.id }),
    };
  }
}
