import {
  CreateTimeLogDto,
  CreateTimeLogUseCase,
  DeleteTimeLogUseCase,
  FindTimeLogByIdUseCase,
  ResponseTimeLogDto,
  TimeLog,
  UpdateTimeLogDto,
  UpdateTimeLogUseCase,
  FindAllTimeLogUseCase,
} from '@my-task-timer/time-log-domain';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '@my-task-timer/shared-resource';

@Controller('time-logs')
@UseInterceptors(ClassSerializerInterceptor)
export class TimeLogController {
  constructor(
    private readonly createTimeLogUseCase: CreateTimeLogUseCase,
    private readonly updateTimeLogUseCase: UpdateTimeLogUseCase,
    private readonly deleteTimeLogUseCase: DeleteTimeLogUseCase,
    private readonly findAllTimeLogsUseCase: FindAllTimeLogUseCase,
    private readonly findTimeLogByIdUseCase: FindTimeLogByIdUseCase
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Time log created successfully',
    type: ResponseTimeLogDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async createTimeLog(
    @Body() input: CreateTimeLogDto
  ): Promise<ResponseTimeLogDto> {
    return this.createTimeLogUseCase.execute(input);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Time log updated successfully',
    type: ResponseTimeLogDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async updateTimeLog(
    @Body() input: UpdateTimeLogDto
  ): Promise<ResponseTimeLogDto> {
    return this.updateTimeLogUseCase.execute(input);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Time log deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async deleteTimeLog(@Param('id') id: keyof TimeLog): Promise<void> {
    return this.deleteTimeLogUseCase.execute(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Time logs retrieved successfully',
    type: [ResponseTimeLogDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async findAllTimeLogs(): Promise<ResponseTimeLogDto[]> {
    return this.findAllTimeLogsUseCase.execute();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Time log retrieved successfully',
    type: ResponseTimeLogDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async findTimeLogById(
    @Param('id') id: keyof TimeLog
  ): Promise<ResponseTimeLogDto> {
    return this.findTimeLogByIdUseCase.execute(id);
  }
}
