import { Usecase } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { AuthRepository } from '../repository/auth.repository';

export class FindOneUseCase implements Usecase<string, UserDto> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: string): Promise<UserDto> {
    return await this.authRepository.findOne(input);
  }
}
