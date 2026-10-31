# Parsimap + MapLibre GL JS + Nuxt

<!-- docs-link:start -->
Documentation: [MapLibre GL JS with Nuxt](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js/nuxt)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and replace `YOUR_TOKEN_HERE` with your token. Nuxt maps `NUXT_PUBLIC_PMI_MAP_TOKEN` to `runtimeConfig.public.pmiMapToken`, so the token can also be set when the server starts; `.env` is ignored by Git.
3. Run `npm run dev` and open http://localhost:3000.

## Build and preview

`npm run build`, then `npm run preview` and open http://localhost:3000.

## Stateful variant

Open http://localhost:3000/stateful. `app/components/StatefulMap.client.vue` keeps the map instance in a `shallowRef` and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `app/components/Map.client.vue`: the map component; `.client` keeps it out of server rendering.
- `app/components/StatefulMap.client.vue`: the stateful variant.
- `nuxt.config.ts`: declares the public token setting.
