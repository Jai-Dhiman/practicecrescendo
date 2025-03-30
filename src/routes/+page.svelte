<script lang="ts">
  import DbHealthCheck from "$lib/components/DbHealthCheck.svelte";
  export let data;
  
</script>

<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
  <div>
    <h1 class="text-2xl font-bold mb-1">Welcome to Crescendo</h1>
    <div class="badge badge-primary">Beta</div>
  </div>

  <div class="mb-6">
    <DbHealthCheck />
  </div>
</div>