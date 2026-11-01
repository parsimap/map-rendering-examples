import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: 'Parsimap + Leaflet + Next.js (App Router)',
  description: 'Parsimap raster map using Leaflet 1.9.4 and the Next.js App Router.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
