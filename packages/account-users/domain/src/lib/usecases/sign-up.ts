import { Injectable, Inject } from '@nestjs/common';
import {
  CryptoServiceInterface,
  Usecase,
} from '@my-task-timer/shared-interfaces';
import { AccountRepository } from '../repository/account.repository';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignUpMapper } from '../mappers/sign-up.mapper';
import {
  InternalServerError,
  ConflictException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';
import { Account } from '../entities/account.entity';

@Injectable()
export class SignUpUseCase implements Usecase<SignUpDto, SignUpDto> {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly signUpMapper: SignUpMapper,
    @Inject('CryptoServiceInterface')
    private readonly cryptoService: CryptoServiceInterface
  ) {}

  async execute(input: SignUpDto): Promise<SignUpDto> {
    const { data: hashedPassword, error: hashedError } = await tryCatch(
      this.cryptoService.hashPassword(input.password)
    );

    if (!hashedPassword || hashedError) {
      throw new InternalServerError(
        'Something went wrong trying to hash password'
      );
    }

    const domainInput = { ...input, password: hashedPassword as string };

    const accountDomain = this.signUpMapper.toEntity(domainInput);

    return this.createAccount(accountDomain);
  }

  private async createAccount(account: Account): Promise<Account> {
    const { data: createdAccount, error: createdAccountError } = await tryCatch(
      this.accountRepository.createOne(account),
      (e) => this.normalizeRepositoryError(e)
    );

    if (!createdAccount || createdAccountError) {
      throw new InternalServerError(
        'Something went wrong trying to create account'
      );
    }
    return this.signUpMapper.toResponse(createdAccount as Account);
  }

  private normalizeRepositoryError(error: unknown) {
    if (this.isDuplicateEmailError(error))
      throw new ConflictException('Email already exists');

    throw new InternalServerError(
      'Failed to create account: ACCOUNT_REPOSITORY_ERROR'
    );
  }

  private isDuplicateEmailError(error: any): boolean {
    return (
      error?.code === '23505' || // PostgreSQL duplicate key
      error?.status === 409
    );
  }
}
