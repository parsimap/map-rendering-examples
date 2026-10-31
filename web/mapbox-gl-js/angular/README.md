# Parsimap + Mapbox GL JS + Angular

<!-- docs-link:start -->
Documentation: [Mapbox GL JS with Angular](https://docs.parsimap.dev/docs/Render%20Maps/mapbox-gl-js/angular)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example intentionally pins Mapbox GL JS `1.13.3`, the final v1 release under the BSD 3-Clause license. This legacy release is no longer maintained. Mapbox GL JS 2 and later have different licensing and token requirements.

## Setup and run

1. Run `npm ci`.
2. Replace `YOUR_TOKEN_HERE` in `src/map-token.example.ts` with your public Parsimap web token. Angular CLI has no `.env` support, so restore the placeholder before committing changes and never commit a private or secret token.
3. Run `npm start` and open http://localhost:4200.

## Build

Run `npm run typecheck` and `npm run build`. The production site is written to `dist/example/browser`; serve that folder with any static server.

## Files

- `src/map.component.ts`: creates and destroys the map instance.
- `src/map-token.example.ts`: provides the committed safe placeholder used by clean builds.
- `src/app.component.ts`: provides the semantic page landmark.
- `angular.json`: loads the Mapbox GL JS stylesheet.
