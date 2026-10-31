// Imports with ?url resolve to the emitted file URL; see next.config.ts.
declare module '*?url' {
  const url: string;
  export default url;
}

// Next.js 15 does not declare plain CSS imports, which TypeScript 6 checks.
declare module '*.css';
