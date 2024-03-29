import Head from "next/head";
import { Inter } from "@next/font/google";
import Layout from "../components/layout";
import Hero from "../components/home/hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Prove&apos;s blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="flex flex-col items-center justify-center min-h-screen text-gray-600 body-font">
          <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
            <Hero />
          </div>
        </section>
      </Layout>
    </>
  );
}
