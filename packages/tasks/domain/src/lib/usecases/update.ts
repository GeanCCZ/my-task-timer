import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { TaskMapper, UpdateTaskDto, ResponseTaskDto, TaskRepository, FindTaskByIdUseCase, Task } from '@my-task-timer/tasks-domain';

@Injectable()
export class UpdateTaskUseCase
  implements Usecase<UpdateTaskDto, ResponseTaskDto> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly askMapper: TaskMapper
  ) { }

  async execute(input: UpdateTaskDto): Promise<ResponseTaskDto> {
    const findedTask = await this.findTaskByIdUseCase.execute(
      input.id as keyof Task
    );

    const taskDomain: Task = this.askMapper.toEntity(input) as unknown as Task;

    const updatedTask = await this.taskRepository.updateOne(
      taskDomain.id as keyof Task,
      {
        ...findedTask,
        ...taskDomain,
        user: findedTask.user ?? taskDomain.user!,
      }
    );
    return this.askMapper.toResponse(updatedTask);
  }
}
