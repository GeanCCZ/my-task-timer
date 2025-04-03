import {
  Create,
  Delete,
  FindAll,
  FindOne,
  Update,
} from '@my-task-timer/shared-interfaces';
import { Task } from '../entities/task.entity';
import { ResponseTaskDto } from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TaskRepository
  implements
    Create<Task, Task>,
    Update<Task, 'id', Task>,
    FindOne<Task, 'id', Task>,
    FindAll<Task>,
    Delete<Task, 'id', string>
{
  abstract createOne(input: Task): Promise<ResponseTaskDto>;

  abstract updateOne(id: string, input: Task): Promise<Task>;

  abstract deleteOne(id: string): Promise<string>;

  abstract findOne(id: string): Promise<ResponseTaskDto>;

  abstract findAll(): Promise<ResponseTaskDto[]>;
}
