# Parsimap + MapLibre GL JS + React (webpack)

<!-- docs-link:start -->
Documentation: [MapLibre GL JS with React (webpack)](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js/react-webpack)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `>=22.15.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your token. `webpack.config.cjs` loads `.env.local` with dotenv and inlines `PMI_MAP_TOKEN` with `DefinePlugin`; `.env.local` is ignored by Git.
3. Run `npm start` and open http://localhost:8080.

## Build and preview

`npm run build` writes the site to `dist/`; serve that folder with any static server.

## Stateful variant

Open http://localhost:8080/stateful. `src/StatefulMap.tsx` keeps the map instance in React state and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `src/Map.tsx`: the map component.
- `src/StatefulMap.tsx`: the stateful variant.
- `src/globals.d.ts`: types the token constant.
- `webpack.config.cjs`: loads the token and bundles the worker.
