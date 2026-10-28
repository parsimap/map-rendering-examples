<script>
  import { onMount } from 'svelte';
  import * as maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  maplibregl.setWorkerUrl(workerUrl);

  let mapContainer;
  let map = $state.raw(null);

  onMount(() => {
    const token = import.meta.env.VITE_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      throw new Error('Set VITE_PMI_MAP_TOKEN in .env.local');
    }

    map = new maplibregl.Map({
      container: mapContainer,
      style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
      center: [51.389, 35.6892],
      zoom: 11,
    });

    map.addControl(new maplibregl.NavigationControl());
    return () => map?.remove();
  });
</script>

<p>{map ? 'Map initialized.' : 'Initializing map...'}</p>
<div bind:this={mapContainer} style="width: 100%; height: 500px"></div>
