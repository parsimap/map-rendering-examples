<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import L from 'leaflet';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILESET_ID = 'parsimap-streets-v11-raster';

const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

const container = ref<HTMLDivElement | null>(null);
const map = shallowRef<LeafletMap | null>(null);
const error = ref('');
const status = computed(() => error.value || (map.value ? 'Map initialized.' : 'Initializing map…'));
const token = useRuntimeConfig().public.pmiMapToken;

onMounted(async () => {
  await nextTick();
  if (!token || token === 'YOUR_TOKEN_HERE') {
    error.value = 'Set NUXT_PUBLIC_PMI_MAP_TOKEN in .env.';
    return;
  }
  if (!container.value) return;

  let instance: LeafletMap | undefined;
  try {
    instance = L.map(container.value).setView([35.6892, 51.389], 11);
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
      error.value = 'The map tiles could not load. Check your token and network connection.';
    });
    tiles.addTo(instance);
    map.value = instance;
  } catch {
    instance?.remove();
    error.value = 'The map could not start. Check your browser and token.';
  }
});

onBeforeUnmount(() => {
  map.value?.remove();
  map.value = null;
});
</script>

<template>
  <div>
    <p id="map-status" :role="error ? 'alert' : 'status'">{{ status }}</p>
    <div
      ref="container"
      role="region"
      aria-label="Interactive map of Tehran"
      aria-describedby="map-status"
      style="width: 100%; height: 500px"
    ></div>
  </div>
</template>
