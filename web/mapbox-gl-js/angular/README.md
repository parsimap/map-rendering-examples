# Parsimap + Mapbox GL JS + Angular

<!-- docs-link:start -->
Documentation: [Mapbox GL JS with Angular](https://docs.parsimap.dev/docs/Render%20Maps/web/mapbox-gl-js/angular)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example intentionally pins Mapbox GL JS `1.13.3`, the final v1 release under the BSD 3-Clause license. This legacy release is no longer maintained. Mapbox GL JS 2 and later have different licensing and token requirements.

## Setup and run

1. Run `npm ci`.
2. Copy `src/map-token.example.ts` to `src/map-token.ts` and replace `YOUR_TOKEN_HERE` with your token. The Angular CLI has no `.env` support, so the token lives in `src/map-token.ts`, which is ignored by Git.
3. Run `npm start` and open http://localhost:4200.

## Build

Run `npm run typecheck` and `npm run build`. The production site is written to `dist/example/browser`; serve that folder with any static server that falls back to `index.html`.

## Stateful variant

Open http://localhost:4200/stateful. `src/stateful-map.component.ts` keeps the map instance in a signal and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `src/map.component.ts`: creates and destroys the map instance.
- `src/stateful-map.component.ts`: the stateful variant.
- `src/map-token.example.ts`: the template for the ignored `src/map-token.ts`.
- `src/app.component.ts`: provides the page landmark and router outlet.
- `angular.json`: loads the Mapbox GL JS stylesheet.
