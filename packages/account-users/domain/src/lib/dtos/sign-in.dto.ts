import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class SignInDto {
  @ValidateIf((o) => !o.username)
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsString({ message: 'Username deve ser uma string' })
  @IsNotEmpty({ message: 'Username não pode estar vazio' })
  username?: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  password: string;
}
