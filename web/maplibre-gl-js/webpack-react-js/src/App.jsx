import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

maplibregl.setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString());

export default function App() {
  const container = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      setError('Set PMI_MAP_TOKEN in .env.local.');
      return;
    }

    let map;
    try {
      map = new maplibregl.Map({
        container: container.current,
        style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
        center: [51.389, 35.6892],
        zoom: 11,
      });
      map.addControl(new maplibregl.NavigationControl());
      map.on('error', () => setError('The map could not load. Check your token and network connection.'));
    } catch {
      setError('The map could not start. Check your browser and token.');
    }
    return () => map?.remove();
  }, []);

  return <main>{error && <p role="alert">{error}</p>}<div ref={container} style={{ width: '100%', height: '500px' }} /></main>;
}
