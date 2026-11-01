# Parsimap + Leaflet + JavaScript (Vite)

<!-- docs-link:start -->
Documentation: [Leaflet with JavaScript (Vite)](https://docs.parsimap.dev/docs/Render%20Maps/leaflet/vite-javascript)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^20.19.0 || >=22.12.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example pins Leaflet `1.9.4`, the latest stable Leaflet 1 release.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your Parsimap token. Vite exposes only `VITE_`-prefixed variables to browser code, and `.env.local` is ignored by Git.
3. Run `npm run dev` and open http://localhost:5173.

## Build and preview

`npm run build`, then `npm run preview` and open http://localhost:4173.

## Files

- `index.html`: contains the map container and accessible error status.
- `src/main.js`: creates the map and loads Parsimap raster tiles.
