import React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

export const metadata = { title: 'MapLibre GL JS' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}

