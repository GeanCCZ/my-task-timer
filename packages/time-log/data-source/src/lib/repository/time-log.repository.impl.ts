import { DRIZZLE_PROVIDER, schema } from '@my-task-timer/shared-data-source';
import { TimeLog, TimeLogRepository } from '@my-task-timer/time-log-domain';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class TimeLogRepositoryImpl implements TimeLogRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createOne(input: TimeLog): Promise<TimeLog> {
    const { id, ...insertData } = input;
    const [createTimeLog]: TimeLog[] = await this.db
      .insert(schema.timeLogs)
      .values([insertData])
      .returning();
    return createTimeLog;
  }

  async updateOne(id: string, input: TimeLog): Promise<TimeLog> {
    const [updateTimeLog] = await this.db
      .update(schema.timeLogs)
      .set(input)
      .where(eq(schema.timeLogs.id, id))
      .returning();

    return updateTimeLog;
  }

  async deleteOne(id: string) {
    await this.db
      .delete(schema.timeLogs)
      .where(eq(schema.timeLogs.id, id))
      .execute();
    return 'Time removed successfully.';
  }

  async findOne(id: keyof TimeLog): Promise<TimeLog> {
    const [findOneTimeLog] = await this.db
      .select()
      .from(schema.timeLogs)
      .where(eq(schema.timeLogs.id, id));
    return findOneTimeLog;
  }

  async findAll(): Promise<TimeLog[]> {
    return this.db.select().from(schema.timeLogs);
  }
}
