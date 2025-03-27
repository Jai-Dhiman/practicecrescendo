<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  
  let email = '';
  let password = '';
  let isLoading = false;
  let errorMessage = '';
  
  async function handleLogin() {
    isLoading = true;
    errorMessage = '';
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      errorMessage = error.message;
    } else if (data.user) {
      goto('/dashboard');
    }
    
    isLoading = false;
  }
</script>

<div class="max-w-md mx-auto p-6 bg-surface-800 rounded-lg shadow-lg">
  <h2 class="text-2xl font-bold mb-6">Login to Crescendo</h2>
  
  {#if errorMessage}
    <div class="alert variant-filled-error mb-4">
      <p>{errorMessage}</p>
    </div>
  {/if}
  
  <form on:submit|preventDefault={handleLogin}>
    <div class="mb-4">
      <label for="email" class="block mb-1">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        class="input w-full"
        disabled={isLoading}
      />
    </div>
    
    <div class="mb-6">
      <label for="password" class="block mb-1">Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        required
        class="input w-full"
        disabled={isLoading}
      />
    </div>
    
    <button 
      type="submit" 
      class="btn variant-filled-primary w-full" 
      disabled={isLoading}
    >
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  </form>
  
  <div class="mt-4 text-center">
    <a href="/signup" class="anchor">Don't have an account? Sign up</a>
  </div>
</div>