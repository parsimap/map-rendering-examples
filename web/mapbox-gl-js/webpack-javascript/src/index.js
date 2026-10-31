import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const STYLE_ID = 'parsimap-streets-v11';
const token = PMI_MAP_TOKEN;
const errorElement = document.getElementById('map-error');

const preloadMapboxPlugins = (cdnUrl = 'https://cdn.parsimap.ir') => {
  if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
    mapboxgl.setRTLTextPlugin(
      `${cdnUrl}/third-party/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js`,
      () => {},
    );
  }
};

function showError(message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

if (!mapboxgl.supported()) {
  showError('This browser does not support the WebGL features required to display the map.');
} else if (!token || token === 'YOUR_TOKEN_HERE') {
  showError('Set PMI_MAP_TOKEN in .env.local.');
} else {
  try {
    preloadMapboxPlugins();
    const map = new mapboxgl.Map({
      container: 'map',
      style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
      center: [51.389, 35.6892],
      zoom: 11,
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.on('error', () => showError('The map could not load. Check your token and network connection.'));
  } catch {
    showError('The map could not start. Check your browser and token.');
  }
}
