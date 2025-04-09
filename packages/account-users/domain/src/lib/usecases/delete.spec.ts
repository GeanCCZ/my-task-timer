import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUseCase } from './delete';
import { AccountRepository } from '../repository/account.repository';
import { AccountRepositoryMock } from '@my-task-timer/account-users-data-source';

describe('DeleteUseCase', () => {
  let deleteUseCase: DeleteUseCase;
  let accountRepositoryMock: AccountRepository;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteUseCase,
        {
          provide: AccountRepository,
          useClass: AccountRepositoryMock,
        },
      ],
    }).compile();

    deleteUseCase = module.get<DeleteUseCase>(DeleteUseCase);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });


});
