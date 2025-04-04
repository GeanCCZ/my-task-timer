import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { ResponseTimeLogDto, UpdateTimeLogDto } from '../dtos';
import { TimeLog } from '../entities/time-log.entity';
import { TimeLogRepository } from '../repository/time-log.repository';
import { TimeLogMapper } from '../mappers/time-log.mapper';
import { FindTimeLogByIdUseCase } from './findById';

@Injectable()
export class UpdateTimeLogUseCase
  implements Usecase<UpdateTimeLogDto, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly findTimeLogByIdUseCase: FindTimeLogByIdUseCase,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(input: UpdateTimeLogDto): Promise<ResponseTimeLogDto> {
    const existingTimeLog = await this.findTimeLogByIdUseCase.execute(
      input.id as keyof TimeLog
    );

    const timeLogDomain: TimeLog = {
      ...this.timeLogMapper.toEntity(input),
      id: input.id,
      startedAt: new Date(input.startedAt),
    };

    if (input.endedAt && existingTimeLog.endedAt !== input.endedAt) {
      timeLogDomain.endedAt = new Date(
        new Date(input.endedAt).toLocaleString('en-US', {
          timeZone: 'America/Sao_Paulo',
        })
      );

      const timeDiff =
        timeLogDomain.endedAt.getTime() - existingTimeLog.startedAt.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      const timeSpent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      timeLogDomain.timeSpent = timeSpent;
    }

    const updatedTimeLog = await this.timeLogRepository.updateOne(
      existingTimeLog.id as keyof TimeLog,
      {
        ...existingTimeLog,
        ...timeLogDomain,
      }
    );

    return this.timeLogMapper.toResponse(updatedTimeLog);
  }
}
