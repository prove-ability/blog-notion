import { Client, LogLevel } from "@notionhq/client";

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
  logLevel: process.env.NODE_ENV !== "production" ? LogLevel.DEBUG : undefined,
});

const databaseId = process.env.NOTION_DATABASE_ID ?? "";

// export const getContentNames = async () => {
//   const response = await notionClient.databases.query({
//     database_id: databaseId,
//     sorts: [
//       {
//         timestamp: "created_time",
//         direction: "descending",
//       },
//     ],
//   });
//   return response;
// };

export const fetchContents = () =>
  notionClient.databases.query({
    database_id: databaseId,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

export const fetchPageById = async (id: string) => {
  console.log("id", id);
  const blockData = await notionClient.blocks.retrieve({
    block_id: id,
  });

  const blockChildData = await notionClient.blocks.children.list({
    block_id: id,
  });

  const blockChild2DepthData = await notionClient.blocks.children.list({
    block_id: blockChildData.results[0].id,
  });
};
