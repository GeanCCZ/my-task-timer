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

    const { data: createdAccount, error: createdAccountError } = await tryCatch(
      this.accountRepository.createOne(accountDomain)
    );

    if (!createdAccount || createdAccountError) {
      throw new InternalServerError(
        'Something went wrong trying to create account'
      );
    }
    return this.signUpMapper.toResponse(createdAccount as Account);
  }
}
