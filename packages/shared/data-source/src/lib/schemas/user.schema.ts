import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { taskSchema } from "./task.schema";
import { relations } from "drizzle-orm";

export const userSchema = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  tasks: many(taskSchema),
}));
