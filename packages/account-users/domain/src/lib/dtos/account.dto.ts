import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AccountDto {
  @Expose()
  id?: string;

  @Expose()
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  email: string;

  @Expose()
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode ser vazio.' })
  username: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @Exclude({ toPlainOnly: true })
  password: string;
}
