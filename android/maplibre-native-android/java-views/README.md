# Parsimap + MapLibre Native Android + Java (Android Views)

<!-- docs-link:start -->
Documentation: [MapLibre Native Android with Java (Android Views)](https://docs.parsimap.dev/docs/Render%20Maps/android/maplibre-native-android/java-views)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- JDK 17 or later. Android Studio includes one.
- Android SDK Platform 36. Android Studio, or the Gradle build, installs it when it is missing.
- A device or emulator running Android 6.0 (API level 23) or later with OpenGL ES 3.0 support.

The example uses Android Gradle Plugin 9.5.0, Gradle 9.6.0 (through the committed wrapper), and MapLibre Native Android 13.7.1 with the OpenGL ES renderer.

## Setup and run

1. Copy `local.properties.example` to `local.properties`, or add its line to the `local.properties` file Android Studio created, and replace `YOUR_TOKEN_HERE` with your token. `local.properties` is ignored by Git.
2. Open this folder in Android Studio and run the `app` configuration, or run `./gradlew installDebug` with a device connected.

The app installs two launcher entries: **MapLibre Java Views** shows the vector map and **MapLibre Java Views (raster)** shows the raster map. Without a token, both show a message instead of the map.

## Build

`./gradlew assembleDebug lint`

## Files

- `app/build.gradle.kts`: adds MapLibre and reads the token into `BuildConfig`.
- `app/src/main/res/layout/activity_map.xml`: contains the map view and the error message.
- `app/src/main/java/ir/parsimap/examples/maplibre/javaviews/MainActivity.java`: creates the vector map.
- `app/src/main/java/ir/parsimap/examples/maplibre/javaviews/RasterMapActivity.java`: creates the raster map.
