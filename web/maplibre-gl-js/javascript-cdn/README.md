# Parsimap + MapLibre GL JS + JavaScript (CDN)

<!-- docs-link:start -->
Documentation: [MapLibre GL JS with JavaScript (CDN)](https://docs.parsimap.dev/docs/Render%20Maps/maplibre-gl-js/javascript-cdn)
<!-- docs-link:end -->

## Requirements

- A Parsimap map token from the [Parsimap dashboard](https://dashboard.parsimap.ir/auth/signup).
- Any static HTTP server.

## Setup and run

1. Replace `YOUR_TOKEN_HERE` in `main.js` with your token; there is no build step. Do not commit a real token.
2. Serve this folder over HTTP, for example with `python -m http.server 8000`, and open http://localhost:8000. Opening `index.html` from the file system does not work.

## Build and preview

Not needed: deploy `index.html` and `main.js` to any static host.

## Files

- `index.html`: loads the MapLibre stylesheet and contains the map container.
- `main.js`: creates the map.
