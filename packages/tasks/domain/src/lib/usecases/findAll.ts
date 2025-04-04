import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { ResponseTaskDto } from '../dtos';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import {
  NotFoundException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class FindAllTasksUseCase implements Usecase<string, ResponseTaskDto[]> {
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(userId: string): Promise<ResponseTaskDto[]> {
    const { data, error } = await tryCatch(
      this.taskRepository.findAllById(userId)
    );

    if (error)
      throw new NotFoundException(`No tasks with user id ${userId} found`);

    return data.map((task) => this.taskMapper.toDto(task));
  }
}
