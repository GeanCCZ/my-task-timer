import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { Task } from '../entities/task.entity';
import { ResponseTaskDto } from '../dtos/response.task.dto';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class FindTaskByIdUseCase implements Usecase<keyof Task, ResponseTaskDto> {
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository,
  ) { }

  async execute(input: keyof Task): Promise<ResponseTaskDto> {
    const task = await this.taskRepository.findOne(input);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskMapper.toResponse(task);
  }
}
