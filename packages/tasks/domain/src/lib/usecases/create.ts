import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { TaskMapper} from '../mappers/task.mapper';
import { TaskRepository } from '../repository/task.repository';
import { Task } from '../entities/task.entity';
import { ResponseTaskDto, CreateTaskDto } from '../dtos';

@Injectable()
export class CreateTaskUseCase
  implements Usecase<CreateTaskDto, ResponseTaskDto>
{
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository
  ) {}

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
