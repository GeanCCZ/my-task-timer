import { CreateTimeLogDto, CreateTimeLogUseCase, DeleteTimeLogUseCase, FindTimeLogByIdUseCase, ResponseTimeLogDto, TimeLog, UpdateTimeLogDto, UpdateTimeLogUseCase, FindAllTimeLogUseCase } from "@my-task-timer/time-log-domain";
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

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
    @ApiResponse({
        status: 201,
        description: "Time log created successfully",
        type: ResponseTimeLogDto,
    })
    async createTimeLog(@Body() input: CreateTimeLogDto): Promise<ResponseTimeLogDto> {
        return this.createTimeLogUseCase.execute(input);
    }

    @Patch(":id")
    @ApiResponse({
        status: 200,
        description: "Time log updated successfully",
        type: ResponseTimeLogDto,
    })
    async updateTimeLog(@Body() input: UpdateTimeLogDto): Promise<ResponseTimeLogDto> {
        return this.updateTimeLogUseCase.execute(input);
    }

    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Time log deleted successfully",
    })
    async deleteTimeLog(@Param("id") id: keyof TimeLog): Promise<void> {
        return this.deleteTimeLogUseCase.execute(id);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: "Time logs retrieved successfully",
        type: [ResponseTimeLogDto],
    })
    async findAllTimeLogs(): Promise<ResponseTimeLogDto[]> {
        return this.findAllTimeLogsUseCase.execute();
    }

    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "Time log retrieved successfully",
        type: ResponseTimeLogDto,
    })
    async findTimeLogById(@Param("id") id: keyof TimeLog): Promise<ResponseTimeLogDto> {
        return this.findTimeLogByIdUseCase.execute(id);
    }


}
