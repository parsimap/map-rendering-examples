<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import type { Map as LeafletMap } from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  const TILESET_ID = 'parsimap-streets-v11-raster';

  const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

  let container: HTMLDivElement;
  let map = $state.raw<LeafletMap | null>(null);
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
        `https://api.parsimap.ir/tile/${TILESET_ID}/{z}/{x}/{y}?key=${encodeURIComponent(token)}`,
        { attribution: ATTRIBUTION, minZoom: 1, maxZoom: 18 },
      );
      let hasLoadedTile = false;
      tiles.on('tileload', () => {
        hasLoadedTile = true;
        error = '';
      });
      tiles.on('tileerror', () => {
        if (!hasLoadedTile) error = 'The map tiles could not load. Check your token and network connection.';
      });
      tiles.addTo(instance);
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

<main>
  <p id="map-status" role={error ? 'alert' : 'status'}>
    {error || (map ? 'Map initialized.' : 'Initializing map…')}
  </p>
  <div
    bind:this={container}
    role="region"
    aria-label="Interactive map of Tehran"
    aria-describedby="map-status"
    style="width: 100%; height: 500px"
  ></div>
</main>
