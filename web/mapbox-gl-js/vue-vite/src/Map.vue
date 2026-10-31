<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
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

const container = ref<HTMLDivElement | null>(null);
const error = ref('');
let map: mapboxgl.Map | undefined;

onMounted(() => {
  const token = import.meta.env.VITE_PMI_MAP_TOKEN;
  if (!mapboxgl.supported()) {
    error.value = 'This browser does not support the WebGL features required to display the map.';
    return;
  }
  if (!token || token === 'YOUR_TOKEN_HERE') {
    error.value = 'Set VITE_PMI_MAP_TOKEN in .env.local.';
    return;
  }
  if (!container.value) return;

  try {
    preloadMapboxPlugins();
    map = new mapboxgl.Map({
      container: container.value,
      style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
      center: [51.389, 35.6892],
      zoom: 11,
    });
    map.addControl(new mapboxgl.NavigationControl());
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
  <main>
    <p v-if="error" role="alert">{{ error }}</p>
    <div ref="container" style="width: 100%; height: 500px"></div>
  </main>
</template>
