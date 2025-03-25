import { Usecase } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { AccountRepository } from '../repository/account.repository';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUseCase
  implements Usecase<{ id: string; input: UserDto }, UserDto>
{
  constructor(
    private readonly authRepository: AccountRepository,
    private userMapper: UserMapper
  ) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: UserDto;
  }): Promise<UserDto> {
    const userInput = this.userMapper.toEntity(input);

    const updatedUser = await this.authRepository.updateOne(id, userInput);

    return this.userMapper.toDto(updatedUser);
  }
}
