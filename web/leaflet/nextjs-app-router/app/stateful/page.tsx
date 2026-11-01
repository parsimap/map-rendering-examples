import type { Metadata } from 'next';
import StatefulMap from '../StatefulMap';

export const metadata: Metadata = {
  title: 'Parsimap + Leaflet + Next.js (App Router) – stateful',
  description: 'Stateful Parsimap raster map using Leaflet and the Next.js App Router.',
};

export default function Page() {
  return (
    <main>
      <StatefulMap />
    </main>
  );
}
