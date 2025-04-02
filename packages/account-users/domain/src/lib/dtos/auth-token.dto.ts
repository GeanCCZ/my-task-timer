import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthTokensDto {
  @Expose()
  @ApiProperty({
    example: 'Khu93vwUyeRcmtvsYEfUuAeTSEapnmz9',
    description: 'Token de acesso',
  })
  accessToken: string;

  @Expose()
  @ApiProperty({
    example: 'MzubxUZjBCYXtE2Banw3U6CMXRbU7Mfb',
    description: 'Token de atualização',
  })
  refreshToken: string;
}
