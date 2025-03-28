<!-- src/routes/+page.svelte -->
<script lang="ts">
  import DbHealthCheck from "$lib/components/DbHealthCheck.svelte";
  export let data;
</script>

<div class="prose max-w-none">
  <h1>Welcome to Crescendo Piano Platform</h1>

  <div class="mb-6">
    <DbHealthCheck />
  </div>

  <div class="p-6 bg-base-200 rounded-lg">
    <h2>Your Piano Practice Assistant</h2>
    <p>Upload your recordings and sheet music to get AI-powered feedback on your practice sessions.</p>
  </div>

  <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Sheet Music Library</h3>
        <p>Organize and view your sheet music collection.</p>
        <div class="card-actions justify-end">
          <a href="/library" class="btn btn-primary">Go to Library</a>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Practice Recordings</h3>
        <p>Manage your practice recordings and get analysis.</p>
        <div class="card-actions justify-end">
          <a href="/recordings" class="btn btn-primary">Go to Recordings</a>
        </div>
      </div>
    </div>
  </div>
</div>
