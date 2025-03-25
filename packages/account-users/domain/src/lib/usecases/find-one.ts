import { Usecase } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { AccountRepository } from '../repository/account.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class FindOneUseCase implements Usecase<string, UserDto> {
  constructor(
    private readonly authRepository: AccountRepository,
    private readonly userMapper: UserMapper
  ) {}

  async execute(id: string): Promise<UserDto> {
    const userDomain = await this.authRepository.findOne(id);

    return this.userMapper.toDto(userDomain);
  }
}
