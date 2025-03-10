import { defineEventHandler, readBody } from "h3";
import { initDatabase } from "../database";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const UPLOAD_DIR = "./public/images/artworks";
const INGRESS_DIR = "./data/ingress";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const file = body.file;

  // Validate file
  if (!file || !file.buffer) throw new Error("No file uploaded");
  if (!ALLOWED_TYPES.includes(file.mimetype))
    throw new Error("Invalid file type");
  if (file.size > MAX_FILE_SIZE) throw new Error("File too large");

  // Ensure directories exist
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  if (!fs.existsSync(INGRESS_DIR))
    fs.mkdirSync(INGRESS_DIR, { recursive: true });

  const filename = `${Date.now()}-${file.originalFilename}`;
  const ingressPath = path.join(INGRESS_DIR, filename);
  const publicPath = path.join(UPLOAD_DIR, filename);

  // Save original file
  await fs.promises.writeFile(ingressPath, file.buffer);

  // Process and save web version
  await sharp(file.buffer)
    .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(publicPath);

  return {
    success: true,
    paths: {
      ingress: ingressPath,
      public: `/images/artworks/${filename}`,
    },
  };
});
