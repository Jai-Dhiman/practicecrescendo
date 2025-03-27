<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import { goto } from "$app/navigation";

  let user = null;
  let practiceSessions = [];
  let isLoading = true;

  onMount(async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return goto("/login");
    }

    user = data.user;

    // Fetch practice sessions from your API
    const response = await fetch("/api/practice-sessions");
    const result = await response.json();
    practiceSessions = result.sessions || [];

    isLoading = false;
  });
</script>

<div class="container mx-auto p-4">
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <h1 class="text-3xl font-bold mb-6">Welcome, {user?.user_metadata?.full_name || user?.email}</h1>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Your Practice Sessions</h2>

      {#if practiceSessions.length === 0}
        <p>You haven't created any practice sessions yet.</p>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each practiceSessions as session}
            <div class="card p-4">
              <h3 class="text-xl font-semibold">{session.title}</h3>
              <p>{session.description}</p>
              <p>Type: {session.practiceType}</p>
              <p>Duration: {Math.floor(session.duration / 60)} minutes</p>
            </div>
          {/each}
        </div>
      {/if}

      <a href="/practice/new" class="btn variant-filled-primary mt-4">Create New Session</a>
    </div>
  {/if}
</div>
