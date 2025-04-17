import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { CreateTimeLogDto, ResponseTimeLogDto } from '../dtos';
import { TimeLogMapper } from '../mappers/time-log.mapper';
import { TimeLogRepository } from '../repository/time-log.repository';
import { TimeLog } from '../entities/time-log.entity';
import {
  convertToTimeZone,
  InternalServerError,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class CreateTimeLogUseCase
  implements Usecase<CreateTimeLogDto, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(input: CreateTimeLogDto): Promise<ResponseTimeLogDto> {
    const timeLogDomain = this.createTimeLogDomain(input);

    const { data, error } = await tryCatch(
      this.timeLogRepository.createOne(timeLogDomain)
    );

    if (error) throw new InternalServerError('Time-Log could not be created');

    return this.timeLogMapper.toDto(data);
  }

  private createTimeLogDomain(input: CreateTimeLogDto) {
    const mappedEntity = this.timeLogMapper.toEntity(input);

    const startedAt = convertToTimeZone(input.startedAt, 'America/Sao_Paulo');
    return {
      ...mappedEntity,
      startedAt,
    } as TimeLog;
  }
}
