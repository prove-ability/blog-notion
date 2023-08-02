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
            Contents
          </h2>
          <p className="max-w-md mt-4 text-gray-500">
            개발 관련해서 작성한 글들을 모아놓은 공간입니다.
          </p>
        </header>
        <section className="flex flex-wrap gap-10 p-4">
          {contents.results.map(
            (content) =>
              (content as any).public_url && (
                <ProjectItem key={content.id} data={content} />
              )
          )}
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
