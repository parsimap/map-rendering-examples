import Head from 'next/head';
import Map from '../components/Map';

export default function Page() {
  return (
    <>
      <Head>
        <title>Parsimap + MapLibre GL JS + Next.js 16 (Pages Router)</title>
      </Head>
      <Map />
    </>
  );
}
