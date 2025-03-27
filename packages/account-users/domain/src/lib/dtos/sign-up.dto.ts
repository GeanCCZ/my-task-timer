import { Exclude } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class SignUpDto extends UserDto {
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @Exclude({ toPlainOnly: true })
  password: string;
}
