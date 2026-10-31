# Parsimap + MapLibre GL JS + Next.js 15 (Pages Router)

<!-- docs-link:start -->
Documentation: [MapLibre GL JS with Next.js 15 (Pages Router)](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js/nextjs-15-pages-router)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `^18.18.0 || ^19.8.0 || >=20.0.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your token. Next.js exposes only `NEXT_PUBLIC_`-prefixed variables to browser code, and `.env.local` is ignored by Git.
3. Run `npm run dev` and open http://localhost:3000.

## Build and preview

`npm run build`, then `npm start` and open http://localhost:3000.

## Stateful variant

Open http://localhost:3000/stateful. `components/StatefulMap.tsx` keeps the map instance in React state and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `components/Map.tsx`: the map component.
- `components/StatefulMap.tsx`: the stateful variant.
- `pages/_app.tsx`: loads the MapLibre stylesheet.
- `next.config.ts`: emits the MapLibre worker as a file.
- `assets.d.ts`: types the worker `?url` import and CSS imports.
