<script lang="ts">
  import "../app.postcss";
  import { onMount } from "svelte";
  import { initAuth, user, isLoading } from "$lib/stores/auth";
  import { goto } from "$app/navigation";
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import { supabase } from "$lib/supabase";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton-svelte";

  onMount(() => {
    initAuth();
  });

  function handleLogout() {
    supabase.auth.signOut();
    goto("/");
  }
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/" class="text-xl font-bold flex items-center">🎹 Crescendo</a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        {#if $isLoading}
          <div class="animate-spin size-5">
            <i class="fa-solid fa-circle-notch"></i>
          </div>
        {:else if $user}
          <a href="/dashboard" class="btn btn-sm variant-ghost-surface">Dashboard</a>
          <a href="/practice" class="btn btn-sm variant-ghost-surface">Practice</a>
          <a href="/library" class="btn btn-sm variant-ghost-surface">Library</a>
          <button class="btn btn-sm variant-ghost-surface" on:click={handleLogout}>Logout</button>
        {:else}
          <a href="/login" class="btn btn-sm variant-ghost-surface">Login</a>
          <a href="/signup" class="btn btn-sm variant-filled-primary">Sign Up</a>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <main class="container mx-auto p-4">
    <slot />
  </main>

  <svelte:fragment slot="footer">
    <footer class="p-4 flex justify-center">
      <p>© 2025 Crescendo Piano Learning Platform</p>
    </footer>
  </svelte:fragment>
</AppShell>
