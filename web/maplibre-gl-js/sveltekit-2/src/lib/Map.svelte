<script>
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  import * as maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

  let container;
  onMount(() => {
    const token = env.PUBLIC_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      throw new Error('Set PUBLIC_PMI_MAP_TOKEN in .env');
    }
    maplibregl.setWorkerUrl(workerUrl);
    const map = new maplibregl.Map({
      container,
      style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
      center: [51.389, 35.6892],
      zoom: 11,
    });
    map.addControl(new maplibregl.NavigationControl());
    return () => map.remove();
  });
</script>

<div bind:this={container} style="width: 100%; height: 500px"></div>
