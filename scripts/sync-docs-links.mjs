// Keeps documentation links in the example READMEs and the root README example
// table in sync with the list below.
//
//   node scripts/sync-docs-links.mjs               rewrite the generated sections
//   node scripts/sync-docs-links.mjs --check       fail if a generated section is stale
//   node scripts/sync-docs-links.mjs --check-urls  fail if a documentation URL does not load
import { readFile, readdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const DOCS_BASE_URL = 'https://docs.parsimap.dev';
// Example folders are named after their guide: <platform>/<library>/<folder> is
// documented at <DOCS_PATH>/<platform>/<library>/<folder>.
const DOCS_PATH = '/docs/Render%20Maps';
const PLATFORMS = ['web', 'android'];

const libraries = {
  leaflet: 'Leaflet',
  'mapbox-gl-js': 'Mapbox GL JS',
  'maplibre-gl-js': 'MapLibre GL JS',
  'maplibre-native-android': 'MapLibre Native Android',
};
const examples = [
  { dir: 'web/leaflet/javascript-cdn', stack: 'JavaScript (CDN)' },
  { dir: 'web/leaflet/vite-javascript', stack: 'JavaScript (Vite)' },
  { dir: 'web/leaflet/webpack-javascript', stack: 'JavaScript (webpack)' },
  { dir: 'web/leaflet/react-vite', stack: 'React (Vite)' },
  { dir: 'web/leaflet/react-webpack', stack: 'React (webpack)' },
  { dir: 'web/leaflet/nextjs-app-router', stack: 'Next.js (App Router)' },
  { dir: 'web/leaflet/nextjs-16-pages-router', stack: 'Next.js 16 (Pages Router)' },
  { dir: 'web/leaflet/nextjs-15-pages-router', stack: 'Next.js 15 (Pages Router)' },
  { dir: 'web/leaflet/vue-vite', stack: 'Vue (Vite)' },
  { dir: 'web/leaflet/nuxt', stack: 'Nuxt' },
  { dir: 'web/leaflet/angular', stack: 'Angular' },
  { dir: 'web/leaflet/svelte-vite', stack: 'Svelte (Vite)' },
  { dir: 'web/leaflet/sveltekit-3', stack: 'SvelteKit 3' },
  { dir: 'web/leaflet/sveltekit-2', stack: 'SvelteKit 2' },
  { dir: 'web/mapbox-gl-js/javascript-cdn', stack: 'JavaScript (CDN)' },
  { dir: 'web/mapbox-gl-js/vite-javascript', stack: 'JavaScript (Vite)' },
  { dir: 'web/mapbox-gl-js/webpack-javascript', stack: 'JavaScript (webpack)' },
  { dir: 'web/mapbox-gl-js/react-vite', stack: 'React (Vite)' },
  { dir: 'web/mapbox-gl-js/react-webpack', stack: 'React (webpack)' },
  { dir: 'web/mapbox-gl-js/nextjs-app-router', stack: 'Next.js (App Router)' },
  { dir: 'web/mapbox-gl-js/nextjs-16-pages-router', stack: 'Next.js 16 (Pages Router)' },
  { dir: 'web/mapbox-gl-js/nextjs-15-pages-router', stack: 'Next.js 15 (Pages Router)' },
  { dir: 'web/mapbox-gl-js/vue-vite', stack: 'Vue (Vite)' },
  { dir: 'web/mapbox-gl-js/nuxt', stack: 'Nuxt' },
  { dir: 'web/mapbox-gl-js/angular', stack: 'Angular' },
  { dir: 'web/mapbox-gl-js/svelte-vite', stack: 'Svelte (Vite)' },
  { dir: 'web/mapbox-gl-js/sveltekit-3', stack: 'SvelteKit 3' },
  { dir: 'web/mapbox-gl-js/sveltekit-2', stack: 'SvelteKit 2' },
  { dir: 'web/maplibre-gl-js/javascript-cdn', stack: 'JavaScript (CDN)' },
  { dir: 'web/maplibre-gl-js/vite-javascript', stack: 'JavaScript (Vite)' },
  { dir: 'web/maplibre-gl-js/webpack-javascript', stack: 'JavaScript (webpack)' },
  { dir: 'web/maplibre-gl-js/react-vite', stack: 'React (Vite)' },
  { dir: 'web/maplibre-gl-js/react-webpack', stack: 'React (webpack)' },
  { dir: 'web/maplibre-gl-js/nextjs-app-router', stack: 'Next.js (App Router)' },
  { dir: 'web/maplibre-gl-js/nextjs-16-pages-router', stack: 'Next.js 16 (Pages Router)' },
  { dir: 'web/maplibre-gl-js/nextjs-15-pages-router', stack: 'Next.js 15 (Pages Router)' },
  { dir: 'web/maplibre-gl-js/vue-vite', stack: 'Vue (Vite)' },
  { dir: 'web/maplibre-gl-js/nuxt', stack: 'Nuxt' },
  { dir: 'web/maplibre-gl-js/angular', stack: 'Angular' },
  { dir: 'web/maplibre-gl-js/svelte-vite', stack: 'Svelte (Vite)' },
  { dir: 'web/maplibre-gl-js/sveltekit-3', stack: 'SvelteKit 3' },
  { dir: 'web/maplibre-gl-js/sveltekit-2', stack: 'SvelteKit 2' },
  { dir: 'android/maplibre-native-android/kotlin-views', stack: 'Kotlin (Android Views)' },
];

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2] ?? 'write';
if (!['write', '--check', '--check-urls'].includes(mode)) {
  throw new Error(`Unknown option ${mode}`);
}

const exists = (path) => access(path).then(() => true, () => false);

function describe({ dir, stack }) {
  const [platform, library, folder] = dir.split('/');
  const name = `${libraries[library]} with ${stack}`;
  return { name, url: `${DOCS_BASE_URL}${DOCS_PATH}/${platform}/${library}/${folder}` };
}

function replaceSection(content, marker, body, file) {
  const pattern = new RegExp(`<!-- ${marker}:start -->[\\s\\S]*?<!-- ${marker}:end -->`);
  if (!pattern.test(content)) throw new Error(`Missing ${marker} markers in ${file}`);
  return content.replace(pattern, `<!-- ${marker}:start -->\n${body}\n<!-- ${marker}:end -->`);
}

async function nodeRequirement(dir) {
  const path = join(root, dir, 'package.json');
  if (!(await exists(path))) return 'Not needed';
  const { engines } = JSON.parse(await readFile(path, 'utf8'));
  // Pipes in version ranges must be escaped inside a Markdown table cell.
  return engines?.node ? `\`${engines.node.replaceAll('|', '\\|')}\`` : 'Any';
}

async function exampleTable() {
  const rows = ['| Stack | Folder | Guide | Node.js |', '| --- | --- | --- | --- |'];
  for (const example of examples) {
    const { name, url } = describe(example);
    rows.push(`| ${example.stack} | [\`${example.dir}\`](${example.dir}) | [${name}](${url}) | ${await nodeRequirement(example.dir)} |`);
  }
  return rows.join('\n');
}

async function expectedFiles() {
  const files = new Map();
  for (const example of examples) {
    const { name, url } = describe(example);
    const path = join(example.dir, 'README.md');
    const content = await readFile(join(root, path), 'utf8');
    files.set(path, replaceSection(content, 'docs-link', `Documentation: [${name}](${url})`, path));
  }
  const readme = await readFile(join(root, 'README.md'), 'utf8');
  files.set('README.md', replaceSection(readme, 'examples', await exampleTable(), 'README.md'));
  return files;
}

async function exampleFolders() {
  const folders = [];
  for (const platform of PLATFORMS) {
    if (!(await exists(join(root, platform)))) continue;
    for (const library of await readdir(join(root, platform))) {
      for (const folder of await readdir(join(root, platform, library))) folders.push(`${platform}/${library}/${folder}`);
    }
  }
  return folders;
}

if (mode === '--check-urls') {
  let failed = false;
  for (const example of examples) {
    const { url } = describe(example);
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' })
      .catch((error) => ({ ok: false, status: error.message }));
    console.log(`${response.ok ? 'ok  ' : 'FAIL'} ${response.status} ${url}`);
    failed ||= !response.ok;
  }
  process.exitCode = failed ? 1 : 0;
} else {
  const unlisted = (await exampleFolders()).filter((folder) => !examples.some(({ dir }) => dir === folder));
  if (unlisted.length > 0) throw new Error(`Add these examples to scripts/sync-docs-links.mjs: ${unlisted.join(', ')}`);

  const stale = [];
  for (const [path, expected] of await expectedFiles()) {
    const current = await readFile(join(root, path), 'utf8');
    if (current.replace(/\r\n/g, '\n') === expected.replace(/\r\n/g, '\n')) continue;
    if (mode === '--check') stale.push(path);
    else await writeFile(join(root, path), expected);
  }
  if (stale.length > 0) {
    console.error(`Out of date: ${stale.join(', ')}. Run node scripts/sync-docs-links.mjs.`);
    process.exitCode = 1;
  }
}
