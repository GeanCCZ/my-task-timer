import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { ResponseTaskDto } from '../dtos';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class FindAllTasksUseCase implements Usecase<void, ResponseTaskDto[]> {
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(): Promise<ResponseTaskDto[]> {
    const tasks: Task[] = await this.taskRepository.findAll();

    return tasks.map((task) => this.taskMapper.toDto(task));
  }
}
