import HomeComponents from "@/components/home/HomeComponents";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kids-e-Dental</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <HomeComponents />
    </>
  );
}
