<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as Tone from "tone";

  export let onNoteDetected: (note: string, velocity: number) => void = () => {};

  let midiInputs: WebMidi.MIDIInput[] = [];
  let selectedInputId = "";
  let statusMessage = "Initializing MIDI...";
  let synth: Tone.PolySynth;

  onMount(async () => {
    // Initialize Tone.js
    await Tone.start();
    synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // Request MIDI access
    try {
      if (navigator.requestMIDIAccess) {
        const midiAccess = await navigator.requestMIDIAccess();
        setupMIDI(midiAccess);
        midiAccess.onstatechange = (e) => setupMIDI(e.target);
        statusMessage = midiInputs.length ? "MIDI ready" : "No MIDI devices found";
      } else {
        statusMessage = "Web MIDI API not supported in this browser";
        setupAudioInput();
      }
    } catch (err) {
      console.error("MIDI access error:", err);
      statusMessage = "Error accessing MIDI devices";
      setupAudioInput();
    }
  });

  function setupMIDI(midiAccess: WebMidi.MIDIAccess) {
    midiInputs = Array.from(midiAccess.inputs.values());

    if (midiInputs.length > 0 && !selectedInputId) {
      selectedInputId = midiInputs[0].id;
      connectToMIDIInput(midiInputs[0]);
    }
  }

  function connectToMIDIInput(input: WebMidi.MIDIInput) {
    // First remove any existing listeners
    midiInputs.forEach((input) => {
      input.onmidimessage = null;
    });

    // Set up the new listener
    input.onmidimessage = handleMIDIMessage;
    statusMessage = `Connected to ${input.name}`;
  }

  function handleMIDIMessage(message: WebMidi.MIDIMessageEvent) {
    const command = message.data[0];
    const note = message.data[1];
    const velocity = message.data[2];

    // Note on
    if (command === 144 && velocity > 0) {
      const noteName = midiNoteToName(note);
      synth.triggerAttack(noteName, Tone.now(), velocity / 127);
      onNoteDetected(noteName, velocity / 127);
    }
    // Note off
    else if (command === 128 || (command === 144 && velocity === 0)) {
      const noteName = midiNoteToName(note);
      synth.triggerRelease(noteName);
    }
  }

  function midiNoteToName(midiNote: number): string {
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const octave = Math.floor(midiNote / 12) - 1;
    const noteName = noteNames[midiNote % 12];
    return `${noteName}${octave}`;
  }

  function setupAudioInput() {
    // Fallback to audio input using WebAudio API
    // This is more complex and would need additional code for pitch detection
    statusMessage = "MIDI not available, using audio input (microphone)";
    // Implementation for audio input would go here
  }

  function handleInputChange() {
    const selectedInput = midiInputs.find((input) => input.id === selectedInputId);
    if (selectedInput) {
      connectToMIDIInput(selectedInput);
    }
  }

  onDestroy(() => {
    if (synth) {
      synth.dispose();
    }
  });
</script>

<div class="card p-4 mb-4">
  <h3 class="h3 mb-2">Piano Input</h3>

  <div class="status-message mb-2">
    <p>{statusMessage}</p>
  </div>

  {#if midiInputs.length > 0}
    <div class="mb-4">
      <label for="midi-input">MIDI Device</label>
      <select id="midi-input" bind:value={selectedInputId} on:change={handleInputChange} class="select w-full">
        {#each midiInputs as input}
          <option value={input.id}>{input.name}</option>
        {/each}
      </select>
    </div>
  {:else}
    <p class="mb-4">No MIDI devices detected. Connect a MIDI device or use your computer keyboard.</p>
  {/if}
</div>
