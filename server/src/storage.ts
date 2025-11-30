import { 
  users, type User, type InsertUser, 
  events, type Event, type InsertEvent, 
  buildings, type Building, type InsertBuilding, 
  studentTools, type StudentTool, type InsertStudentTool, 
  safetyAlerts, type SafetyAlert, type InsertSafetyAlert,
  safetyResources, type SafetyResource, type InsertSafetyResource,
  type LocationUpdate 
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLocation(userId: number, locationUpdate: LocationUpdate): Promise<User | undefined>;
  getSharedLocations(): Promise<User[]>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Building operations
  getBuildings(): Promise<Building[]>;
  getBuilding(id: number): Promise<Building | undefined>;
  createBuilding(building: InsertBuilding): Promise<Building>;
  
  // Student Tool operations
  getStudentTools(): Promise<StudentTool[]>;
  getStudentTool(id: string): Promise<StudentTool | undefined>;
  createStudentTool(tool: InsertStudentTool): Promise<StudentTool>;
  
  // Comment operations - DISABLED (not in schema)
  // getComments(discussionId: number): Promise<Comment[]>;
  // getCommentReplies(commentId: number): Promise<Comment[]>;
  // createComment(comment: InsertComment): Promise<Comment>;
  // getUserComments(userId: number): Promise<Comment[]>;
  // getAllComments(): Promise<Comment[]>;
  
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private buildings: Map<number, Building>;
  private studentTools: Map<string, StudentTool>;
  // private comments: Map<number, Comment>; // DISABLED - not in schema
  private safetyAlerts: Map<number, SafetyAlert>;
  private safetyResources: Map<number, SafetyResource>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentBuildingId: number;
  // private currentCommentId: number; // DISABLED - not in schema
  private currentSafetyAlertId: number;
  private currentSafetyResourceId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.buildings = new Map();
    this.studentTools = new Map();
    // this.comments = new Map(); // DISABLED - not in schema
    this.safetyAlerts = new Map();
    this.safetyResources = new Map();
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentBuildingId = 1;
    // this.currentCommentId = 1; // DISABLED - not in schema
    this.currentSafetyAlertId = 1;
    this.currentSafetyResourceId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      name: insertUser.name,
      isGuest: insertUser.isGuest ?? false,
      createdAt: new Date(),
      lastLogin: null,
      location: insertUser.location ?? null,
      isSharingLocation: insertUser.isSharingLocation ?? false
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserLocation(userId: number, locationUpdate: LocationUpdate): Promise<User | undefined> {
    const user = await this.getUser(userId);
    
    if (!user) {
      return undefined;
    }
    
    const updatedUser: User = {
      ...user,
      location: locationUpdate.location ?? user.location,
      isSharingLocation: locationUpdate.isSharingLocation ?? user.isSharingLocation
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  async getSharedLocations(): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.isSharingLocation && user.location !== null
    );
  }
  
  // Event operations
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = {
      id,
      title: insertEvent.title,
      description: insertEvent.description,
      startTime: insertEvent.startTime,
      endTime: insertEvent.endTime,
      location: insertEvent.location,
      createdAt: new Date(),
      isRecurring: insertEvent.isRecurring ?? false,
      recurrencePattern: insertEvent.recurrencePattern ?? null
    };
    this.events.set(id, event);
    return event;
  }
  
  // Building operations
  async getBuildings(): Promise<Building[]> {
    return Array.from(this.buildings.values());
  }
  
  async getBuilding(id: number): Promise<Building | undefined> {
    return this.buildings.get(id);
  }
  
  async createBuilding(insertBuilding: InsertBuilding): Promise<Building> {
    const id = this.currentBuildingId++;
    const building: Building = {
      id,
      name: insertBuilding.name,
      description: insertBuilding.description,
      location: insertBuilding.location,
      createdAt: new Date(),
      isOpen: insertBuilding.isOpen ?? true,
      openHours: insertBuilding.openHours ?? null,
      contactInfo: insertBuilding.contactInfo ?? null
    };
    this.buildings.set(id, building);
    return building;
  }
  
  // Student Tool operations
  async getStudentTools(): Promise<StudentTool[]> {
    return Array.from(this.studentTools.values());
  }
  
  async getStudentTool(id: string): Promise<StudentTool | undefined> {
    return this.studentTools.get(id);
  }
  
  async createStudentTool(tool: InsertStudentTool): Promise<StudentTool> {
    const studentTool: StudentTool = {
      ...tool,
      createdAt: new Date(),
      isActive: tool.isActive ?? true
    };
    this.studentTools.set(tool.id, studentTool);
    return studentTool;
  }
  
  // Comment operations - DISABLED (not in schema)
  /*
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
  */
  
  // Safety Alert operations
  async getSafetyAlerts(): Promise<SafetyAlert[]> {
    return Array.from(this.safetyAlerts.values());
  }
  
  async getActiveSafetyAlerts(): Promise<SafetyAlert[]> {
    const now = new Date();
    return Array.from(this.safetyAlerts.values()).filter(alert => 
      alert.isActive && 
      (alert.expiresAt === null || alert.expiresAt > now)
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
      description: insertAlert.description,
      severity: insertAlert.severity,
      location: insertAlert.location,
      createdAt: new Date(),
      isActive: insertAlert.isActive ?? true,
      expiresAt: insertAlert.expiresAt ?? null
    };
    this.safetyAlerts.set(id, alert);
    return alert;
  }
  
  // Safety Resource operations
  async getSafetyResources(): Promise<SafetyResource[]> {
    return Array.from(this.safetyResources.values());
  }
  
  async getSafetyResourcesByCategory(category: string): Promise<SafetyResource[]> {
    return Array.from(this.safetyResources.values())
      .filter(resource => resource.category === category);
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
      url: insertResource.url,
      createdAt: new Date(),
      isActive: insertResource.isActive ?? true
    };
    this.safetyResources.set(id, resource);
    return resource;
  }
  
  // Initialize with sample data
  private async initializeSampleData() {
    // Sample users
    await this.createUser({
      username: "admin",
      password: "password",
      isGuest: false,
      name: "Admin User"
    });
    
    await this.createUser({
      username: "student",
      password: "password",
      isGuest: false,
      name: "Student User"
    });
    
    // No sample events - removed
    
    // Sample buildings
    await this.createBuilding({
      name: "Main Hall",
      description: "Administrative offices, classrooms",
      location: "39.5274, -82.4156"
    });
    
    await this.createBuilding({
      name: "Student Center",
      description: "Dining, recreation, student services",
      location: "39.5280, -82.4150"
    });
    
    await this.createBuilding({
      name: "Davidson Hall",
      description: "Science labs, lecture halls",
      location: "39.5268, -82.4162"
    });
    
    await this.createBuilding({
      name: "Library",
      description: "Books, study spaces, computer labs",
      location: "39.5265, -82.4145"
    });
    
    await this.createBuilding({
      name: "Recreation Center",
      description: "Gym, pool, fitness classes",
      location: "39.529, -82.417"
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
    
    await this.createStudentTool({
      id: "career-services",
      name: "Career Services",
      description: "Job search and career planning",
      category: "resources",
      url: "#",
    });
    
    // Sample safety alerts
    await this.createSafetyAlert({
      title: "Weather Advisory",
      description: "A winter storm warning is in effect for our area from 6pm today until 6am tomorrow. Expect heavy snowfall and icy conditions. Please use caution when traveling and allow extra time for your commute.",
      severity: "warning",
      isActive: true,
      location: "All Campus"
    });
    
    await this.createSafetyAlert({
      title: "Planned Power Outage: Davidson Hall",
      description: "There will be a planned power outage in Davidson Hall on Saturday from 8am to 12pm for electrical system maintenance. Plan accordingly and please avoid this building during this time.",
      severity: "info",
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      isActive: true,
      location: "Davidson Hall"
    });
    
    // Sample safety resources
    await this.createSafetyResource({
      title: "Campus Police",
      description: "24/7 emergency assistance and security services (Phone: 740-753-6598)",
      category: "emergency",
      url: "tel:740-753-6598"
    });
    
    await this.createSafetyResource({
      title: "Emergency Notification System",
      description: "Sign up for emergency text alerts",
      category: "emergency",
      url: "#"
    });
    
    await this.createSafetyResource({
      title: "Health Center",
      description: "Medical services for students (Phone: 740-753-6487)",
      category: "health",
      url: "#"
    });
    
    await this.createSafetyResource({
      title: "Counseling Services",
      description: "Confidential mental health support (Phone: 740-753-6789)",
      category: "health",
      url: "#"
    });
    
    await this.createSafetyResource({
      title: "Campus Escort Service",
      description: "Safe accompaniment across campus after dark (Phone: 740-753-6123)",
      category: "security",
      url: "tel:740-753-6123"
    });
    
    await this.createSafetyResource({
      title: "Anonymous Tip Line",
      description: "Report suspicious activity anonymously (Phone: 740-753-7890)",
      category: "security",
      url: "#"
    });
    
    await this.createSafetyResource({
      title: "Weather Updates",
      description: "Local weather forecasts and alerts",
      category: "weather",
      url: "https://weather.gov"
    });
    
    await this.createSafetyResource({
      title: "Emergency Procedures",
      description: "Step-by-step guides for emergency situations",
      category: "emergency",
      url: "#"
    });
  }
}

export const storage = new MemStorage();
