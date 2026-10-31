import { useEffect, useRef, useState } from 'react';
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

export default function Map() {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PMI_MAP_TOKEN;
    if (!mapboxgl.supported()) {
      setError('This browser does not support the WebGL features required to display the map.');
      return;
    }
    if (!token || token === 'YOUR_TOKEN_HERE') {
      setError('Set NEXT_PUBLIC_PMI_MAP_TOKEN in .env.local.');
      return;
    }
    if (!container.current) return;

    let map: mapboxgl.Map | undefined;
    try {
      preloadMapboxPlugins();
      map = new mapboxgl.Map({
        container: container.current,
        style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(token)}`,
        center: [51.389, 35.6892],
        zoom: 11,
      });
      map.addControl(new mapboxgl.NavigationControl());
      map.on('error', () => setError('The map could not load. Check your token and network connection.'));
    } catch {
      map?.remove();
      setError('The map could not start. Check your browser and token.');
      return;
    }

    return () => map?.remove();
  }, []);

  return (
    <main>
      {error && <p role="alert">{error}</p>}
      <div ref={container} style={{ width: '100%', height: '500px' }} />
    </main>
  );
}
