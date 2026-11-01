<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import L from 'leaflet';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILESET_ID = 'parsimap-streets-v11-raster';

const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

const container = ref<HTMLDivElement | null>(null);
const error = ref('');
const token = useRuntimeConfig().public.pmiMapToken;
let map: LeafletMap | undefined;

onMounted(async () => {
  await nextTick();
  if (!token || token === 'YOUR_TOKEN_HERE') {
    error.value = 'Set NUXT_PUBLIC_PMI_MAP_TOKEN in .env.';
    return;
  }
  if (!container.value) return;

  try {
    map = L.map(container.value).setView([35.6892, 51.389], 11);
    const attributionContainer = map.attributionControl.getContainer();
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
      error.value = '';
    });
    tiles.on('tileerror', () => {
      if (!hasLoadedTile) error.value = 'The map tiles could not load. Check your token and network connection.';
    });
    tiles.addTo(map);
  } catch {
    map?.remove();
    map = undefined;
    error.value = 'The map could not start. Check your browser and token.';
  }
});

onBeforeUnmount(() => map?.remove());
</script>

<template>
  <div>
    <p id="map-error" role="alert" :hidden="!error">{{ error }}</p>
    <div
      ref="container"
      role="region"
      aria-label="Interactive map of Tehran"
      aria-describedby="map-error"
      style="width: 100%; height: 500px"
    ></div>
  </div>
</template>
