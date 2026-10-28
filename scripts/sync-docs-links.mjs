import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const DOCS_BASE_URL = 'https://docs.parsimap.dev';
const examples = [
  {
    readme: 'web/maplibre-gl-js/nextjs-15-pages-router-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-nextjs-15-pages',
    label: 'MapLibre GL JS Next.js 15 Pages Router guide',
  },
  {
    readme: 'web/maplibre-gl-js/sveltekit-2-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-sveltekit-2',
    label: 'MapLibre GL JS SvelteKit 2 guide',
  },
  {
    readme: 'web/maplibre-gl-js/nextjs-pages-router-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-nextjs-pages',
    label: 'MapLibre GL JS Next.js Pages Router guide',
  },
  {
    readme: 'web/maplibre-gl-js/webpack-vanilla-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-webpack',
    label: 'MapLibre GL JS webpack and JavaScript guide',
  },
  {
    readme: 'web/maplibre-gl-js/webpack-react-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-react-vite',
    label: 'MapLibre GL JS React and Vite guide',
  },
  {
    readme: 'web/maplibre-gl-js/sveltekit-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-sveltekit',
    label: 'MapLibre GL JS SvelteKit guide',
  },
  {
    readme: 'web/maplibre-gl-js/vite-svelte-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-svelte-vite',
    label: 'MapLibre GL JS Svelte and Vite guide',
  },
  {
    readme: 'web/maplibre-gl-js/angular-ts/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-angular',
    label: 'MapLibre GL JS Angular guide',
  },
  {
    readme: 'web/maplibre-gl-js/nuxt-vue-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-nuxt',
    label: 'MapLibre GL JS Nuxt guide',
  },
  {
    readme: 'web/maplibre-gl-js/vite-vue-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-vue-vite',
    label: 'MapLibre GL JS Vue and Vite guide',
  },
  {
    readme: 'web/maplibre-gl-js/nextjs-app-router-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-nextjs',
    label: 'MapLibre GL JS Next.js guide',
  },
  {
    readme: 'web/maplibre-gl-js/vite-react-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-react-vite',
    label: 'MapLibre GL JS React and Vite guide',
  },
  {
    readme: 'web/maplibre-gl-js/browser-vanilla-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js-browser',
    label: 'MapLibre GL JS browser guide',
  },
  {
    readme: 'web/maplibre-gl-js/vite-vanilla-js/README.md',
    docsPath: '/docs/Render%20Maps/maplibre-gl-js',
    label: 'MapLibre GL JS guide',
  },
];

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const marker = /<!-- docs-link:start -->[\s\S]*?<!-- docs-link:end -->/;

for (const { readme, docsPath, label } of examples) {
  const path = resolve(root, readme);
  const content = await readFile(path, 'utf8');
  if (!marker.test(content)) {
    throw new Error(`Missing documentation link markers in ${readme}`);
  }
  const link = `<!-- docs-link:start -->\n[${label}](${DOCS_BASE_URL}${docsPath})\n<!-- docs-link:end -->`;
  await writeFile(path, content.replace(marker, link));
}
