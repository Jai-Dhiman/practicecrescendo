<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as Tone from "tone";

  export let onRecordingComplete: (audioBlob: Blob) => void;

  let isRecording = false;
  let recorder: Tone.Recorder | null = null;
  let recordingTime = 0;
  let recordingInterval: number | null = null;

  onMount(() => {
    setupRecorder();
  });

  async function setupRecorder() {
    await Tone.start();
    recorder = new Tone.Recorder();

    // Connect the recorder to the main output
    Tone.getDestination().connect(recorder);
  }

  async function startRecording() {
    if (!recorder) return;

    try {
      await recorder.start();
      isRecording = true;
      recordingTime = 0;

      // Update recording time display
      recordingInterval = window.setInterval(() => {
        recordingTime += 1;
      }, 1000);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  }

  async function stopRecording() {
    if (!recorder || !isRecording) return;

    try {
      // Stop the timer
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }

      // Stop the recorder and get the recording
      const recording = await recorder.stop();
      isRecording = false;

      // Pass the recording to the callback
      onRecordingComplete(recording);
    } catch (err) {
      console.error("Error stopping recording:", err);
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  onDestroy(() => {
    if (recordingInterval) {
      clearInterval(recordingInterval);
    }

    if (recorder) {
      recorder.dispose();
    }
  });
</script>

<div class="card p-4">
  <h3 class="h3 mb-4">Recording</h3>

  <div class="flex items-center gap-4">
    <div class="recording-time">
      <span class="text-2xl font-mono">{formatTime(recordingTime)}</span>
    </div>

    {#if isRecording}
      <button class="btn variant-filled-error" on:click={stopRecording}>Stop Recording</button>
    {:else}
      <button class="btn variant-filled-primary" on:click={startRecording}>Start Recording</button>
    {/if}
  </div>

  {#if isRecording}
    <div class="mt-4 flex items-center">
      <div class="recording-indicator mr-2"></div>
      <span>Recording in progress...</span>
    </div>
  {/if}
</div>

<style>
  .recording-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: red;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
</style>
