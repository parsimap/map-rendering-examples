import 'package:flutter/material.dart';
import 'package:maplibre_gl/maplibre_gl.dart';

import 'map_error.dart';

const styleId = 'parsimap-streets-v11';
const token = String.fromEnvironment('PARSIMAP_MAP_TOKEN');

void main() => runApp(const MaterialApp(home: ParsimapMap()));

class ParsimapMap extends StatelessWidget {
  const ParsimapMap({super.key});

  @override
  Widget build(BuildContext context) {
    if (token.isEmpty || token == 'YOUR_TOKEN_HERE') {
      return const Scaffold(body: MapError('Set your token in config.json.'));
    }

    // SafeArea keeps the map's attribution clear of the system bars.
    return Scaffold(
      body: SafeArea(
        child: MapLibreMap(
          styleString: 'https://api.parsimap.ir/styles/$styleId?key=${Uri.encodeComponent(token)}',
          initialCameraPosition: const CameraPosition(target: LatLng(35.6892, 51.389), zoom: 11),
        ),
      ),
    );
  }
}
