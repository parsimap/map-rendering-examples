<script setup>
import { nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

const container = ref(null);
const map = shallowRef(null);
const error = ref('');
const token = useRuntimeConfig().public.pmiMapToken;

onMounted(async () => {
  await nextTick();
  if (!container.value) return;
  if (!token || token === 'YOUR_TOKEN_HERE') {
    error.value = 'Set NUXT_PUBLIC_PMI_MAP_TOKEN in .env.';
    return;
  }
  let instance;
  try {
    maplibregl.setWorkerUrl(workerUrl);
    instance = new maplibregl.Map({
      container: container.value,
      style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
      center: [51.389, 35.6892],
      zoom: 11,
    });
    instance.addControl(new maplibregl.NavigationControl());
    instance.on('error', () => { error.value = 'The map could not load. Check your token and network connection.'; });
    map.value = instance;
  } catch {
    instance?.remove();
    error.value = 'The map could not start. Check your browser and token.';
  }
});

onUnmounted(() => {
  map.value?.remove();
  map.value = null;
});
</script>

<template>
  <div>
    <p v-if="error" role="alert">{{ error }}</p>
    <p v-else role="status">{{ map ? 'Map initialized.' : 'Initializing map…' }}</p>
    <div ref="container" style="width: 100%; height: 500px"></div>
  </div>
</template>
