import { taskSchema } from "./task.schema";
import { userSchema } from "./user.schema";

export const schema = {
  tasks: taskSchema,
  users: userSchema,
} as const;

export type DatabaseSchema = typeof schema;