import { Client, LogLevel } from "@notionhq/client";

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
  logLevel: process.env.NODE_ENV !== "production" ? LogLevel.DEBUG : undefined,
});

const databaseId = process.env.NOTION_DATABASE_ID ?? "";

export const getContentNames = async () => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  // const contentNames = response.results.map((content) => {
  //   if ("properties" in content) {
  //     if ("title" in content.properties["이름"]) {
  //       return content.properties["이름"].title[0].plain_text;
  //     }
  //   }
  // });

  return response;
};
