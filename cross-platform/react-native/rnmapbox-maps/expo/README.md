# Parsimap + rnmapbox + React Native (Expo)

<!-- docs-link:start -->
Documentation: [rnmapbox with React Native (Expo)](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/react-native/rnmapbox-maps/expo)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- A Mapbox account and its default public token from the [Mapbox access tokens page](https://account.mapbox.com/access-tokens/). The Mapbox SDK does not show a map without it, and usage counts toward your Mapbox account.
- Node.js `^22.13.0 || ^24.3.0 || >=26.0.0`.
- For Android: Android Studio or the Android SDK with JDK 17, and a device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.
- For iOS: a Mac with Xcode and CocoaPods, and a device or simulator running iOS 15.1 or later.

The example uses Expo SDK 58 (React Native 0.88.1) and @rnmapbox/maps 10.3.16 with its default Mapbox Maps SDK 11.33.0. The map package contains native code, so the app runs as a development build, not in Expo Go.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local`. Replace `YOUR_TOKEN_HERE` with your Parsimap token and `YOUR_MAPBOX_TOKEN_HERE` with your Mapbox token. `.env.local` is ignored by Git.
3. Run `npm run android` or `npm run ios`. Expo generates the `android` and `ios` folders, builds the app, and starts it on a connected device, emulator, or simulator.

Without both tokens, the app shows a message instead of the map.

## Build

```sh
npm run typecheck
npx expo prebuild
```

Then build `android` with `./gradlew assembleDebug`, or `ios` with Xcode after `pod install`.

## Files

- `app.json`: adds the rnmapbox config plugin and the app identifiers.
- `src/map-token.ts`: reads the tokens from `.env.local`.
- `src/ParsimapMap.tsx`: sets the Mapbox token and shows the map.
- `src/MapError.tsx`: shows the error message.
- `App.tsx`: shows the map inside the safe area.
