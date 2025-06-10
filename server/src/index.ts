import express from 'express';
import cors from 'cors';
import programsRouter from '../api/programs';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/programs', programsRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});