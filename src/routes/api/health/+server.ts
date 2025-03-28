import { json } from "@sveltejs/kit";
import { db } from "$lib/server";
import { users } from "$lib/server/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return json({ status: "healthy", database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error);
    return json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
