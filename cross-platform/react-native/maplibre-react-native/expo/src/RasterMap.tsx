import { StyleSheet } from 'react-native';
import { Camera, Map, type StyleSpecification } from '@maplibre/maplibre-react-native';
import MapError from './MapError';
import { MAP_TOKEN, MISSING_TOKEN_MESSAGE } from './map-token';

const TILESET_ID = 'parsimap-streets-v11-raster';
const ATTRIBUTION =
  '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | ' +
  '<a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | ' +
  '<a href="https://www.parsimap.ir">&copy; Parsimap</a>';

export default function RasterMap() {
  if (!MAP_TOKEN || MAP_TOKEN === 'YOUR_TOKEN_HERE') {
    return <MapError message={MISSING_TOKEN_MESSAGE} />;
  }

  // A style with a single raster source.
  const style: StyleSpecification = {
    version: 8,
    sources: {
      [TILESET_ID]: {
        type: 'raster',
        tiles: [`https://api.parsimap.ir/tile/${TILESET_ID}/{z}/{x}/{y}?key=${encodeURIComponent(MAP_TOKEN)}`],
        tileSize: 256,
        minzoom: 1,
        maxzoom: 18,
        attribution: ATTRIBUTION,
      },
    },
    layers: [{ id: TILESET_ID, type: 'raster', source: TILESET_ID }],
  };

  return (
    <Map style={styles.map} mapStyle={style}>
      <Camera initialViewState={{ center: [51.389, 35.6892], zoom: 11 }} />
    </Map>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
