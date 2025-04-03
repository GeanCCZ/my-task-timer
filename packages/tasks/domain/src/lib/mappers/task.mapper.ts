import { Mapper, STATUS } from '@my-task-timer/shared-interfaces';
import { UpdateTaskDto, ResponseTaskDto, CreateTaskDto } from '../dtos';
import { Task } from '../entities/task.entity';

export class TaskMapper
  implements
    Mapper<CreateTaskDto | UpdateTaskDto | ResponseTaskDto, Partial<Task>>
{
  toEntity(input: CreateTaskDto | UpdateTaskDto): Partial<Task> {
    const entity: Partial<Task> = {};

    if (input instanceof CreateTaskDto) {
      entity.title = input.title;
      entity.dueDate = input.dueDate;
      entity.status = STATUS.TODO;
      entity.createdAt = new Date();
      entity.updatedAt = new Date();
    } else {
      if (input.title !== undefined) entity.title = input.title;
      if (input.dueDate !== undefined) entity.dueDate = input.dueDate;
      if (input.status !== undefined) entity.status = input.status;
      entity.updatedAt = new Date();
    }

    return entity;
  }

  toDto(domain: Task): ResponseTaskDto {
    const dto = new ResponseTaskDto();
    dto.id = domain.id;
    dto.title = domain.title;
    dto.status = domain.status;
    dto.dueDate = domain.dueDate;
    return dto;
  }
}
