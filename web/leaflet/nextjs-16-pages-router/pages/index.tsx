import Head from 'next/head';
import Map from '../components/Map';

export default function Page() {
  return (
    <>
      <Head>
        <title>Parsimap + Leaflet + Next.js 16 (Pages Router)</title>
        <meta
          name="description"
          content="Parsimap raster map using Leaflet 1.9.4 and the Next.js 16 Pages Router."
        />
      </Head>
      <Map />
    </>
  );
}
