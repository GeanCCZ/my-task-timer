import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ConfigService } from "@nestjs/config";
import { schema, DatabaseSchema } from "../schemas";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export const DRIZZLE_PROVIDER = Symbol('DRIZZLE_PROVIDER');

export const createDrizzleProvider = (connectionString: string) => {
  const pool = new Pool({ connectionString });
  return drizzle(pool, { schema }) as NodePgDatabase<DatabaseSchema>;
};

export const DrizzleProvider = {
  provide: DRIZZLE_PROVIDER,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const connectionString = config.get<string>('DATABASE_URL');
    return createDrizzleProvider(connectionString);
  },
};