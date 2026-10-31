<script lang="ts">
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const STYLE_ID = 'parsimap-streets-v11';

  let container: HTMLDivElement;
  let error = $state('');

  onMount(() => {
    let disposed = false;
    let instance: import('mapbox-gl').Map | undefined;

    async function initialize() {
      const token = env.PUBLIC_PMI_MAP_TOKEN;
      if (!token || token === 'YOUR_TOKEN_HERE') {
        error = 'Set PUBLIC_PMI_MAP_TOKEN in .env.';
        return;
      }

      try {
        const { default: mapboxgl } = await import('mapbox-gl');
        if (disposed) return;
        if (!mapboxgl.supported()) {
          error = 'This browser does not support the WebGL features required to display the map.';
          return;
        }

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
        if (!disposed) error = 'The map could not start. Check your browser and token.';
      }
    }

    void initialize();
    return () => {
      disposed = true;
      instance?.remove();
    };
  });
</script>

{#if error}
  <p role="alert">{error}</p>
{/if}
<div bind:this={container} style="width: 100%; height: 500px"></div>
