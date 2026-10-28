import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import './style.css';

maplibregl.setWorkerUrl(workerUrl);

const token = import.meta.env.VITE_PMI_MAP_TOKEN;
const status = document.querySelector('#status');

if (!token || token === 'YOUR_PARSIMAP_TOKEN') {
  status.textContent = 'Set your Parsimap token in .env.local.';
} else {
  const styleUrl = new URL('https://api.parsimap.ir/styles/parsimap-streets-v11');
  styleUrl.searchParams.set('key', token);

  const map = new maplibregl.Map({
    container: 'map',
    style: styleUrl.toString(),
    center: [51.389, 35.6892],
    zoom: 11,
  });

  map.addControl(new maplibregl.NavigationControl());
  map.on('error', () => {
    status.textContent = 'Unable to load the map. Check your token and network connection.';
  });
}


