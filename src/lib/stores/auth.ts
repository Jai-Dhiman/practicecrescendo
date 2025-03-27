import { readable, writable, derived } from "svelte/store";
import { supabase } from "$lib/supabase";
import type { User } from "@supabase/supabase-js";

export const user = writable<User | null>(null);
export const isLoading = writable(true);

export const isLoggedIn = derived(user, ($user) => !!$user);

// Initialize the store
export const initAuth = async () => {
  isLoading.set(true);

  // Check for existing session
  const { data, error } = await supabase.auth.getSession();

  if (!error && data?.session) {
    user.set(data.session.user);
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.user) {
      user.set(session.user);
    } else {
      user.set(null);
    }
  });

  isLoading.set(false);
};
