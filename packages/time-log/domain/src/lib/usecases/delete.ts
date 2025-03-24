import { Injectable } from "@nestjs/common";
import { TimeLogRepository } from "../repository/timeLog.repository";
import { TimeLogMapper } from "../mappers/timeLog.mapper";
import { Usecase } from "@my-task-timer/shared-interfaces";
import { TimeLog } from "../entities/timeLog.entity";

@Injectable()
export class DeleteTimeLogUseCase implements Usecase<keyof TimeLog, void> {

    constructor(
        private readonly timeLogRepository: TimeLogRepository,
        private readonly timeLogMapper: TimeLogMapper
    ) { }

    async execute(input: keyof TimeLog): Promise<void> {
        await this.timeLogRepository.deleteOne(input);
        return;
    }

}