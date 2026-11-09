import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { Camera, MapView } from '@rnmapbox/maps';
import MapError from './MapError';
import { MAPBOX_ACCESS_TOKEN, MAP_TOKEN, MISSING_TOKEN_MESSAGE } from './map-token';

const STYLE_ID = 'parsimap-streets-v11';

const isSet = (token: string) => token !== '' && !token.startsWith('YOUR_');

// The Mapbox token must be set before the first MapView is created.
if (isSet(MAPBOX_ACCESS_TOKEN)) Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

export default function ParsimapMap() {
  const [failed, setFailed] = useState(false);

  if (!isSet(MAP_TOKEN) || !isSet(MAPBOX_ACCESS_TOKEN)) {
    return <MapError message={MISSING_TOKEN_MESSAGE} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        styleURL={`https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(MAP_TOKEN)}`}
        // Only a style failure hides the map; a single failed tile does not.
        onMapLoadingError={(error) => {
          if (error?.type === 'style') setFailed(true);
        }}
      >
        <Camera defaultSettings={{ centerCoordinate: [51.389, 35.6892], zoomLevel: 11 }} />
      </MapView>
      {failed && <MapError message="The map could not load. Check your token and network connection." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
