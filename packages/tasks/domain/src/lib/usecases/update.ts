import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskRepository } from '../repository/task.repository';
import { Task } from '../entities/task.entity';
import { FindTaskByIdUseCase } from './findById';
import { ResponseTaskDto } from '../dtos/response.task.dto';

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
