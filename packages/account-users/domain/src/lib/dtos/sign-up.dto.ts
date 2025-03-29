import { Exclude } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto extends UserDto {
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  password: string;
}
