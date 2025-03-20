import { Injectable } from "@nestjs/common";
import { Usecase } from "@my-task-timer/shared-interfaces";
import { TaskRepository } from "../repository/task.repository";
import { CreateTaskDto } from "../dtos/create.task.dto";
import { TaskMapper } from "../mappers/task.mapper";

@Injectable()
export class CreateTaskUseCase implements Usecase<CreateTaskDto, CreateTaskDto> {
    constructor(private readonly taskRepository: TaskRepository,
        private readonly taskMapper: TaskMapper
    ) { }

    async execute(input: CreateTaskDto): Promise<CreateTaskDto> {
        const taskDomain = this.taskMapper.toDomain(input);
        const createdTask = await this.taskRepository.createOne(taskDomain);
        return this.taskMapper.toResponse(createdTask);
    }
}
