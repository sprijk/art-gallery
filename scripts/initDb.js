const sqlite3 = require("sqlite3").verbose();

function initDatabase() {
  const db = new sqlite3.Database("./data/gallery.db", (err) => {
    if (err) {
      console.error("Error opening database:", err);
      process.exit(1);
    }
  });

  db.serialize(() => {
    // Create artworks table
    db.run(`CREATE TABLE IF NOT EXISTS artworks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            year INTEGER,
            description TEXT,
            category TEXT,
            medium TEXT,
            dimensions TEXT,
            tags TEXT,
            image_path TEXT
        )`);

    console.log("Database initialized successfully");
  });

  db.close();
}

initDatabase();
