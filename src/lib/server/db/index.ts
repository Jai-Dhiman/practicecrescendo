import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const queryLogger = (sql: string, params: any[]) => {
  if (env.NODE_ENV === "development") {
    console.log("SQL:", sql, "Params:", params);
  }
};

const client = postgres(env.DATABASE_URL, {
  max: 10,
  ssl: "require",
  onnotice: () => {},
  debug: queryLogger,
});

export const db = drizzle(client, { schema });
