<script lang="ts">
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';

  let isDarkMode = false;

  onMount(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'customdark');
    } else {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'customdark') {
        isDarkMode = true;
        document.documentElement.setAttribute('data-theme', 'customdark');
      }
    }
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'customdark' : 'customlight';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<button class="btn btn-circle btn-sm" on:click={toggleTheme} aria-label="Toggle theme">
  {#if isDarkMode}
    <Sun size={18} />
  {:else}
    <Moon size={18} />
  {/if}
</button>