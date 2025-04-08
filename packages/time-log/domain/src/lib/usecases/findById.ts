import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { ResponseTimeLogDto } from '../dtos';
import { TimeLogRepository } from '../repository/time-log.repository';
import { TimeLogMapper } from '../mappers/time-log.mapper';
import {
  InternalServerError,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class FindTimeLogByIdUseCase
  implements Usecase<string, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(id: string): Promise<ResponseTimeLogDto> {
    const { data, error } = await tryCatch(this.timeLogRepository.findOne(id));

    if (error) {
      throw error?.message.includes('not found')
        ? new NotFoundException(`Time log with id ${id} does not exist`)
        : new InternalServerError(
            'An unexpected error occurred while retrieving the time log'
          );
    }
    return this.timeLogMapper.toDto(data);
  }
}
