import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.mjs';

const STYLE_ID = 'parsimap-streets-v11';
const token = 'YOUR_TOKEN_HERE';
const errorElement = document.getElementById('map-error');

function showError(message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

if (!token || token === 'YOUR_TOKEN_HERE') {
  showError('Set your token in main.js.');
} else {
  try {
    const map = new maplibregl.Map({
      container: 'map',
      style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
      center: [51.389, 35.6892],
      zoom: 11,
    });
    map.addControl(new maplibregl.NavigationControl());
    map.on('error', () => showError('The map could not load. Check your token and network connection.'));
  } catch {
    showError('The map could not start. Check your browser and token.');
  }
}
