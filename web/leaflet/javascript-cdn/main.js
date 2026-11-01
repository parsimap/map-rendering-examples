const token = 'YOUR_TOKEN_HERE';
const errorElement = document.getElementById('map-error');

function showError(message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

if (!window.L) {
  showError('Leaflet could not load. Check your network connection and reload the page.');
} else if (!token || token === 'YOUR_TOKEN_HERE') {
  showError('Set your token in main.js.');
} else {
  try {
    const map = L.map('map').setView([35.6892, 51.389], 11);
    const tiles = L.tileLayer(
      `https://api.parsimap.ir/tile/parsimap/{z}/{x}/{y}?key=${encodeURIComponent(token)}`,
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
