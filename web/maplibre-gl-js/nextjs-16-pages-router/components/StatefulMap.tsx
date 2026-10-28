import { useEffect, useState } from 'react';
import * as maplibregl from 'maplibre-gl';

const STYLE_ID = 'parsimap-streets-v11';

export default function StatefulMap() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!container) return;

    const token = process.env.NEXT_PUBLIC_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      setError('Set NEXT_PUBLIC_PMI_MAP_TOKEN in .env.local.');
      return;
    }

    let instance: maplibregl.Map | undefined;
    try {
      maplibregl.setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString());
      instance = new maplibregl.Map({
        container,
        style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
        center: [51.389, 35.6892],
        zoom: 11,
      });
      instance.addControl(new maplibregl.NavigationControl());
      instance.on('error', () => setError('The map could not load. Check your token and network connection.'));
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

  return (
    <main>
      {error ? <p role="alert">{error}</p> : <p role="status">{map ? 'Map initialized.' : 'Initializing map…'}</p>}
      <div ref={setContainer} style={{ width: '100%', height: '500px' }} />
    </main>
  );
}
