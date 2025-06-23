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
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      name: insertUser.name || null,
      email: insertUser.email || null,
      isGuest: insertUser.isGuest !== undefined ? insertUser.isGuest : null,
      lat: null,
      lng: null,
      isLocationShared: false,
      lastLocationUpdate: null
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
      lat: location.lat,
      lng: location.lng,
      isLocationShared: location.isLocationShared !== undefined 
        ? location.isLocationShared 
        : user.isLocationShared,
      lastLocationUpdate: new Date()
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async getSharedLocations(): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.isLocationShared && user.lat !== null && user.lng !== null
    );
  }
  
  // Event operations
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEvent(id: number): Promise<Event | null> {
    return this.events.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.nextEventId++;
    const event: Event = { 
      ...insertEvent, 
      id, 
      description: insertEvent.description || null 
    };
    this.events.set(id, event);
    return event;
  }
  
  // Building operations
  async getBuildings(): Promise<Building[]> {
    return Array.from(this.buildings.values());
  }
  
  async getBuilding(id: number): Promise<Building | null> {
    return this.buildings.get(id);
  }
  
  async createBuilding(insertBuilding: InsertBuilding): Promise<Building> {
    const id = this.nextBuildingId++;
    const building: Building = { ...insertBuilding, id };
    this.buildings.set(id, building);
    return building;
  }
  
  // Student Tool operations
  async getStudentTools(): Promise<StudentTool[]> {
    return Array.from(this.studentTools.values());
  }
  
  async getStudentTool(id: string): Promise<StudentTool | null> {
    return this.studentTools.get(id);
  }
  
  async createStudentTool(tool: InsertStudentTool): Promise<StudentTool> {
    this.studentTools.set(tool.id, tool);
    return tool;
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
  
  async getSafetyAlert(id: number): Promise<SafetyAlert | null> {
    return this.safetyAlerts.get(id);
  }
  
  async createSafetyAlert(insertAlert: InsertSafetyAlert): Promise<SafetyAlert> {
    const id = this.nextSafetyAlertId++;
    const alert: SafetyAlert = {
      ...insertAlert,
      id,
      startDate: insertAlert.startDate || new Date(),
      endDate: insertAlert.endDate || null,
      isActive: insertAlert.isActive !== undefined ? insertAlert.isActive : true,
      location: insertAlert.location || null
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
  
  async getSafetyResource(id: number): Promise<SafetyResource | null> {
    return this.safetyResources.get(id);
  }
  
  async createSafetyResource(insertResource: InsertSafetyResource): Promise<SafetyResource> {
    const id = this.nextSafetyResourceId++;
    const resource: SafetyResource = {
      ...insertResource,
      id,
      phoneNumber: insertResource.phoneNumber || null,
      url: insertResource.url || null,
      icon: insertResource.icon || null,
      order: insertResource.order || 0
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
    
    // Sample events
    await this.createEvent({
      title: "Fall Festival",
      description: "Annual celebration with food, games, and activities for students and faculty.",
      date: "2023-10-15",
      time: "12:00 PM - 4:00 PM",
      location: "Student Center",
    });
    
    await this.createEvent({
      title: "Career Fair",
      description: "Meet with employers from around the region for internship and job opportunities.",
      date: "2023-10-20",
      time: "10:00 AM - 2:00 PM",
      location: "Main Hall",
    });
    
    await this.createEvent({
      title: "Registration Deadline",
      description: "Last day to register for Spring semester classes without late fees.",
      date: "2023-11-05",
      time: "11:59 PM",
      location: "For Spring Semester",
    });
    
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
      lat: 39.5290,
      lng: -82.4170,
    });
    
    // Sample student tools
    await this.createStudentTool({
      id: "grades",
      name: "Grades",
      description: "Check your academic performance",
      category: "academic",
      url: "#",
    });
    
    await this.createStudentTool({
      id: "course-catalog",
      name: "Course Catalog",
      description: "Browse available courses",
      category: "academic",
      url: "#",
    });
    
    await this.createStudentTool({
      id: "advising",
      name: "Advising",
      description: "Connect with your advisor",
      category: "academic",
      url: "#",
    });
    
    await this.createStudentTool({
      id: "graduation",
      name: "Graduation",
      description: "Track degree requirements",
      category: "academic",
      url: "#",
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
      id: "scholarships",
      name: "Scholarships",
      description: "Apply for available scholarships",
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
      title: "Weather Alert: Winter Storm Warning",
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
    });
  }
}

export const storage = new MemStorage();
