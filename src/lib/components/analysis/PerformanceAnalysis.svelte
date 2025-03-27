<script lang="ts">
  import { onMount } from "svelte";

  export let performance: {
    noteAccuracy: number;
    rhythmAccuracy: number;
    dynamicsScore: number;
    articulationScore: number;
    overallScore: number;
    feedback: string;
  } = {
    noteAccuracy: 0,
    rhythmAccuracy: 0,
    dynamicsScore: 0,
    articulationScore: 0,
    overallScore: 0,
    feedback: "",
  };

  // Mock analysis for MVP - in the real app, this would come from your AI analysis
  function analyzePerformance(notesPlayed: any[]) {
    // This would be replaced with your actual analysis logic
    return {
      noteAccuracy: Math.round(Math.random() * 40 + 60), // 60-100%
      rhythmAccuracy: Math.round(Math.random() * 30 + 70), // 70-100%
      dynamicsScore: Math.round(Math.random() * 50 + 50), // 50-100%
      articulationScore: Math.round(Math.random() * 40 + 60), // 60-100%
      overallScore: Math.round(Math.random() * 30 + 70), // 70-100%
      feedback:
        "Good job! Focus on maintaining consistent timing between notes and pay attention to dynamic contrasts.",
    };
  }

  function getScoreColor(score: number): string {
    if (score >= 90) return "text-success-500";
    if (score >= 80) return "text-success-400";
    if (score >= 70) return "text-warning-400";
    if (score >= 60) return "text-warning-500";
    return "text-error-500";
  }
</script>

<div class="card p-4">
  <h3 class="h3 mb-4">Performance Analysis</h3>

  <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="metric">
      <h4 class="h4">Note Accuracy</h4>
      <p class="text-2xl font-bold {getScoreColor(performance.noteAccuracy)}">
        {performance.noteAccuracy}%
      </p>
    </div>

    <div class="metric">
      <h4 class="h4">Rhythm Accuracy</h4>
      <p class="text-2xl font-bold {getScoreColor(performance.rhythmAccuracy)}">
        {performance.rhythmAccuracy}%
      </p>
    </div>

    <div class="metric">
      <h4 class="h4">Dynamics</h4>
      <p class="text-2xl font-bold {getScoreColor(performance.dynamicsScore)}">
        {performance.dynamicsScore}%
      </p>
    </div>

    <div class="metric">
      <h4 class="h4">Articulation</h4>
      <p class="text-2xl font-bold {getScoreColor(performance.articulationScore)}">
        {performance.articulationScore}%
      </p>
    </div>
  </div>

  <div class="overall-score mb-4">
    <h4 class="h4">Overall Score</h4>
    <p class="text-3xl font-bold {getScoreColor(performance.overallScore)}">
      {performance.overallScore}%
    </p>
  </div>

  <div class="feedback p-4 bg-surface-700 rounded-lg">
    <h4 class="h4 mb-2">Feedback</h4>
    <p>{performance.feedback}</p>
  </div>
</div>
