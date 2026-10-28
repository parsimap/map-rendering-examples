import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.mjs';

const token = 'YOUR_TOKEN_HERE';
const status = document.querySelector('#status');

if (token === 'YOUR_TOKEN_HERE') {
  status.textContent = 'Set your Parsimap token in main.js.';
} else {
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
    center: [51.389, 35.6892],
    zoom: 11,
  });

  map.addControl(new maplibregl.NavigationControl());
  map.on('error', () => {
    status.textContent = 'Unable to load the map. Check your token and network connection.';
  });
}
