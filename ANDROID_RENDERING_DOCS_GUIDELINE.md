# Android map-rendering documentation guideline

This guideline governs the Android map-rendering guides in `parsimap/document-page-generator` and their runnable examples in `parsimap/map-rendering-examples`. The same file is kept at the root of both repositories; change both copies in the same pair of pull requests so they never drift.

It extends the web conventions in `MAP_RENDERING_DOCS_IMPLEMENTATION.md` (documentation repository). Where this guideline is silent, follow those conventions; where it differs, this guideline wins for Android.

## Scope

Android guides are organised by Android tooling (language, UI toolkit, map library), not by the web framework list. Each guide stops at rendering a correctly sized interactive Parsimap basemap, like the web guides.

| # | Language | UI toolkit | Library | Guide slug | Tiles |
| --- | --- | --- | --- | --- | --- |
| 1 | Kotlin | Android Views | MapLibre Native Android | `maplibre-native-android/kotlin-views` | vector, plus a raster section |
| 2 | Kotlin | Jetpack Compose | maplibre-compose | `maplibre-native-android/kotlin-compose` | vector, plus a raster section |
| 3 | Java | Android Views | MapLibre Native Android | `maplibre-native-android/java-views` | vector, plus a raster section |
| 4 | Kotlin | Android Views | Mapbox Maps SDK for Android | `mapbox-maps-android/kotlin-views` | vector |
| 5 | Kotlin | Jetpack Compose | Mapbox Maps Compose extension | `mapbox-maps-android/kotlin-compose` | vector |
| 6 | Java | Android Views | Mapbox Maps SDK for Android | `mapbox-maps-android/java-views` | vector |

Out of scope for the Android section:

- Cross-platform stacks (Kotlin Multiplatform / Compose Multiplatform, Flutter, React Native, .NET MAUI, Capacitor/Cordova). They target iOS as well and get their own category and guideline.
- osmdroid: the project was archived on 2024-11-20. Raster tiles are shown through MapLibre Native instead.
- Google Maps SDK tile overlays, offline maps, markers, location tracking, and other features beyond the basemap.
- The deleted legacy Mapbox Android SDK 9.x guide. Do not use it as source material.

Raster tiles appear only in the MapLibre guides, as the native counterpart of the Leaflet web guides. Mapbox guides stay vector-only so that raster usage never depends on a Mapbox account.

## Supported toolchain baseline

Every example and guide targets one stated baseline. Versions below were resolved from official sources on 2026-11-02. Re-resolve them from official upstream sources when implementing each batch and update this table, the examples, and the guides together.

| Item | Baseline | Source of truth |
| --- | --- | --- |
| Android Gradle Plugin | 9.5.0 | AGP release notes |
| Gradle wrapper | 9.6.0 | AGP compatibility table |
| JDK | 17 | AGP compatibility table |
| compileSdk / targetSdk | 36 / 36 (confirm against current Google Play target API requirements) | Android developers, Play Console policy |
| minSdk | the highest minimum among the libraries used; 21 unless a library requires more (confirm per library) | library documentation and published AAR manifest |
| Kotlin | latest stable release compatible with AGP 9.5 (confirm at implementation time) | Kotlin and AGP release notes |
| Compose BOM | latest stable BOM (confirm against the BOM mapping page) | Compose BOM mapping |
| MapLibre Native Android | `org.maplibre.gl:android-sdk:13.7.1` | maplibre-native GitHub releases (`android-v*`) |
| maplibre-compose | `org.maplibre.compose:maplibre-compose:0.20.0` + `org.maplibre.compose:maplibre-compose-runtime-opengl-android:0.20.0` | maplibre-compose documentation |
| Mapbox Maps SDK for Android | `com.mapbox.maps:android-ndk27:11.34.1` | Mapbox Android install guide |
| Mapbox Maps Compose extension | `com.mapbox.extension:maps-compose-ndk27:11.34.1` | Mapbox Android install guide |

Version rules:

- Pin every dependency to an exact version in `gradle/libs.versions.toml`. No dynamic versions (`+`, `latest.release`).
- MapLibre Native publishes calendar-versioned `*-globe` pre-releases that Maven Central currently reports as its latest release. Never use them; pin the latest stable `android-v<major>.<minor>.<patch>` release.
- maplibre-compose is pre-1.0 and minor releases may break its API. Use the same version for the library and its runtime artifact, and treat every minor upgrade as a guide update.
- Use the Mapbox `-ndk27` artifacts. They provide the 16 KB page size support Google Play requires.
- Use the OpenGL ES renderer by default. Vulkan variants are mentioned only in troubleshooting.
- Cover the latest stable major of each library only, unless a previous major is still supported upstream and is needed by real users.

### Toolchain variations

One baseline is documented per guide. Toolchain differences do not produce separate guides:

| Variation | Treatment |
| --- | --- |
| Build Tools, NDK | Not mentioned. AGP selects them and the map SDKs ship prebuilt. |
| JDK, minSdk | One line each in the guide's prerequisites. |
| targetSdk 35+ edge-to-edge | Every example handles window insets so the map, attribution, and logo are not drawn under the system bars. |
| AGP 8.x / Kotlin 1.9 projects | One "older projects" callout per guide with the extra Gradle plugin lines (`org.jetbrains.kotlin.android`; for Compose, the Compose compiler setup). |
| Repository declaration | Show `dependencyResolutionManagement` in `settings.gradle.kts` only. Mention once that older projects declare repositories in the root build file. |
| Gradle DSL | Kotlin DSL (`*.gradle.kts`) only. No Groovy tabs. |
| Android Studio project template | Guides assume an existing project, so no template steps. Example READMEs name the Android Studio version they were verified with. |
| Library major versions | A new major is a new guide revision or a separate guide, decided per batch. |

## Shared integration contract

Both repositories follow the same contract so guides and examples stay identical in behaviour.

- **Style and tiles.** Vector guides use `STYLE_ID = "parsimap-streets-v11"` and `https://api.parsimap.ir/styles/${STYLE_ID}?key=<token>`. MapLibre raster sections use `TILESET_ID = "parsimap-streets-v11-raster"` and `https://api.parsimap.ir/tile/${TILESET_ID}/{z}/{x}/{y}?key=<token>` with `minZoom 1`, `maxZoom 18`, and a tile size of 256.
- **Initial camera.** Latitude `35.6892`, longitude `51.389`, zoom `11`, matching the web examples. Use each SDK's own coordinate type and order (`LatLng(lat, lng)` in MapLibre, `Point.fromLngLat(lng, lat)` in Mapbox).
- **Token.** Read `PARSIMAP_MAP_TOKEN` from the Git-ignored `local.properties` and expose it as `BuildConfig.PARSIMAP_MAP_TOKEN` (enable `buildFeatures.buildConfig`). The build must succeed without a token so CI needs no secret. URL-encode the token when building URLs. Guides warn that a token shipped in an APK can be extracted, as the web guides warn about browser requests.
- **Mapbox token.** The Mapbox SDK also requires a Mapbox public access token in the `mapbox_access_token` string resource, which ties usage to a Mapbox account and its terms. Mapbox guides state this requirement in their introduction and prerequisites. Read it from `local.properties` as `MAPBOX_ACCESS_TOKEN` and generate the resource from Gradle; never commit it.
- **Initialisation and lifecycle.** MapLibre Views examples call `MapLibre.getInstance(context)` before inflating the map and forward `onStart`, `onResume`, `onPause`, `onStop`, `onLowMemory`, `onDestroy`, and `onSaveInstanceState` to `MapView`. Compose examples rely on the library's lifecycle handling and must not leak the map across recompositions. Camera position survives rotation.
- **Errors.** Show the same messages as the web examples in an overlay above the map: `Set your token in local.properties.` when the token is missing, and `The map could not load. Check your token and network connection.` on style or tile load failure (MapLibre `addOnDidFailLoadingMapListener`; Mapbox map loading error events).
- **Attribution.** Keep each SDK's attribution (and the Mapbox logo) enabled and visible, including in edge-to-edge layouts. Never hide or remove it.
- **Persian labels.** Native SDKs shape RTL text themselves. Do not add an RTL plugin. Verify Persian labels on a device before a guide is marked supported.
- **Minimal code.** Include only the dependencies, permissions (`INTERNET`), layout, and code needed for the map. No Parsimap-branded titles, no extra screens, no analytics.

## Examples repository (`parsimap/map-rendering-examples`)

- Place each example in `android/<library>/<stack>`, using the guide slug: `android/maplibre-native-android/kotlin-views`, `android/mapbox-maps-android/java-views`, and so on.
- Each example is a standalone Gradle project with the Gradle wrapper, `settings.gradle.kts`, `gradle/libs.versions.toml`, and a single `app` module. Use the application ID `ir.parsimap.examples.<library>.<stack>` with dots and no hyphens (for example `ir.parsimap.examples.maplibre.kotlinviews`).
- MapLibre examples contain two launcher activities: the vector map and the raster map (`RasterMapActivity` or its Compose equivalent). The raster activity is the source of the guide's raster section and the counterpart of the web `/stateful` page.
- Commit `local.properties.example` containing `PARSIMAP_MAP_TOKEN=YOUR_TOKEN_HERE` (and `MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_TOKEN_HERE` for Mapbox). `local.properties` stays ignored.
- Keep code, comments, and READMEs in English. Each README follows the web README structure: title `Parsimap + <library> + <language> (<toolkit>)`, the generated documentation link, Requirements (map token, Android Studio version, JDK 17, Android SDK platform, device or emulator with OpenGL ES 3.0 and the stated minSdk), Setup and run (copy the token line, open in Android Studio or run `./gradlew installDebug`), and Files.
- Add every Android example to `scripts/sync-docs-links.mjs` and the root README table. Extend the script's library list and path mapping so `android/<library>/<folder>` resolves to `/docs/Render Maps/<library>/<folder>`.
- CI builds every example on each pull request: list `android/*/*/settings.gradle.kts`, set up JDK 17 (Temurin) and Gradle caching, then run `./gradlew assembleDebug lint`. An emulator smoke test may be added on a KVM-enabled Linux runner; it does not replace device verification.
- Dependabot opens one Gradle update pull request per Android example folder, ignores major versions, and ignores MapLibre `*-globe` versions.

## Documentation repository (`parsimap/document-page-generator`)

- Do not modify any `.mdx` file without explicit approval (see `AGENTS.md`). Present the required `.mdx` changes for review first.
- Place the guides under `docs/Render Maps/maplibre-native-android/` and `docs/Render Maps/mapbox-maps-android/`, each with a `_category_.json` generated index, `_next-steps.mdx`, and `troubleshooting.mdx`. Name guide files for the stack only: `kotlin-views.mdx`, `kotlin-compose.mdx`, `java-views.mdx`.
- Replace the placeholder in the overview's Android tab with library tabs (`MapLibre Native Android 13.7.1`, `Mapbox Maps SDK 11.34.1`) and a guide table with the columns زبان, رابط کاربری, نسخه, and راهنما. State there that the Mapbox SDK requires a Mapbox account and token.
- Use `docs/Render Maps/maplibre-gl-js/vite-javascript.mdx` as the structure and tone reference. Title and sidebar label name the library, language, and toolkit, for example `نمایش نقشه با MapLibre Native Android، Kotlin و Android Views` and `Kotlin + Views`. Set `map_rendering_guide: true`.
- Guide sections, in order:
  1. `ServiceIntro` with a one-paragraph introduction.
  2. `## پیش‌نیازها`: map token, an existing Android project, the minSdk, JDK 17, and (Mapbox only) a Mapbox account and public token.
  3. `## افزودن کتابخانه و توکن دسترسی`: the version catalog entries, the `app/build.gradle.kts` dependency and `BuildConfig` lines, the repository declaration when needed, and the `local.properties` token line.
  4. `## نمایش نقشه`: the layout (Views) and the Activity or Composable, then the error and Style-change notes.
  5. `## استفاده از Tile رستری` (MapLibre guides only).
  6. The "older projects" callout for AGP 8.x and Kotlin 1.9.
  7. The example link: `مشاهده نمونه کامل <library> با <language> و <toolkit> در GitHub`.
  8. `## گام‌های بعدی` rendering the library's `_next-steps.mdx`.
- Show full source files only with `<ExampleCode>` from the synced examples. Add each file to `scripts/sync-map-examples.mjs` with a library-prefixed key (`maplibre-native-android/<stack>/<path>`, `mapbox-maps-android/<stack>/<path>`). Hand-written snippets are limited to Gradle and properties fragments to merge into an existing project; their versions must match the example's version catalog exactly.
- Before the first Android guide, extend `ExampleCode` and the Prism configuration so `.kt` and `.kts` render as Kotlin, `.java` as Java, `.xml` as markup, `.toml` as TOML, and `.properties` as properties.
- Write concise, direct Persian consistent with the existing guides; keep code and file names LTR with `<bdi dir="ltr">`. Recurring failure causes (blank map, 401/403, missing token, OpenGL ES 3.0, emulator GPU, 16 KB page size, Vulkan) go in the library's `troubleshooting.mdx`, not in individual guides.

## Verification and workflow

Follow the batch workflow in `MAP_RENDERING_DOCS_IMPLEMENTATION.md`: one guide and its example per batch, reviewed before commit, with an explicit go-ahead before the next batch. Suggested order: 1, 2, 3, then 4, 5, 6 from the Scope table.

A guide is not described as supported until:

- the example builds and passes lint in CI with the pinned baseline;
- the map was verified on a device or KVM-accelerated emulator with Persian labels, visible attribution, gestures, rotation keeping the camera, the missing-token message, and (MapLibre) the raster activity;
- for Mapbox, the Parsimap style was confirmed to render correctly in Mapbox Maps SDK 11;
- the docs site builds, the synced sources pass `node scripts/sync-map-examples.mjs --check`, and the example passes `node scripts/sync-docs-links.mjs --check`;
- no real token is committed.
