import { Mapper } from "@my-task-timer/shared-interfaces";
import { CreateTaskDto } from "../dtos/create.task.dto";
import { Task } from "../entities/task.entity";
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class TaskMapper implements Mapper<CreateTaskDto, Task> {

    toDomain(input: CreateTaskDto): Task {
        return {
            id: input.id,
            title: input.title,
        }
    }

    toPersistence(domain: Task): CreateTaskDto {
        return {
            id: domain.id,
            title: domain.title,
            dueDate: domain.dueDate,
        }
    }

    toResponse(domain: Task): CreateTaskDto {
        const taskInstance = plainToInstance(CreateTaskDto, domain);
        return instanceToPlain(taskInstance) as CreateTaskDto;
    }

}
