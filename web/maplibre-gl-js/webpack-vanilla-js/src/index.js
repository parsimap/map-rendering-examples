import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

maplibregl.setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString());

const token = 'YOUR_TOKEN_HERE';
if (!token || token === 'YOUR_TOKEN_HERE') {
  throw new Error('Set your Parsimap token');
}

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
  center: [51.389, 35.6892],
  zoom: 11,
});

map.addControl(new maplibregl.NavigationControl());
