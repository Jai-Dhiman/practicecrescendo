<!-- src/routes/library/+page.svelte -->
<script lang="ts">
  import { Plus, Search, Download, FileMusic, Trash2, Edit } from 'lucide-svelte';
  
  const sheetMusicLibrary = [
    { 
      title: 'Moonlight Sonata', 
      composer: 'Ludwig van Beethoven', 
      difficulty: 'Intermediate',
      uploadedAt: 'Feb 15, 2025'
    },
    { 
      title: 'Fur Elise', 
      composer: 'Ludwig van Beethoven', 
      difficulty: 'Beginner',
      uploadedAt: 'Jan 20, 2025'
    },
    { 
      title: 'Claire de Lune', 
      composer: 'Claude Debussy', 
      difficulty: 'Advanced',
      uploadedAt: 'Mar 05, 2025'
    },
    { 
      title: 'Nocturne in E-flat major', 
      composer: 'Frédéric Chopin', 
      difficulty: 'Advanced',
      uploadedAt: 'Mar 12, 2025'
    }
  ];
</script>

<div class="prose max-w-none">
  <h1 class="flex items-center gap-2">
    <FileMusic />
    Sheet Music Library
  </h1>
  
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
    <div class="form-control w-full md:w-96">
      <div class="input-group">
        <input type="text" placeholder="Search sheet music..." class="input input-bordered w-full" />
        <button class="btn btn-square">
          <Search size={20} />
        </button>
      </div>
    </div>
    
    <button class="btn btn-primary">
      <Plus size={20} />
      Upload New Sheet Music
    </button>
  </div>
  
  <div class="flex gap-4 mb-4">
    <select class="select select-bordered w-full max-w-xs">
      <option disabled selected>Filter by Difficulty</option>
      <option>All Levels</option>
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Advanced</option>
    </select>
    
    <select class="select select-bordered w-full max-w-xs">
      <option disabled selected>Filter by Composer</option>
      <option>All Composers</option>
      <option>Beethoven</option>
      <option>Chopin</option>
      <option>Debussy</option>
    </select>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {#each sheetMusicLibrary as music}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">{music.title}</h3>
          <div class="badge badge-secondary">{music.difficulty}</div>
          <p>Composer: {music.composer}</p>
          <p class="text-sm text-base-content/70">Uploaded: {music.uploadedAt}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-circle btn-sm">
              <Edit size={16} />
            </button>
            <button class="btn btn-circle btn-sm">
              <Download size={16} />
            </button>
            <button class="btn btn-circle btn-sm btn-error">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="mt-6 flex justify-center">
    <div class="join">
      <button class="join-item btn">«</button>
      <button class="join-item btn">Page 1</button>
      <button class="join-item btn">»</button>
    </div>
  </div>
</div>