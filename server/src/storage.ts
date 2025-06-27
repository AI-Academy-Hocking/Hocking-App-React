import { 
  studentTools, type StudentTool, type InsertStudentTool
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Student Tool operations
  getStudentTools(): Promise<StudentTool[]>;
  getStudentTool(id: string): Promise<StudentTool | undefined>;
  createStudentTool(tool: InsertStudentTool): Promise<StudentTool>;
}

export class MemStorage implements IStorage {
  private studentTools: Map<string, StudentTool>;

  constructor() {
    this.studentTools = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // Student Tool operations
  async getStudentTools(): Promise<StudentTool[]> {
    return Array.from(this.studentTools.values());
  }
  
  async getStudentTool(id: string): Promise<StudentTool | undefined> {
    return this.studentTools.get(id);
  }
  
  async createStudentTool(tool: InsertStudentTool): Promise<StudentTool> {
    // Just store the tool as-is, don't add createdAt or isActive
    this.studentTools.set(tool.id, tool as StudentTool);
    return tool as StudentTool;
  }
  
  // Initialize with sample data
  private async initializeSampleData() {
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

export const storage = new MemStorage(); 