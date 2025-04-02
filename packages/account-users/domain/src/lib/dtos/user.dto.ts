import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @ApiProperty({
    example: '123',
    description: 'ID do usuário',
  })
  id?: string;

  @Expose()
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  @ApiProperty({
    example: 'tetelaio@gmail.com',
    description: 'E-mail do usuário',
  })
  email: string;

  @Expose()
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode ser vazio.' })
  @ApiProperty({
    example: 'Telaio',
    description: 'Nome de usuário do usuário',
  })
  username: string;
}
