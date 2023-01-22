import React from "react";
import Layout from "@/components/layout";
import { getContentNames } from "@/utils/notionClient";
import { InferGetStaticPropsType } from "next";
import ProjectItem from "@/components/projectItem";

export default function contents({
  contents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Layout>
        <h1>모든 컨텐츠: {contents.results.length}</h1>
        <section className="gap-10 p-4 columns-4">
          {contents.results.map((content) => (
            <ProjectItem key={content.id} data={content} />
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const contents = await getContentNames();

  return {
    props: { contents }, // will be passed to the page component as props
  };
}
