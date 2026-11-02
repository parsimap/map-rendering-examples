import Head from 'next/head';
import StatefulMap from '../components/StatefulMap';

export default function Page() {
  return (
    <>
      <Head>
        <title>Parsimap + Leaflet + Next.js 15 (Pages Router) – stateful</title>
        <meta
          name="description"
          content="Stateful Parsimap raster map using Leaflet and the Next.js 15 Pages Router."
        />
      </Head>
      <StatefulMap />
    </>
  );
}
