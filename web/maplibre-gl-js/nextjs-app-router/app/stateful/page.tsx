import type { Metadata } from 'next';
import StatefulMap from '../StatefulMap';

export const metadata: Metadata = { title: 'Parsimap + MapLibre GL JS + Next.js (App Router) – stateful' };

export default function Page() {
  return (
    <main>
      <StatefulMap />
    </main>
  );
}
