import { defineEventHandler, readBody } from "h3";
import { initDatabase } from "../../database";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = await initDatabase();

  const result = await db.run(
    `
        INSERT INTO artworks (
            title, artist, description, image_path,
            original_filename, year, category, tags,
            dimensions, medium
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      body.title,
      body.artist,
      body.description,
      body.imagePath,
      body.originalFilename,
      body.year,
      body.category,
      body.tags.join(","),
      body.dimensions,
      body.medium,
    ]
  );

  // Remove from ingress after successful save
  const ingressPath = path.join("./data/ingress", body.originalFilename);
  if (fs.existsSync(ingressPath)) {
    fs.unlinkSync(ingressPath);
  }

  return { success: true, id: result.lastID };
});
