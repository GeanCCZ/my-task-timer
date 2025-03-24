import { Account, AuthRepository } from '@my-task-timer/account-users-domain';
import { DRIZZLE_PROVIDER, schema } from '@my-task-timer/shared-data-source';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ilike, or, eq } from 'drizzle-orm';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createOne(input: Account): Promise<Account> {
    const { id, ...insertData } = input;
    const [createUser] = await this.db
      .insert(schema.users)
      .values(insertData)
      .returning();
    return createUser;
  }

  async findOne(id: string): Promise<Account> {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));

    return user;
  }

  async updateOne(id: string, input: Account): Promise<Account> {
    const [updateUser] = await this.db
      .update(schema.users)
      .set(input)
      .where(eq(schema.users.id, id))
      .returning();

    return updateUser;
  }

  async findByEmailOrUsername(
    email?: string,
    username?: string
  ): Promise<Account> {
    if (!email && !username) {
      throw new Error('Email already exists');
    }

    const conditions = [];

    if (email) {
      conditions.push(ilike(schema.users.email, email));
    }

    if (username) {
      conditions.push(ilike(schema.users.username, username));
    }

    return this.db.query.users.findFirst({
      where: or(...conditions),
    }) as Promise<Account>;
  }
}
