# Parsimap + MapLibre GL JS + SvelteKit 3

<!-- docs-link:start -->
Documentation: [MapLibre GL JS with SvelteKit 3](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js/sveltekit-3)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `>=22.17.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and replace `YOUR_TOKEN_HERE` with your token. `src/env.ts` declares `PUBLIC_PMI_MAP_TOKEN` as a public variable so browser code can read it, and `.env` is ignored by Git.
3. Run `npm run dev` and open http://localhost:5173.

## Build and preview

`npm run build`, then `npm run preview` and open http://localhost:4173.

## Stateful variant

Open http://localhost:5173/stateful. `src/lib/StatefulMap.svelte` keeps the map instance in `$state.raw` and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `src/lib/Map.svelte`: the map component.
- `src/lib/StatefulMap.svelte`: the stateful variant.
- `src/env.ts`: declares the public token variable.
