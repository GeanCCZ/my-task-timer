import { Usecase } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { AccountRepository } from '../repository/account.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import {
  InternalServerError,
  NotFoundException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class FindOneUseCase implements Usecase<string, UserDto> {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userMapper: UserMapper
  ) {}

  async execute(id: string): Promise<UserDto> {
    const { data, error } = await tryCatch(this.accountRepository.findOne(id));

    if (error || !data) {
      throw error?.message.includes('not found')
        ? new NotFoundException(`User with id ${id} does not exist`)
        : new InternalServerError(
            'An unexpected error occurred while retrieving the user'
          );
    }

    return this.userMapper.toDto(data);
  }
}
