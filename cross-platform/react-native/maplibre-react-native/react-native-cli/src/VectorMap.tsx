import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import MapError from './MapError';
import { MAP_TOKEN, MISSING_TOKEN_MESSAGE } from './map-token';

const STYLE_ID = 'parsimap-streets-v11';

export default function VectorMap() {
  const [failed, setFailed] = useState(false);

  if (!MAP_TOKEN || MAP_TOKEN === 'YOUR_TOKEN_HERE') {
    return <MapError message={MISSING_TOKEN_MESSAGE} />;
  }

  return (
    <View style={styles.container}>
      <Map
        style={styles.container}
        mapStyle={`https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(MAP_TOKEN)}`}
        onDidFailLoadingMap={() => setFailed(true)}
      >
        <Camera initialViewState={{ center: [51.389, 35.6892], zoom: 11 }} />
      </Map>
      {failed && <MapError message="The map could not load. Check your token and network connection." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
