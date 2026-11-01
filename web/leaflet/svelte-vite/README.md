# Parsimap + Leaflet + Svelte (Vite)

<!-- docs-link:start -->
Documentation: [Leaflet with Svelte (Vite)](https://docs.parsimap.dev/docs/Render%20Maps/leaflet/svelte-vite)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^20.19.0 || >=22.12.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example pins Leaflet `1.9.4`, the latest stable release. Leaflet 2 is still prerelease software and has APIs that are incompatible with version 1, so it is not covered here.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your token. Vite exposes only `VITE_`-prefixed variables to browser code, and `.env.local` is ignored by Git.
3. Run `npm run dev` and open http://localhost:5173.

## Build and preview

Run `npm run typecheck` and `npm run build`, then run `npm run preview` and open http://localhost:4173.

## Stateful variant

Open http://localhost:5173/stateful. `src/StatefulMap.svelte` keeps the map instance in `$state.raw` and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `src/Map.svelte`: creates and cleans up the map instance.
- `src/StatefulMap.svelte`: the stateful variant.
- `src/vite-env.d.ts`: types the Parsimap token variable.
- `src/main.ts`: mounts the map component.
- `index.html`: provides page metadata and the application mount point.
