<script>
  import '../app.postcss';
  import Navbar from '$lib/components/Navbar.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    document.documentElement.setAttribute('data-theme', 'customlight');
  });
</script>

<Navbar />
<div class="md:px-32 md:py-10">
  <slot />
</div>