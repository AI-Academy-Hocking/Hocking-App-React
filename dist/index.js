var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

// server/storage.ts
var MemStorage = class {
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
    this.buildings = /* @__PURE__ */ new Map();
    this.studentTools = /* @__PURE__ */ new Map();
    this.discussions = /* @__PURE__ */ new Map();
    this.comments = /* @__PURE__ */ new Map();
    this.safetyAlerts = /* @__PURE__ */ new Map();
    this.safetyResources = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentBuildingId = 1;
    this.currentDiscussionId = 1;
    this.currentCommentId = 1;
    this.currentSafetyAlertId = 1;
    this.currentSafetyResourceId = 1;
    this.initializeSampleData();
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = {
      ...insertUser,
      id,
      name: insertUser.name || null,
      email: insertUser.email || null,
      isGuest: insertUser.isGuest !== void 0 ? insertUser.isGuest : null,
      lat: null,
      lng: null,
      isLocationShared: false,
      lastLocationUpdate: null
    };
    this.users.set(id, user);
    return user;
  }
  async updateUserLocation(userId, locationUpdate) {
    const user = await this.getUser(userId);
    if (!user) {
      return void 0;
    }
    const updatedUser = {
      ...user,
      lat: locationUpdate.lat,
      lng: locationUpdate.lng,
      isLocationShared: locationUpdate.isLocationShared !== void 0 ? locationUpdate.isLocationShared : user.isLocationShared,
      lastLocationUpdate: /* @__PURE__ */ new Date()
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  async getSharedLocations() {
    return Array.from(this.users.values()).filter(
      (user) => user.isLocationShared && user.lat !== null && user.lng !== null
    );
  }
  // Event operations
  async getEvents() {
    return Array.from(this.events.values());
  }
  async getEvent(id) {
    return this.events.get(id);
  }
  async createEvent(insertEvent) {
    const id = this.currentEventId++;
    const event = {
      ...insertEvent,
      id,
      description: insertEvent.description || null
    };
    this.events.set(id, event);
    return event;
  }
  // Building operations
  async getBuildings() {
    return Array.from(this.buildings.values());
  }
  async getBuilding(id) {
    return this.buildings.get(id);
  }
  async createBuilding(insertBuilding) {
    const id = this.currentBuildingId++;
    const building = { ...insertBuilding, id };
    this.buildings.set(id, building);
    return building;
  }
  // Student Tool operations
  async getStudentTools() {
    return Array.from(this.studentTools.values());
  }
  async getStudentTool(id) {
    return this.studentTools.get(id);
  }
  async createStudentTool(tool) {
    this.studentTools.set(tool.id, tool);
    return tool;
  }
  // Discussion operations
  async getDiscussions() {
    return Array.from(this.discussions.values());
  }
  async getDiscussion(id) {
    return this.discussions.get(id);
  }
  async createDiscussion(insertDiscussion) {
    const id = this.currentDiscussionId++;
    const discussion = {
      ...insertDiscussion,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isPinned: insertDiscussion.isPinned || false,
      category: insertDiscussion.category || "general"
    };
    this.discussions.set(id, discussion);
    return discussion;
  }
  async getDiscussionsByCategory(category) {
    return Array.from(this.discussions.values()).filter(
      (discussion) => discussion.category === category
    );
  }
  // Comment operations
  async getAllComments() {
    return Array.from(this.comments.values());
  }
  async getComments(discussionId) {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.discussionId === discussionId && comment.parentId === null
    );
  }
  async getCommentReplies(commentId) {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.parentId === commentId
    );
  }
  async createComment(insertComment) {
    const id = this.currentCommentId++;
    const comment = {
      ...insertComment,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      parentId: insertComment.parentId || null
    };
    this.comments.set(id, comment);
    return comment;
  }
  async getUserComments(userId) {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.authorId === userId
    );
  }
  // Safety Alert operations
  async getSafetyAlerts() {
    return Array.from(this.safetyAlerts.values());
  }
  async getActiveSafetyAlerts() {
    const now = /* @__PURE__ */ new Date();
    return Array.from(this.safetyAlerts.values()).filter(
      (alert) => alert.isActive && (alert.endDate === null || alert.endDate > now)
    );
  }
  async getSafetyAlert(id) {
    return this.safetyAlerts.get(id);
  }
  async createSafetyAlert(insertAlert) {
    const id = this.currentSafetyAlertId++;
    const alert = {
      ...insertAlert,
      id,
      startDate: insertAlert.startDate || /* @__PURE__ */ new Date(),
      endDate: insertAlert.endDate || null,
      isActive: insertAlert.isActive !== void 0 ? insertAlert.isActive : true,
      location: insertAlert.location || null
    };
    this.safetyAlerts.set(id, alert);
    return alert;
  }
  // Safety Resource operations
  async getSafetyResources() {
    return Array.from(this.safetyResources.values()).sort((a, b) => (a.order || 999) - (b.order || 999));
  }
  async getSafetyResourcesByCategory(category) {
    return Array.from(this.safetyResources.values()).filter((resource) => resource.category === category).sort((a, b) => (a.order || 999) - (b.order || 999));
  }
  async getSafetyResource(id) {
    return this.safetyResources.get(id);
  }
  async createSafetyResource(insertResource) {
    const id = this.currentSafetyResourceId++;
    const resource = {
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
  async initializeSampleData() {
    await this.createUser({
      username: "admin",
      password: "password",
      isGuest: false,
      name: "Admin User",
      email: "admin@hocking.edu"
    });
    await this.createUser({
      username: "student",
      password: "password",
      isGuest: false,
      name: "Student User",
      email: "student@hocking.edu"
    });
    await this.createEvent({
      title: "Fall Festival",
      description: "Annual celebration with food, games, and activities for students and faculty.",
      date: "2023-10-15",
      time: "12:00 PM - 4:00 PM",
      location: "Student Center"
    });
    await this.createEvent({
      title: "Career Fair",
      description: "Meet with employers from around the region for internship and job opportunities.",
      date: "2023-10-20",
      time: "10:00 AM - 2:00 PM",
      location: "Main Hall"
    });
    await this.createEvent({
      title: "Registration Deadline",
      description: "Last day to register for Spring semester classes without late fees.",
      date: "2023-11-05",
      time: "11:59 PM",
      location: "For Spring Semester"
    });
    await this.createBuilding({
      name: "Main Hall",
      description: "Administrative offices, classrooms",
      category: "academic",
      lat: 39.5274,
      lng: -82.4156
    });
    await this.createBuilding({
      name: "Student Center",
      description: "Dining, recreation, student services",
      category: "dining",
      lat: 39.528,
      lng: -82.415
    });
    await this.createBuilding({
      name: "Davidson Hall",
      description: "Science labs, lecture halls",
      category: "academic",
      lat: 39.5268,
      lng: -82.4162
    });
    await this.createBuilding({
      name: "Library",
      description: "Books, study spaces, computer labs",
      category: "academic",
      lat: 39.5265,
      lng: -82.4145
    });
    await this.createBuilding({
      name: "Recreation Center",
      description: "Gym, pool, fitness classes",
      category: "housing",
      lat: 39.529,
      lng: -82.417
    });
    await this.createStudentTool({
      id: "course-schedule",
      name: "Course Schedule",
      description: "View your current classes",
      category: "academic",
      url: "#"
    });
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
      url: "#"
    });
    await this.createStudentTool({
      id: "advising",
      name: "Advising",
      description: "Connect with your advisor",
      category: "academic",
      url: "#"
    });
    await this.createStudentTool({
      id: "academic-history",
      name: "Academic History",
      description: "View your transcript",
      category: "academic",
      url: "#"
    });
    await this.createStudentTool({
      id: "graduation",
      name: "Graduation",
      description: "Track degree requirements",
      category: "academic",
      url: "#"
    });
    await this.createStudentTool({
      id: "financial-aid",
      name: "Financial Aid",
      description: "View and manage your financial aid",
      category: "financial",
      url: "#"
    });
    await this.createStudentTool({
      id: "billing",
      name: "Billing",
      description: "Pay tuition and view statements",
      category: "financial",
      url: "#"
    });
    await this.createStudentTool({
      id: "scholarships",
      name: "Scholarships",
      description: "Apply for available scholarships",
      category: "financial",
      url: "#"
    });
    await this.createStudentTool({
      id: "campus-resources",
      name: "Campus Resources",
      description: "Access campus services",
      category: "resources",
      url: "#"
    });
    await this.createStudentTool({
      id: "health-services",
      name: "Health Services",
      description: "Schedule health appointments",
      category: "resources",
      url: "#"
    });
    await this.createStudentTool({
      id: "career-services",
      name: "Career Services",
      description: "Job search and career planning",
      category: "resources",
      url: "#"
    });
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
    await this.createSafetyAlert({
      title: "Weather Alert: Winter Storm Warning",
      content: "A winter storm warning is in effect for our area from 6pm today until 6am tomorrow. Expect heavy snowfall and icy conditions. Please use caution when traveling and allow extra time for your commute.",
      severity: "warning",
      startDate: /* @__PURE__ */ new Date(),
      isActive: true,
      location: "All Campus"
    });
    await this.createSafetyAlert({
      title: "Planned Power Outage: Davidson Hall",
      content: "There will be a planned power outage in Davidson Hall on Saturday from 8am to 12pm for electrical system maintenance. Plan accordingly and please avoid this building during this time.",
      severity: "info",
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1e3),
      // 2 days from now
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1e3),
      // 3 days from now
      isActive: true,
      location: "Davidson Hall"
    });
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
};
var storage = new MemStorage();

// server/src/routes/calendar.ts
import { Router } from "express";
import ical from "ical";
import fetch from "node-fetch";
var router = Router();
var CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";
router.get("/events", async (req, res) => {
  try {
    console.log("Attempting to fetch calendar from URL:", CALENDAR_URL);
    const response = await fetch(CALENDAR_URL, {
      headers: {
        "Accept": "text/calendar",
        "User-Agent": "Hocking-App/1.0"
      }
    });
    console.log("Calendar fetch response status:", response.status);
    console.log("Calendar fetch response headers:", Object.fromEntries(response.headers.entries()));
    if (response.status === 403) {
      console.error("Calendar access forbidden - check calendar sharing settings");
      return res.status(403).json({
        error: "Calendar access forbidden",
        details: "Please check calendar sharing settings and ensure the calendar is publicly accessible"
      });
    }
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Calendar fetch failed:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const icalData = await response.text();
    console.log("Received iCal data length:", icalData.length);
    console.log("First 100 characters of iCal data:", icalData.substring(0, 100));
    if (!icalData || icalData.includes("<!DOCTYPE")) {
      console.error("Invalid calendar data received");
      return res.status(400).json({
        error: "Invalid calendar data",
        details: "The calendar URL may be incorrect or the calendar may not be publicly accessible"
      });
    }
    const parsedEvents = ical.parseICS(icalData);
    if (!parsedEvents) {
      throw new Error("Failed to parse calendar data");
    }
    const events = Object.values(parsedEvents).filter((event) => event.type === "VEVENT").map((event) => ({
      id: event.uid || String(Math.random()),
      title: event.summary || "No Title",
      date: event.start?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      time: `${event.start?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) || "00:00"} - ${event.end?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) || "23:59"}`,
      end: event.end?.toISOString() || event.start?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      location: event.location || "No Location",
      description: event.description || "No Description"
    }));
    console.log("Successfully parsed events:", events.length);
    res.json(events);
  } catch (error) {
    console.error("Error fetching calendar:", error);
    res.status(500).json({
      error: "Failed to fetch calendar events",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
var calendar_default = router;

// server/routes.ts
import {
  insertUserSchema,
  insertEventSchema,
  insertBuildingSchema,
  insertStudentToolSchema,
  locationUpdateSchema,
  insertDiscussionSchema,
  insertCommentSchema,
  insertSafetyAlertSchema,
  insertSafetyResourceSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.use("/api/calendar", calendar_default);
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      const mockUser = {
        id: 1,
        username,
        name: username,
        isGuest: false
      };
      res.status(200).json(mockUser);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      const newUser = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const newEvent = await storage.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/buildings", async (_req, res) => {
    try {
      const buildings = await storage.getBuildings();
      res.status(200).json(buildings);
    } catch (error) {
      console.error("Error fetching buildings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/buildings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid building ID" });
      }
      const building = await storage.getBuilding(id);
      if (!building) {
        return res.status(404).json({ message: "Building not found" });
      }
      res.status(200).json(building);
    } catch (error) {
      console.error("Error fetching building:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/buildings", async (req, res) => {
    try {
      const buildingData = insertBuildingSchema.parse(req.body);
      const newBuilding = await storage.createBuilding(buildingData);
      res.status(201).json(newBuilding);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating building:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/student-tools", async (_req, res) => {
    try {
      const tools = await storage.getStudentTools();
      res.status(200).json(tools);
    } catch (error) {
      console.error("Error fetching student tools:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/student-tools/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const tool = await storage.getStudentTool(id);
      if (!tool) {
        return res.status(404).json({ message: "Student tool not found" });
      }
      res.status(200).json(tool);
    } catch (error) {
      console.error("Error fetching student tool:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/student-tools", async (req, res) => {
    try {
      const toolData = insertStudentToolSchema.parse(req.body);
      const existingTool = await storage.getStudentTool(toolData.id);
      if (existingTool) {
        return res.status(409).json({ message: "Student tool ID already exists" });
      }
      const newTool = await storage.createStudentTool(toolData);
      res.status(201).json(newTool);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating student tool:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users/:id/location", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const locationData = locationUpdateSchema.parse(req.body);
      const updatedUser = await storage.updateUserLocation(userId, locationData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      broadcastLocationUpdate();
      const { password, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error updating user location:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/locations/shared", async (_req, res) => {
    try {
      const sharedLocations = await storage.getSharedLocations();
      const locationsWithoutPasswords = sharedLocations.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.status(200).json(locationsWithoutPasswords);
    } catch (error) {
      console.error("Error fetching shared locations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/discussions", async (req, res) => {
    try {
      const category = req.query.category;
      let discussions;
      if (category && category !== "all") {
        discussions = await storage.getDiscussionsByCategory(category);
      } else {
        discussions = await storage.getDiscussions();
      }
      const discussionsWithAuthor = await Promise.all(discussions.map(async (discussion) => {
        const author = await storage.getUser(discussion.authorId);
        let authorInfo = { id: discussion.authorId, username: "Unknown" };
        if (author) {
          const { password, ...userWithoutPassword } = author;
          authorInfo = { ...userWithoutPassword };
        }
        const comments = await storage.getComments(discussion.id);
        const commentCount = comments ? comments.length : 0;
        return { ...discussion, author: authorInfo, commentCount };
      }));
      res.status(200).json(discussionsWithAuthor);
    } catch (error) {
      console.error("Error fetching discussions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/discussions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid discussion ID" });
      }
      const discussion = await storage.getDiscussion(id);
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }
      const author = await storage.getUser(discussion.authorId);
      let authorInfo = { id: discussion.authorId, username: "Unknown" };
      if (author) {
        const { password, ...userWithoutPassword } = author;
        authorInfo = { ...userWithoutPassword };
      }
      res.status(200).json({ ...discussion, author: authorInfo });
    } catch (error) {
      console.error("Error fetching discussion:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/discussions", async (req, res) => {
    try {
      const discussionData = insertDiscussionSchema.parse(req.body);
      const newDiscussion = await storage.createDiscussion(discussionData);
      const author = await storage.getUser(newDiscussion.authorId);
      let authorInfo = { id: newDiscussion.authorId, username: "Unknown" };
      if (author) {
        const { password, ...userWithoutPassword } = author;
        authorInfo = { ...userWithoutPassword };
      }
      res.status(201).json({ ...newDiscussion, author: authorInfo });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating discussion:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/comments", async (req, res) => {
    try {
      const comments = await storage.getAllComments();
      const commentsWithDetails = await Promise.all(comments.map(async (comment) => {
        const author = await storage.getUser(comment.authorId);
        let authorInfo = { id: comment.authorId, username: "Unknown" };
        if (author) {
          const { password, ...userWithoutPassword } = author;
          authorInfo = { ...userWithoutPassword };
        }
        const discussion = await storage.getDiscussion(comment.discussionId);
        return {
          ...comment,
          author: authorInfo,
          discussionTitle: discussion?.title || "Unknown Discussion"
        };
      }));
      res.status(200).json(commentsWithDetails);
    } catch (error) {
      console.error("Error fetching all comments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/discussions/:id/comments", async (req, res) => {
    try {
      const discussionId = parseInt(req.params.id);
      if (isNaN(discussionId)) {
        return res.status(400).json({ message: "Invalid discussion ID" });
      }
      const comments = await storage.getComments(discussionId);
      const commentsWithDetails = await Promise.all(comments.map(async (comment) => {
        const author = await storage.getUser(comment.authorId);
        let authorInfo = { id: comment.authorId, username: "Unknown" };
        if (author) {
          const { password, ...userWithoutPassword } = author;
          authorInfo = { ...userWithoutPassword };
        }
        const replies = await storage.getCommentReplies(comment.id);
        const repliesWithAuthor = await Promise.all(replies.map(async (reply) => {
          const replyAuthor = await storage.getUser(reply.authorId);
          let replyAuthorInfo = { id: reply.authorId, username: "Unknown" };
          if (replyAuthor) {
            const { password, ...userWithoutPassword } = replyAuthor;
            replyAuthorInfo = { ...userWithoutPassword };
          }
          return { ...reply, author: replyAuthorInfo };
        }));
        return { ...comment, author: authorInfo, replies: repliesWithAuthor };
      }));
      res.status(200).json(commentsWithDetails);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/discussions/:id/comments", async (req, res) => {
    try {
      const discussionId = parseInt(req.params.id);
      if (isNaN(discussionId)) {
        return res.status(400).json({ message: "Invalid discussion ID" });
      }
      const commentData = insertCommentSchema.parse({
        ...req.body,
        discussionId
      });
      const newComment = await storage.createComment(commentData);
      const author = await storage.getUser(newComment.authorId);
      let authorInfo = { id: newComment.authorId, username: "Unknown" };
      if (author) {
        const { password, ...userWithoutPassword } = author;
        authorInfo = { ...userWithoutPassword };
      }
      res.status(201).json({ ...newComment, author: authorInfo, replies: [] });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/safety/alerts", async (req, res) => {
    try {
      const activeOnly = req.query.active === "true";
      const alerts = activeOnly ? await storage.getActiveSafetyAlerts() : await storage.getSafetyAlerts();
      res.status(200).json(alerts);
    } catch (error) {
      console.error("Error fetching safety alerts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/safety/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid alert ID" });
      }
      const alert = await storage.getSafetyAlert(id);
      if (!alert) {
        return res.status(404).json({ message: "Safety alert not found" });
      }
      res.status(200).json(alert);
    } catch (error) {
      console.error("Error fetching safety alert:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/safety/alerts", async (req, res) => {
    try {
      const alertData = insertSafetyAlertSchema.parse(req.body);
      const newAlert = await storage.createSafetyAlert(alertData);
      res.status(201).json(newAlert);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating safety alert:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/safety/resources", async (req, res) => {
    try {
      const category = req.query.category;
      const resources = category ? await storage.getSafetyResourcesByCategory(category) : await storage.getSafetyResources();
      res.status(200).json(resources);
    } catch (error) {
      console.error("Error fetching safety resources:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/safety/resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      const resource = await storage.getSafetyResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Safety resource not found" });
      }
      res.status(200).json(resource);
    } catch (error) {
      console.error("Error fetching safety resource:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/safety/resources", async (req, res) => {
    try {
      const resourceData = insertSafetyResourceSchema.parse(req.body);
      const newResource = await storage.createSafetyResource(resourceData);
      res.status(201).json(newResource);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating safety resource:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  const httpServer = createServer(app2);
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });
  wss.on("connection", (socket) => {
    console.log("WebSocket client connected");
    socket.on("message", async (message) => {
      try {
        console.log("Received message:", message.toString());
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    });
    socket.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });
  async function broadcastLocationUpdate() {
    const sharedLocations = await storage.getSharedLocations();
    const sanitizedLocations = sharedLocations.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "location_update",
          data: sanitizedLocations
        }));
      }
    });
  }
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      __require("@replit/vite-plugin-cartographer").cartographer()
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  optimizeDeps: {
    include: ["@sinclair/typebox"],
    esbuildOptions: {
      target: "es2020",
      supported: {
        "top-level-await": true
      }
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 3e3;
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
