import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not defined");
  process.exit(1);
}

const client = postgres(connectionString, {
  prepare: false,
  ssl: "require",
});

export const db = drizzle(client);
