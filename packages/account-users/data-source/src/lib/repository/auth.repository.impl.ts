import { AuthRepository } from '@my-task-timer/account-users-domain';
import { DRIZZLE_PROVIDER, schema } from '@my-task-timer/shared-data-source';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createOne(input: any) {
    const [createUser] = await this.db.insert(schema.users).values(input).returning();
    return createUser;
  }
}
