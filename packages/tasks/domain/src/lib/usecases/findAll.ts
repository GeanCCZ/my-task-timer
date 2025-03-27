import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '@my-task-timer/tasks-domain';
import { ResponseTaskDto } from '../dtos/response.task.dto';

@Injectable()
export class FindAllTasksUseCase implements Usecase<CreateTaskDto, Task[]> {
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository,
  ) { }

  async execute(): Promise<ResponseTaskDto[]> {
    const tasks: Task[] = await this.taskRepository.findAll();

    return tasks.map((task) => this.taskMapper.toResponse(task));
  }
}
