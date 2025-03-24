import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { Task } from '../entities/task.entity';

@Injectable()
export class DeleteTaskUseCase implements Usecase<keyof Task, void> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskMapper: TaskMapper
  ) { }

  async execute(input: keyof Task) {
    await this.taskRepository.deleteOne(input);
    return;
  }
}
