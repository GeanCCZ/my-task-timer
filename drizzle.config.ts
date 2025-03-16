import type { Config } from 'drizzle-kit';

export default {
    schema: [
        "./src/db/schemas/task.schema.ts",
        "./src/db/schemas/user.schema.ts",
    ],
    out: "./apps/backend/src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;
