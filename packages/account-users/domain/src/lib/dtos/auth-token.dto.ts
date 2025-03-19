import { Expose } from 'class-transformer';

export class AuthTokensDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
