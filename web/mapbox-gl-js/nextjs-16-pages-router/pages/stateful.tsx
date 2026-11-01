import Head from 'next/head';
import StatefulMap from '../components/StatefulMap';

export default function Page() {
  return (
    <>
      <Head>
        <title>Parsimap + Mapbox GL JS + Next.js 16 (Pages Router) – stateful</title>
        <meta
          name="description"
          content="Stateful Parsimap map using Mapbox GL JS and the Next.js 16 Pages Router."
        />
      </Head>
      <StatefulMap />
    </>
  );
}
