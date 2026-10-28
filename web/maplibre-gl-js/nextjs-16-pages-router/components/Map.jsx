import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';

export default function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      throw new Error('Set NEXT_PUBLIC_PMI_MAP_TOKEN in .env.local');
    }

    maplibregl.setWorkerUrl(
      new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString()
    );
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
      center: [51.389, 35.6892],
      zoom: 11,
    });
    map.addControl(new maplibregl.NavigationControl());
    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
}
