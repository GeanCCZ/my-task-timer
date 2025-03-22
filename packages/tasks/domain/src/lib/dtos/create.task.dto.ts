import { Account } from '@my-task-timer/account-users-domain';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {

  @Expose()
  @IsNotEmpty({ message: 'O usuário da tarefa é obrigatório.' })
  user!: Account;

  @Expose()
  @IsNotEmpty({ message: 'O título da tarefa é obrigatório.' })
  title!: string;

  @Expose()
  @IsDateString(
    {},
    { message: 'A data de vencimento da tarefa é obrigatória.' }
  )
  dueDate!: string;
}
