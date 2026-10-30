import HomeComponents from "@/components/home/HomeComponents";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kids-e-Dental</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <HomeComponents />
    </>
  );
}
