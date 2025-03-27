import { z } from 'zod';
import * as process from 'node:process';

const BaseEnvironmentSchema = z.object({
  production: z.boolean(),
  password_pepper: z.string(),
  port: z.number().int().positive(),
  database: z.object({
    host: z.string(),
    port: z.number().int().positive(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
    databaseUrl: z.string().url(),
  }),
});

const DevEnvironmentSchema = BaseEnvironmentSchema.extend({
  production: z.literal(false),
  password_pepper: z.string(),
  port: z.coerce.number().int().positive().default(3000),
  database: z.object({
    host: z.string().default('localhost'),
    port: z.coerce.number().int().positive().default(5432),
    username: z.string(),
    password: z.string(),
    database: z.string(),
    databaseUrl: z.string().url().optional(),
  }),
});

const ProdEnvironmentSchema = BaseEnvironmentSchema.extend({
  production: z.literal(true),
  password_pepper: z.string(),
  database: z.object({
    databaseUrl: z.string().url(),
  }),
});

export type EnvironmentConfig<T extends boolean> = T extends true
  ? z.infer<typeof ProdEnvironmentSchema>
  : z.infer<typeof DevEnvironmentSchema>;

export function validateEnv<T extends boolean>(isProduction: T): EnvironmentConfig<T> {
  const schema = isProduction ? ProdEnvironmentSchema : DevEnvironmentSchema;

  const parsed = schema.safeParse({
    production: isProduction,
    port: process.env.PORT,
    password_pepper: process.env.PASSWORD_PEPPER,
    database: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      databaseUrl: process.env.DATABASE_URL,
    },
  });

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data as EnvironmentConfig<T>;
}
