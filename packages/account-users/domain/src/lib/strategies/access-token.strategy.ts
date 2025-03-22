import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '@my-task-timer/shared-interfaces';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token'
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') as string,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: JwtPayload) {
    return { userID: payload.sub };
  }
}
