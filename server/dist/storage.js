"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
class MemStorage {
    constructor() {
        this.studentTools = new Map();
        // Initialize with sample data
        this.initializeSampleData();
    }
    // Student Tool operations
    async getStudentTools() {
        return Array.from(this.studentTools.values());
    }
    async getStudentTool(id) {
        return this.studentTools.get(id);
    }
    async createStudentTool(tool) {
        // Just store the tool as-is, don't add createdAt or isActive
        this.studentTools.set(tool.id, tool);
        return tool;
    }
    // Initialize with sample data
    async initializeSampleData() {
        // Sample student tools - only what's needed for Career & University Center
        await this.createStudentTool({
            id: "career-services",
            name: "Career & University Center",
            description: "Job search and career planning",
            category: "resources",
            url: "/career-university-center",
        });
    }
}
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
