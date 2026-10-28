# Parsimap with MapLibre GL JS, Svelte, and Vite

<!-- docs-link:start -->
See the [MapLibre GL JS Svelte and Vite guide](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js-svelte-vite).
<!-- docs-link:end -->

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your Parsimap token.
3. Run `npm run dev`.

## Examples

`src/App.svelte` keeps the map instance in a plain variable. To try the state-based example, change the import in `src/main.js` to:

```js
import App from './StatefulMap.svelte';
```

`src/StatefulMap.svelte` stores the map instance in a `$state.raw` variable and renders an initialization status.
