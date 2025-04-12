import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { ResponseTimeLogDto, UpdateTimeLogDto } from '../dtos';
import { TimeLog } from '../entities/time-log.entity';
import { TimeLogRepository } from '../repository/time-log.repository';
import { TimeLogMapper } from '../mappers/time-log.mapper';
import {
  calculateTimeDifference,
  convertToTimeZone,
  InternalServerError,
  NotFoundException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class UpdateTimeLogUseCase
  implements
    Usecase<{ id: string; input: UpdateTimeLogDto }, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: UpdateTimeLogDto;
  }): Promise<ResponseTimeLogDto> {
    const { data: existingTimeLog, error: findError } = await tryCatch(
      this.timeLogRepository.findOne(id)
    );
    if (findError || !existingTimeLog) {
      throw new NotFoundException(`TimeLog with id ${id} not found`);
    }

    // Mapeia os dados de atualização do DTO para o domínio
    const updateData = this.timeLogMapper.toEntity(input);
    const updatedData: Partial<TimeLog> = {
      ...existingTimeLog,
      ...updateData,
      id, // Garantindo que o id seja mantido
    };

    // Converte o startedAt para o fuso horário, se fornecido
    if (input.startedAt) {
      updatedData.startedAt = convertToTimeZone(
        input.startedAt,
        'America/Sao_Paulo'
      );
    }

    // Se endedAt for informado e for diferente, atualiza e calcula o tempo decorrido
    if (input.endedAt && input.endedAt !== existingTimeLog.endedAt) {
      const convertedEndedAt = convertToTimeZone(
        input.endedAt,
        'America/Sao_Paulo'
      );
      updatedData.endedAt = convertedEndedAt;

      // Calcula a diferença de tempo a partir do startedAt existente
      const startTime = updatedData.startedAt
        ? updatedData.startedAt
        : new Date(existingTimeLog.startedAt);
      const timeDiffInMs =
        convertedEndedAt.getTime() - new Date(startTime).getTime();
      updatedData.timeSpent = calculateTimeDifference(timeDiffInMs);
    }

    // Persiste a atualização
    const { data: updatedTimeLog, error: updateError } = await tryCatch(
      this.timeLogRepository.updateOne(id, updatedData as TimeLog)
    );
    if (updateError || !updatedTimeLog) {
      throw new InternalServerError('Failed to update TimeLog');
    }

    return this.timeLogMapper.toDto(updatedTimeLog);
  }
}
