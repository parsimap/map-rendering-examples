import { StyleSheet, Text } from 'react-native';

/** Shows a message above the map. */
export default function MapError({ message }: { message: string }) {
  return (
    <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="assertive">
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    color: '#b00020',
  },
});
