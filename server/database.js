import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDatabase() {
  const db = await open({
    filename: "./data/gallery.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
        CREATE TABLE IF NOT EXISTS artworks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            description TEXT,
            image_path TEXT,
            original_filename TEXT,
            year INTEGER,
            category TEXT,
            tags TEXT,
            dimensions TEXT,
            medium TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

  return db;
}
