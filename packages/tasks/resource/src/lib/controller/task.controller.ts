import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindAllTasksUseCase,
  FindTaskByIdUseCase,
  Task,
  UpdateTaskUseCase,
} from '@my-task-timer/tasks-domain';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateTaskDto } from 'packages/tasks/domain/src/lib/dtos/create.task.dto';
import { UpdateTaskDto } from 'packages/tasks/domain/src/lib/dtos/update.task.dto';

@Controller('tasks')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) { }

  @Post()
  async createTask(@Body() input: CreateTaskDto) {
    return await this.createTaskUseCase.execute(input);
  }

  @Patch(':id')
  async updateTask(@Body() input: UpdateTaskDto) {
    return await this.updateTaskUseCase.execute(input);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: keyof Task) {
    return await this.deleteTaskUseCase.execute(id);
  }

  async findAllTasks() {
    return await this.findAllTasksUseCase.execute();
  }

  async findTaskById(@Param('id') id: keyof Task) {
    return await this.findTaskByIdUseCase.execute(id);
  }
}
