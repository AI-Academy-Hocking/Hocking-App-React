import type { 
  User, Event, Building, StudentTool, SafetyAlert, SafetyResource,
  InsertUser, InsertEvent, InsertBuilding, InsertStudentTool,
  InsertSafetyAlert, InsertSafetyResource, LocationUpdate
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLocation(id: number, location: LocationUpdate): Promise<User | null>;
  getSharedLocations(): Promise<User[]>;
  
  // Event methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | null>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Building methods
  getBuildings(): Promise<Building[]>;
  getBuilding(id: number): Promise<Building | null>;
  createBuilding(building: InsertBuilding): Promise<Building>;
  
  // Student Tool methods
  getStudentTools(): Promise<StudentTool[]>;
  getStudentTool(id: string): Promise<StudentTool | null>;
  createStudentTool(tool: InsertStudentTool): Promise<StudentTool>;
  
  // Safety Alert methods
  getSafetyAlerts(): Promise<SafetyAlert[]>;
  getActiveSafetyAlerts(): Promise<SafetyAlert[]>;
  getSafetyAlert(id: number): Promise<SafetyAlert | null>;
  createSafetyAlert(alert: InsertSafetyAlert): Promise<SafetyAlert>;
  
  // Safety Resource methods
  getSafetyResources(): Promise<SafetyResource[]>;
  getSafetyResourcesByCategory(category: string): Promise<SafetyResource[]>;
  getSafetyResource(id: number): Promise<SafetyResource | null>;
  createSafetyResource(resource: InsertSafetyResource): Promise<SafetyResource>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private buildings: Map<number, Building>;
  private studentTools: Map<string, StudentTool>;
  private safetyAlerts: Map<number, SafetyAlert>;
  private safetyResources: Map<number, SafetyResource>;
  private nextUserId: number;
  private nextEventId: number;
  private nextBuildingId: number;
  private nextSafetyAlertId: number;
  private nextSafetyResourceId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.buildings = new Map();
    this.studentTools = new Map();
    this.safetyAlerts = new Map();
    this.safetyResources = new Map();
    this.nextUserId = 1;
    this.nextEventId = 1;
    this.nextBuildingId = 1;
    this.nextSafetyAlertId = 1;
    this.nextSafetyResourceId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    ) || null;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      lastLogin: null,
      location: null,
      isSharingLocation: false,
      isGuest: insertUser.isGuest ?? false
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserLocation(id: number, location: LocationUpdate): Promise<User | null> {
    const user = await this.getUser(id);
    
    if (!user) {
      return null;
    }
    
    const updatedUser: User = {
      ...user,
      location: location.location ?? null,
      isSharingLocation: location.isSharingLocation ?? false
    };
    
    this.users.set(id, updatedUser);
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
  
  async getEvent(id: number): Promise<Event | null> {
    return this.events.get(id) || null;
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.nextEventId++;
    const event: Event = { 
      ...insertEvent, 
      id, 
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
  
  async getBuilding(id: number): Promise<Building | null> {
    return this.buildings.get(id) || null;
  }
  
  async createBuilding(insertBuilding: InsertBuilding): Promise<Building> {
    const id = this.nextBuildingId++;
    const building: Building = { 
      ...insertBuilding, 
      id,
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
  
  async getStudentTool(id: string): Promise<StudentTool | null> {
    return this.studentTools.get(id) || null;
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
  
  async getSafetyAlert(id: number): Promise<SafetyAlert | null> {
    return this.safetyAlerts.get(id) || null;
  }
  
  async createSafetyAlert(insertAlert: InsertSafetyAlert): Promise<SafetyAlert> {
    const id = this.nextSafetyAlertId++;
    const alert: SafetyAlert = {
      ...insertAlert,
      id,
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
  
  async getSafetyResource(id: number): Promise<SafetyResource | null> {
    return this.safetyResources.get(id) || null;
  }
  
  async createSafetyResource(insertResource: InsertSafetyResource): Promise<SafetyResource> {
    const id = this.nextSafetyResourceId++;
    const resource: SafetyResource = {
      ...insertResource,
      id,
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
      name: "Admin User",
      isGuest: false,
    });
    
    await this.createUser({
      username: "student",
      password: "password",
      name: "Student User",
      isGuest: false,
    });
    
    // Sample events
    await this.createEvent({
      title: "Fall Festival",
      description: "Annual celebration with food, games, and activities for students and faculty.",
      startTime: new Date("2023-10-15T12:00:00"),
      endTime: new Date("2023-10-15T16:00:00"),
      location: "Student Center",
    });
    
    await this.createEvent({
      title: "Career Fair",
      description: "Meet with employers from around the region for internship and job opportunities.",
      startTime: new Date("2023-10-20T10:00:00"),
      endTime: new Date("2023-10-20T14:00:00"),
      location: "Main Hall",
    });
    
    await this.createEvent({
      title: "Registration Deadline",
      description: "Last day to register for Spring semester classes without late fees.",
      startTime: new Date("2023-11-05T23:59:00"),
      endTime: new Date("2023-11-06T00:00:00"),
      location: "For Spring Semester",
    });
    
    // Sample buildings
    await this.createBuilding({
      name: "Main Hall",
      description: "Administrative offices, classrooms",
      location: "Main Campus",
      isOpen: true,
      openHours: "8:00 AM - 5:00 PM",
      contactInfo: "740-753-6000",
    });
    
    await this.createBuilding({
      name: "Student Center",
      description: "Dining, recreation, student services",
      location: "Main Campus",
      isOpen: true,
      openHours: "7:00 AM - 10:00 PM",
      contactInfo: "740-753-6100",
    });
    
    await this.createBuilding({
      name: "Davidson Hall",
      description: "Science labs, lecture halls",
      location: "Main Campus",
      isOpen: true,
      openHours: "8:00 AM - 6:00 PM",
      contactInfo: "740-753-6200",
    });
    
    await this.createBuilding({
      name: "Library",
      description: "Books, study spaces, computer labs",
      location: "Main Campus",
      isOpen: true,
      openHours: "8:00 AM - 11:00 PM",
      contactInfo: "740-753-6300",
    });
    
    await this.createBuilding({
      name: "Recreation Center",
      description: "Gym, pool, fitness classes",
      location: "Main Campus",
      isOpen: true,
      openHours: "6:00 AM - 10:00 PM",
      contactInfo: "740-753-6400",
    });
    
    // Sample student tools
    await this.createStudentTool({
      id: "course-schedule",
      name: "Course Schedule",
      description: "View your current classes",
      category: "academic",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "grades",
      name: "Grades",
      description: "Check your academic performance",
      category: "academic",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "course-catalog",
      name: "Course Catalog",
      description: "Browse available courses",
      category: "academic",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "advising",
      name: "Advising",
      description: "Connect with your advisor",
      category: "academic",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "academic-history",
      name: "Academic History",
      description: "View your transcript",
      category: "academic",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "graduation",
      name: "Graduation",
      description: "Track degree requirements",
      category: "academic",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "financial-aid",
      name: "Financial Aid",
      description: "View and manage your financial aid",
      category: "financial",
      url: "/financial-aid",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "billing",
      name: "Billing",
      description: "Pay tuition and view statements",
      category: "financial",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "scholarships",
      name: "Scholarships",
      description: "Apply for available scholarships",
      category: "financial",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "campus-resources",
      name: "Campus Resources",
      description: "Access campus services",
      category: "resources",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "health-services",
      name: "Campus Health and Wellness",
      description: "Schedule health appointments",
      category: "resources",
      url: "#",
      isActive: true,
    });
    
    await this.createStudentTool({
      id: "career-services",
      name: "Career Services",
      description: "Job search and career planning",
      category: "resources",
      url: "#",
      isActive: true,
    });
    
    // Sample safety alerts
    await this.createSafetyAlert({
      title: "Weather Alert: Winter Storm Warning",
      description: "A winter storm warning is in effect for our area from 6pm today until 6am tomorrow. Expect heavy snowfall and icy conditions. Please use caution when traveling and allow extra time for your commute.",
      severity: "warning",
      location: "All Campus",
      isActive: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    });
    
    await this.createSafetyAlert({
      title: "Planned Power Outage: Davidson Hall",
      description: "There will be a planned power outage in Davidson Hall on Saturday from 8am to 12pm for electrical system maintenance. Plan accordingly and please avoid this building during this time.",
      severity: "info",
      location: "Davidson Hall",
      isActive: true,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    });
    
    // Sample safety resources
    await this.createSafetyResource({
      title: "Campus Police",
      description: "24/7 emergency assistance and security services",
      category: "emergency",
      url: "#",
      isActive: true,
    });
    
    await this.createSafetyResource({
      title: "Emergency Notification System",
      description: "Sign up for emergency text alerts",
      category: "emergency",
      url: "#",
      isActive: true,
    });
    
    await this.createSafetyResource({
      title: "Health Center",
      description: "Medical services for students",
      category: "health",
      url: "#",
      isActive: true,
    });
    
    await this.createSafetyResource({
      title: "Counseling Services",
      description: "Confidential mental health support",
      category: "health",
      url: "#",
      isActive: true,
    });
    
    await this.createSafetyResource({
      title: "Campus Escort Service",
      description: "Safe accompaniment across campus after dark",
      category: "security",
      url: "#",
      isActive: true,
    });
    
    await this.createSafetyResource({
      title: "Anonymous Tip Line",
      description: "Report suspicious activity anonymously",
      category: "security",
      url: "#",
      isActive: true,
    });
    
    await this.createSafetyResource({
      title: "Weather Updates",
      description: "Local weather forecasts and alerts",
      category: "weather",
      url: "https://weather.gov",
      isActive: true,
    });
    
    await this.createSafetyResource({
      title: "Emergency Procedures",
      description: "Step-by-step guides for emergency situations",
      category: "emergency",
      url: "#",
      isActive: true,
    });
  }
}

export const storage = new MemStorage();
