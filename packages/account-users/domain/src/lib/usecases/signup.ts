import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { AuthRepository } from '../repository/auth.repository';
import { AccountDto } from '../dtos/account.dto';
import { SignupMapper } from '../mappers/signup.mapper';

@Injectable()
export class SignupUseCase implements Usecase<AccountDto, AccountDto> {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signUpMapper: SignupMapper
  ) {}

  async execute(input: AccountDto): Promise<AccountDto> {
    const accountDomain = this.signUpMapper.toDomain(input);
    const createdAccount = await this.authRepository.createOne(accountDomain);
    return this.signUpMapper.toResponse(createdAccount);
  }
}
