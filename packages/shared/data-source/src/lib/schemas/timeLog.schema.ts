import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { taskSchema } from "./task.schema";
import { relations } from "drizzle-orm";

export const timeLogSchema = pgTable("time_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    startedAt: timestamp("started_at").notNull(),
    endedAt: timestamp("ended_at"),
    timeSpent: text("time_spent").notNull().default('0'),
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