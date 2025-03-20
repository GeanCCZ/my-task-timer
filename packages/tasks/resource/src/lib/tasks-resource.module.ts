import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindAllTasksUseCase,
  FindTaskByIdUseCase,
  UpdateTaskUseCase,
} from '@my-task-timer/tasks-domain';
import { TaskRepository } from 'packages/tasks/domain/src/lib/repository/task.repository';
import { TaskRepositoryImpl } from '@my-task-timer/tasks-data-source';

@Module({
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
  ],
  exports: [TaskRepository],
})
export class TasksResourceModule {}
