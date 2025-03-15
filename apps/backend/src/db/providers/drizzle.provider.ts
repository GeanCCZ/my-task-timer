import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { taskSchema } from "../schemas/task.schema";
import { userSchema } from "../schemas/user.schema";
import { ConfigService } from "@nestjs/config";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider' as const;

const schema = {
    tasks: taskSchema,
    users: userSchema,
} as const;

export const drizzleProvider = [{
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({ connectionString });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    }
}]