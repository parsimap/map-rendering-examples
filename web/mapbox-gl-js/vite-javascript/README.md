# Parsimap + Mapbox GL JS + JavaScript (Vite)

<!-- docs-link:start -->
Documentation: [Mapbox GL JS with JavaScript (Vite)](https://docs.parsimap.dev/docs/Render%20Maps/mapbox-gl-js/vite-javascript)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^20.19.0 || >=22.12.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example intentionally pins Mapbox GL JS `1.13.3`, the final v1 release under the BSD 3-Clause license. This legacy release is no longer maintained. It does not need a Mapbox access token here because the Parsimap style and its resources do not use `mapbox://` URLs. Mapbox GL JS 2 and later have different licensing and token requirements.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your Parsimap token. Vite exposes only `VITE_`-prefixed variables to browser code, and `.env.local` is ignored by Git.
3. Run `npm run dev` and open http://localhost:5173.

## Build and preview

`npm run build`, then `npm run preview` and open http://localhost:4173.

## Files

- `index.html`: contains the map container and accessible error status.
- `src/main.js`: creates the map.
