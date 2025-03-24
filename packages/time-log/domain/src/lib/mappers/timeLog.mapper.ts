import { Mapper } from "@my-task-timer/shared-interfaces";
import { CreateTimeLogDto } from "../dtos/create.timeLog";
import { TimeLog } from "../entities/timeLog.entity";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { ResponseTimeLogDto } from "../dtos/response.timeLog";
import { UpdateTimeLogDto } from "../dtos/update.timeLog";

export class TimeLogMapper implements Mapper<CreateTimeLogDto, any> {

    toEntity(input: CreateTimeLogDto | UpdateTimeLogDto) {
        if (input instanceof UpdateTimeLogDto) {
            return {
                ...input,
            };
        }
        return {
            startedAt: input.startedAt,
        };
    }

    toDto(domain: TimeLog): CreateTimeLogDto {
        return {
            ...domain,
        };
    }

    toResponse(domain: TimeLog): ResponseTimeLogDto {
        const timeLogInstance = plainToInstance(CreateTimeLogDto, domain);
        return instanceToPlain(timeLogInstance) as ResponseTimeLogDto;
    }
}