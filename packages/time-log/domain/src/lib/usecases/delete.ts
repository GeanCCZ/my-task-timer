import { Injectable } from '@nestjs/common';
import { TimeLogRepository } from '../repository/time-log.repository';
import { Usecase } from '@my-task-timer/shared-interfaces';
import {
  InternalServerError,
  NotFoundException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class DeleteTimeLogUseCase implements Usecase<string, string> {
  constructor(private readonly timeLogRepository: TimeLogRepository) {}

  async execute(id: string): Promise<string> {
    const { data, error } = await tryCatch(
      this.timeLogRepository.deleteOne(id)
    );

    if (error) {
      throw error?.message.includes('not found')
        ? new NotFoundException(`Time log with id ${id} does not exist`)
        : new InternalServerError(
            'An unexpected error occurred while deleting the time log'
          );
    }

    return data;
  }
}
