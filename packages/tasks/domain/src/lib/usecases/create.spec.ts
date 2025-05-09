
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from './create';
import { Task } from '../entities/task.entity';
import { STATUS } from '@my-task-timer/shared-interfaces';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '../mappers/task.mapper';


describe('Create Task Use Case', () => {
    let createTaskUseCase: CreateTaskUseCase;
    let taskMapper: TaskMapper;
    let taskRepository: TaskRepository;

    const mockUser = {
        id: 'user-id-123',
        email: 'test@test.com',
        username: 'testuser',
        password: 'hashed-password',
    };

    const mockTask = {
        id: 'task-id-123',
        title: 'Test Task',
        status: 'IN_PROGRESS',
        dueDate: '2023-10-01T00:00:00Z',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: mockUser.id,
    };

    beforeEach(async () => {

        const mockTaskRepository: TaskRepository = {
            createOne: jest.fn(),
            findOne: jest.fn(),
            findAllById: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        };

        const mockTaskMapper: TaskMapper = {
            toEntity: jest.fn(),
            toDto: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: TaskMapper,
                useValue: mockTaskMapper,
            },
            {
                provide: TaskRepository,
                useValue: mockTaskRepository,
            },
                CreateTaskUseCase,
            ],
        }).compile();

        createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
        taskRepository = module.get<TaskRepository>(TaskRepository);
        taskMapper = module.get<TaskMapper>(TaskMapper);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('execute', () => {
        it('should create a task successfully', async () => {
            const input = {
                title: 'Test Task',
                status: STATUS.TODO,
                dueDate: '2023-10-01T00:00:00Z',
            };

            const expectedTask: Task = {
                ...mockTask,
                ...input,
            };

            taskRepository.createOne = jest.fn().mockResolvedValue(expectedTask);

            const result = await createTaskUseCase.execute({
                userId: mockUser.id,
                input,
            });

            expect(result).toEqual(expectedTask);
            expect(taskRepository.createOne).toHaveBeenCalledWith({
                ...input,
                userId: mockUser.id,
            });
        });
    });
});