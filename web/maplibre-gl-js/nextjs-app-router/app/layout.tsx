import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

export const metadata: Metadata = { title: 'MapLibre GL JS' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
