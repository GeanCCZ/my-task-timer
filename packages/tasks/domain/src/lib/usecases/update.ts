import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { UpdateTaskDto, ResponseTaskDto } from '../dtos';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskRepository } from '../repository/task.repository';
import { FindTaskByIdUseCase } from './findById';
import {
  InternalServerError,
  NotFoundException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class UpdateTaskUseCase
  implements Usecase<{ id: string; input: UpdateTaskDto }, ResponseTaskDto>
{
  constructor(
    @Inject('TaskMapper') private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase
  ) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: UpdateTaskDto;
  }): Promise<ResponseTaskDto> {
    const { data: existingTask, error: findError } = await tryCatch(
      this.findTaskByIdUseCase.execute(id)
    );

    if (findError) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const updateData = this.taskMapper.toEntity(input);

    const mergeTask = {
      ...existingTask,
      ...updateData,
      updatedAt: new Date(),
    };

    const { data: updateTask, error: updateError } = await tryCatch(
      this.taskRepository.updateOne(id, mergeTask)
    );

    if (updateError) {
      throw new InternalServerError('Something went wrong while updating task');
    }
    return this.taskMapper.toDto(updateTask);
  }
}
