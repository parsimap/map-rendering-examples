# Parsimap + Mapbox GL JS + SvelteKit 3

<!-- docs-link:start -->
Documentation: [Mapbox GL JS with SvelteKit 3](https://docs.parsimap.dev/docs/Render%20Maps/mapbox-gl-js/sveltekit-3)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `>=22.17.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example intentionally pins Mapbox GL JS `1.13.3`, the final v1 release under the BSD 3-Clause license. This legacy release is no longer maintained. Mapbox GL JS 2 and later have different licensing and token requirements.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and replace `YOUR_TOKEN_HERE` with your token. `src/env.ts` declares `PUBLIC_PMI_MAP_TOKEN` as a public variable so browser code can read it, and `.env` is ignored by Git.
3. Run `npm run dev` and open http://localhost:5173.

## Build and preview

Run `npm run typecheck` and `npm run build`, then run `npm run preview` and open http://localhost:4173.

## Files

- `src/lib/Map.svelte`: loads Mapbox GL JS only after mounting in the browser and cleans up the map instance.
- `src/routes/+page.svelte`: renders the map with semantic page markup and metadata.
- `src/env.ts`: declares the public Parsimap token variable.
