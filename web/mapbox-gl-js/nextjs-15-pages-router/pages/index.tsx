import Head from 'next/head';
import Map from '../components/Map';

export default function Page() {
  return (
    <>
      <Head>
        <title>Parsimap + Mapbox GL JS + Next.js 15 (Pages Router)</title>
        <meta
          name="description"
          content="Interactive Parsimap map using Mapbox GL JS and the Next.js 15 Pages Router."
        />
      </Head>
      <Map />
    </>
  );
}
