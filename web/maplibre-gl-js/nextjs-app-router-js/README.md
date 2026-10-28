# Parsimap with MapLibre GL JS and Next.js

<!-- docs-link:start -->
See the [Parsimap guide](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js-nextjs).
<!-- docs-link:end -->

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your Parsimap token.
3. Run `npm run dev`.

## Examples

`app/map.jsx` uses a ref for the map container. To try the state-based example, change the import in `app/page.jsx` to:

```jsx
import Map from './StatefulMap.jsx';
```

`app/StatefulMap.jsx` stores the container and map instance in React state and renders an initialization status.
