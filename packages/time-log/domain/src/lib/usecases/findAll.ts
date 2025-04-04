import { Usecase } from '@my-task-timer/shared-interfaces';
import { TimeLogRepository } from '../repository/timeLog.repository';
import { TimeLogMapper } from '../mappers/time-log.mapper';
import { Injectable } from '@nestjs/common';
import { ResponseTimeLogDto } from '../dtos/response-time-log.dto';

@Injectable()
export class FindAllTimeLogUseCase
  implements Usecase<null, ResponseTimeLogDto[]>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(): Promise<ResponseTimeLogDto[]> {
    const timeLogs = await this.timeLogRepository.findAll();

    return timeLogs.map((timelog) => {
      return this.timeLogMapper.toResponse(timelog);
    });
  }
}
