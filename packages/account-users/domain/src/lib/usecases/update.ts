import { Usecase } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { AccountRepository } from '../repository/account.repository';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  InternalServerError,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';
import { Account } from '../entities/account.entity';

@Injectable()
export class UpdateUseCase
  implements Usecase<{ id: string; input: UserDto }, UserDto>
{
  constructor(
    private readonly accountRepository: AccountRepository,
    private userMapper: UserMapper
  ) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: UserDto;
  }): Promise<UserDto> {
    const existingUser = await this.findUserOrFail(id);

    const userInput = this.userMapper.toEntity(input, existingUser);

    const { data: updatedUser, error: updatedUserError } = await tryCatch(
      this.accountRepository.updateOne(id, userInput)
    );

    if (updatedUserError || !updatedUser)
      throw new InternalServerError('Something went wrong while updating user');

    return this.userMapper.toDto(updatedUser as Account);
  }

  private async findUserOrFail(id: string) {
    const { data: user, error: findError } = await tryCatch(
      this.accountRepository.findOne(id),
      (error) => new InternalServerError('Failed to fetch user: ' + error)
    );

    if (findError || !user)
      throw new NotFoundException(`Account with id ${id} not found`);

    return user;
  }
}
