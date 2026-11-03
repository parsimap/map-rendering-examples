# Parsimap + MapLibre Native Android + Kotlin (Jetpack Compose)

<!-- docs-link:start -->
Documentation: [MapLibre Native Android with Kotlin (Jetpack Compose)](https://docs.parsimap.dev/docs/Render%20Maps/android/maplibre-native-android/kotlin-compose)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- JDK 17 or later. Android Studio includes one.
- Android SDK Platform 37. Android Studio, or the Gradle build, installs it when it is missing.
- A device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.

The example uses Android Gradle Plugin 9.5.0, Gradle 9.6.0 (through the committed wrapper), Kotlin 2.4.21, and maplibre-compose 0.20.0 with the OpenGL ES runtime.

## Setup and run

1. Copy `local.properties.example` to `local.properties`, or add its line to the `local.properties` file Android Studio created, and replace `YOUR_TOKEN_HERE` with your token. `local.properties` is ignored by Git.
2. Open this folder in Android Studio and run the `app` configuration, or run `./gradlew installDebug` with a device connected.

The app installs two launcher entries: **MapLibre Kotlin Compose** shows the vector map and **MapLibre Kotlin Compose (raster)** shows the raster map. Without a token, both show a message instead of the map.

## Build

`./gradlew assembleDebug lint`

## Files

- `build.gradle.kts`: raises the Kotlin Gradle plugin to the version maplibre-compose needs.
- `app/build.gradle.kts`: adds maplibre-compose and its OpenGL ES runtime, and reads the token into `BuildConfig`.
- `app/src/main/java/ir/parsimap/examples/maplibre/kotlincompose/MainActivity.kt`: shows the vector map.
- `app/src/main/java/ir/parsimap/examples/maplibre/kotlincompose/RasterMapActivity.kt`: shows the raster map.
- `app/src/main/java/ir/parsimap/examples/maplibre/kotlincompose/MapError.kt`: shows the error message.
