import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindAllTasksUseCase,
  FindTaskByIdUseCase,
  ResponseTaskDto,
  Task,
  UpdateTaskUseCase,
} from '@my-task-timer/tasks-domain';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

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
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: ResponseTaskDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async createTask(@Body() input: CreateTaskDto) {
    return await this.createTaskUseCase.execute(input);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: ResponseTaskDto,
  })
  @ApiResponse({ status: 204, description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async updateTask(@Body() input: UpdateTaskDto) {
    return await this.updateTaskUseCase.execute(input);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiResponse({ status: 204, description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async deleteTask(@Param('id') id: keyof Task) {
    return await this.deleteTaskUseCase.execute(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All tasks retrieved successfully',
    type: [ResponseTaskDto],
  })
  @ApiResponse({ status: 204, description: 'No tasks found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async findAllTasks() {
    return await this.findAllTasksUseCase.execute();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: ResponseTaskDto,
  })
  @ApiResponse({ status: 204, description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async findTaskById(@Param('id') id: keyof Task) {
    return await this.findTaskByIdUseCase.execute(id);
  }
}
