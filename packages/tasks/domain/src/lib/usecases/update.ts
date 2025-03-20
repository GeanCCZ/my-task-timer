import { Injectable } from "@nestjs/common";
import { Usecase } from "@my-task-timer/shared-interfaces";
import { UpdateTaskDto } from "../dtos/update.task.dti";
import { TaskMapper } from "../mappers/task.mapper";
import { TaskRepository } from "../repository/task.repository";

@Injectable()
export class UpdateTaskUseCase implements Usecase<UpdateTaskDto, UpdateTaskDto> {
    constructor(private readonly taskRepository: TaskRepository,
        private readonly askMapper: TaskMapper
    ) { }

    async execute(input: UpdateTaskDto): Promise<UpdateTaskDto> {
        const taskDomain = this.askMapper.toDomain(input);
        const updatedTask = await this.taskRepository.updateOne(taskDomain.id as keyof Task, taskDomain);
        return this.askMapper.toResponse(updatedTask);
    }
}

