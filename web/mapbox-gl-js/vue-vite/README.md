# Parsimap + Mapbox GL JS + Vue (Vite)

<!-- docs-link:start -->
Documentation: [Mapbox GL JS with Vue (Vite)](https://docs.parsimap.dev/docs/Render%20Maps/mapbox-gl-js/vue-vite)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^20.19.0 || >=22.12.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example intentionally pins Mapbox GL JS `1.13.3`, the final v1 release under the BSD 3-Clause license. This legacy release is no longer maintained. Mapbox GL JS 2 and later have different licensing and token requirements.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your token. Vite exposes only `VITE_`-prefixed variables to browser code, and `.env.local` is ignored by Git.
3. Run `npm run dev` and open http://localhost:5173.

## Build and preview

Run `npm run typecheck` and `npm run build`, then run `npm run preview` and open http://localhost:4173.

## Stateful variant

Open http://localhost:5173/stateful. `src/StatefulMap.vue` keeps the map instance in a `shallowRef` and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `src/Map.vue`: creates and cleans up the map instance.
- `src/StatefulMap.vue`: the stateful variant.
- `src/env.d.ts`: types the Parsimap token variable.
- `src/main.ts`: mounts the map component.
- `index.html`: provides the page metadata and application mount point.
