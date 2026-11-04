# Parsimap + maplibre_gl + Flutter

<!-- docs-link:start -->
Documentation: [maplibre_gl with Flutter](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/flutter/maplibre-gl)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Flutter 3.47.9 or a later 3.x release.
- For Android: Android Studio or the Android SDK, and a device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.
- For iOS: a Mac with Xcode, and a device or simulator running iOS 15.5 or later.

The example uses maplibre_gl 0.28.0, which bundles MapLibre Native Android 13.7.1 and MapLibre Native iOS 7.0.0. On iOS, the plugin is added through Swift Package Manager, which Flutter enables by default.

## Setup and run

1. Copy `config.example.json` to `config.json` and replace `YOUR_TOKEN_HERE` with your token. `config.json` is ignored by Git.
2. Run `flutter run --dart-define-from-file=config.json` with a device or simulator connected.
3. To show the raster map, run `flutter run -t lib/main_raster.dart --dart-define-from-file=config.json`.

Without a token, both maps show a message instead of the map. In Android Studio or VS Code, add `--dart-define-from-file=config.json` to the run configuration's additional arguments.

## Build

```sh
flutter analyze
flutter build apk --debug
flutter build ios --simulator --debug
```

## Files

- `pubspec.yaml`: adds maplibre_gl.
- `lib/main.dart`: shows the vector map.
- `lib/main_raster.dart`: shows the raster map.
- `lib/map_error.dart`: shows the error message.
- `android/app/src/main/AndroidManifest.xml`: adds the `INTERNET` permission for release builds.
- `ios/Runner.xcodeproj/project.pbxproj`: raises the iOS deployment target to 15.5.
