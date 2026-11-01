<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import type { Map as LeafletMap } from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

  let container: HTMLDivElement;
  let error = $state('');

  onMount(() => {
    const token = import.meta.env.VITE_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      error = 'Set VITE_PMI_MAP_TOKEN in .env.local.';
      return;
    }

    let instance: LeafletMap | undefined;
    try {
      instance = L.map(container).setView([35.6892, 51.389], 11);
      const attributionContainer = instance.attributionControl.getContainer();
      if (attributionContainer) {
        attributionContainer.dir = 'ltr';
        attributionContainer.style.unicodeBidi = 'isolate';
      }

      const tiles = L.tileLayer(
        `https://api.parsimap.ir/tile/parsimap/{z}/{x}/{y}?key=${encodeURIComponent(token)}`,
        { attribution: ATTRIBUTION, minZoom: 1, maxZoom: 18 },
      );
      tiles.on('tileerror', () => {
        error = 'The map tiles could not load. Check your token and network connection.';
      });
      tiles.addTo(instance);
    } catch {
      instance?.remove();
      error = 'The map could not start. Check your browser and token.';
      return;
    }

    return () => instance?.remove();
  });
</script>

<main>
  <p id="map-error" role="alert" hidden={!error}>{error}</p>
  <div
    bind:this={container}
    role="region"
    aria-label="Interactive map of Tehran"
    aria-describedby="map-error"
    style="width: 100%; height: 500px"
  ></div>
</main>
