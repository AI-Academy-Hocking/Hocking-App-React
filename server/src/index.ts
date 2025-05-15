import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Register all API routes
registerRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 