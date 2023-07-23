import { Client, LogLevel } from "@notionhq/client";

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
  logLevel: process.env.NODE_ENV !== "production" ? LogLevel.DEBUG : undefined,
});

const databaseId = process.env.NOTION_DATABASE_ID ?? "";

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
