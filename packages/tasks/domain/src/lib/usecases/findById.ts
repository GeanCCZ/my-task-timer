import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { ResponseTaskDto } from '../dtos';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class FindTaskByIdUseCase implements Usecase<string, ResponseTaskDto> {
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(id: string): Promise<ResponseTaskDto> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskMapper.toDto(task);
  }
}
