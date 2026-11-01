<script lang="ts">
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const STYLE_ID = 'parsimap-streets-v11';

  const preloadMapboxPlugins = (cdnUrl = 'https://cdn.parsimap.ir') => {
    if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
      mapboxgl.setRTLTextPlugin(
        `${cdnUrl}/third-party/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js`,
        () => {},
      );
    }
  };

  let container: HTMLDivElement;
  let error = $state('');

  onMount(() => {
    const token = env.PUBLIC_PMI_MAP_TOKEN;
    if (!mapboxgl.supported()) {
      error = 'This browser does not support the WebGL features required to display the map.';
      return;
    }
    if (!token || token === 'YOUR_TOKEN_HERE') {
      error = 'Set PUBLIC_PMI_MAP_TOKEN in .env.';
      return;
    }

    let instance: mapboxgl.Map | undefined;
    try {
      preloadMapboxPlugins();
      instance = new mapboxgl.Map({
        container,
        style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
        center: [51.389, 35.6892],
        zoom: 11,
      });
      instance.addControl(new mapboxgl.NavigationControl());
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

{#if error}
  <p role="alert">{error}</p>
{/if}
<div bind:this={container} style="width: 100%; height: 500px"></div>
