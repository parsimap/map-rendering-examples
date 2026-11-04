# Parsimap + MapLibre React Native + React Native (Expo)

<!-- docs-link:start -->
Documentation: [MapLibre React Native with React Native (Expo)](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/react-native/maplibre-react-native/expo)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^22.13.0 || ^24.3.0 || >=26.0.0`.
- For Android: Android Studio or the Android SDK with JDK 17, and a device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.
- For iOS: a Mac with Xcode and CocoaPods, and a device or simulator running iOS 15.1 or later.

The example uses Expo SDK 58 (React Native 0.88.1) and @maplibre/maplibre-react-native 11.5.1 with its default native SDKs, MapLibre Native Android 13.6.1 and MapLibre Native iOS 6.31.0. The map package contains native code, so the app runs as a development build, not in Expo Go.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your token. `.env.local` is ignored by Git.
3. Run `npm run android` or `npm run ios`. Expo generates the `android` and `ios` folders, builds the app, and starts it on a connected device, emulator, or simulator.

The tabs above the map switch between the vector map and the raster map. Without a token, both show a message instead of the map.

## Build

```sh
npm run typecheck
npx expo prebuild
```

Then build `android` with `./gradlew assembleDebug`, or `ios` with Xcode after `pod install`.

## Files

- `app.json`: adds the MapLibre React Native config plugin and the app identifiers.
- `src/map-token.ts`: reads the token from `.env.local`.
- `src/VectorMap.tsx`: shows the vector map.
- `src/RasterMap.tsx`: shows the raster map.
- `src/MapError.tsx`: shows the error message.
- `App.tsx`: switches between the two maps inside the safe area.
