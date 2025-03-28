<script lang="ts">
  import { onMount } from "svelte";

  let dbStatus = "checking...";
  let isConnected = false;

  onMount(async () => {
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      dbStatus = data.database;
      isConnected = data.status === "healthy";
    } catch (error) {
      dbStatus = "error";
      isConnected = false;
    }
  });
</script>

<div class="flex items-center gap-2">
  <span>Database:</span>
  <div class="badge {isConnected ? 'badge-success' : 'badge-error'}">{dbStatus}</div>
</div>
