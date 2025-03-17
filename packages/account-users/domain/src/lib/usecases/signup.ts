import { Usecase } from '@my-task-timer/shared-interfaces';
import { AuthRepository } from '../repository/auth.repository';

export class SignupUseCase implements Usecase<any, any> {
  constructor(private readonly authrepository: AuthRepository) {}

  async execute(input: any): Promise<any> {
    const created = await this.authrepository.createOne(input);
    return created;
  }
}
