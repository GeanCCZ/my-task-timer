import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateTimeLogDto {

  @IsDateString(
    {},
    { message: 'A data de início do log de tempo é obrigatória.' }
  )
  @ApiProperty({
    example: '2025-01-01',
    description: 'Data de início do log de tempo',
  })
  startedAt: Date;

  @IsNotEmpty({ message: 'A tarefa relacionada deve ser informada.' })
  @ApiProperty({
    example: {
      taskId: '123',
    },
    description: 'ID da tarefa relacionada ao log de tempo',
  })
  taskId: string;
}
