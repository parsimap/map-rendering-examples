# Parsimap with MapLibre GL JS, React, and Vite

<!-- docs-link:start -->
[MapLibre GL JS React and Vite guide](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js-react-vite)
<!-- docs-link:end -->

## Setup

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
```

Copy `.env.example` to `.env.local` and set `VITE_PMI_MAP_TOKEN` to your Parsimap token.

```sh
npm run dev
```

## Examples

`src/App.jsx` uses a ref for the map container. To try the state-based example, change the import in `src/main.jsx` to:

```jsx
import App from './StatefulMap.jsx';
```

`src/StatefulMap.jsx` stores the container and map instance in React state and renders an initialization status.
