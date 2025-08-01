import express, { Express } from 'express';
const cors = require('cors');
<<<<<<< HEAD
const { registerRoutes } = require('../routes');
=======
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Hocking College Server is running!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
