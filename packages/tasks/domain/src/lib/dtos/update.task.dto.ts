import { IsNotEmpty } from 'class-validator';
import { CreateTaskDto } from './create.task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @IsNotEmpty()
  id!: string;
}
