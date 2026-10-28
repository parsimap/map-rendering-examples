<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

const STYLE_ID = 'parsimap-streets-v11';

const container = ref<HTMLDivElement | null>(null);
const error = ref('');
const token = useRuntimeConfig().public.pmiMapToken;
let map: maplibregl.Map | undefined;

onMounted(async () => {
  await nextTick();
  if (!token || token === 'YOUR_TOKEN_HERE') {
    error.value = 'Set NUXT_PUBLIC_PMI_MAP_TOKEN in .env.';
    return;
  }
  if (!container.value) return;

  try {
    maplibregl.setWorkerUrl(workerUrl);
    map = new maplibregl.Map({
      container: container.value,
      style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
      center: [51.389, 35.6892],
      zoom: 11,
    });
    map.addControl(new maplibregl.NavigationControl());
    map.on('error', () => {
      error.value = 'The map could not load. Check your token and network connection.';
    });
  } catch {
    map?.remove();
    map = undefined;
    error.value = 'The map could not start. Check your browser and token.';
  }
});

onUnmounted(() => map?.remove());
</script>

<template>
  <div>
    <p v-if="error" role="alert">{{ error }}</p>
    <div ref="container" style="width: 100%; height: 500px"></div>
  </div>
</template>
