import { Mapper } from '@my-task-timer/shared-interfaces';
import { UserDto } from '../dtos/user.dto';
import { Account } from '../entities/account.entity';

export class UserMapper implements Mapper<UserDto, Account> {
  toDto(domain: Account): UserDto {
    return {
      email: domain.email,
      username: domain.username,
    };
  }

  toEntity(input: UserDto, existingAccount?:Account): Account {
    return {
      id: input.id,
      email: input.email,
      username: input.username,
      password: existingAccount?.password || '',
    };
  }
}
