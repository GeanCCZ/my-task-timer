import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { taskSchema } from "./task.schema";
import { relations } from "drizzle-orm";

export const timeLogSchema = pgTable("time_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    startedAt: timestamp("started_at").notNull(),
    endedAt: timestamp("ended_at"),
    timeSpent: numeric("time_spent").notNull(),
    taskId: uuid("task_id")
        .notNull()
        .references(() => taskSchema.id, { onDelete: "cascade" }),
})

export const timeLogRelations = relations(timeLogSchema, ({ one }) => ({
    task: one(taskSchema, {
        fields: [timeLogSchema.taskId],
        references: [taskSchema.id],
    }),
}));