import 'package:flutter/material.dart';

/// Shows [message] above the map, clear of the system bars.
class MapError extends StatelessWidget {
  const MapError(this.message, {super.key});

  final String message;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Semantics(
        liveRegion: true,
        child: Container(
          width: double.infinity,
          margin: const EdgeInsets.all(16),
          padding: const EdgeInsets.all(12),
          color: Colors.white,
          child: Text(message, style: const TextStyle(color: Color(0xFFB00020))),
        ),
      ),
    );
  }
}
