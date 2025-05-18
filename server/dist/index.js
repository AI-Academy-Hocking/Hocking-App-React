import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes';
const app = express();
const port = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express.json());
// Register all API routes and start server
registerRoutes(app).then(httpServer => {
    httpServer.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
