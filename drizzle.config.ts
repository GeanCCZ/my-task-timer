import type { Config } from 'drizzle-kit';

export default {
    schema: [
        "./packages/shared/data-source/src/lib/schemas/task.schema.ts",
        "./packages/shared/data-source/src/lib/schemas/user.schema.ts",
        "./packages/shared/data-source/src/lib/schemas/timeLog.schema.ts",
    ],
    out: "./packages/shared/data-source/src/lib/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;
