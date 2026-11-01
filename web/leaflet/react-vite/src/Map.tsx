import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILESET_ID = 'parsimap-streets-v11-raster';

const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

export default function Map() {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = import.meta.env.VITE_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      setError('Set VITE_PMI_MAP_TOKEN in .env.local.');
      return;
    }
    if (!container.current) return;

    let map: L.Map | undefined;
    try {
      map = L.map(container.current).setView([35.6892, 51.389], 11);
      const attributionContainer = map.attributionControl.getContainer();
      if (attributionContainer) {
        attributionContainer.dir = 'ltr';
        attributionContainer.style.unicodeBidi = 'isolate';
      }

      const tiles = L.tileLayer(
        `https://api.parsimap.ir/tile/${TILESET_ID}/{z}/{x}/{y}?key=${encodeURIComponent(token)}`,
        { attribution: ATTRIBUTION, minZoom: 1, maxZoom: 18 },
      );
      tiles.on('tileerror', () => {
        setError('The map tiles could not load. Check your token and network connection.');
      });
      tiles.addTo(map);
    } catch {
      map?.remove();
      setError('The map could not start. Check your browser and token.');
      return;
    }

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <main>
      <p id="map-error" role="alert" hidden={!error}>{error}</p>
      <div
        ref={container}
        role="region"
        aria-label="Interactive map of Tehran"
        aria-describedby="map-error"
        style={{ width: '100%', height: '500px' }}
      />
    </main>
  );
}
