import type { Config } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString
  }
} satisfies Config;
