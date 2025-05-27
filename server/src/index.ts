const express = require('express');
const cors = require('cors');
const { registerRoutes } = require('./routes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Register all routes
registerRoutes(app).then((server) => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}); 