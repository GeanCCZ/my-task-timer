import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';

@Injectable()
export class DeleteUseCase implements Usecase<string, string> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string): Promise<string> {
    return await this.accountRepository.deleteOne(id);
  }
}
