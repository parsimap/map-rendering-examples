<script lang="ts">
  import { onMount } from 'svelte';
  import * as maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  const STYLE_ID = 'parsimap-streets-v11';

  maplibregl.setWorkerUrl(workerUrl);

  let container: HTMLDivElement;
  let error = $state('');

  onMount(() => {
    const token = import.meta.env.VITE_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      error = 'Set VITE_PMI_MAP_TOKEN in .env.local.';
      return;
    }

    let instance: maplibregl.Map | undefined;
    try {
      instance = new maplibregl.Map({
        container,
        style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
        center: [51.389, 35.6892],
        zoom: 11,
      });
      instance.addControl(new maplibregl.NavigationControl());
      instance.on('error', () => {
        error = 'The map could not load. Check your token and network connection.';
      });
    } catch {
      instance?.remove();
      error = 'The map could not start. Check your browser and token.';
      return;
    }

    return () => instance?.remove();
  });
</script>

<main>
  {#if error}
    <p role="alert">{error}</p>
  {/if}
  <div bind:this={container} style="width: 100%; height: 500px"></div>
</main>
