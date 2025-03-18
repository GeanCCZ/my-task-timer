import { Account } from '../entities/account.entity';
import { Mapper } from '@my-task-timer/shared-interfaces';
import { SignUpDto } from '../dtos/sign-up.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class SignUpMapper implements Mapper<SignUpDto, Account> {
  toDomain(input: SignUpDto): Account {
    return {
      email: input.email,
      username: input.username,
      password: input.password,
    };
  }

  toPersistence(domain: Account): SignUpDto {
    return {
      id: domain.id,
      email: domain.email,
      username: domain.username,
      password: domain.password,
    };
  }

  toResponse(domain: Account): SignUpDto {
    const accountInstance = plainToInstance(SignUpDto, domain);
    return instanceToPlain(accountInstance) as SignUpDto;
  }
}
