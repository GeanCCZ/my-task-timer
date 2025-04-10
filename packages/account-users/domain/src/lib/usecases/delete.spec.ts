import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUseCase } from './delete';
import { AccountRepository } from '../repository/account.repository';
import {
  NotFoundException,
  InternalServerError,
} from '@my-task-timer/shared-utils-errors';
import { randomUUID } from 'crypto';

describe('DeleteUseCase', () => {
  let deleteUseCase: DeleteUseCase;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const mockAccountRepository = {
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUseCase,
        {
          provide: AccountRepository,
          useValue: mockAccountRepository,
        },
      ],
    }).compile();

    deleteUseCase = module.get<DeleteUseCase>(DeleteUseCase);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should delete an account successfully', async () => {
      const userId = randomUUID();
      const successMessage = 'User removed successfully';
      jest
        .spyOn(accountRepository, 'deleteOne')
        .mockResolvedValueOnce(successMessage);

      const result = await deleteUseCase.execute(userId);

      expect(result).toBe(successMessage);
      expect(accountRepository.deleteOne).toHaveBeenCalledWith(userId);
      expect(accountRepository.deleteOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when account does not exist', async () => {
      const userId = randomUUID();
      jest
        .spyOn(accountRepository, 'deleteOne')
        .mockRejectedValueOnce(new Error('Account with id 123 not found'));

      await expect(deleteUseCase.execute(userId)).rejects.toThrow(
        NotFoundException
      );
      expect(accountRepository.deleteOne).toHaveBeenCalledWith(userId);
    });

    it('should throw InternalServerError for unexpected errors', async () => {
      const userId = randomUUID();
      jest
        .spyOn(accountRepository, 'deleteOne')
        .mockRejectedValueOnce(new Error('Database connection failed'));

      await expect(deleteUseCase.execute(userId)).rejects.toThrow(
        InternalServerError
      );
      expect(accountRepository.deleteOne).toHaveBeenCalledWith(userId);
    });
  });
});
