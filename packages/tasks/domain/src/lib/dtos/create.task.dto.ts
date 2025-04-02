import { Account } from '@my-task-timer/account-users-domain';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {

  @Expose()
  @IsNotEmpty({ message: 'O usuário da tarefa é obrigatório.' })
  @ApiProperty({
    example: {
      id: '123',
    },
    description: 'ID do usuário que criou a tarefa',
  })
  user!: Account;

  @Expose()
  @IsNotEmpty({ message: 'O título da tarefa é obrigatório.' })
  @ApiProperty({
    example: 'Título da tarefa',
    description: 'Título da tarefa',
  })
  title!: string;

  @Expose()
  @IsDateString(
    {},
    { message: 'A data de vencimento da tarefa é obrigatória.' }
  )
  @ApiProperty({
    example: '2025-01-01',
    description: 'Data de vencimento da tarefa',
  })
  dueDate!: string;
}
