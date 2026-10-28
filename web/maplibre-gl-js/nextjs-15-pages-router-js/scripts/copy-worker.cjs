const fs = require('node:fs');

fs.mkdirSync('public', { recursive: true });
fs.copyFileSync('node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs', 'public/maplibre-gl-worker.mjs');
