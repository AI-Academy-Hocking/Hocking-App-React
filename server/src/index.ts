import express, { Express } from 'express';
const cors = require('cors');
const { registerRoutes } = require('./routes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD

// Routes
app.use('/api/calendar', calendarRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

=======
// Register all routes
registerRoutes(app).then((server: Express) => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}); 
>>>>>>> c638959b24dc6c36aa7b047bc0d62fea3619d794
