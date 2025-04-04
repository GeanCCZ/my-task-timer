import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { Task, ResponseTaskDto, CreateTaskDto, TaskRepository, TaskMapper } from '@my-task-timer/tasks-domain';

@Injectable()
export class CreateTaskUseCase
  implements Usecase<CreateTaskDto, ResponseTaskDto> {
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository,
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
