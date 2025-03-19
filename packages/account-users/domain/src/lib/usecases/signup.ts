import { Injectable } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class SignupUseCase implements Usecase<any, any> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: any): Promise<any> {
    return await this.authRepository.createOne(input);
  }
}
