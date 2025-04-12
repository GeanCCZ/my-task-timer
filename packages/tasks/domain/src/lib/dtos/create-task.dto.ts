import { Expose } from 'class-transformer';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @Expose()
  @IsNotEmpty({ message: 'O título da tarefa é obrigatório.' })
  @ApiProperty({
    example: 'Título da tarefa',
    description: 'Título da tarefa',
  })
  title: string;

  @Expose()
  @IsDateString(
    {},
    { message: 'A data de vencimento da tarefa é obrigatória.' }
  )
  @ApiProperty({
    example: '2025-01-01',
    description: 'Data de vencimento da tarefa',
  })
  dueDate: string;
}
