import { Injectable, NotFoundException } from "@nestjs/common";
import { TimeLog } from "../entities/timeLog.entity";
import { TimeLogMapper } from "../mappers/timeLog.mapper";
import { TimeLogRepository } from "../repository/timeLog.repository";
import { Usecase } from "@my-task-timer/shared-interfaces";
import { ResponseTimeLogDto } from "../dtos/response.timeLog";

@Injectable()
export class FindTimeLogByIdUseCase implements Usecase<keyof TimeLog, ResponseTimeLogDto> {
    constructor(private readonly timeLogRepository: TimeLogRepository,
    ) { }

    async execute(input: keyof TimeLog): Promise<ResponseTimeLogDto> {
        const timeLog = await this.timeLogRepository.findOne(input);
        if (!timeLog) {
            throw new NotFoundException('TimeLog not found');
        }
        return timeLog;
    }
}