import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { ResponseTaskDto } from '../dtos/response.task.dto';

@Injectable()
export class FindAllTasksUseCase implements Usecase<CreateTaskDto, Task[]> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskMapper: TaskMapper
  ) {}

  async execute(): Promise<ResponseTaskDto[]> {
    const tasks: Task[] = await this.taskRepository.findAll();

    return tasks.map((task) => this.taskMapper.toResponse(task));
  }
}
