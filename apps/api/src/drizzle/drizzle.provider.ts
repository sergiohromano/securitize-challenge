import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const drizzleProviders = [
    {
        provide: 'DB_CONNECTION',
        useFactory: async (): Promise<PostgresJsDatabase> => {
            try {
                const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

                const client = postgres(connectionString);
                const db = drizzle(client);
                return db;
            } catch (error) {
                throw error;
            }
        }
    }
]
