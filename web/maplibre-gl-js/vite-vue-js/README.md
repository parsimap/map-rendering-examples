# Parsimap with MapLibre GL JS, Vue, and Vite

<!-- docs-link:start -->
See the [Parsimap guide](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js-vue-vite).
<!-- docs-link:end -->

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and replace `YOUR_TOKEN_HERE` with your Parsimap token.
3. Run `npm run dev`.

## Examples

`src/App.vue` keeps the map instance in a plain variable. To try the state-based example, change the import in `src/main.js` to:

```js
import App from './StatefulMap.vue';
```

`src/StatefulMap.vue` stores the map instance in a `shallowRef` and renders an initialization status.
