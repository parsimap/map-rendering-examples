import Head from 'next/head';
import StatefulMap from '../components/StatefulMap';

export default function Page() {
  return (
    <>
      <Head>
        <title>Parsimap + MapLibre GL JS + Next.js 15 (Pages Router) – stateful</title>
      </Head>
      <StatefulMap />
    </>
  );
}
