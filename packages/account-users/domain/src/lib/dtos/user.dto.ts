import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id?: string;

  @Expose()
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  email: string;

  @Expose()
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode ser vazio.' })
  username: string;
}
