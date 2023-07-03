import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import Image from "next/image";

type StringRequest = string;
type SelectColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

type SelectPropertyResponse = {
  id: StringRequest;
  name: StringRequest;
  color: SelectColor;
};

interface Props {
  data: PageObjectResponse | PartialPageObjectResponse;
}

export default function ProjectItem({ data }: Props) {
  let title = "";
  let description = "";
  let imgSrc = "";
  let tags: SelectPropertyResponse[] = [];

  if ("cover" in data) {
    if (data.cover && "external" in data.cover) {
      imgSrc = data.cover.external.url;
    }
  }
  if ("properties" in data) {
    if ("title" in data.properties.s) {
      title = data.properties.s.title[0]?.plain_text ?? "제목을 입력해주세요";
    }
    if ("rich_text" in data.properties["description"]) {
      description =
        data.properties["description"].rich_text[0]?.plain_text ?? "";
    }
    if ("multi_select" in data.properties["tags"]) {
      tags = data.properties["tags"].multi_select;
    }
  }

  return (
    <article className="project-card">
      {imgSrc && (
        <Image
          className="w-full rounded-t-xl"
          src={imgSrc}
          alt={`cover-${title}`}
          placeholder="blur"
          blurDataURL={
            "https://avatars.githubusercontent.com/u/44238060?s=48&v=4"
          }
          width={200}
          height={275}
          quality={100}
        />
      )}
      <div className="flex flex-col p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <h3 className="mt-4 text-xl">{description}</h3>}
        {tags.length > 0 && (
          <div className="flex items-start mt-2">
            {tags.map((tag) => (
              <h4
                key={tag.id}
                className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700"
              >
                {tag.name}
              </h4>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
