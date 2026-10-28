import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';

export default function StatefulMap() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PMI_MAP_TOKEN;
    if (!token || token === 'YOUR_TOKEN_HERE') {
      throw new Error('Set NEXT_PUBLIC_PMI_MAP_TOKEN in .env.local');
    }

    maplibregl.setWorkerUrl(
      new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString()
    );
    const instance = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(token),
      center: [51.389, 35.6892],
      zoom: 11,
    });
    instance.addControl(new maplibregl.NavigationControl());
    setMap(instance);
    return () => instance.remove();
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
      {map && <p>Map initialized.</p>}
    </>
  );
}
