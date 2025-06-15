import express from 'express';
import cors from 'cors';
import calendarRouter from './routes/calendar';
import { MemStorage } from './storage';

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

app.get('/api/student-tools/:id', async (req, res) => {
  const tool = await storage.getStudentTool(req.params.id);
  if (!tool) {
    res.status(404).json({ error: 'Tool not found' });
    return;
  }
  res.json(tool);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});