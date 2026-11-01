import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILESET_ID = 'parsimap-streets-v11-raster';

const token = PMI_MAP_TOKEN;
const errorElement = document.getElementById('map-error');

function showError(message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

if (!token || token === 'YOUR_TOKEN_HERE') {
  showError('Set PMI_MAP_TOKEN in .env.local.');
} else {
  try {
    const map = L.map('map').setView([35.6892, 51.389], 11);
    const tiles = L.tileLayer(
      `https://api.parsimap.ir/tile/${TILESET_ID}/{z}/{x}/{y}?key=${encodeURIComponent(token)}`,
      {
        attribution: '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>',
        minZoom: 1,
        maxZoom: 18,
      },
    );

    tiles.on('tileerror', () => {
      showError('The map tiles could not load. Check your token and network connection.');
    });
    tiles.addTo(map);
  } catch {
    showError('The map could not start. Check your browser and token.');
  }
}
