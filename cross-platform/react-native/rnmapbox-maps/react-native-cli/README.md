# Parsimap + rnmapbox + React Native (React Native CLI)

<!-- docs-link:start -->
Documentation: [rnmapbox with React Native CLI](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/react-native/rnmapbox-maps/react-native-cli)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- A Mapbox account and its default public token from the [Mapbox access tokens page](https://account.mapbox.com/access-tokens/). The Mapbox SDK does not show a map without it, and usage counts toward your Mapbox account.
- Node.js `^22.13.0 || ^24.3.0 || >=26.0.0`.
- For Android: Android Studio or the Android SDK with JDK 17, and a device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.
- For Android on Windows: [long paths](https://learn.microsoft.com/windows/win32/fileio/maximum-file-path-limitation#enable-long-paths-in-windows-10-version-1607-and-later) enabled, and CMake 4.1.0 installed from the Android Studio SDK Manager (SDK Tools, with Show Package Details selected).
- For iOS: a Mac with Xcode and CocoaPods, and a device or simulator running iOS 15.1 or later.

The example was created with `@react-native-community/cli` 20.2.0 and React Native 0.88.1, and uses @rnmapbox/maps 10.3.16 with its default Mapbox Maps SDK 11.33.0.

## Setup and run

1. Run `npm ci`.
2. Copy `src/map-token.example.ts` to `src/map-token.ts`. Replace `YOUR_TOKEN_HERE` with your Parsimap token and `YOUR_MAPBOX_TOKEN_HERE` with your Mapbox token. `src/map-token.ts` is ignored by Git.
3. For iOS, run `pod install` in the `ios` folder.
4. Run `npm run android` or `npm run ios` with a device, emulator, or simulator available.

Without both tokens, the app shows a message instead of the map.

## Build

```sh
npm run typecheck
npm run lint
```

Then build `android` with `./gradlew assembleDebug` (`gradlew.bat assembleDebug` on Windows), or `ios` with Xcode after `pod install`.

## Files

- `android/build.gradle`: adds the Mapbox Maven repository.
- `android/app/build.gradle`: on Windows, builds native code with CMake 4.1.0, whose Ninja supports paths longer than 260 characters.
- `ios/Podfile`: calls `$RNMapboxMaps.pre_install` and `$RNMapboxMaps.post_install`, which add the Mapbox Maps SDK to the app.
- `src/map-token.example.ts`: holds the tokens.
- `src/ParsimapMap.tsx`: sets the Mapbox token and shows the map.
- `src/MapError.tsx`: shows the error message.
- `App.tsx`: shows the map inside the safe area.
- `tsconfig.json`: removes the Jest types, as the example has no tests.
