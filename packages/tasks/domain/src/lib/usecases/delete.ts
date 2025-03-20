import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { Task } from '../entities/task.entity';

@Injectable()
export class DeleteTaskUseCase implements Usecase<keyof Task, Task> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskMapper: TaskMapper
  ) {}

  async execute(input: keyof Task) {
    const deletedTask = await this.taskRepository.deleteOne(input);
    return this.taskMapper.toResponse(deletedTask);
  }
}
