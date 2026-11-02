<script setup lang="ts">
useHead({
  title: 'Stateful Parsimap + Leaflet + Nuxt',
  meta: [
    {
      name: 'description',
      content: 'Stateful interactive Parsimap raster map using Leaflet and Nuxt.',
    },
  ],
});
</script>

<template>
  <main><StatefulMap /></main>
</template>
