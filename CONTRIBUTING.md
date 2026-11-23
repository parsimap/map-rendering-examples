# Contributing

Thank you for helping improve the Parsimap map rendering examples. Bug reports, fixes, and dependency updates are welcome. Each example has a matching guide in the [Parsimap documentation](https://docs.parsimap.dev), so new examples and larger changes are best discussed in an issue first.

## Reporting a problem

Open an issue with the **Broken example** form. Name the example folder, the platform, and the versions of your tools, and paste the full error. Never paste a real map token into an issue; replace it with `YOUR_TOKEN_HERE`.

For security problems, follow [SECURITY.md](SECURITY.md) instead.

## What an example looks like

Each example is a minimal, standalone project that renders an interactive Parsimap basemap at the correct size and stops there. Features beyond the basemap, such as markers, routing, or offline maps, belong in separate guides.

- **Location.** The folder is `<platform>/<library>/<stack>`, for example `web/maplibre-gl-js/react-vite`, `android/mapbox-maps-android/kotlin-compose`, or `cross-platform/flutter/maplibre-gl`. The folder name matches the guide's path at `/docs/Render Maps/<folder>`. React Native examples add a project type: `cross-platform/react-native/<library>/expo` or `react-native-cli`.
- **Standalone.** An example installs and builds from its own folder with no shared code. Web and React Native examples use npm and commit `package-lock.json`. Android and Kotlin Multiplatform examples commit the Gradle wrapper and `gradle/libs.versions.toml`. Flutter examples commit `pubspec.lock`.
- **Tokens.** An example never contains a real token. It reads the token from a file that its `.gitignore` excludes and commits an example file with the placeholder `YOUR_TOKEN_HERE` (`YOUR_MAPBOX_TOKEN_HERE` for a Mapbox token):

  | Example type | Committed file | Ignored file |
  | --- | --- | --- |
  | Web (bundled) | `.env.example` | `.env.local` (or the file the README names) |
  | Web (Angular) | `src/map-token.example.ts` | `src/map-token.ts` |
  | Android, Kotlin Multiplatform | `local.properties.example` | `local.properties` |
  | Flutter | `config.example.json` | `config.json` |
  | React Native (Expo) | `.env.example` | `.env.local` |
  | React Native CLI | `src/map-token.example.ts` | `src/map-token.ts` |

  The CDN examples are the exception: the token is set directly in `main.js`, and the committed value stays `YOUR_TOKEN_HERE`.
- **Missing token.** Without a token, the example shows a short message in place of the map instead of failing silently.
- **Identifiers.** Android application IDs and iOS bundle IDs start with `ir.parsimap.examples.` and contain no hyphens. Native Android examples use `ir.parsimap.examples.<library>.<stack>`, for example `ir.parsimap.examples.maplibre.kotlinviews`; cross-platform examples follow their siblings, for example `ir.parsimap.examples.fluttermaplibregl`.
- **Language.** Code, comments, and READMEs are in English.
- **README.** Follow the existing example READMEs: the title `Parsimap + <library> + <stack>`, the generated documentation link, then **Requirements**, **Setup and run**, **Build**, and **Files**.

## Adding an example

1. Create the project in its folder, following the rules above.
2. Add it to the `examples` list in `scripts/sync-docs-links.mjs`, then run:

   ```sh
   node scripts/sync-docs-links.mjs
   ```

   The script writes the documentation link into the example README and updates the table in the root README.
3. Check that CI picks the example up. CI finds examples by these files: `web/*/*/package.json`, `android/*/*/settings.gradle.kts`, `cross-platform/flutter/*/pubspec.yaml`, `cross-platform/react-native/*/*/package.json`, and `cross-platform/kotlin-multiplatform/*/settings.gradle.kts`.
4. Run the example on a real browser, device, emulator, or simulator, and say in the pull request what you ran it on. CI only checks that it builds.

## Pull requests

- Keep each pull request to one change, and say which example folders it touches.
- Run the example's build commands from its README before you open the pull request, and run `node scripts/sync-docs-links.mjs --check` if you changed a README or the script.
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, for example `fix(flutter): ...` or `chore(deps): ...`.
- Dependabot opens minor and patch updates. A major version upgrade also needs its documentation guide updated, so open an issue for it first.

By contributing, you agree that your contribution is licensed under the repository's [MIT No Attribution](LICENSE) license.
