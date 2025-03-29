<!-- src/routes/analysis/+page.svelte -->
<script lang="ts">
  import { BarChart2, FileMusic, Clock, Award, ArrowRight, ArrowLeft, Volume2, VolumeX } from 'lucide-svelte';
  
  const analysis = {
    recordingTitle: 'Moonlight Sonata - Practice 2',
    sheetMusic: 'Moonlight Sonata',
    duration: '4:45',
    recordedAt: 'Mar 27, 2025',
    analysisDate: 'Mar 27, 2025',
    overallScore: 84,
    strengths: [
      'Excellent dynamic control in the arpeggios',
      'Good overall tempo consistency',
      'Clear articulation in the right hand melody'
    ],
    improvements: [
      'Work on evenness in the left hand triplets (measures 5-8)',
      'Pay attention to the slight rushing in the middle section',
      'Consider more pedal control in the sustained bass notes'
    ],
    notesData: [
      { measure: 1, noteCount: 32, accuracy: 95 },
      { measure: 2, noteCount: 32, accuracy: 90 },
      { measure: 3, noteCount: 32, accuracy: 85 },
      { measure: 4, noteCount: 32, accuracy: 92 },
    ]
  };
</script>

<div class="prose max-w-none">
  <h1 class="flex items-center gap-2">
    <BarChart2 />
    Performance Analysis
  </h1>
  
  <div class="flex flex-col md:flex-row gap-6">
    <div class="card bg-base-100 shadow-xl w-full md:w-1/3">
      <div class="card-body">
        <h2 class="card-title">{analysis.recordingTitle}</h2>
        <div class="flex items-center gap-2 mt-2">
          <FileMusic size={18} />
          <span>{analysis.sheetMusic}</span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <Clock size={18} />
          <span>{analysis.duration}</span>
        </div>
        <p class="text-sm text-base-content/70">Recorded: {analysis.recordedAt}</p>
        <p class="text-sm text-base-content/70">Analysis: {analysis.analysisDate}</p>
        
        <div class="mt-4">
          <div class="flex justify-between items-center">
            <span class="font-bold">Overall Score</span>
            <span class="text-2xl font-bold text-primary">{analysis.overallScore}%</span>
          </div>
          <progress class="progress progress-primary w-full" value={analysis.overallScore} max="100"></progress>
        </div>
        
        <div class="divider"></div>
        
        <div class="flex gap-2">
          <button class="btn btn-outline flex-1">
            <ArrowLeft size={16} />
            Previous
          </button>
          <button class="btn btn-outline flex-1">
            Next
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div class="mt-4">
          <button class="btn btn-primary w-full">
            <Volume2 size={18} />
            Play Recording
          </button>
        </div>
      </div>
    </div>
    
    <div class="w-full md:w-2/3">
      <div class="card bg-base-100 shadow-xl mb-6">
        <div class="card-body">
          <h2 class="card-title flex items-center gap-2">
            <Award class="text-success" />
            Strengths
          </h2>
          <ul>
            {#each analysis.strengths as strength}
              <li>{strength}</li>
            {/each}
          </ul>
          
          <h2 class="card-title flex items-center gap-2 mt-4">
            <Award class="text-warning" />
            Areas for Improvement
          </h2>
          <ul>
            {#each analysis.improvements as improvement}
              <li>{improvement}</li>
            {/each}
          </ul>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Sheet Music with Annotations</h2>
          
          <div class="bg-base-200 p-4 rounded-lg min-h-40 flex justify-center items-center">
            <p class="text-base-content/70">Sheet music viewer would be displayed here</p>
          </div>
          
          <h3 class="mt-6">Note Accuracy by Measure</h3>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Note Count</th>
                  <th>Accuracy (%)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {#each analysis.notesData as measure}
                  <tr>
                    <td>{measure.measure}</td>
                    <td>{measure.noteCount}</td>
                    <td>{measure.accuracy}%</td>
                    <td>
                      {#if measure.accuracy >= 90}
                        <div class="badge badge-success">Excellent</div>
                      {:else if measure.accuracy >= 80}
                        <div class="badge badge-info">Good</div>
                      {:else}
                        <div class="badge badge-warning">Needs Work</div>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>