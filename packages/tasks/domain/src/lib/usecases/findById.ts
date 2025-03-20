import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { Task } from '../entities/task.entity';

@Injectable()
export class FindTaskByIdUseCase implements Usecase<keyof Task, Task> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: keyof Task): Promise<Task> {
    const task = await this.taskRepository.findOne(input);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
