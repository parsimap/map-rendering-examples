import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

export const metadata: Metadata = {
  title: 'Parsimap + Mapbox GL JS + Next.js (App Router)',
  description: 'Interactive Parsimap map using Mapbox GL JS and the Next.js App Router.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
