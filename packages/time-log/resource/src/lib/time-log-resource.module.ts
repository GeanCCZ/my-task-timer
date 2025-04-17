import { Module } from '@nestjs/common';
import { CreateTimeLogUseCase, DeleteTimeLogUseCase, FindAllTimeLogUseCase, FindTimeLogByIdUseCase, TimeLogMapper, TimeLogRepository, UpdateTimeLogUseCase } from '@my-task-timer/time-log-domain';
import { TimeLogRepositoryImpl } from '@my-task-timer/time-log-data-source';
import { TimeLogController } from './controller/time-log.controller';

@Module({
  controllers: [TimeLogController],
  providers: [
    CreateTimeLogUseCase,
    UpdateTimeLogUseCase,
    DeleteTimeLogUseCase,
    FindAllTimeLogUseCase,
    FindTimeLogByIdUseCase,
    TimeLogMapper,
    { provide: TimeLogRepository, useClass: TimeLogRepositoryImpl },
  ],
  exports: [],
})
export class TimeLogResourceModule { }
