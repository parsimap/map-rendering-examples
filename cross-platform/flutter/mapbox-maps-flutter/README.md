# Parsimap + mapbox_maps_flutter + Flutter

<!-- docs-link:start -->
Documentation: [mapbox_maps_flutter with Flutter](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/flutter/mapbox-maps-flutter)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- A Mapbox account and its default public token from the [Mapbox access tokens page](https://account.mapbox.com/access-tokens/). The Mapbox SDK does not show a map without it, and usage counts toward your Mapbox account.
- Flutter 3.47.9 or a later 3.x release.
- For Android: Android Studio or the Android SDK, and a device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.
- For iOS: a Mac with Xcode, and a device or simulator running iOS 15.0 or later.

The example uses mapbox_maps_flutter 3.34.2, which bundles the Mapbox Maps SDK 11. On iOS, the plugin is added through Swift Package Manager, which Flutter enables by default.

## Setup and run

1. Copy `config.example.json` to `config.json`. Replace `YOUR_TOKEN_HERE` with your Parsimap token and `YOUR_MAPBOX_TOKEN_HERE` with your Mapbox token. `config.json` is ignored by Git.
2. Run `flutter run --dart-define-from-file=config.json` with a device or simulator connected.

Without both tokens, the app shows a message instead of the map. In Android Studio or VS Code, add `--dart-define-from-file=config.json` to the run configuration's additional arguments.

## Build

```sh
flutter analyze
flutter build apk --debug
flutter build ios --simulator --debug
```

## Files

- `pubspec.yaml`: adds mapbox_maps_flutter.
- `lib/main.dart`: sets the Mapbox token and shows the map.
- `lib/map_error.dart`: shows the error message.
- `android/app/src/main/AndroidManifest.xml`: adds the `INTERNET` permission for release builds.
