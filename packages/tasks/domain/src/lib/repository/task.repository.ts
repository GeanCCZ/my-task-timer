import {
  Create,
  Delete,
  FindAll,
  FindOne,
  Update,
} from '@my-task-timer/shared-interfaces';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { ResponseTaskDto } from '../dtos/response.task.dto';

export abstract class TaskRepository
  implements
    Create<Task, Task>,
    FindOne<Task, keyof Task, Task>,
    Delete<Task, keyof Task, Task>,
    Update<ResponseTaskDto, keyof UpdateTaskDto, Task>,
    FindAll<Task>
{
  abstract createOne(input: Task): Promise<ResponseTaskDto>;

  abstract updateOne(
    id: keyof Task,
    input: UpdateTaskDto
  ): Promise<ResponseTaskDto>;

  abstract deleteOne(id: keyof Task): Promise<ResponseTaskDto>;

  abstract findOne(id: keyof Task): Promise<ResponseTaskDto>;

  abstract findAll(): Promise<ResponseTaskDto[]>;
}
