import { Usecase } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { AuthRepository } from '../repository/auth.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class FindOneUseCase implements Usecase<string, UserDto> {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userMapper: UserMapper
  ) {}

  async execute(id: string): Promise<UserDto> {
    const userDomain = await this.authRepository.findOne(id);

    return this.userMapper.toDto(userDomain);
  }
}
