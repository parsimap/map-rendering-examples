import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import 'map_error.dart';

const tilesetId = 'parsimap-streets-v11-raster';
const token = String.fromEnvironment('PARSIMAP_MAP_TOKEN');

void main() => runApp(const MaterialApp(home: ParsimapMap()));

class ParsimapMap extends StatefulWidget {
  const ParsimapMap({super.key});

  @override
  State<ParsimapMap> createState() => _ParsimapMapState();
}

class _ParsimapMapState extends State<ParsimapMap> {
  bool _hasLoadedTile = false;
  bool _failed = false;

  @override
  Widget build(BuildContext context) {
    if (token.isEmpty || token == 'YOUR_TOKEN_HERE') {
      return const Scaffold(body: MapError('Set your token in config.json.'));
    }

    // SafeArea keeps the attribution clear of the system bars.
    return Scaffold(
      body: Stack(
        children: [
          SafeArea(
            child: FlutterMap(
              options: const MapOptions(
                initialCenter: LatLng(35.6892, 51.389),
                initialZoom: 11,
                minZoom: 1,
                maxZoom: 18,
              ),
              children: [
                TileLayer(
                  urlTemplate: 'https://api.parsimap.ir/tile/$tilesetId/{z}/{x}/{y}?key=${Uri.encodeComponent(token)}',
                  minNativeZoom: 1,
                  maxNativeZoom: 18,
                  userAgentPackageName: 'ir.parsimap.examples.fluttermap',
                  tileBuilder: (context, tileWidget, tile) {
                    if (tile.readyToDisplay && !tile.loadError) _hasLoadedTile = true;
                    return tileWidget;
                  },
                  // Report failures only while no tile has loaded, as one failed tile does not hide the map.
                  errorTileCallback: (tile, error, stackTrace) {
                    if (!_hasLoadedTile && !_failed) setState(() => _failed = true);
                  },
                ),
                // An (i) button that opens the attribution, like the MapLibre and Mapbox SDKs.
                const RichAttributionWidget(
                  attributions: [
                    TextSourceAttribution('Mapbox'),
                    TextSourceAttribution('OpenStreetMap'),
                    TextSourceAttribution('Parsimap'),
                  ],
                ),
              ],
            ),
          ),
          if (_failed) const MapError('The map tiles could not load. Check your token and network connection.'),
        ],
      ),
    );
  }
}
