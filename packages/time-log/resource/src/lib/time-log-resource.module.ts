import { Module } from '@nestjs/common';
import { CreateTimeLogUseCase, DeleteTimeLogUseCase, UpdateTimeLogUseCase } from '@my-task-timer/time-log-domain';
import { FindAllTasksUseCase, FindTaskByIdUseCase, TaskMapper, TaskRepository } from '@my-task-timer/tasks-domain';
import { TaskRepositoryImpl } from '@my-task-timer/tasks-data-source';

@Module({
  controllers: [],
  providers: [
    CreateTimeLogUseCase,
    UpdateTimeLogUseCase,
    DeleteTimeLogUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    TaskMapper,
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
  ],
  exports: [],
})
export class TimeLogResourceModule { }
