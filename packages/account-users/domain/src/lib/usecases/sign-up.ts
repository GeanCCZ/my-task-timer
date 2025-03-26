import { Injectable, Inject } from '@nestjs/common';
import {
  CryptoServiceInterface,
  Usecase,
} from '@my-task-timer/shared-interfaces';
import { AccountRepository } from '../repository/account.repository';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignUpMapper } from '../mappers/sign-up.mapper';

@Injectable()
export class SignUpUseCase implements Usecase<SignUpDto, SignUpDto> {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly signUpMapper: SignUpMapper,
    @Inject('CryptoServiceInterface')
    private readonly cryptoService: CryptoServiceInterface
  ) {}

  async execute(input: SignUpDto): Promise<SignUpDto> {
    const hashedPassword = await this.cryptoService.hashPassword(
      input.password
    );

    const domainInput = { ...input, password: hashedPassword };

    const accountDomain = this.signUpMapper.toEntity(domainInput);
    const createdAccount = await this.accountRepository.createOne(
      accountDomain
    );
    return this.signUpMapper.toResponse(createdAccount);
  }
}
