'use client';

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const STYLE_ID = 'parsimap-streets-v11';

const preloadMapboxPlugins = (cdnUrl = 'https://cdn.parsimap.ir') => {
  if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
    mapboxgl.setRTLTextPlugin(
      `${cdnUrl}/third-party/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js`,
      () => {},
    );
  }
};

export default function StatefulMap() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!container) return;

    const token = process.env.NEXT_PUBLIC_PMI_MAP_TOKEN;
    if (!mapboxgl.supported()) {
      setError('This browser does not support the WebGL features required to display the map.');
      return;
    }
    if (!token || token === 'YOUR_TOKEN_HERE') {
      setError('Set NEXT_PUBLIC_PMI_MAP_TOKEN in .env.local.');
      return;
    }

    let instance: mapboxgl.Map | undefined;
    try {
      preloadMapboxPlugins();
      instance = new mapboxgl.Map({
        container,
        style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
        center: [51.389, 35.6892],
        zoom: 11,
      });
      instance.addControl(new mapboxgl.NavigationControl());
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
    <>
      {error ? <p role="alert">{error}</p> : <p role="status">{map ? 'Map initialized.' : 'Initializing map…'}</p>}
      <div ref={setContainer} style={{ width: '100%', height: '500px' }} />
    </>
  );
}
