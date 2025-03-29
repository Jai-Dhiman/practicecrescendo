<!-- src/routes/recordings/+page.svelte -->
<script lang="ts">
  import { Mic, Play, Pause, SkipForward, SkipBack, Plus, FileMusic, Trash2, BarChart2 } from 'lucide-svelte';
  
  const recordings = [
    { 
      title: 'Moonlight Sonata - Practice 1', 
      sheetMusic: 'Moonlight Sonata',
      duration: '5:32',
      recordedAt: 'Mar 26, 2025'
    },
    { 
      title: 'Moonlight Sonata - Practice 2', 
      sheetMusic: 'Moonlight Sonata',
      duration: '4:45',
      recordedAt: 'Mar 27, 2025'
    },
    { 
      title: 'Fur Elise - First Attempt', 
      sheetMusic: 'Fur Elise',
      duration: '3:12',
      recordedAt: 'Mar 24, 2025'
    },
    { 
      title: 'Claire de Lune - With Metronome', 
      sheetMusic: 'Claire de Lune',
      duration: '6:18',
      recordedAt: 'Mar 22, 2025'
    }
  ];
  
  let selectedRecording = recordings[0];
  let isPlaying = false;
</script>

<div class="prose max-w-none">
  <h1 class="flex items-center gap-2">
    <Mic />
    Practice Recordings
  </h1>
  
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
    <div class="form-control w-full md:w-96">
      <select class="select select-bordered w-full">
        <option disabled selected>Filter by Sheet Music</option>
        <option>All Sheet Music</option>
        <option>Moonlight Sonata</option>
        <option>Fur Elise</option>
        <option>Claire de Lune</option>
      </select>
    </div>
    
    <button class="btn btn-primary">
      <Plus size={20} />
      Upload New Recording
    </button>
  </div>
  
  <div class="card bg-base-100 shadow-xl mb-8">
    <div class="card-body">
      <h2 class="card-title">{selectedRecording.title}</h2>
      <p>Sheet Music: {selectedRecording.sheetMusic}</p>
      <p>Recorded: {selectedRecording.recordedAt}</p>
      
      <div class="w-full bg-base-200 h-24 rounded-lg flex items-center justify-center">
        <p class="text-base-content/70">Waveform Visualization</p>
      </div>
      
      <div class="flex items-center justify-center gap-4 mt-4">
        <button class="btn btn-circle">
          <SkipBack size={20} />
        </button>
        <button class="btn btn-circle btn-primary" on:click={() => isPlaying = !isPlaying}>
          {#if isPlaying}
            <Pause size={24} />
          {:else}
            <Play size={24} />
          {/if}
        </button>
        <button class="btn btn-circle">
          <SkipForward size={20} />
        </button>
      </div>
      
      <div class="w-full mt-2">
        <input type="range" min="0" max="100" value="40" class="range range-xs range-primary" />
        <div class="flex justify-between text-xs px-2 mt-1">
          <span>0:00</span>
          <span>{selectedRecording.duration}</span>
        </div>
      </div>
      
      <div class="card-actions justify-end mt-4">
        <a href="/analysis" class="btn btn-secondary">
          <BarChart2 size={16} />
          Analyze Performance
        </a>
      </div>
    </div>
  </div>
  
  <h2>All Recordings</h2>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Title</th>
          <th>Sheet Music</th>
          <th>Duration</th>
          <th>Recorded</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each recordings as recording}
          <tr class={selectedRecording.title === recording.title ? 'bg-primary/10' : ''}>
            <td>{recording.title}</td>
            <td>
              <div class="flex items-center gap-2">
                <FileMusic size={16} />
                {recording.sheetMusic}
              </div>
            </td>
            <td>{recording.duration}</td>
            <td>{recording.recordedAt}</td>
            <td>
              <div class="flex gap-2">
                <button class="btn btn-sm btn-circle" on:click={() => selectedRecording = recording}>
                  <Play size={14} />
                </button>
                <a href="/analysis" class="btn btn-sm btn-circle">
                  <BarChart2 size={14} />
                </a>
                <button class="btn btn-sm btn-circle btn-error">
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>