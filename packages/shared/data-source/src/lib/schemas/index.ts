import { taskSchema } from "./task.schema";
import { timeLogSchema } from "./timeLog.schema";
import { userSchema } from "./user.schema";

export const schema = {
  tasks: taskSchema,
  users: userSchema,
  timeLogs: timeLogSchema
} as const;

export type DatabaseSchema = typeof schema;