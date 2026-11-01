import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILESET_ID = 'parsimap-streets-v11-raster';

const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

export default function StatefulMap() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!container) return;

    const token = import.meta.env.VITE_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      setError('Set VITE_PMI_MAP_TOKEN in .env.local.');
      return;
    }

    let instance: L.Map | undefined;
    try {
      instance = L.map(container).setView([35.6892, 51.389], 11);
      const attributionContainer = instance.attributionControl.getContainer();
      if (attributionContainer) {
        attributionContainer.dir = 'ltr';
        attributionContainer.style.unicodeBidi = 'isolate';
      }

      const tiles = L.tileLayer(
        `https://api.parsimap.ir/tile/${TILESET_ID}/{z}/{x}/{y}?key=${encodeURIComponent(token)}`,
        { attribution: ATTRIBUTION, minZoom: 1, maxZoom: 18 },
      );
      let hasLoadedTile = false;
      tiles.on('tileload', () => {
        hasLoadedTile = true;
        setError('');
      });
      tiles.on('tileerror', () => {
        if (!hasLoadedTile) setError('The map tiles could not load. Check your token and network connection.');
      });
      tiles.addTo(instance);
      setMap(instance);
    } catch {
      instance?.remove();
      setError('The map could not start. Check your browser and token.');
      return;
    }

    return () => {
      instance?.remove();
      setMap((current) => (current === instance ? null : current));
    };
  }, [container]);

  const status = error || (map ? 'Map initialized.' : 'Initializing map…');

  return (
    <main>
      <p id="map-status" role={error ? 'alert' : 'status'}>{status}</p>
      <div
        ref={setContainer}
        role="region"
        aria-label="Interactive map of Tehran"
        aria-describedby="map-status"
        style={{ width: '100%', height: '500px' }}
      />
    </main>
  );
}
