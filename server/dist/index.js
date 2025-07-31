"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
<<<<<<< Updated upstream
const cors_1 = __importDefault(require("cors"));
const calendar_1 = __importDefault(require("./routes/calendar"));
=======
const cors = require('cors');
const { registerRoutes } = require('./routes');
const storage_1 = require("./storage");
>>>>>>> Stashed changes
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const storage = new storage_1.MemStorage();
// Middleware
app.use(cors());
app.use(express_1.default.json());
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
