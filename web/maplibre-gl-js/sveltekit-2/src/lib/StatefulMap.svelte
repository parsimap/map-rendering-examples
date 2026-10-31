<script lang="ts">
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  import * as maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  const STYLE_ID = 'parsimap-streets-v11';

  let container: HTMLDivElement;
  let map = $state.raw<maplibregl.Map | null>(null);
  let error = $state('');

  onMount(() => {
    const token = env.PUBLIC_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      error = 'Set PUBLIC_PMI_MAP_TOKEN in .env.';
      return;
    }

    let instance: maplibregl.Map | undefined;
    try {
      maplibregl.setWorkerUrl(workerUrl);
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
      map = instance;
    } catch {
      instance?.remove();
      error = 'The map could not start. Check your browser and token.';
      return;
    }

    return () => {
      instance?.remove();
      map = null;
    };
  });
</script>

{#if error}
  <p role="alert">{error}</p>
{:else}
  <p role="status">{map ? 'Map initialized.' : 'Initializing map…'}</p>
{/if}
<div bind:this={container} style="width: 100%; height: 500px"></div>
