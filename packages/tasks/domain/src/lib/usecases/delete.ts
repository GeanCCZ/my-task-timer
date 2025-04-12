import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import {
  InternalServerError,
  NotFoundException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class DeleteTaskUseCase implements Usecase<string, string> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<string> {
    const { data, error } = await tryCatch(this.taskRepository.deleteOne(id));

    if (error) {
      throw error?.message.includes('not found')
        ? new NotFoundException(`Task with id ${id} does not exist`)
        : new InternalServerError(
            'An unexpected error occurred while deleting the task'
          );
    }

    return data;
  }
}
