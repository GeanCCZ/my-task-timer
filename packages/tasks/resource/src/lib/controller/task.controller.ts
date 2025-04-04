import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindAllTasksUseCase,
  FindTaskByIdUseCase,
  ResponseTaskDto,
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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateTaskDto } from '../../../../domain/src/lib/dtos/create-task.dto';
import { UpdateTaskDto } from '../../../../domain/src/lib/dtos/update-task.dto';
import { AccessTokenGuard } from '@my-task-timer/shared-resource';
import { AuthenticatedRequest } from '@my-task-timer/shared-interfaces';

@Controller('tasks')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: ResponseTaskDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async createTask(
    @Req() req: AuthenticatedRequest,
    @Body() input: CreateTaskDto
  ) {
    const userId = req.user.userID;
    return await this.createTaskUseCase.execute({ userId, input });
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: ResponseTaskDto,
  })
  @ApiResponse({ status: 204, description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async updateTask(@Param('id') id: string, @Body() input: UpdateTaskDto) {
    return await this.updateTaskUseCase.execute({ id, input });
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiResponse({ status: 204, description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async deleteTask(@Param('id') id: string) {
    return await this.deleteTaskUseCase.execute(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'All tasks retrieved successfully',
    type: [ResponseTaskDto],
  })
  @ApiResponse({ status: 204, description: 'No tasks found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async findAllTasks(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userID;
    return await this.findAllTasksUseCase.execute(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: ResponseTaskDto,
  })
  @ApiResponse({ status: 204, description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBadGatewayResponse({ description: 'Bad gateway' })
  async findTaskById(@Param('id') id: string) {
    return await this.findTaskByIdUseCase.execute(id);
  }
}
