import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ParsimapMap from './src/ParsimapMap';

export default function App() {
  // SafeAreaView keeps the Mapbox logo and attribution clear of the system bars.
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ParsimapMap />
        <StatusBar barStyle="dark-content" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
