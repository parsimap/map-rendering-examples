# Parsimap + MapLibre GL JS + JavaScript (webpack)

<!-- docs-link:start -->
Documentation: [MapLibre GL JS with JavaScript (webpack)](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js/webpack-javascript)
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

## Files

- `index.html`: contains the map container.
- `src/index.js`: creates the map.
- `webpack.config.cjs`: loads the token and bundles the worker.
