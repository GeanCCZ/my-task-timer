import { Test, TestingModule } from '@nestjs/testing';
import { FindOneUseCase } from './find-by-id';
import { UserMapper } from '../mappers/user.mapper';
import { AccountRepository } from '../repository/account.repository';
import {
  NotFoundException,
  InternalServerError,
} from '@my-task-timer/shared-utils-errors';
import { randomUUID } from 'crypto';
import { UserDto } from '../dtos/user.dto';

describe('FindByIdUseCase', () => {
  let findByIdUseCase: FindOneUseCase;
  let accountRepository: AccountRepository;
  let userMapper: UserMapper;

  beforeEach(async () => {
    const mockAccountRepository = {
      findOne: jest.fn(),
    };
    const mockUserMapper = {
      toDto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUseCase,
        {
          provide: AccountRepository,
          useValue: mockAccountRepository,
        },
        {
          provide: UserMapper,
          useValue: mockUserMapper,
        },
      ],
    }).compile();

    findByIdUseCase = module.get<FindOneUseCase>(FindOneUseCase);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    userMapper = module.get<UserMapper>(UserMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findByIdUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should find an account by id successfully', async () => {
      const userId = randomUUID();
      const mockUser = {
        id: userId,
        username: 'test',
        email: 'test@test.com',
        password: 'pass123456',
      };
      const mockUserDto: UserDto = {
        id: userId,
        username: 'test',
        email: 'test@test.com',
      };
      const findSpy = jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(mockUser);
      const toDtoSpy = jest
        .spyOn(userMapper, 'toDto')
        .mockReturnValueOnce(mockUserDto);

      const result = await findByIdUseCase.execute(userId);

      expect(result).toEqual(mockUserDto);
      expect(findSpy).toHaveBeenCalledWith(userId);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(toDtoSpy).toHaveBeenCalledWith(mockUser);
      expect(toDtoSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when account was not found', async () => {
      const userId = randomUUID();

      jest
        .spyOn(accountRepository, 'findOne')
        .mockRejectedValueOnce(
          new Error(`User with id ${userId} not found`)
        );

      await expect(findByIdUseCase.execute(userId)).rejects.toThrow(
        NotFoundException
      );

      expect(accountRepository.findOne).toHaveBeenCalledWith(userId);
    });

    it('should throw InternalServerError for unexpected error', async () => {
      const userId = randomUUID();

      jest
        .spyOn(accountRepository, 'findOne')
        .mockRejectedValueOnce(
          new Error('An unexpected error occurred while retrieving the user')
        );

      await expect(findByIdUseCase.execute(userId)).rejects.toThrow(
        InternalServerError
      );

      expect(accountRepository.findOne).toHaveBeenCalledWith(userId);
    });
  });
});
