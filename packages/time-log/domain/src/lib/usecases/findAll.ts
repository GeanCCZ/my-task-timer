import { Usecase } from "@my-task-timer/shared-interfaces";
import { TimeLogRepository } from "../repository/timeLog.repository";
import { TimeLogMapper } from "../mappers/timeLog.mapper";
import { TimeLog } from "../entities/timeLog.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllTimeLogUseCase implements Usecase<null, TimeLog[]> {
    constructor(
        private readonly timeLogRepository: TimeLogRepository,
        private readonly timeLogMapper: TimeLogMapper
    ) { }

    async execute(): Promise<TimeLog[]> {
        const timeLogs = await this.timeLogRepository.findAll();
        return timeLogs.map((timelog) => {
            return this.timeLogMapper.toResponse(timelog);
        })
    }

}