import { Account } from '../entities/account.entity';
import { Mapper } from '@my-task-timer/shared-interfaces';
import { AccountDto } from '../dtos/account.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class SignupMapper implements Mapper<AccountDto, Account> {
  toDomain(input: AccountDto): Account {
    return {
      email: input.email,
      username: input.username,
      password: input.password,
    };
  }

  toPersistence(domain: Account): AccountDto {
    return {
      id: domain.id,
      email: domain.email,
      username: domain.username,
      password: domain.password,
    };
  }

  toResponse(domain: Account): AccountDto {
    const accountInstance = plainToInstance(AccountDto, domain);
    return instanceToPlain(accountInstance) as AccountDto;
  }
}
