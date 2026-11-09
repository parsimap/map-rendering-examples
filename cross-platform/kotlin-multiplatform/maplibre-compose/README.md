# Parsimap + maplibre-compose + Kotlin Multiplatform (Compose Multiplatform)

<!-- docs-link:start -->
Documentation: [maplibre-compose with Kotlin Multiplatform (Compose Multiplatform)](https://docs.parsimap.dev/docs/Render%20Maps/cross-platform/kotlin-multiplatform/maplibre-compose)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- JDK 17 or later. Android Studio includes one.
- For Android: Android SDK Platform 37, and a device or emulator running Android 7.0 (API level 24) or later with OpenGL ES 3.0 support.
- For iOS: a Mac with Xcode, and a device or simulator running iOS 15.5 or later.

The example uses Kotlin 2.4.21, Compose Multiplatform 1.12.2, Android Gradle Plugin 9.5.0, Gradle 9.6.0 (through the committed wrapper), and maplibre-compose 0.20.0 with the OpenGL ES runtime on Android. Its modules follow JetBrains' Kotlin Multiplatform app template: `shared` holds the map UI, `androidApp` and `iosApp` start it.

## Setup and run

1. Copy `local.properties.example` to `local.properties`, or add its line to the `local.properties` file Android Studio created, and replace `YOUR_TOKEN_HERE` with your token. `local.properties` is ignored by Git. The build turns the token into a constant that both apps read.
2. For Android, open this folder in Android Studio and run the `androidApp` configuration, or run `./gradlew :androidApp:installDebug` with a device connected.
3. For iOS, open `iosApp/iosApp.xcodeproj` in Xcode and run the `iosApp` scheme. Xcode builds the shared module with Gradle.

The tabs above the map switch between the vector map and the raster map. Without a token, both show a message instead of the map.

## Build

```sh
./gradlew :androidApp:assembleDebug :androidApp:lint
xcodebuild -project iosApp/iosApp.xcodeproj -scheme iosApp -sdk iphonesimulator -arch arm64 CODE_SIGNING_ALLOWED=NO build
```

## Files

- `gradle/libs.versions.toml`: lists the versions.
- `shared/build.gradle.kts`: adds maplibre-compose and its Android runtime, and turns the token into the `MAP_TOKEN` constant.
- `shared/src/commonMain/kotlin/ir/parsimap/examples/kmpmaplibre/VectorMap.kt`: shows the vector map.
- `shared/src/commonMain/kotlin/ir/parsimap/examples/kmpmaplibre/RasterMap.kt`: shows the raster map.
- `shared/src/commonMain/kotlin/ir/parsimap/examples/kmpmaplibre/Token.kt`: checks and URL-encodes the token.
- `shared/src/commonMain/kotlin/ir/parsimap/examples/kmpmaplibre/MapError.kt`: shows the error message.
- `shared/src/commonMain/kotlin/ir/parsimap/examples/kmpmaplibre/App.kt`: switches between the two maps, clear of the system bars.
- `iosApp/iosApp.xcodeproj/project.pbxproj`: sets iOS 15.5 and the system libraries maplibre-compose needs in Other Linker Flags.
