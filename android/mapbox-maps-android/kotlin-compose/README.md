# Parsimap + Mapbox Maps SDK for Android + Kotlin (Jetpack Compose)

<!-- docs-link:start -->
Documentation: [Mapbox Maps SDK for Android with Kotlin (Jetpack Compose)](https://docs.parsimap.dev/docs/Render%20Maps/android/mapbox-maps-android/kotlin-compose)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- A Mapbox account and a public Mapbox access token. The Mapbox SDK does not create a map without one, and its usage is tied to your Mapbox account and its terms.
- JDK 17 or later. Android Studio includes one.
- Android SDK Platform 37. Android Studio, or the Gradle build, installs it when it is missing.
- A device or emulator running Android 6.0 (API level 23) or later with OpenGL ES 3.0 support.

The example uses Android Gradle Plugin 9.5.0, Gradle 9.6.0 (through the committed wrapper), Compose BOM 2026.09.00, and Mapbox Maps SDK for Android 11.34.1 with its Compose extension (`android-ndk27`, `maps-compose-ndk27`).

## Setup and run

1. Copy `local.properties.example` to `local.properties`, or add its lines to the `local.properties` file Android Studio created. Replace `YOUR_TOKEN_HERE` with your Parsimap token and `YOUR_MAPBOX_TOKEN_HERE` with your Mapbox token. `local.properties` is ignored by Git.
2. Open this folder in Android Studio and run the `app` configuration, or run `./gradlew installDebug` with a device connected.

Without both tokens, the app shows a message instead of the map.

## Build

`./gradlew assembleDebug lint`

## Files

- `settings.gradle.kts`: adds the Mapbox Maven repository.
- `app/build.gradle.kts`: adds the Mapbox SDK and its Compose extension, and reads both tokens into `BuildConfig`.
- `app/src/main/java/ir/parsimap/examples/mapbox/kotlincompose/MainActivity.kt`: shows the map.
- `app/src/main/java/ir/parsimap/examples/mapbox/kotlincompose/MapError.kt`: shows the error message.
