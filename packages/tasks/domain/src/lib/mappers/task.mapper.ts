import { Mapper } from '@my-task-timer/shared-interfaces';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Task } from '../entities/task.entity';
import { ResponseTaskDto, CreateTaskDto, UpdateTaskDto } from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
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
