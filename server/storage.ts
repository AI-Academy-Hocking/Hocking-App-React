import { 
  users, type User, type InsertUser, 
  events, type Event, type InsertEvent, 
  buildings, type Building, type InsertBuilding, 
  studentTools, type StudentTool, type InsertStudentTool, 
  discussions, type Discussion, type InsertDiscussion,
  comments, type Comment, type InsertComment,
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
  
  // Discussion operations
  getDiscussions(): Promise<Discussion[]>;
  getDiscussion(id: number): Promise<Discussion | undefined>;
  createDiscussion(discussion: InsertDiscussion): Promise<Discussion>;
  getDiscussionsByCategory(category: string): Promise<Discussion[]>;
  
  // Comment operations
  getComments(discussionId: number): Promise<Comment[]>;
  getCommentReplies(commentId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  getUserComments(userId: number): Promise<Comment[]>;
  
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
  private discussions: Map<number, Discussion>;
  private comments: Map<number, Comment>;
  private safetyAlerts: Map<number, SafetyAlert>;
  private safetyResources: Map<number, SafetyResource>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentBuildingId: number;
  private currentDiscussionId: number;
  private currentCommentId: number;
  private currentSafetyAlertId: number;
  private currentSafetyResourceId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.buildings = new Map();
    this.studentTools = new Map();
    this.discussions = new Map();
    this.comments = new Map();
    this.safetyAlerts = new Map();
    this.safetyResources = new Map();
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentBuildingId = 1;
    this.currentDiscussionId = 1;
    this.currentCommentId = 1;
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
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
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
  
  async updateUserLocation(userId: number, locationUpdate: LocationUpdate): Promise<User | undefined> {
    const user = await this.getUser(userId);
    
    if (!user) {
      return undefined;
    }
    
    const updatedUser: User = {
      ...user,
      lat: locationUpdate.lat,
      lng: locationUpdate.lng,
      isLocationShared: locationUpdate.isLocationShared !== undefined 
        ? locationUpdate.isLocationShared 
        : user.isLocationShared,
      lastLocationUpdate: new Date()
    };
    
    this.users.set(userId, updatedUser);
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
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
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
  
  async getBuilding(id: number): Promise<Building | undefined> {
    return this.buildings.get(id);
  }
  
  async createBuilding(insertBuilding: InsertBuilding): Promise<Building> {
    const id = this.currentBuildingId++;
    const building: Building = { ...insertBuilding, id };
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
    this.studentTools.set(tool.id, tool);
    return tool;
  }
  
  // Discussion operations
  async getDiscussions(): Promise<Discussion[]> {
    return Array.from(this.discussions.values());
  }
  
  async getDiscussion(id: number): Promise<Discussion | undefined> {
    return this.discussions.get(id);
  }
  
  async createDiscussion(insertDiscussion: InsertDiscussion): Promise<Discussion> {
    const id = this.currentDiscussionId++;
    const discussion: Discussion = {
      ...insertDiscussion,
      id,
      createdAt: new Date(),
      isPinned: insertDiscussion.isPinned || false,
      category: insertDiscussion.category || "general"
    };
    this.discussions.set(id, discussion);
    return discussion;
  }
  
  async getDiscussionsByCategory(category: string): Promise<Discussion[]> {
    return Array.from(this.discussions.values()).filter(
      (discussion) => discussion.category === category
    );
  }
  
  // Comment operations
  async getAllComments(): Promise<Comment[]> {
    return this.comments;
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
      ...insertComment,
      id,
      createdAt: new Date(),
      parentId: insertComment.parentId || null
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
  
  async getSafetyResource(id: number): Promise<SafetyResource | undefined> {
    return this.safetyResources.get(id);
  }
  
  async createSafetyResource(insertResource: InsertSafetyResource): Promise<SafetyResource> {
    const id = this.currentSafetyResourceId++;
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
    // Academic Calendar Events (odd IDs)
    await this.createEvent({
      title: "Fall Festival",
      description: "Annual celebration with food, games, and activities for students and faculty.",
      date: "2025-05-22",
      time: "12:00 PM - 4:00 PM",
      location: "Student Center",
    });
    
    await this.createEvent({
      title: "Career Fair",
      description: "Meet with employers from around the region for internship and job opportunities.",
      date: "2025-05-23",
      time: "10:00 AM - 2:00 PM",
      location: "Main Hall",
    });
    
    await this.createEvent({
      title: "Registration Deadline",
      description: "Last day to register for Fall semester classes without late fees.",
      date: "2025-05-25",
      time: "11:59 PM",
      location: "Online",
    });

    await this.createEvent({
      title: "Final Exams Begin",
      description: "First day of final examinations for Spring semester.",
      date: "2025-05-28",
      time: "8:00 AM - 8:00 PM",
      location: "Various Locations",
    });

    await this.createEvent({
      title: "Commencement Ceremony",
      description: "Spring graduation ceremony for all departments.",
      date: "2025-05-30",
      time: "1:00 PM - 3:30 PM",
      location: "Main Auditorium",
    });

    await this.createEvent({
      title: "Summer Session Registration",
      description: "Registration opens for summer courses.",
      date: "2025-05-15",
      time: "9:00 AM",
      location: "Online",
    });

    await this.createEvent({
      title: "Faculty Development Workshop",
      description: "Professional development session for all faculty members.",
      date: "2025-05-26",
      time: "9:00 AM - 12:00 PM",
      location: "Davidson Hall 305",
    });

    // Student Activities Events (even IDs)
    await this.createEvent({
      title: "Student Government Meeting",
      description: "Weekly SGA meeting open to all students.",
      date: "2025-05-20",
      time: "5:00 PM - 6:30 PM",
      location: "Student Center Room 202",
    });

    await this.createEvent({
      title: "Campus Movie Night",
      description: "Free movie screening of the latest blockbuster.",
      date: "2025-05-21",
      time: "8:00 PM - 10:30 PM",
      location: "Outdoor Quad",
    });

    await this.createEvent({
      title: "Intramural Soccer Finals",
      description: "Championship match for the spring intramural soccer league.",
      date: "2025-05-24",
      time: "2:00 PM - 4:00 PM",
      location: "Sports Field",
    });

    await this.createEvent({
      title: "Art Club Exhibition",
      description: "Showcase of student artwork from the semester.",
      date: "2025-05-27",
      time: "3:00 PM - 6:00 PM",
      location: "Art Gallery",
    });

    await this.createEvent({
      title: "Volunteer Day",
      description: "Campus-wide day of service in the local community.",
      date: "2025-05-18",
      time: "10:00 AM - 3:00 PM",
      location: "Meet at Student Center",
    });

    await this.createEvent({
      title: "International Food Festival",
      description: "Celebration of cuisines from around the world.",
      date: "2025-05-29",
      time: "5:30 PM - 8:00 PM",
      location: "Dining Hall",
    });

    await this.createEvent({
      title: "End of Year Bash",
      description: "Celebration party for the end of the academic year with live music and activities.",
      date: "2025-05-31",
      time: "7:00 PM - 11:00 PM",
      location: "Student Center Ballroom",
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
      id: "course-schedule",
      name: "Course Schedule",
      description: "View your current classes",
      category: "academic",
      url: "#",
    });
    
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
      id: "academic-history",
      name: "Academic History",
      description: "View your transcript",
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
    
    // Sample discussions
    const discussion1 = await this.createDiscussion({
      title: "Tips for new students",
      content: "Hey everyone! I'm a sophomore here at Hocking and wanted to share some tips for new students. What advice would you give to freshmen?",
      authorId: 1,
      category: "general",
      isPinned: true
    });
    
    const discussion2 = await this.createDiscussion({
      title: "Study group for Biology 101",
      content: "Is anyone interested in forming a study group for Biology 101? I'm struggling with some of the concepts and would love to collaborate.",
      authorId: 2,
      category: "academic"
    });
    
    const discussion3 = await this.createDiscussion({
      title: "Campus food recommendations",
      content: "What's your favorite place to eat on campus? I'm getting tired of the same options and looking for recommendations!",
      authorId: 1,
      category: "social"
    });
    
    // Sample comments
    await this.createComment({
      content: "Always check Rate My Professor before signing up for classes!",
      authorId: 2,
      discussionId: discussion1.id,
      parentId: null
    });
    
    const comment1 = await this.createComment({
      content: "Get involved in campus clubs early - it's the best way to make friends!",
      authorId: 1,
      discussionId: discussion1.id,
      parentId: null
    });
    
    await this.createComment({
      content: "I totally agree! I joined the hiking club and met my best friends there.",
      authorId: 2,
      discussionId: discussion1.id,
      parentId: comment1.id
    });
    
    await this.createComment({
      content: "I'd be interested in joining a study group! I'm free on Tuesdays and Thursdays after 3pm.",
      authorId: 1,
      discussionId: discussion2.id,
      parentId: null
    });
    
    await this.createComment({
      content: "The Student Center has great sandwiches. Try the turkey avocado wrap!",
      authorId: 2,
      discussionId: discussion3.id,
      parentId: null
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
