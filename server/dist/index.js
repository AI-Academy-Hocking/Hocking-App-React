"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const { registerRoutes } = require('../routes');
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express_1.default.json());
// Register all routes
registerRoutes(app).then((server) => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
