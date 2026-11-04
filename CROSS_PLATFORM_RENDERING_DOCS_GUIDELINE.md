# Cross-platform map-rendering documentation guideline

This guideline governs the Android and iOS map-rendering guides for cross-platform frameworks in `parsimap/document-page-generator` and their runnable examples in `parsimap/map-rendering-examples`. The same file is kept at the root of both repositories; change both copies in the same pair of pull requests so they never drift.

It extends `ANDROID_RENDERING_DOCS_GUIDELINE.md` and the web conventions in `MAP_RENDERING_DOCS_IMPLEMENTATION.md` (documentation repository). Where this guideline is silent, follow those; where it differs, this guideline wins for cross-platform guides.

## Scope

Cross-platform guides are organised by framework first, then by map package, then (React Native only) by project type. Each guide stops at rendering a correctly sized interactive Parsimap basemap on Android and iOS.

| # | Framework | Language | Project type | Library | Guide slug | Tiles |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Flutter | Dart | Flutter app | `maplibre_gl` | `flutter/maplibre-gl` | vector, plus a raster section |
| 2 | Flutter | Dart | Flutter app | `mapbox_maps_flutter` | `flutter/mapbox-maps-flutter` | vector |
| 3 | Flutter | Dart | Flutter app | `flutter_map` | `flutter/flutter-map` | raster |
| 4 | React Native | TypeScript | Expo development build | `@maplibre/maplibre-react-native` | `react-native/maplibre-react-native/expo` | vector, plus a raster section |
| 5 | React Native | TypeScript | React Native CLI | `@maplibre/maplibre-react-native` | `react-native/maplibre-react-native/react-native-cli` | vector, plus a raster section |
| 6 | React Native | TypeScript | Expo development build | `@rnmapbox/maps` | `react-native/rnmapbox-maps/expo` | vector |
| 7 | React Native | TypeScript | React Native CLI | `@rnmapbox/maps` | `react-native/rnmapbox-maps/react-native-cli` | vector |
| 8 | Kotlin Multiplatform | Kotlin | Compose Multiplatform | maplibre-compose | `kotlin-multiplatform/maplibre-compose` | vector, plus a raster section |

The guide slug is relative to `docs/Render Maps/cross-platform/` in the documentation repository and to `cross-platform/` in the examples repository.

Out of scope:

- The `maplibre` Flutter package (pre-1.0, Flutter 3.47 minimum). `maplibre_gl` is the established MapLibre package for Flutter.
- `vector_map_tiles` for `flutter_map`: last released in August 2024. The `flutter_map` guide is raster-only.
- .NET MAUI (Mapsui), Ionic/Capacitor, Cordova, and other WebView apps. WebView apps follow the web guides.
- Expo Go: the map packages contain native code and need a development build.
- JavaScript-only React Native guides. TypeScript is the default for both Expo and the React Native CLI.
- Offline maps, markers, location tracking, and other features beyond the basemap.

### Sidebar hierarchy

```
Android و iOS                              cross-platform/
├─ Flutter                                 flutter/
│  ├─ maplibre_gl                          maplibre-gl.mdx
│  ├─ mapbox_maps_flutter                  mapbox-maps-flutter.mdx
│  ├─ flutter_map                          flutter-map.mdx
│  └─ رفع مشکلات                            troubleshooting.mdx
├─ React Native                            react-native/
│  ├─ MapLibre React Native                maplibre-react-native/ → Expo, React Native CLI
│  ├─ rnmapbox                             rnmapbox-maps/ → Expo, React Native CLI
│  └─ رفع مشکلات                            troubleshooting.mdx
└─ Kotlin Multiplatform                    kotlin-multiplatform/
   ├─ maplibre-compose                     maplibre-compose.mdx
   └─ رفع مشکلات                            troubleshooting.mdx
```

- `cross-platform/_category_.json` uses the label `Android و iOS`, position 4, and the slug `/category/render-maps-cross-platform`. Framework folders have their own generated index.
- Within a framework, MapLibre comes first, then Mapbox, then other packages, matching the overview's recommendation.
- Each framework folder has one `troubleshooting.mdx` and one `_next-steps.mdx` shared by its guides.

## Supported toolchain baseline

Versions below were resolved from official sources (pub.dev, npm, Maven Central, release notes) on 2026-11-03. Re-resolve them when implementing each batch and update this table, the examples, and the guides together.

| Item | Baseline | Notes |
| --- | --- | --- |
| Flutter | 3.47.9 (Dart 3.13.7) | `maplibre_gl` 0.28 requires Flutter 3.44 and Dart 3.12. |
| `maplibre_gl` | 0.28.0 | MapLibre Android 13.7.1, MapLibre iOS 7.0.0. Android API 24 and iOS 15.5 minimum. iOS builds use Swift Package Manager. |
| `mapbox_maps_flutter` | 3.34.2 | Mapbox Maps SDK 11. iOS through Swift Package Manager only. |
| `flutter_map` | 8.3.2 | Pure Dart, raster tiles only. |
| Expo SDK | 58.0.23 | React Native 0.88.1, React 19.3.0. |
| React Native CLI | `@react-native-community/cli` 20.2.0, React Native 0.88.1 | Project created from the `@react-native-community/template` 0.88.1 template. |
| `@maplibre/maplibre-react-native` | 11.5.1 | Default native SDKs: MapLibre Android 13.6.1 (OpenGL ES), MapLibre iOS 6.31.0. New Architecture only. Requires React Native 0.80, React 19.1, and Expo SDK 54 when Expo is used. |
| `@rnmapbox/maps` | 10.3.16 | Default native SDK: Mapbox Maps SDK 11.33.0 on Android and iOS. |
| Kotlin Multiplatform | Kotlin 2.4.21, Compose Multiplatform 1.12.2, AGP 9.5.0, Gradle 9.6.0, JDK 17 | Android app module and KMP library module are separate, as AGP 9 requires. The shared module targets `iosArm64` and `iosSimulatorArm64`, so simulator builds are arm64 only. |
| maplibre-compose | 0.20.0 | Android runtime `maplibre-compose-runtime-opengl-android`. iOS 15.5 minimum; the iOS app adds the system libraries maplibre-compose lists to Other Linker Flags. |
| Android SDK | compileSdk 37 where Compose or the framework template requires it, otherwise the template default; targetSdk 36 | Google Play requires targetSdk 36 from 2026-08-31. |
| Xcode | the version on GitHub's `macos-26` runner | iOS examples are built for the simulator without code signing. |

Version rules:

- Pin versions and commit lockfiles: `pubspec.yaml` constraints use the resolved version with `^` and `pubspec.lock` is committed; `package.json` pins the map package exactly, keeps the ranges that Expo or the React Native template installs for their own packages, and `package-lock.json` is committed; Gradle uses `gradle/libs.versions.toml`.
- Keep each library's default native SDK version. Do not override it in Gradle, CocoaPods, or config plugins.
- `maplibre_gl`, `flutter_map` majors, and maplibre-compose are pre-1.0 or change APIs between minor releases. Treat every minor upgrade as a guide update.
- Cover the latest stable version of each framework and library only.

## Shared integration contract

- **Style and tiles.** Same IDs, URLs, zoom range, and tile size as the Android guideline: `STYLE_ID = "parsimap-streets-v11"`, `TILESET_ID = "parsimap-streets-v11-raster"`, `minzoom 1`, `maxzoom 18`, tile size 256. URL-encode the token.
- **Initial camera.** Latitude `35.6892`, longitude `51.389`, zoom `11`. Use each library's own coordinate type and order.
- **Token.** Each framework uses its native configuration mechanism, and the build succeeds without a token so CI needs no secret:
  - Flutter: `--dart-define-from-file=config.json`, read with `String.fromEnvironment('PARSIMAP_MAP_TOKEN')`. Commit `config.example.json`; `config.json` is Git-ignored.
  - Expo: `EXPO_PUBLIC_PARSIMAP_MAP_TOKEN` in `.env.local`. Commit `.env.example`.
  - React Native CLI: `src/map-token.ts`, copied from the committed `src/map-token.example.ts` and Git-ignored, as in the web Angular examples.
  - Kotlin Multiplatform: `PARSIMAP_MAP_TOKEN` in `local.properties`, turned into a generated Kotlin constant in the shared module so Android and iOS read the same value.
  - Mapbox packages also need `MAPBOX_ACCESS_TOKEN` (Flutter, React Native CLI) or `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` (Expo), set before the first map view is created.
- **Errors.** Show the web messages in an overlay above the map, clear of the system bars: `Set your token in <file>.` naming the framework's token file, and `The map could not load. Check your token and network connection.` on style load failure (`maplibre-react-native` `onDidFailLoadingMap`; `@rnmapbox/maps` `onMapLoadingError` with type `style`; `mapbox_maps_flutter` `onMapLoadErrorListener` with `MapLoadErrorType.STYLE`; maplibre-compose `MapEvent.StyleLoadFailed`). `maplibre_gl` has no load-error callback, so its examples show only the missing-token message. `flutter_map` follows the web Leaflet examples: `The map tiles could not load. Check your token and network connection.` when tiles fail before any tile has loaded.
- **Raster.** MapLibre examples contain a vector map and a raster map that adds a raster source with the Parsimap attribution. Flutter uses a second entry point (`lib/main_raster.dart`); React Native and Kotlin Multiplatform show a two-option switch above the map.
- **Attribution.** Keep each library's attribution and logo enabled and visible, including in edge-to-edge layouts.
- **Persian labels.** The native SDKs shape RTL text themselves. Do not add an RTL plugin.
- **Minimal code.** Only the dependencies, configuration, and code needed for the map. No branded titles, navigation libraries, state libraries, or analytics.

## Examples repository (`parsimap/map-rendering-examples`)

- Place each example at `cross-platform/<guide slug>`. Each is a standalone project created with the framework's own template, trimmed to the platforms the guide covers (Android and iOS).
- Flutter: `flutter create --platforms android,ios --org ir.parsimap.examples`, with `pubspec.lock` committed. React Native CLI: `@react-native-community/cli init` with `--skip-install`, with `package-lock.json` committed; `ios/Pods` is not committed. Expo: `create-expo-app` with the blank TypeScript template; `android/` and `ios/` are generated by `expo prebuild` and not committed. Kotlin Multiplatform: `shared`, `androidApp`, and `iosApp` modules following JetBrains' KMP app template.
- Application IDs and bundle IDs follow `ir.parsimap.examples.<framework><library>`, with no hyphens or underscores.
- READMEs follow the Android README structure: title `Parsimap + <library> + <framework> (<project type>)`, the generated documentation link, Requirements, Setup and run for Android and iOS, Build, Verified with, and Files.
- Add every example to `scripts/sync-docs-links.mjs` and the root README table.
- CI builds only the examples a push changes, like the Android examples: an Android debug build on Ubuntu and an iOS simulator build without code signing on macOS, plus `flutter analyze` or `tsc --noEmit` where the framework provides it.
- Dependabot opens update pull requests for each example folder with the framework's package ecosystem (`pub`, `npm`, `gradle`), ignoring major versions.

## Documentation repository (`parsimap/document-page-generator`)

- Place guides at `docs/Render Maps/cross-platform/<guide slug>.mdx`. Title and sidebar label name the library and framework, for example `نمایش نقشه با maplibre_gl در Flutter` and `maplibre_gl`; React Native leaves use `Expo` and `React Native CLI`.
- List the guides in the overview's `دستگاه‌های Android و iOS` tab, one tab per framework, with columns کتابخانه, نوع پروژه, نسخه Android و iOS, and راهنما.
- Guide sections, in order: `ServiceIntro`; `## پیش‌نیازها` (map token, an existing project, minimum Android and iOS versions, and for Mapbox a Mapbox account and token); `## افزودن کتابخانه و توکن دسترسی`; `## نمایش نقشه`; `## استفاده از Tile رستری` (MapLibre only); the example link; `## گام‌های بعدی`.
- Show full source files only with `<ExampleCode>`, keyed `<framework>/<library>/<path>` or `react-native/<library>/<project type>/<path>`. Extend `ExampleCode` and Prism with Dart, YAML, Swift, shell, Ruby (Podfile), and Groovy (`build.gradle`) support before the first guide that needs them.
- Recurring failure causes (blank map, 401/403, missing token, iOS deployment target, Swift Package Manager, CocoaPods, Expo Go, New Architecture) go in the framework's `troubleshooting.mdx`.

## Verification and workflow

Batches follow the Scope table order, one guide and its example per batch, each committed separately.

A guide is not described as supported until:

- the example builds for Android and for the iOS simulator in CI with the pinned baseline;
- the map was verified on an Android device or emulator and on an iOS device or simulator, with Persian labels, visible attribution, gestures, rotation keeping the camera, the missing-token message, and the raster map where there is one;
- for Mapbox, the Parsimap style was confirmed to render correctly;
- the docs site builds, the synced sources pass `node scripts/sync-map-examples.mjs --check`, and the example passes `node scripts/sync-docs-links.mjs --check`;
- no real token is committed.
