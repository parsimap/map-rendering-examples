# Parsimap + flutter_map + Flutter

<!-- docs-link:start -->
Documentation: [flutter_map with Flutter](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/flutter/flutter-map)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Flutter 3.47.9 or a later 3.x release.
- For Android: Android Studio or the Android SDK, and a device or emulator running Android 7.0 (API level 24) or later.
- For iOS: a Mac with Xcode, and a device or simulator running iOS 15.0 or later.

The example uses flutter_map 8.3.2, which draws raster tiles in Dart without a native map SDK.

## Setup and run

1. Copy `config.example.json` to `config.json` and replace `YOUR_TOKEN_HERE` with your token. `config.json` is ignored by Git.
2. Run `flutter run --dart-define-from-file=config.json` with a device or simulator connected.

Without a token, the app shows a message instead of the map. In Android Studio or VS Code, add `--dart-define-from-file=config.json` to the run configuration's additional arguments.

## Build

```sh
flutter analyze
flutter build apk --debug
flutter build ios --simulator --debug
```

## Files

- `pubspec.yaml`: adds flutter_map and latlong2.
- `lib/main.dart`: shows the raster map and its attribution.
- `lib/map_error.dart`: shows the error message.
- `android/app/src/main/AndroidManifest.xml`: adds the `INTERNET` permission for release builds.
