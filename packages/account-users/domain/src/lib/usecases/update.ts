import { Usecase } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { AccountRepository } from '../repository/account.repository';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { tryCatch } from '@my-task-timer/shared-utils-errors';
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

    id = "test-error"
    if (id === "test-error") {
      throw new InternalServerErrorException("Erro forçado no use case");
    }

    const userInput = this.userMapper.toEntity(input);

    const { data: updatedUser, error } = await tryCatch(
      this.accountRepository.updateOne(id, userInput)
    );

    if (error) {
      throw new InternalServerErrorException(
        'Something went wrong while updating user'
      );
    }

    return this.userMapper.toDto(updatedUser as Account);
  }
}
