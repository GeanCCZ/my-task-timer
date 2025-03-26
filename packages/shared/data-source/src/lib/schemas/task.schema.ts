import {
  pgTable,
  date,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { userSchema } from './user.schema';
import { relations } from 'drizzle-orm';
import { timeLogSchema } from './timeLog.schema';

const STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

const StatusValues = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE] as const;

export const taskSchema = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  status: text('status', { enum: StatusValues }).notNull(),
  dueDate: date('due_date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  totalTimeSpent: text('total_time_spent').notNull().default('0'),
  userId: uuid('user_id')
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
});

export const taskRelations = relations(taskSchema, ({ one, many }) => ({
  user: one(userSchema, {
    fields: [taskSchema.userId],
    references: [userSchema.id],
  }),
  timeLogs: many(timeLogSchema),
}));
