<script lang="ts">
  import { onMount } from 'svelte';
  import { PUBLIC_PMI_MAP_TOKEN } from '$app/env/public';
  import type { Map as LeafletMap } from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  const TILESET_ID = 'parsimap-streets-v11-raster';

  const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

  let container: HTMLDivElement;
  let error = $state('');

  onMount(() => {
    const token = PUBLIC_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      error = 'Set PUBLIC_PMI_MAP_TOKEN in .env.';
      return;
    }

    let disposed = false;
    let instance: LeafletMap | undefined;
    void import('leaflet')
      .then(({ default: L }) => {
        if (disposed) return;
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
          tiles.on('tileerror', () => {
            error = 'The map tiles could not load. Check your token and network connection.';
          });
          tiles.addTo(instance);
        } catch {
          instance?.remove();
          instance = undefined;
          error = 'The map could not start. Check your browser and token.';
        }
      })
      .catch(() => {
        if (!disposed) error = 'Leaflet could not load. Check your network connection.';
      });

    return () => {
      disposed = true;
      instance?.remove();
    };
  });
</script>

<p id="map-error" role="alert" hidden={!error}>{error}</p>
<div
  bind:this={container}
  role="region"
  aria-label="Interactive map of Tehran"
  aria-describedby="map-error"
  style="width: 100%; height: 500px"
></div>
