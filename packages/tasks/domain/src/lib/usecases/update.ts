import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { UpdateTaskDto, ResponseTaskDto } from '../dtos';
import { TaskMapper } from '../mappers/task.mapper';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repository/task.repository';
import { FindTaskByIdUseCase } from './findById';

@Injectable()
export class UpdateTaskUseCase
  implements Usecase<UpdateTaskDto, ResponseTaskDto>
{
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase
  ) {}

  async execute(input: UpdateTaskDto): Promise<ResponseTaskDto> {
    const findedTask = await this.findTaskByIdUseCase.execute(
      input.id as keyof Task
    );

    const taskDomain: Task = this.taskMapper.toEntity(input) as unknown as Task;

    const updatedTask = await this.taskRepository.updateOne(
      taskDomain.id as keyof Task,
      {
        ...findedTask,
        ...taskDomain,
        user: findedTask.user ?? taskDomain.user!,
      }
    );
    return this.taskMapper.toResponse(updatedTask);
  }
}
