import { pgTable, date, numeric, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";
import { relations } from "drizzle-orm";

const STATUS = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
} as const;

const StatusValues = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE] as const;

export const taskSchema = pgTable("tasks", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    status: text("status", { enum: StatusValues }).notNull(),
    dueDate: date("due_date").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    totalTimeSpent: numeric("total_time_spent").notNull(),
    timerStartedAt: timestamp("timer_started_at"),
    userId: uuid("user_id")
        .notNull()
        .references(() => userSchema.id, { onDelete: "cascade" }),
});

export const taskRelations = relations(taskSchema, ({ one }) => ({
    user: one(userSchema, {
        fields: [taskSchema.userId],
        references: [userSchema.id],
    }),
}));
