<script lang="ts">
  import { onMount } from "svelte";
  import { Vex, Flow } from "vexflow";

  export let notes: { keys: string[]; duration: string }[] = [];
  export let width = 500;
  export let height = 150;

  let container: HTMLDivElement;
  let renderedNotes: any[] = [];

  $: if (container && JSON.stringify(notes) !== JSON.stringify(renderedNotes)) {
    renderScore();
    renderedNotes = [...notes];
  }

  onMount(() => {
    renderScore();
  });

  function renderScore() {
    if (!container) return;

    // Clear previous rendering
    container.innerHTML = "";

    const { Renderer, Stave, Voice, Formatter, StaveNote } = Flow;

    // Create renderer
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();

    // Create a stave at position 10, 10 with width
    const stave = new Stave(10, 10, width - 20);

    // Add a clef
    stave.addClef("treble");

    // Connect stave to the rendering context and draw
    stave.setContext(context).draw();

    // Create notes
    const vfNotes = notes.map((note) => {
      return new StaveNote({
        keys: note.keys,
        duration: note.duration,
      });
    });

    // Create a voice and add notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(vfNotes);

    // Format and justify the notes
    new Formatter().joinVoices([voice]).format([voice], width - 50);

    // Render voice
    voice.draw(context, stave);
  }
</script>

<div class="sheet-music-container" bind:this={container}></div>

<style>
  .sheet-music-container {
    background: white;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
