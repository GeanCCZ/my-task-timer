import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class SignInDto {
  @ValidateIf((o) => !o.username)
  @IsEmail({}, { message: 'E-mail inválido' })
  @ApiProperty({
    example: 'tetelaio@gmailcom',
    description: 'E-mail do usuário',
  })
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsString({ message: 'Username deve ser uma string' })
  @IsNotEmpty({ message: 'Username não pode estar vazio' })
  @ApiProperty({
    example: 'tetelaio',
    description: 'Nome de usuário do usuário',
  })
  username?: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  password: string;
}
