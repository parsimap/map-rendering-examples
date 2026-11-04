# Parsimap + MapLibre React Native + React Native (React Native CLI)

<!-- docs-link:start -->
Documentation: [MapLibre React Native with React Native CLI](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/react-native/maplibre-react-native/react-native-cli)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^22.13.0 || ^24.3.0 || >=26.0.0`.
- For Android: Android Studio or the Android SDK with JDK 17, and a device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.
- For iOS: a Mac with Xcode and CocoaPods, and a device or simulator running iOS 15.1 or later.

The example was created with `@react-native-community/cli` 20.2.0 and React Native 0.88.1, and uses @maplibre/maplibre-react-native 11.5.1 with its default native SDKs, MapLibre Native Android 13.6.1 and MapLibre Native iOS 6.31.0.

## Setup and run

1. Run `npm ci`.
2. Copy `src/map-token.example.ts` to `src/map-token.ts` and replace `YOUR_TOKEN_HERE` with your token. `src/map-token.ts` is ignored by Git.
3. For iOS, run `pod install` in the `ios` folder.
4. Run `npm run android` or `npm run ios` with a device, emulator, or simulator available.

The tabs above the map switch between the vector map and the raster map. Without a token, both show a message instead of the map.

## Build

```sh
npm run typecheck
npm run lint
```

Then build `android` with `./gradlew assembleDebug`, or `ios` with Xcode after `pod install`.

## Files

- `ios/Podfile`: calls `$MLRN.post_install(installer)`, which adds MapLibre Native iOS to the app.
- `src/map-token.example.ts`: holds the token.
- `src/VectorMap.tsx`: shows the vector map.
- `src/RasterMap.tsx`: shows the raster map.
- `src/MapError.tsx`: shows the error message.
- `App.tsx`: switches between the two maps inside the safe area.
- `tsconfig.json`: removes the Jest types, as the example has no tests.
