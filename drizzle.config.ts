import type { Config } from 'drizzle-kit';

export default {
    schema: [
        "./apps/backend/src/db/schemas/task.schema.ts",
        "./apps/backend/src/db/schemas/user.schema.ts",
        "./apps/backend/src/db/schemas/timeLog.schema.ts",
    ],
    out: "./apps/backend/src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;
