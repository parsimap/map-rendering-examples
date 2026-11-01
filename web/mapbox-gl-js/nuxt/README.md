# Parsimap + Mapbox GL JS + Nuxt

<!-- docs-link:start -->
Documentation: [Mapbox GL JS with Nuxt](https://docs.parsimap.dev/docs/Render%20Maps/mapbox-gl-js/nuxt)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example intentionally pins Mapbox GL JS `1.13.3`, the final v1 release under the BSD 3-Clause license. This legacy release is no longer maintained. Mapbox GL JS 2 and later have different licensing and token requirements.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and replace `YOUR_TOKEN_HERE` with your token. Nuxt maps `NUXT_PUBLIC_PMI_MAP_TOKEN` to `runtimeConfig.public.pmiMapToken`, so the token can also be set when the server starts; `.env` is ignored by Git.
3. Run `npm run dev` and open http://localhost:3000.

## Build and preview

Run `npm run typecheck` and `npm run build`, then run `npm run preview` and open http://localhost:3000.

## Stateful variant

Open http://localhost:3000/stateful. `app/components/StatefulMap.client.vue` keeps the map instance in a `shallowRef` and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `app/components/Map.client.vue`: creates and cleans up the browser-only map instance.
- `app/components/StatefulMap.client.vue`: the stateful variant.
- `app/pages/index.vue`: renders the map and defines page metadata.
- `nuxt.config.ts`: declares the public Parsimap token setting.
