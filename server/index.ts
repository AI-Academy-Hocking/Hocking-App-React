import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import cors from 'cors';

// Simple log function to avoid importing vite module in production
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
import programsRouter from './api/programs';
import calendarRouter from './src/routes/calendar';
import verificationRouter from './api/verification';
import postsRouter from './api/posts';
import socialRouter from './api/social';
import { setupSecurity } from './middleware/security';
import { errorHandler } from './utils/errorHandler';

const app = express();

// Security middleware first
setupSecurity(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration with environment variable
const corsOrigin = process.env.CORS_ORIGIN || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173');

app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/calendar', calendarRouter);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Use improved error handler
  app.use(errorHandler);

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV 
    });
  });

  // API Routes
  app.use('/api/programs', programsRouter);
  app.use('/api/verification', verificationRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/social', socialRouter);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import vite module only in development
    const { setupVite } = await import("./vite.js");
    await setupVite(app, server);
  } else {
    // Import serveStatic for production
    const { serveStatic } = await import("./static.js");
    serveStatic(app);
  }

 
  const port = process.env.PORT || 3000
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();
