"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
<<<<<<< HEAD
const { registerRoutes } = require('../routes');
=======
>>>>>>> Jodian-Branch
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express_1.default.json());
<<<<<<< HEAD
// Register all routes
registerRoutes(app).then((server) => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
=======
// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Hocking College Server is running!' });
});
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
>>>>>>> Jodian-Branch
});
