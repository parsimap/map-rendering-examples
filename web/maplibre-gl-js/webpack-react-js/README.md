# Parsimap with MapLibre GL JS, React, and webpack

<!-- docs-link:start -->
[MapLibre GL JS React and Vite guide](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js-react-vite)
<!-- docs-link:end -->

See also the [MapLibre GL JS webpack guide](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js-webpack) for the webpack worker setup.

## Setup

Requires Node.js 22.15 or later.

Run `npm install`, copy `.env.example` to `.env.local`, and set `PMI_MAP_TOKEN` to your Parsimap token. Run `npm start` to use the standard example or `npm run start:stateful` for the stateful example.

`src/App.jsx` uses a ref for the map container. `src/StatefulMap.jsx` stores the container and map instance in React state and displays initialization status.
