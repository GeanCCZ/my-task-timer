import { Create } from '@my-task-timer/shared-interfaces';
import { Account } from '../entities/account.entity';

export abstract class AuthRepository implements Create<Account, Account> {
  abstract createOne(input: Account): Promise<Account>;

  abstract findByEmailOrUsername(
    email?: string,
    username?: string
  ): Promise<Account>;
}
