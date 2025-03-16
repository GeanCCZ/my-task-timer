import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { createDrizzleProvider } from './drizzle.provider';

const runMigration = async () => {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('Missing DATABASE_URL environment variable');
    }

    const db = createDrizzleProvider(connectionString);
    const migrationsPath = path.join(__dirname, '../../../db/migrations');

    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: migrationsPath });
    console.log('Migration completed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration();