import { Mapper } from '@my-task-timer/shared-interfaces';
import {
  CreateTimeLogDto,
  ResponseTimeLogDto,
  UpdateTimeLogDto,
} from '../dtos';
import { TimeLog } from '../entities/time-log.entity';

export class TimeLogMapper
  implements
    Mapper<
      CreateTimeLogDto | UpdateTimeLogDto | ResponseTimeLogDto,
      Partial<TimeLog>
    >
{
  toEntity(input: CreateTimeLogDto | UpdateTimeLogDto, isUpdate = false) {
    const entity: Partial<TimeLog> = {};

    if (isUpdate) {
      const updateDto = input as UpdateTimeLogDto;
      entity.id = updateDto.id;

      if (updateDto.startedAt !== undefined) {
        entity.startedAt = updateDto.startedAt;
      }
      if (updateDto.endedAt !== undefined) {
        entity.endedAt = updateDto.endedAt;
      }
    } else {
      const createDto = input as CreateTimeLogDto;
      entity.startedAt = createDto.startedAt;
      entity.taskId = createDto.taskId;
    }
    return entity;
  }

  toDto(domain: TimeLog): ResponseTimeLogDto {
    const dto = new ResponseTimeLogDto();
    dto.id = domain.id;
    dto.endedAt = domain.endedAt;
    dto.timeSpent = domain.timeSpent;
    dto.taskId = domain.taskId;
    return dto;
  }
}
