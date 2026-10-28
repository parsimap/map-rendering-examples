<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

maplibregl.setWorkerUrl(workerUrl);

const container = ref(null);
const error = ref('');
const loaded = ref(false);
let map;

onMounted(() => {
  const token = import.meta.env.VITE_PMI_MAP_TOKEN;
  if (!token || token === 'YOUR_TOKEN_HERE') {
    error.value = 'Set VITE_PMI_MAP_TOKEN in .env.local.';
    return;
  }

  try {
    map = new maplibregl.Map({
      container: container.value,
      style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
      center: [51.389, 35.6892],
      zoom: 11,
    });
    map.addControl(new maplibregl.NavigationControl());
    map.on('load', () => { loaded.value = true; });
    map.on('error', () => { error.value = 'The map could not load. Check your token and network connection.'; });
  } catch {
    map?.remove();
    map = undefined;
    error.value = 'The map could not start. Check your browser and token.';
  }
});

onUnmounted(() => map?.remove());
</script>

<template>
  <main>
    <p v-if="error" role="alert">{{ error }}</p>
    <p v-else role="status">{{ loaded ? 'Map loaded.' : 'Loading map…' }}</p>
    <div ref="container" style="width: 100%; height: 500px"></div>
  </main>
</template>
