import { Usecase } from '@my-task-timer/shared-interfaces';
import { TimeLogRepository } from '../repository/time-log.repository';
import { TimeLogMapper } from '../mappers/time-log.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseTimeLogDto } from '../dtos';
import {
  InternalServerError,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class FindAllTimeLogUseCase
  implements Usecase<null, ResponseTimeLogDto[]>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(): Promise<ResponseTimeLogDto[]> {
    const { data, error } = await tryCatch(this.timeLogRepository.findAll());

    if (error) {
      throw error?.message.includes('not found')
        ? new NotFoundException(`Time log with id  does not exist`)
        : new InternalServerError(
            'An unexpected error occurred while retrieving the time log'
          );
    }

    return data.map((timeLog) => this.timeLogMapper.toDto(timeLog));
  }
}
