import 'package:flutter/material.dart';
import 'package:mapbox_maps_flutter/mapbox_maps_flutter.dart';

import 'map_error.dart';

const styleId = 'parsimap-streets-v11';
const token = String.fromEnvironment('PARSIMAP_MAP_TOKEN');
const mapboxToken = String.fromEnvironment('MAPBOX_ACCESS_TOKEN');

bool isSet(String value) => value.isNotEmpty && !value.startsWith('YOUR_');

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  // The Mapbox token must be set before the first MapWidget is created.
  if (isSet(mapboxToken)) MapboxOptions.setAccessToken(mapboxToken);
  runApp(const MaterialApp(home: ParsimapMap()));
}

class ParsimapMap extends StatefulWidget {
  const ParsimapMap({super.key});

  @override
  State<ParsimapMap> createState() => _ParsimapMapState();
}

class _ParsimapMapState extends State<ParsimapMap> {
  bool _failed = false;

  @override
  Widget build(BuildContext context) {
    if (!isSet(token) || !isSet(mapboxToken)) {
      return const Scaffold(body: MapError('Set your Parsimap and Mapbox tokens in config.json.'));
    }

    // SafeArea keeps the Mapbox logo and attribution clear of the system bars.
    return Scaffold(
      body: Stack(
        children: [
          SafeArea(
            child: MapWidget(
              styleUri: 'https://api.parsimap.ir/styles/$styleId?key=${Uri.encodeComponent(token)}',
              viewport: CameraViewportState(
                center: Point(coordinates: Position(51.389, 35.6892)),
                zoom: 11,
              ),
              // Only a style failure hides the map; a single failed tile does not.
              onMapLoadErrorListener: (error) {
                if (error.type == MapLoadErrorType.STYLE) setState(() => _failed = true);
              },
            ),
          ),
          if (_failed) const MapError('The map could not load. Check your token and network connection.'),
        ],
      ),
    );
  }
}
