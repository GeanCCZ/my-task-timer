import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { AuthRepository } from '../repository/auth.repository';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignUpMapper } from '../mappers/sign-up.mapper';

@Injectable()
export class SignupUseCase implements Usecase<SignUpDto, SignUpDto> {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signUpMapper: SignUpMapper
  ) {}

  async execute(input: SignUpDto): Promise<SignUpDto> {
    const accountDomain = this.signUpMapper.toDomain(input);
    const createdAccount = await this.authRepository.createOne(accountDomain);
    return this.signUpMapper.toResponse(createdAccount);
  }
}
