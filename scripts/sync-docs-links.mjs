import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const DOCS_BASE_URL = 'https://docs.parsimap.dev';
const examples = [
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
