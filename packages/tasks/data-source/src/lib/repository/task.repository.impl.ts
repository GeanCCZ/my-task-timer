import { DRIZZLE_PROVIDER, schema } from '@my-task-timer/shared-data-source';
import { Task, TaskRepository } from '@my-task-timer/tasks-domain';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createOne(input: Task) {
    const { id, ...insertData } = input;
    const [createTask] = await this.db
      .insert(schema.tasks)
      .values([insertData])
      .returning();
    return createTask;
  }

  async updateOne(taskId: keyof Task, input: Task) {
    const { id, ...updateData } = input;
    const [updateTask] = await this.db
      .update(schema.tasks)
      .set(updateData)
      .where(eq(schema.tasks.id, id))
      .returning();
    return updateTask;
  }

  async deleteOne(id: keyof Task) {
    const [deleteTask] = await this.db
      .delete(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .returning();
    return deleteTask;
  }

  async findOne(id: keyof Task) {
    const [findOneTask] = await this.db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id));
    return findOneTask;
  }

  async findAll() {
    const tasks = await this.db.select().from(schema.tasks);
    return tasks.map((task) => task);
  }
}
