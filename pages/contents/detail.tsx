import "prismjs/themes/prism-tomorrow.css";

import React, { useEffect } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { NotionRenderer } from "react-notion";

export default function ContentDetail() {
  const router = useRouter();

  const [blocks, setBlocks] = React.useState({});

  useEffect(() => {
    (async () => {
      const pageId = router.query.url?.toString().split("/")[3];
      if (!pageId) return;
      const response = await fetch(
        `https://notion-api.splitbee.io/v1/page/${pageId}`
      ).then((res) => res.json());
      setBlocks(response);
    })();
  }, [router.query.url]);

  useEffect(() => {
    if (!Object.keys(blocks).length) return;
    const figures = document.querySelectorAll("figure");
    figures.forEach((figure) => {
      figure.style.width = "100%";
      const div = figure.querySelector("div");

      if (!div) return;
      div.style.paddingBottom = "2rem";
    });
    const title = document.querySelector<HTMLDivElement>(".notion-title");
    if (!title) return;
    title.style.fontSize = "2rem";
    title.style.paddingBottom = "2rem";

    const hrs = document.querySelectorAll<HTMLHRElement>(".notion-hr");
    hrs.forEach((hr) => {
      hr.style.border = "none";
      hr.style.borderBottom = "1px solid #e2e8f0";
      hr.style.margin = "2rem 0";
    });

    const h2 = document.querySelectorAll<HTMLHeadingElement>(".notion-h2");
    h2.forEach((h) => {
      h.style.fontSize = "1.5rem";
      h.style.fontWeight = "bold";
      h.style.paddingBottom = "1rem";
    });

    const h3 = document.querySelectorAll<HTMLHeadingElement>(".notion-h3");
    h3.forEach((h) => {
      h.style.fontSize = "1.25rem";
      h.style.fontWeight = "bold";
      h.style.paddingBottom = "1rem";
    });
  }, [blocks]);

  return (
    <>
      <Layout>
        {Object.keys(blocks).length && (
          <NotionRenderer blockMap={blocks} fullPage hideHeader />
        )}
      </Layout>
    </>
  );
}
