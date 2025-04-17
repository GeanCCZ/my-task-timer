import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import {
  InternalServerError,
  NotFoundException,
  tryCatch,
} from '@my-task-timer/shared-utils-errors';

@Injectable()
export class DeleteUseCase implements Usecase<string, string> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string): Promise<string> {
    const { data, error } = await tryCatch(
      this.accountRepository.deleteOne(id)
    );

    if (error) {
      throw error?.message.includes('not found')
        ? new NotFoundException(`User with id ${id} does not exist`)
        : new InternalServerError(
            'An unexpected error occurred while deleting the user'
          );
    }

    return data;
  }
}
