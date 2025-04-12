import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { ResponseTaskDto } from '../dtos';
import { TaskMapper } from '../mappers/task.mapper';
import {
  InternalServerError,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class FindTaskByIdUseCase implements Usecase<string, ResponseTaskDto> {
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(id: string): Promise<ResponseTaskDto> {
    const { data, error } = await tryCatch(this.taskRepository.findOne(id));

    if (error) {
      throw error?.message.includes('not found')
        ? new NotFoundException(`Task with id ${id} does not exist`)
        : new InternalServerError(
            'An unexpected error occurred while retrieving the task'
          );
    }
    return this.taskMapper.toDto(data);
  }
}
