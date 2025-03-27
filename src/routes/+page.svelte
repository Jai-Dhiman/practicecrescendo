<script lang="ts">
  import { ArrowRight, Music, Brain, Award } from "lucide-svelte";
</script>

<div class="hero py-20">
  <div class="hero-content text-center">
    <div class="max-w-3xl">
      <h1 class="h1 mb-4">Master Piano with AI-Powered Feedback</h1>
      <p class="text-xl mb-8">
        Crescendo helps you improve your piano skills with real-time feedback, personalized practice recommendations,
        and advanced performance analysis.
      </p>
      <div class="flex justify-center gap-4">
        <a href="/signup" class="btn variant-filled-primary btn-lg">
          Get Started
          <ArrowRight class="ml-2" size={20} />
        </a>
        <a href="/demo" class="btn variant-ghost-surface btn-lg">Try Demo</a>
      </div>
    </div>
  </div>
</div>

<div class="container mx-auto px-4 py-12">
  <h2 class="h2 text-center mb-12">How Crescendo Works</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="card p-6 text-center">
      <div class="flex justify-center mb-4">
        <Music size={48} />
      </div>
      <h3 class="h3 mb-2">Real-time Feedback</h3>
      <p>
        Connect your digital piano or play acoustic piano near your mic to get instant feedback on your performance.
      </p>
    </div>

    <div class="card p-6 text-center">
      <div class="flex justify-center mb-4">
        <Brain size={48} />
      </div>
      <h3 class="h3 mb-2">AI Analysis</h3>
      <p>
        Our advanced AI analyzes your playing beyond just notes and rhythm, providing insights on dynamics,
        articulation, and style.
      </p>
    </div>

    <div class="card p-6 text-center">
      <div class="flex justify-center mb-4">
        <Award size={48} />
      </div>
      <h3 class="h3 mb-2">Track Progress</h3>
      <p>See your improvement over time with detailed metrics and personalized practice recommendations.</p>
    </div>
  </div>
</div>
