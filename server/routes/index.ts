import express from 'express';
import { createServer } from 'http';

export async function registerRoutes(app: express.Application) {
  const server = createServer(app);

  // Basic health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Add your other routes here
  // Example:
  // app.get('/api/events', (req, res) => {
  //   res.json({ events: [] });
  // });

  return server;
} 