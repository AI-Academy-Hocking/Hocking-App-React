"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const calendar_1 = __importDefault(require("./routes/calendar"));
const storage_1 = require("./storage");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const storage = new storage_1.MemStorage();
// Middleware
app.use(cors());
app.use(express_1.default.json());
// Routes
app.use('/api/calendar', calendar_1.default);
// Student Tools routes
app.get('/api/student-tools', async (req, res) => {
    const tools = await storage.getStudentTools();
    res.json(tools);
});
