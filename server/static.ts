import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  
  console.log(`[Static] __dirname: ${__dirname}`);
  console.log(`[Static] Looking for public files at: ${distPath}`);
  console.log(`[Static] Directory exists: ${fs.existsSync(distPath)}`);

  if (!fs.existsSync(distPath)) {
    console.error(`[Static] ERROR: Build directory not found at ${distPath}`);
    console.log(`[Static] Current directory contents:`, fs.readdirSync(__dirname));
    
    // Don't crash - serve a fallback message
    app.use("*", (_req, res) => {
      res.status(503).json({ 
        error: "Application is starting...",
        details: `Build directory not found: ${distPath}`,
        dirname: __dirname
      });
    });
    return;
  }
  
  console.log(`[Static] Found ${fs.readdirSync(distPath).length} files in public directory`);

  // Special handling for video files to prevent caching errors
  app.get('*.mp4', (req, res) => {
    const videoPath = path.join(distPath, req.path);
    if (fs.existsSync(videoPath)) {
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
      }
    } else {
      res.status(404).send('Video not found');
    }
  });

  app.use(express.static(distPath, {
    setHeaders: (res, filepath) => {
      // Set proper headers for video files
      if (filepath.endsWith('.mp4')) {
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

