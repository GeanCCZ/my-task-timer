import { beforeEach, describe } from "node:test";
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTaskUseCase } from "./delete";
import { TaskRepository } from "../repository/task.repository";

describe(`"Delete Task Use Case"`, () => {

    let deleteTaskUseCase: DeleteTaskUseCase;
    let taskRepository: TaskRepository

    const mockUser = {
        id: 'user-id-123',
        email: 'test@test.com',
        username: 'testuser',
        password: 'hashed-password',
    }

    const mockTask = {
        id: 'task-id-123',
        title: 'Test Task',
        status: 'IN_PROGRESS',
        dueDate: '2023-10-01 T00:00:00Z',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: mockUser.id,
    }

    beforeEach(async () => {
        const mockTaskRepository = {
            findOne: jest.fn(),
            deleteOne: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTaskUseCase,
                {
                    provide: TaskRepository,
                    useValue: mockTaskRepository,
                },
            ],
        }).compile();

        deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
        taskRepository = module.get<TaskRepository>(TaskRepository);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('execute', () => {
        it('should delete a task successfully', async () => {
            const id = 'task-id-123';

            jest.spyOn(taskRepository, 'deleteOne').mockResolvedValue(id);

            const result = await deleteTaskUseCase.execute(id);

            expect(result).toEqual(id);
            expect(taskRepository.deleteOne).toHaveBeenCalledWith(id);
        })

        it('should throw NotFoundException if task does not exist', async () => {
            const id = 'task-id-123';

            jest.spyOn(taskRepository, 'deleteOne').mockRejectedValue(new Error('not found'));

            await expect(deleteTaskUseCase.execute(id)).rejects.toThrowError(
                new Error(`Task with id ${id} does not exist`)
            );
        })

        it('should throw InternalServerError if an unexpected error occurs', async () => {
            const id = 'task-id-123';

            jest.spyOn(taskRepository, 'deleteOne').mockRejectedValue(new Error('unexpected error'));

            await expect(deleteTaskUseCase.execute(id)).rejects.toThrowError(
                new Error('An unexpected error occurred while deleting the task')
            );
        })
    })

})