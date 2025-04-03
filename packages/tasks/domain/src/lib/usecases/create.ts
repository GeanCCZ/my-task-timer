import { Inject, Injectable } from '@nestjs/common';
import { STATUS, Usecase } from '@my-task-timer/shared-interfaces';
import { Task } from '../entities/task.entity';
import { ResponseTaskDto, CreateTaskDto } from '../dtos';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskRepository } from '../repository/task.repository';
import {
  InternalServerError,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class CreateTaskUseCase
  implements Usecase<CreateTaskDto, ResponseTaskDto>
{
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository
  ) {}

  async execute({
    userId,
    input,
  }: {
    userId: string;
    input: CreateTaskDto;
  }): Promise<ResponseTaskDto> {
    const taskDomain = this.createTaskDomain(input);

    const { data: createdTask, error } = await tryCatch(
      this.taskRepository.createOne(taskDomain)
    );

    if (error) throw new InternalServerError('Task creation failed');

    return this.taskMapper.toDto(createdTask);
  }

  private createTaskDomain(input: CreateTaskDto) {
    const now = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
    );

    return {
      ...this.taskMapper.toEntity(input),
      userId: input.user.id,
      status: STATUS.TODO,
      totalTimeSpent: '0',
      createdAt: now,
      updatedAt: now,
    } as Task;
  }
}
