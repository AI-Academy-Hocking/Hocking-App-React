import { 
<<<<<<< HEAD
  users, type User, type InsertUser, 
  events, type Event, type InsertEvent, 
  buildings, type Building, type InsertBuilding, 
  studentTools, type StudentTool, type InsertStudentTool, 
  comments, type Comment, type InsertComment,
  safetyAlerts, type SafetyAlert, type InsertSafetyAlert,
  safetyResources, type SafetyResource, type InsertSafetyResource,
  type LocationUpdate 
=======
  studentTools, type StudentTool, type InsertStudentTool
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Student Tool operations
  getStudentTools(): Promise<StudentTool[]>;
  getStudentTool(id: string): Promise<StudentTool | undefined>;
  createStudentTool(tool: InsertStudentTool): Promise<StudentTool>;
<<<<<<< HEAD
  
  // Comment operations
  getComments(discussionId: number): Promise<Comment[]>;
  getCommentReplies(commentId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  getUserComments(userId: number): Promise<Comment[]>;
  getAllComments(): Promise<Comment[]>;
  
  // Safety Alert operations
  getSafetyAlerts(): Promise<SafetyAlert[]>;
  getActiveSafetyAlerts(): Promise<SafetyAlert[]>;
  getSafetyAlert(id: number): Promise<SafetyAlert | undefined>;
  createSafetyAlert(alert: InsertSafetyAlert): Promise<SafetyAlert>;
  
  // Safety Resource operations
  getSafetyResources(): Promise<SafetyResource[]>;
  getSafetyResourcesByCategory(category: string): Promise<SafetyResource[]>;
  getSafetyResource(id: number): Promise<SafetyResource | undefined>;
  createSafetyResource(resource: InsertSafetyResource): Promise<SafetyResource>;
=======
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
}

export class MemStorage implements IStorage {
  private studentTools: Map<string, StudentTool>;
<<<<<<< HEAD
  private comments: Map<number, Comment>;
  private safetyAlerts: Map<number, SafetyAlert>;
  private safetyResources: Map<number, SafetyResource>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentBuildingId: number;
  private currentCommentId: number;
  private currentSafetyAlertId: number;
  private currentSafetyResourceId: number;
=======
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch

  constructor() {
    this.studentTools = new Map();
<<<<<<< HEAD
    this.comments = new Map();
    this.safetyAlerts = new Map();
    this.safetyResources = new Map();
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentBuildingId = 1;
    this.currentCommentId = 1;
    this.currentSafetyAlertId = 1;
    this.currentSafetyResourceId = 1;
=======
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
    
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
<<<<<<< HEAD
    this.studentTools.set(tool.id, tool);
    return tool;
  }
  
  // Comment operations
  async getAllComments(): Promise<Comment[]> {
    return Array.from(this.comments.values());
  }

  async getComments(discussionId: number): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.discussionId === discussionId && comment.parentId === null
    );
  }
  
  async getCommentReplies(commentId: number): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.parentId === commentId
    );
  }
  
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = {
      id,
      discussionId: insertComment.discussionId,
      authorId: insertComment.authorId,
      content: insertComment.content,
      createdAt: new Date(),
      parentId: insertComment.parentId ?? null
    };
    this.comments.set(id, comment);
    return comment;
  }
  
  async getUserComments(userId: number): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.authorId === userId
    );
  }
  
  // Safety Alert operations
  async getSafetyAlerts(): Promise<SafetyAlert[]> {
    return Array.from(this.safetyAlerts.values());
  }
  
  async getActiveSafetyAlerts(): Promise<SafetyAlert[]> {
    const now = new Date();
    return Array.from(this.safetyAlerts.values()).filter(alert => 
      alert.isActive && 
      (alert.endDate === null || alert.endDate > now)
    );
  }
  
  async getSafetyAlert(id: number): Promise<SafetyAlert | undefined> {
    return this.safetyAlerts.get(id);
  }
  
  async createSafetyAlert(insertAlert: InsertSafetyAlert): Promise<SafetyAlert> {
    const id = this.currentSafetyAlertId++;
    const alert: SafetyAlert = {
      id,
      title: insertAlert.title,
      content: insertAlert.content,
      severity: insertAlert.severity,
      startDate: insertAlert.startDate ?? new Date(),
      endDate: insertAlert.endDate ?? null,
      isActive: insertAlert.isActive ?? true,
      location: insertAlert.location ?? null
    };
    this.safetyAlerts.set(id, alert);
    return alert;
  }
  
  // Safety Resource operations
  async getSafetyResources(): Promise<SafetyResource[]> {
    return Array.from(this.safetyResources.values())
      .sort((a, b) => (a.order || 999) - (b.order || 999));
  }
  
  async getSafetyResourcesByCategory(category: string): Promise<SafetyResource[]> {
    return Array.from(this.safetyResources.values())
      .filter(resource => resource.category === category)
      .sort((a, b) => (a.order || 999) - (b.order || 999));
  }
  
  async getSafetyResource(id: number): Promise<SafetyResource | undefined> {
    return this.safetyResources.get(id);
  }
  
  async createSafetyResource(insertResource: InsertSafetyResource): Promise<SafetyResource> {
    const id = this.currentSafetyResourceId++;
    const resource: SafetyResource = {
      id,
      title: insertResource.title,
      description: insertResource.description,
      category: insertResource.category,
      url: insertResource.url ?? null,
      phoneNumber: insertResource.phoneNumber ?? null,
      icon: insertResource.icon ?? null,
      order: insertResource.order ?? 0
    };
    this.safetyResources.set(id, resource);
    return resource;
=======
    // Just store the tool as-is, don't add createdAt or isActive
    this.studentTools.set(tool.id, tool as StudentTool);
    return tool as StudentTool;
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
  }
  
  // Initialize with sample data
  private async initializeSampleData() {
<<<<<<< HEAD
    // Sample users
    await this.createUser({
      username: "admin",
      password: "password",
      isGuest: false,
      name: "Admin User",
      email: "admin@hocking.edu",
    });
    
    await this.createUser({
      username: "student",
      password: "password",
      isGuest: false,
      name: "Student User",
      email: "student@hocking.edu",
    });
    
    // No sample events - removed
    
    // Sample buildings
    await this.createBuilding({
      name: "Main Hall",
      description: "Administrative offices, classrooms",
      category: "academic",
      lat: 39.5274,
      lng: -82.4156,
    });
    
    await this.createBuilding({
      name: "Student Center",
      description: "Dining, recreation, student services",
      category: "dining",
      lat: 39.5280,
      lng: -82.4150,
    });
    
    await this.createBuilding({
      name: "Davidson Hall",
      description: "Science labs, lecture halls",
      category: "academic",
      lat: 39.5268,
      lng: -82.4162,
    });
    
    await this.createBuilding({
      name: "Library",
      description: "Books, study spaces, computer labs",
      category: "academic",
      lat: 39.5265,
      lng: -82.4145,
    });
    
    await this.createBuilding({
      name: "Recreation Center",
      description: "Gym, pool, fitness classes",
      category: "housing",
      lat: 39.529,
      lng: -82.417
    });
    
    // Sample student tools
    await this.createStudentTool({
      id: "grades",
      name: "Grades",
      description: "Check your academic performance",
      category: "academic",
      url: "#"
    });
    
    await this.createStudentTool({
      id: "course-catalog",
      name: "Course Catalog",
      description: "Browse available courses",
      category: "academic",
      url: "/tools/academic/course-catalog",
    });

    await this.createStudentTool({
      id: "course-schedule",
      name: "Course Schedule",
      description: "View your current classes",
      category: "academic",
      url: "#",
    });

    await this.createStudentTool({
      id: "advising",
      name: "Advising",
      description: "Connect with your advisor",
      category: "academic",
      url: "/tools/academic/advising",
    });
    
    await this.createStudentTool({
      id: "graduation",
      name: "Graduation",
      description: "Apply for graduation and view commencement info",
      category: "academic",
      url: "/tools/academic/graduation",
    });

    await this.createStudentTool({
      id: "academic-history",
      name: "Academic History",
      description: "View your transcript",
      category: "academic",
      url: "#",
    });

    await this.createStudentTool({
      id: "office-administration",
      name: "Office & Administration",
      description: "Info on Registrar, Financial Aid, and more",
      category: "academic",
      url: "/tools/academic/office-administration",
    });

    await this.createStudentTool({
      id: "career-university-center",
      name: "Career & University Center",
      description: "Career counseling, job fairs, and transfer services",
      category: "academic",
      url: "/tools/academic/career-university-center",
    });
    
    await this.createStudentTool({
      id: "financial-aid",
      name: "Financial Aid",
      description: "View and manage your financial aid",
      category: "financial",
      url: "#",
    });
    
    await this.createStudentTool({
      id: "billing",
      name: "Billing",
      description: "Pay tuition and view statements",
      category: "financial",
      url: "#",
    });
    
    await this.createStudentTool({
      id: "campus-resources",
      name: "Campus Resources",
      description: "Access campus services",
      category: "resources",
      url: "#",
    });
    
    await this.createStudentTool({
      id: "health-services",
      name: "Health Services",
      description: "Schedule health appointments",
      category: "resources",
      url: "#",
    });
    
=======
    // Sample student tools - only what's needed for Career & University Center
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
    await this.createStudentTool({
      id: "career-services",
      name: "Career & University Center",
      description: "Job search and career planning",
      category: "resources",
<<<<<<< HEAD
      url: "#",
    });
    
    // Sample safety alerts
    await this.createSafetyAlert({
      title: "Weather Advisory",
      content: "A winter storm warning is in effect for our area from 6pm today until 6am tomorrow. Expect heavy snowfall and icy conditions. Please use caution when traveling and allow extra time for your commute.",
      severity: "warning",
      startDate: new Date(),
      isActive: true,
      location: "All Campus"
    });
    
    await this.createSafetyAlert({
      title: "Planned Power Outage: Davidson Hall",
      content: "There will be a planned power outage in Davidson Hall on Saturday from 8am to 12pm for electrical system maintenance. Plan accordingly and please avoid this building during this time.",
      severity: "info",
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      isActive: true,
      location: "Davidson Hall"
    });
    
    // Sample safety resources
    await this.createSafetyResource({
      title: "Campus Police",
      description: "24/7 emergency assistance and security services",
      category: "emergency",
      phoneNumber: "740-753-6598",
      icon: "shield",
      order: 1
    });
    
    await this.createSafetyResource({
      title: "Emergency Notification System",
      description: "Sign up for emergency text alerts",
      category: "emergency",
      url: "#",
      icon: "bell",
      order: 2
    });
    
    await this.createSafetyResource({
      title: "Health Center",
      description: "Medical services for students",
      category: "health",
      phoneNumber: "740-753-6487",
      url: "#",
      icon: "first-aid",
      order: 3
    });
    
    await this.createSafetyResource({
      title: "Counseling Services",
      description: "Confidential mental health support",
      category: "health",
      phoneNumber: "740-753-6789",
      url: "#",
      icon: "heart-pulse",
      order: 4
    });
    
    await this.createSafetyResource({
      title: "Campus Escort Service",
      description: "Safe accompaniment across campus after dark",
      category: "security",
      phoneNumber: "740-753-6123",
      icon: "footprints",
      order: 5
    });
    
    await this.createSafetyResource({
      title: "Anonymous Tip Line",
      description: "Report suspicious activity anonymously",
      category: "security",
      phoneNumber: "740-753-7890",
      url: "#",
      icon: "eye-off",
      order: 6
    });
    
    await this.createSafetyResource({
      title: "Weather Updates",
      description: "Local weather forecasts and alerts",
      category: "weather",
      url: "https://weather.gov",
      icon: "cloud",
      order: 7
    });
    
    await this.createSafetyResource({
      title: "Emergency Procedures",
      description: "Step-by-step guides for emergency situations",
      category: "emergency",
      url: "#",
      icon: "file-text",
      order: 8
=======
      url: "/career-university-center",
<<<<<<< HEAD
>>>>>>> origin/Jodian-Branch
=======
>>>>>>> Jodian-Branch
>>>>>>> origin/Lukas-Branch
    });
  }
}

export const storage = new MemStorage(); 