import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { TaskRepository } from '../repository/task.repository';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { TaskMapper } from '../mappers/task.mapper';
import { Task } from '../entities/task.entity';
import { ResponseTaskDto } from '../dtos/response.task.dto';

@Injectable()
export class CreateTaskUseCase
  implements Usecase<CreateTaskDto, ResponseTaskDto> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskMapper: TaskMapper
  ) { }

  async execute(input: CreateTaskDto): Promise<ResponseTaskDto> {

    const taskDomain: Task = this.taskMapper.toEntity(input) as unknown as Task;

    taskDomain.userId = input.user.id!;

    taskDomain.status = 'TODO';
    taskDomain.totalTimeSpent = '0';

    taskDomain.updatedAt = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
    );
    taskDomain.createdAt = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
    );

    const createdTask = await this.taskRepository.createOne(taskDomain as Task);
    return this.taskMapper.toResponse(createdTask);
  }
}
