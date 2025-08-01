"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
<<<<<<< HEAD
<<<<<<< HEAD
const calendar_1 = __importDefault(require("./routes/calendar"));
const storage_1 = require("./storage");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
=======
>>>>>>> origin/Jodian-Branch
=======
const { registerRoutes } = require('../routes');
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express_1.default.json());
<<<<<<< HEAD
<<<<<<< HEAD
// Routes
app.use('/api/calendar', calendar_1.default);
// Student Tools routes
app.get('/api/student-tools', async (req, res) => {
    const tools = await storage.getStudentTools();
    res.json(tools);
=======
// Register all routes
registerRoutes(app).then((server) => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
>>>>>>> origin/Lukas-Branch
=======
// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Hocking College Server is running!' });
});
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
});
