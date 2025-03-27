import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { practiceSessions } from "$lib/server/db/schema";
import { supabase } from "$lib/supabase";

export async function GET({ request }) {
  try {
    // Get the current user
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch practice sessions for the current user
    const sessions = await db
      .select()
      .from(practiceSessions)
      .where(practiceSessions.userId.equals(data.user.id))
      .orderBy(practiceSessions.createdAt, "desc");

    return json({ sessions });
  } catch (error) {
    console.error("Error fetching practice sessions:", error);
    return json({ error: String(error) }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionData = await request.json();

    // Validate required fields
    if (!sessionData.title || !sessionData.practiceType || !sessionData.duration) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert new practice session
    const [newSession] = await db
      .insert(practiceSessions)
      .values({
        userId: data.user.id,
        title: sessionData.title,
        description: sessionData.description || null,
        practiceType: sessionData.practiceType,
        duration: sessionData.duration,
        recordingUrl: sessionData.recordingUrl || null,
        scoreData: sessionData.scoreData || null,
      })
      .returning();

    return json({ session: newSession });
  } catch (error) {
    console.error("Error creating practice session:", error);
    return json({ error: String(error) }, { status: 500 });
  }
}
