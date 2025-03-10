import { defineEventHandler } from "h3";
import fs from "fs";

const INGRESS_DIR = "./data/ingress";

export default defineEventHandler(async () => {
  if (!fs.existsSync(INGRESS_DIR)) {
    return { files: [] };
  }

  const files = fs.readdirSync(INGRESS_DIR);
  return {
    files: files.map((filename) => ({
      name: filename,
      path: `/data/ingress/${filename}`,
    })),
  };
});
