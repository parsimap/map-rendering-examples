# Parsimap + Leaflet + Next.js 16 (Pages Router)

<!-- docs-link:start -->
Documentation: [Leaflet with Next.js 16 (Pages Router)](https://docs.parsimap.dev/docs/Render%20Maps/leaflet/nextjs-16-pages-router)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Node.js `>=20.9.0`.
- npm, with a committed `package-lock.json`. Yarn, pnpm, and Bun also work, but they are not lock-tested.

This example pins Leaflet `1.9.4`, the latest stable Leaflet 1 release.

## Setup and run

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your token. Next.js exposes only `NEXT_PUBLIC_`-prefixed variables to browser code, and `.env.local` is ignored by Git.
3. Run `npm run dev` and open http://localhost:3000.

## Build and preview

Run `npm run typecheck` and `npm run build`, then run `npm start` and open http://localhost:3000.

## Stateful variant

Open http://localhost:3000/stateful. `components/StatefulMap.tsx` keeps the map instance in React state and shows its initialization status. Use this pattern when other parts of your UI need the map instance, for example to add markers or respond to map events.

## Files

- `components/Map.tsx`: creates and cleans up the client-side map instance.
- `components/StatefulMap.tsx`: the stateful variant.
- `pages/index.tsx`: renders the map and defines page metadata.
- `pages/_app.tsx`: loads the Leaflet stylesheet.
- `assets.d.ts`: declares CSS imports for TypeScript.
