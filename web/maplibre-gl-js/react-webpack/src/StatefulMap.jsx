import React, { useEffect, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const STYLE_ID = 'parsimap-streets-v11';

maplibregl.setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString());

export default function StatefulMap() {
  const [container, setContainer] = useState(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!container) return;
    const token = PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      setError('Set PMI_MAP_TOKEN in .env.local.');
      return;
    }
    let instance;
    try {
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
      instance.remove();
      setMap((current) => current === instance ? null : current);
    };
  }, [container]);

  return (
    <main>
      {error ? <p role="alert">{error}</p> : <p role="status">{map ? 'Map initialized.' : 'Initializing map…'}</p>}
      <div ref={setContainer} style={{ width: '100%', height: '500px' }} />
    </main>
  );
}
