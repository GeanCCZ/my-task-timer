import { Usecase } from "@my-task-timer/shared-interfaces";
import { Injectable } from "@nestjs/common";
import { CreateTimeLogDto } from "../dtos/create.timeLog";
import { ResponseTimeLogDto } from "../dtos/response.timeLog";
import { TimeLogMapper } from "../mappers/timeLog.mapper";
import { TimeLogRepository } from "../repository/timeLog.repository";
import { TimeLog } from "../entities/timeLog.entity";

@Injectable()
export class CreateTimeLogUseCase implements Usecase<CreateTimeLogDto, ResponseTimeLogDto> {

    constructor(
        private readonly timeLogRepository: TimeLogRepository,
        private readonly timeLogMapper: TimeLogMapper
    ) { }

    async execute(input: CreateTimeLogDto): Promise<ResponseTimeLogDto> {
        const timeLogDomain = this.timeLogMapper.toEntity(input);

        const createdTimeLog = await this.timeLogRepository.createOne(timeLogDomain as TimeLog)

        return this.timeLogMapper.toResponse(createdTimeLog);
    }

}