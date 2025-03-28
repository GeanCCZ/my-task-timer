import { CreateTimeLogDto, CreateTimeLogUseCase, DeleteTimeLogUseCase, FindTimeLogByIdUseCase, ResponseTimeLogDto, TimeLog, UpdateTimeLogDto, UpdateTimeLogUseCase, FindAllTimeLogUseCase } from "@my-task-timer/time-log-domain";
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";

@Controller("time-logs")
@UseInterceptors(ClassSerializerInterceptor)
export class TimeLogController {

    constructor(
        private readonly createTimeLogUseCase: CreateTimeLogUseCase,
        private readonly updateTimeLogUseCase: UpdateTimeLogUseCase,
        private readonly deleteTimeLogUseCase: DeleteTimeLogUseCase,
        private readonly findAllTimeLogsUseCase: FindAllTimeLogUseCase,
        private readonly findTimeLogByIdUseCase: FindTimeLogByIdUseCase
    ) { }

    @Post()
    async createTimeLog(@Body() input: CreateTimeLogDto): Promise<ResponseTimeLogDto> {
        return this.createTimeLogUseCase.execute(input);
    }

    @Patch(":id")
    async updateTimeLog(@Body() input: UpdateTimeLogDto): Promise<ResponseTimeLogDto> {
        return this.updateTimeLogUseCase.execute(input);
    }

    @Delete(":id")
    async deleteTimeLog(@Param("id") id: keyof TimeLog): Promise<void> {
        return this.deleteTimeLogUseCase.execute(id);
    }

    @Get()
    async findAllTimeLogs(): Promise<ResponseTimeLogDto[]> {
        return this.findAllTimeLogsUseCase.execute();
    }

    @Get(":id")
    async findTimeLogById(@Param("id") id: keyof TimeLog): Promise<ResponseTimeLogDto> {
        return this.findTimeLogByIdUseCase.execute(id);
    }


}
