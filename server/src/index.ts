import express, { Express } from 'express';
const cors = require('cors');
import calendarRouter from './routes/calendar';
import { MemStorage } from './storage';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const storage = new MemStorage();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/calendar', calendarRouter);

// Student Tools routes
app.get('/api/student-tools', async (req, res) => {
  const tools = await storage.getStudentTools();
  res.json(tools);
});
