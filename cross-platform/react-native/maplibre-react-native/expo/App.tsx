import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RasterMap from './src/RasterMap';
import VectorMap from './src/VectorMap';

const MAPS = { vector: 'Vector', raster: 'Raster' } as const;
type MapType = keyof typeof MAPS;

export default function App() {
  const [mapType, setMapType] = useState<MapType>('vector');

  // SafeAreaView keeps the map's attribution clear of the system bars.
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.switch} accessibilityRole="tablist">
          {(Object.keys(MAPS) as MapType[]).map((type) => (
            <Pressable
              key={type}
              style={[styles.option, mapType === type && styles.selected]}
              accessibilityRole="tab"
              accessibilityState={{ selected: mapType === type }}
              onPress={() => setMapType(type)}
            >
              <Text>{MAPS[type]}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.container}>{mapType === 'vector' ? <VectorMap /> : <RasterMap />}</View>
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  switch: { flexDirection: 'row' },
  option: { flex: 1, alignItems: 'center', padding: 12, borderBottomWidth: 2, borderColor: 'transparent' },
  selected: { borderColor: '#000000' },
});
