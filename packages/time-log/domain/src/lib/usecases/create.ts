import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import {
  CreateTimeLogDto,
  ResponseTimeLogDto,
} from '@my-task-timer/time-log-domain';
import { TimeLogMapper } from '../mappers/time-log.mapper';
import { TimeLogRepository } from '../repository/time-log.repository';
import { TimeLog } from '../entities/time-log.entity';

@Injectable()
export class CreateTimeLogUseCase
  implements Usecase<CreateTimeLogDto, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(input: CreateTimeLogDto): Promise<ResponseTimeLogDto> {
    const timeLogDomain: TimeLog = this.timeLogMapper.toEntity(
      input
    ) as unknown as TimeLog;

    timeLogDomain.startedAt = new Date(
      new Date(timeLogDomain.startedAt).toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo',
      })
    );

    const createdTimeLog = await this.timeLogRepository.createOne(
      timeLogDomain
    );

    return this.timeLogMapper.toResponse(createdTimeLog);
  }
}
