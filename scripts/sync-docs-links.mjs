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
// Example folders are named after their guide: an example in <dir> is
// documented at <DOCS_PATH>/<dir>, for example web/leaflet/react-vite or
// cross-platform/flutter/maplibre-gl.
const DOCS_PATH = '/docs/Render%20Maps';
const PLATFORMS = ['web', 'android', 'cross-platform'];

const libraries = {
  leaflet: 'Leaflet',
  'mapbox-gl-js': 'Mapbox GL JS',
  'maplibre-gl-js': 'MapLibre GL JS',
  'maplibre-native-android': 'MapLibre Native Android',
  'mapbox-maps-android': 'Mapbox Maps SDK for Android',
  'maplibre-gl': 'maplibre_gl',
  'mapbox-maps-flutter': 'mapbox_maps_flutter',
  'flutter-map': 'flutter_map',
  'maplibre-react-native': 'MapLibre React Native',
  'rnmapbox-maps': 'rnmapbox',
  'maplibre-compose': 'maplibre-compose',
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
  { dir: 'android/maplibre-native-android/kotlin-compose', stack: 'Kotlin (Jetpack Compose)' },
  { dir: 'android/maplibre-native-android/java-views', stack: 'Java (Android Views)' },
  { dir: 'android/mapbox-maps-android/kotlin-views', stack: 'Kotlin (Android Views)' },
  { dir: 'android/mapbox-maps-android/kotlin-compose', stack: 'Kotlin (Jetpack Compose)' },
  { dir: 'android/mapbox-maps-android/java-views', stack: 'Java (Android Views)' },
  { dir: 'cross-platform/flutter/maplibre-gl', stack: 'Flutter', library: 'maplibre-gl' },
  { dir: 'cross-platform/flutter/mapbox-maps-flutter', stack: 'Flutter', library: 'mapbox-maps-flutter' },
  { dir: 'cross-platform/flutter/flutter-map', stack: 'Flutter', library: 'flutter-map' },
  { dir: 'cross-platform/react-native/maplibre-react-native/expo', stack: 'React Native (Expo)', library: 'maplibre-react-native' },
  { dir: 'cross-platform/react-native/maplibre-react-native/react-native-cli', stack: 'React Native CLI', library: 'maplibre-react-native' },
  { dir: 'cross-platform/react-native/rnmapbox-maps/expo', stack: 'React Native (Expo)', library: 'rnmapbox-maps' },
  { dir: 'cross-platform/react-native/rnmapbox-maps/react-native-cli', stack: 'React Native CLI', library: 'rnmapbox-maps' },
  { dir: 'cross-platform/kotlin-multiplatform/maplibre-compose', stack: 'Kotlin Multiplatform (Compose Multiplatform)', library: 'maplibre-compose' },
];

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2] ?? 'write';
if (!['write', '--check', '--check-urls'].includes(mode)) {
  throw new Error(`Unknown option ${mode}`);
}

const exists = (path) => access(path).then(() => true, () => false);

function describe({ dir, stack, library }) {
  const name = `${libraries[library ?? dir.split('/')[1]]} with ${stack}`;
  return { name, url: `${DOCS_BASE_URL}${DOCS_PATH}/${dir}` };
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

// An example is the first folder below a platform that has a README.
async function exampleFolders() {
  const folders = [];
  async function visit(dir) {
    if (await exists(join(root, dir, 'README.md'))) return folders.push(dir);
    for (const entry of await readdir(join(root, dir), { withFileTypes: true })) {
      if (entry.isDirectory()) await visit(`${dir}/${entry.name}`);
    }
  }
  for (const platform of PLATFORMS) if (await exists(join(root, platform))) await visit(platform);
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
