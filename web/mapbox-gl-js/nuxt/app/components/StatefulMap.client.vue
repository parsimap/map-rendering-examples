<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue';
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
const map = shallowRef<mapboxgl.Map | null>(null);
const error = ref('');
const token = useRuntimeConfig().public.pmiMapToken;

onMounted(async () => {
  await nextTick();
  if (!mapboxgl.supported()) {
    error.value = 'This browser does not support the WebGL features required to display the map.';
    return;
  }
  if (!token || token === 'YOUR_TOKEN_HERE') {
    error.value = 'Set NUXT_PUBLIC_PMI_MAP_TOKEN in .env.';
    return;
  }
  if (!container.value) return;

  let instance: mapboxgl.Map | undefined;
  try {
    preloadMapboxPlugins();
    instance = new mapboxgl.Map({
      container: container.value,
      style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
      center: [51.389, 35.6892],
      zoom: 11,
    });
    instance.addControl(new mapboxgl.NavigationControl());
    instance.on('error', () => {
      error.value = 'The map could not load. Check your token and network connection.';
    });
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
