import { Mapper, STATUS } from '@my-task-timer/shared-interfaces';
import { UpdateTaskDto, ResponseTaskDto, CreateTaskDto } from '../dtos';
import { Task } from '../entities/task.entity';

export class TaskMapper
  implements Mapper<CreateTaskDto | UpdateTaskDto | ResponseTaskDto, Task>
{
  toEntity(input: CreateTaskDto | UpdateTaskDto): Task {
    const baseEntity: Partial<Task> = {
      title: input.title as string,
      dueDate: input.dueDate,
    };

    if (input instanceof UpdateTaskDto) {
      return {
        ...baseEntity,
        id: input.id,
        updatedAt: new Date(),
      } as Task;
    }
    return {
      ...baseEntity,
      userId: input.user.id,
      status: STATUS.TODO,
      totalTimeSpent: '00:00:00',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Task;
  }

  toDto(domain: Task): ResponseTaskDto {
    return {
      id: domain.id,
      title: domain.title,
      status: domain.status,
      dueDate: domain.dueDate.toString().split('T')[0], // Formata para YYYY-MM-DD
      totalTimeSpent: domain.totalTimeSpent,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
