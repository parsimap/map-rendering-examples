import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:maplibre_gl/maplibre_gl.dart';

import 'map_error.dart';

const tilesetId = 'parsimap-streets-v11-raster';
const token = String.fromEnvironment('PARSIMAP_MAP_TOKEN');
const attribution =
    '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | '
    '<a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | '
    '<a href="https://www.parsimap.ir">&copy; Parsimap</a>';

void main() => runApp(const MaterialApp(home: ParsimapRasterMap()));

class ParsimapRasterMap extends StatelessWidget {
  const ParsimapRasterMap({super.key});

  @override
  Widget build(BuildContext context) {
    if (token.isEmpty || token == 'YOUR_TOKEN_HERE') {
      return const Scaffold(body: MapError('Set your token in config.json.'));
    }

    // A style with a single raster source, passed to the map as JSON.
    final style = jsonEncode({
      'version': 8,
      'sources': {
        tilesetId: {
          'type': 'raster',
          'tiles': ['https://api.parsimap.ir/tile/$tilesetId/{z}/{x}/{y}?key=${Uri.encodeComponent(token)}'],
          'tileSize': 256,
          'minzoom': 1,
          'maxzoom': 18,
          'attribution': attribution,
        },
      },
      'layers': [
        {'id': tilesetId, 'type': 'raster', 'source': tilesetId},
      ],
    });

    return Scaffold(
      body: SafeArea(
        child: MapLibreMap(
          styleString: style,
          initialCameraPosition: const CameraPosition(target: LatLng(35.6892, 51.389), zoom: 11),
        ),
      ),
    );
  }
}
