import { defineEventHandler } from "h3";
import { initDatabase } from "../database";

export default defineEventHandler(async (event) => {
  const db = await initDatabase();
  const artworks = await db.all(
    "SELECT * FROM artworks ORDER BY created_at DESC"
  );

  return {
    artworks: artworks.map((artwork) => ({
      ...artwork,
      tags: artwork.tags.split(","),
    })),
  };
});
