import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { TimeLog } from '../entities/time-log.entity';
import { ResponseTimeLogDto } from '../dtos';
import { TimeLogRepository } from '../repository/time-log.repository';
import { TimeLogMapper } from '../mappers/time-log.mapper';

@Injectable()
export class FindTimeLogByIdUseCase
  implements Usecase<keyof TimeLog, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(input: keyof TimeLog): Promise<ResponseTimeLogDto> {
    const timeLog = await this.timeLogRepository.findOne(input);
    if (!timeLog) {
      throw new NotFoundException('TimeLog not found');
    }
    return this.timeLogMapper.toResponse(timeLog);
  }
}
