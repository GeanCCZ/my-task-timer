import { Mapper } from '@my-task-timer/shared-interfaces';
import { CreateTaskDto } from '../dtos/create.task.dto';
import { Task } from '../entities/task.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UpdateTaskDto } from '../dtos/update.task.dto';
import { ResponseTaskDto } from '../dtos/response.task.dto';

export class TaskMapper implements Mapper<CreateTaskDto, any> {
  toEntity(input: CreateTaskDto | UpdateTaskDto) {
    if (input instanceof UpdateTaskDto) {
      return {
        id: input.id,
        title: input.title,
        dueDate: input.dueDate,
      };
    }
    return {
      title: input.title,
      dueDate: input.dueDate,
    };
  }

  toDto(domain: Task): CreateTaskDto {
    return {
      title: domain.title,
      dueDate: domain.dueDate,
      user: domain.user!,
    };
  }

  toResponse(domain: Task): ResponseTaskDto {
    const taskInstance = plainToInstance(CreateTaskDto, domain);
    return instanceToPlain(taskInstance) as ResponseTaskDto;
  }
}
