import {
  Create,
  Delete,
  FindAll,
  FindOne,
  Update,
} from '@my-task-timer/shared-interfaces';
import { Task } from '../entities/task.entity';
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
  abstract createOne(input: Task): Promise<Task>;

  abstract updateOne(id: string, input: Task): Promise<Task>;

  abstract deleteOne(id: string): Promise<string>;

  abstract findOne(id: string): Promise<Task>;

  abstract findAll(): Promise<Task[]>;
}
