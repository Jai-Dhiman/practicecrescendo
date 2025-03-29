<!-- src/routes/+page.svelte -->
<script lang="ts">
  import DbHealthCheck from "$lib/components/DbHealthCheck.svelte";
  import { Calendar, Clock, Music, ArrowRight, Book, Mic } from 'lucide-svelte';
  export let data;
  
  const recentPractices = [
    { date: 'March 26, 2025', piece: 'Moonlight Sonata', duration: '32 min' },
    { date: 'March 24, 2025', piece: 'Fur Elise', duration: '45 min' },
    { date: 'March 23, 2025', piece: 'Claire de Lune', duration: '28 min' }
  ];
</script>

<div class="prose max-w-none">
  <h1 class="flex items-center gap-2">
    Welcome to Crescendo
    <div class="badge badge-primary">Beta</div>
  </h1>

  <div class="mb-6">
    <DbHealthCheck />
  </div>

  <div class="p-6 bg-base-200 rounded-lg mb-8">
    <h2 class="mt-0">Your Piano Practice Assistant</h2>
    <p>Upload your recordings and sheet music to get AI-powered feedback on your practice sessions.</p>
    <div class="stats shadow w-full">
      <div class="stat">
        <div class="stat-figure text-primary">
          <Music size={36} />
        </div>
        <div class="stat-title">Sheet Music</div>
        <div class="stat-value">5</div>
        <div class="stat-desc">In your library</div>
      </div>
      
      <div class="stat">
        <div class="stat-figure text-secondary">
          <Clock size={36} />
        </div>
        <div class="stat-title">Practice Time</div>
        <div class="stat-value">3.2h</div>
        <div class="stat-desc">Last 7 days</div>
      </div>
      
      <div class="stat">
        <div class="stat-figure text-accent">
          <Calendar size={36} />
        </div>
        <div class="stat-title">Sessions</div>
        <div class="stat-value">12</div>
        <div class="stat-desc">This month</div>
      </div>
    </div>
  </div>

  <h2>Recent Practice Sessions</h2>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Date</th>
          <th>Piece</th>
          <th>Duration</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each recentPractices as practice}
          <tr>
            <td>{practice.date}</td>
            <td>{practice.piece}</td>
            <td>{practice.duration}</td>
            <td>
              <a href="/analysis" class="btn btn-sm btn-primary">
                View Analysis
                <ArrowRight size={16} />
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title flex items-center gap-2">
          <Book size={20} />
          Sheet Music Library
        </h3>
        <p>Organize and view your sheet music collection.</p>
        <div class="card-actions justify-end">
          <a href="/library" class="btn btn-primary">Go to Library</a>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title flex items-center gap-2">
          <Mic size={20} />
          Practice Recordings
        </h3>
        <p>Manage your practice recordings and get analysis.</p>
        <div class="card-actions justify-end">
          <a href="/recordings" class="btn btn-primary">Go to Recordings</a>
        </div>
      </div>
    </div>
  </div>
</div>