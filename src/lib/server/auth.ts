import { db } from "./db";
import { users } from "./db/schema";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export async function syncUserWithDatabase(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Check if user exists in our database
  const existingUsers = await db.select().from(users).where(users.id.equals(user.id));

  if (existingUsers.length === 0) {
    // Create new user record
    await db.insert(users).values({
      id: user.id,
      email: user.email || "",
      name: (user.user_metadata?.full_name as string) || null,
      avatarUrl: (user.user_metadata?.avatar_url as string) || null,
    });
  }

  return user;
}
