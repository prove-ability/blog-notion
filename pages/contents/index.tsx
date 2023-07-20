import React from "react";
import Layout from "@/components/layout";
import { fetchContents } from "@/utils/notionClient";
import { InferGetStaticPropsType } from "next";
import ProjectItem from "@/components/projectItem";

export default function contents({
  contents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Layout>
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>
          <p className="max-w-md mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>
        <h1>모든 컨텐츠: {contents.results.length}</h1>
        <section className="flex flex-wrap gap-10 p-4">
          {contents.results.map((content) => (
            <ProjectItem key={content.id} data={content} />
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const contents = await fetchContents();

  return {
    props: { contents }, // will be passed to the page component as props
    revalidate: 600,
  };
}
