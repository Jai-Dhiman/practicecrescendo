import { drizzle } from "drizzle-orm/postgres-js";
import { supabase } from "../supabase";
import * as schema from "./schema";

export const db = drizzle(supabase.connectionString as any, { schema });
