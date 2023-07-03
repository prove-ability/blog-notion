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
        <h1>모든 컨텐츠: {contents.length}</h1>
        <section className="gap-10 p-4 columns-4">
          {contents.map((content) => (
            <ProjectItem key={content.id} data={content} />
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const contents = await getContentNames();

  // Get the paths we want to pre-render based on posts
  const paths = contents.results.map((content) => ({
    params: { id: content.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps() {
  const contents = await getContentNames();

  return {
    props: { contents: contents.results }, // will be passed to the page component as props
    revalidate: 10,
  };
}
