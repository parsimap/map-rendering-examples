import type { Metadata } from 'next';
import StatefulMap from '../StatefulMap';

export const metadata: Metadata = {
  title: 'Parsimap + Mapbox GL JS + Next.js (App Router) – stateful',
  description: 'Stateful Parsimap map using Mapbox GL JS and the Next.js App Router.',
};

export default function Page() {
  return (
    <main>
      <StatefulMap />
    </main>
  );
}
