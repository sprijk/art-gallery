import { defineEventHandler, readBody } from "h3";
import { initDatabase } from "../../database";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = await initDatabase();

  // Create public artwork directory if it doesn't exist
  const publicArtworkDir = path.join("public", "artworks");
  if (!fs.existsSync(publicArtworkDir)) {
    fs.mkdirSync(publicArtworkDir, { recursive: true });
  }

  // Move file from ingress to public directory
  const ingressPath = path.join("./data/ingress", body.originalFilename);
  const publicPath = path.join(publicArtworkDir, body.originalFilename);
  if (fs.existsSync(ingressPath)) {
    fs.copyFileSync(ingressPath, publicPath);
    fs.unlinkSync(ingressPath);
  }

  // Update image path to use URL format
  const imageUrl = `/artworks/${body.originalFilename}`;

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
      imageUrl,
      body.originalFilename,
      body.year,
      body.category,
      body.tags.join(","),
      body.dimensions,
      body.medium,
    ]
  );

  return { success: true, id: result.lastID };
});
