var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/services/googleCalendar.ts
var googleCalendar_exports = {};
__export(googleCalendar_exports, {
  GoogleCalendarService: () => GoogleCalendarService,
  googleCalendarService: () => googleCalendarService
});
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { JWT } from "google-auth-library";
var SCOPES, CALENDAR_IDS, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_PRIVATE_KEY, GoogleCalendarService, googleCalendarService;
var init_googleCalendar = __esm({
  "server/services/googleCalendar.ts"() {
    "use strict";
    SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
    CALENDAR_IDS = {
      academic: "c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03@group.calendar.google.com",
      activities: "gabby@aiowl.org"
      // Private calendar
    };
    CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    GoogleCalendarService = class {
      constructor() {
        this.serviceAccountClient = null;
        this.oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
        if (REFRESH_TOKEN) {
          this.oauth2Client.setCredentials({
            refresh_token: REFRESH_TOKEN
          });
        }
        if (SERVICE_ACCOUNT_EMAIL && SERVICE_ACCOUNT_PRIVATE_KEY) {
          this.serviceAccountClient = new JWT({
            email: SERVICE_ACCOUNT_EMAIL,
            key: SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: SCOPES
          });
        }
      }
      async getEvents(calendarType, timeMin, timeMax) {
        try {
          const calendarId = CALENDAR_IDS[calendarType];
          if (this.serviceAccountClient) {
            console.log(`Using service account for ${calendarType} calendar`);
            const calendar2 = google.calendar({ version: "v3", auth: this.serviceAccountClient });
            const response2 = await calendar2.events.list({
              calendarId,
              timeMin: timeMin?.toISOString(),
              timeMax: timeMax?.toISOString(),
              singleEvents: true,
              orderBy: "startTime",
              maxResults: 100
            });
            const events3 = response2.data.items?.map((event) => ({
              id: event.id || String(Math.random()),
              title: event.summary || "No Title",
              startTime: event.start?.dateTime || event.start?.date || (/* @__PURE__ */ new Date()).toISOString(),
              endTime: event.end?.dateTime || event.end?.date || (/* @__PURE__ */ new Date()).toISOString(),
              location: event.location || "No Location",
              description: event.description || "No Description",
              //
              calendarType
              //
            })) || [];
            console.log(`Fetched ${events3.length} events from Google Calendar API for ${calendarType}`);
            return events3;
          }
          const calendar = google.calendar({ version: "v3", auth: this.oauth2Client });
          const response = await calendar.events.list({
            calendarId,
            timeMin: timeMin?.toISOString(),
            timeMax: timeMax?.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
            maxResults: 100
          });
          const events2 = response.data.items?.map((event) => ({
            id: event.id || String(Math.random()),
            title: event.summary || "No Title",
            startTime: event.start?.dateTime || event.start?.date || (/* @__PURE__ */ new Date()).toISOString(),
            endTime: event.end?.dateTime || event.end?.date || (/* @__PURE__ */ new Date()).toISOString(),
            location: event.location || "No Location",
            description: event.description || "No Description",
            //
            calendarType
            //
          })) || [];
          console.log(`Fetched ${events2.length} events from Google Calendar API for ${calendarType}`);
          return events2;
        } catch (error) {
          console.error("Google Calendar API error:", error);
          throw error;
        }
      }
      // Helper method to get authorization URL for setting up OAuth
      getAuthUrl() {
        return this.oauth2Client.generateAuthUrl({
          access_type: "offline",
          scope: SCOPES,
          prompt: "consent"
        });
      }
      // Helper method to exchange authorization code for tokens
      async getTokensFromCode(code) {
        const { tokens } = await this.oauth2Client.getToken(code);
        return tokens;
      }
    };
    googleCalendarService = new GoogleCalendarService();
  }
});

// server/index.ts
import express3 from "express";

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
    this.safetyAlerts = /* @__PURE__ */ new Map();
    this.safetyResources = /* @__PURE__ */ new Map();
    this.nextUserId = 1;
    this.nextEventId = 1;
    this.nextBuildingId = 1;
    this.nextSafetyAlertId = 1;
    this.nextSafetyResourceId = 1;
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
    const id = this.nextUserId++;
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
  async updateUserLocation(id, location) {
    const user = await this.getUser(id);
    if (!user) {
      return null;
    }
    const updatedUser = {
      ...user,
      lat: location.lat,
      lng: location.lng,
      isLocationShared: location.isLocationShared !== void 0 ? location.isLocationShared : user.isLocationShared,
      lastLocationUpdate: /* @__PURE__ */ new Date()
    };
    this.users.set(id, updatedUser);
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
    const id = this.nextEventId++;
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
    const id = this.nextBuildingId++;
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
    const id = this.nextSafetyAlertId++;
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
    const id = this.nextSafetyResourceId++;
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

// shared/schema.ts
import { pgTable, text, serial, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  isGuest: boolean("is_guest").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastLogin: timestamp("last_login"),
  location: text("location"),
  isSharingLocation: boolean("is_sharing_location").notNull().default(false)
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastLogin: true
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isRecurring: boolean("is_recurring").notNull().default(false),
  recurrencePattern: text("recurrence_pattern")
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true
});
var buildings = pgTable("buildings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isOpen: boolean("is_open").notNull().default(true),
  openHours: text("open_hours"),
  contactInfo: text("contact_info")
});
var insertBuildingSchema = createInsertSchema(buildings).omit({
  id: true,
  createdAt: true
});
var studentTools = pgTable("student_tools", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true)
});
var insertStudentToolSchema = createInsertSchema(studentTools).omit({
  createdAt: true
});
var safetyAlerts = pgTable("safety_alerts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
  expiresAt: timestamp("expires_at")
});
var insertSafetyAlertSchema = createInsertSchema(safetyAlerts).omit({
  id: true,
  createdAt: true
});
var safetyResources = pgTable("safety_resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true)
});
var insertSafetyResourceSchema = createInsertSchema(safetyResources).omit({
  id: true,
  createdAt: true
});
var locationUpdateSchema = createInsertSchema(users).pick({
  location: true,
  isSharingLocation: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app3) {
  app3.post("/api/auth/login", async (req, res) => {
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
  app3.post("/api/auth/register", async (req, res) => {
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
  app3.get("/api/events", async (_req, res) => {
    try {
      const events2 = await storage.getEvents();
      res.status(200).json(events2);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app3.get("/api/events/:id", async (req, res) => {
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
  app3.post("/api/events", async (req, res) => {
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
  app3.get("/api/buildings", async (_req, res) => {
    try {
      const buildings2 = await storage.getBuildings();
      res.status(200).json(buildings2);
    } catch (error) {
      console.error("Error fetching buildings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app3.get("/api/buildings/:id", async (req, res) => {
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
  app3.post("/api/buildings", async (req, res) => {
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
  app3.get("/api/student-tools", async (_req, res) => {
    try {
      const tools = await storage.getStudentTools();
      res.status(200).json(tools);
    } catch (error) {
      console.error("Error fetching student tools:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app3.get("/api/student-tools/:id", async (req, res) => {
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
  app3.post("/api/student-tools", async (req, res) => {
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
  app3.post("/api/users/:id/location", async (req, res) => {
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
  app3.get("/api/locations/shared", async (_req, res) => {
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
  app3.get("/api/safety/alerts", async (req, res) => {
    try {
      const activeOnly = req.query.active === "true";
      const alerts = activeOnly ? await storage.getActiveSafetyAlerts() : await storage.getSafetyAlerts();
      res.status(200).json(alerts);
    } catch (error) {
      console.error("Error fetching safety alerts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app3.get("/api/safety/alerts/:id", async (req, res) => {
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
  app3.post("/api/safety/alerts", async (req, res) => {
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
  app3.get("/api/safety/resources", async (req, res) => {
    try {
      const category = req.query.category;
      const resources = category ? await storage.getSafetyResourcesByCategory(category) : await storage.getSafetyResources();
      res.status(200).json(resources);
    } catch (error) {
      console.error("Error fetching safety resources:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app3.get("/api/safety/resources/:id", async (req, res) => {
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
  app3.post("/api/safety/resources", async (req, res) => {
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
  const httpServer = createServer(app3);
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
  assetsInclude: ["**/*.JPG", "**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.gif", "**/*.webp"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: true
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
      strict: false,
      allow: ["..", "node_modules"]
    },
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var db = getFirestore(app);
var storage2 = getStorage(app);
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app3, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const viteServer = await (void 0)({
    ...vite_config_default,
    configFile: false,
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: ["localhost"]
    },
    appType: "custom"
  });
  app3.use(viteServer.middlewares);
  app3.use("*", async (req, res, next) => {
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
      const page = await viteServer.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      viteServer.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app3) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app3.use(express.static(distPath));
  app3.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import cors from "cors";

// server/api/programs.ts
import { Router } from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
var router = Router();
var programCache = {};
var lastFetchTime = 0;
var CACHE_DURATION = 24 * 60 * 60 * 1e3;
async function fetchProgramDetails(programId) {
  try {
    const program = programCache[programId];
    if (!program) {
      console.error(`Program not found in cache: ${programId}`);
      return null;
    }
    const url = `https://www.hocking.edu/${programId}`;
    try {
      console.log(`Fetching from: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch from ${url}: ${response.status}`);
        return null;
      }
      const html = await response.text();
      const $ = cheerio.load(html);
      let description = "";
      let courses = [];
      let careers = [];
      const descriptionSection = $('h2:contains("Program Description")');
      if (descriptionSection.length) {
        let currentElement = descriptionSection.next();
        while (currentElement.length && !currentElement.is("h2")) {
          const text2 = currentElement.text().trim();
          if (text2 && !text2.includes("APPLY TO HOCKING COLLEGE")) {
            description += text2 + " ";
          }
          currentElement = currentElement.next();
        }
      }
      const careerSection = $('h2:contains("Career Options"), h1:contains("Career Options")');
      if (careerSection.length) {
        let currentElement = careerSection.next();
        while (currentElement.length && !currentElement.is("h1, h2")) {
          const text2 = currentElement.text().trim();
          if (text2 && text2.length > 10 && !text2.includes("Print PDF") && !text2.includes("View PDF")) {
            careers.push(text2);
          }
          currentElement = currentElement.next();
        }
      }
      const courseSection = $('div:contains("Course Curriculum")');
      if (courseSection.length) {
        courseSection.find("li").each((_, element) => {
          const text2 = $(element).text().trim();
          if (text2 && text2.length > 0) {
            courses.push(text2);
          }
        });
      }
      if (!description) {
        $("p").each((_, element) => {
          const text2 = $(element).text().trim();
          if (text2.includes(program.name) && text2.length > 50) {
            description = text2;
            return false;
          }
        });
      }
      console.log(`Found content for ${program.name}:`, {
        descriptionLength: description.length,
        coursesCount: courses.length,
        careersCount: careers.length,
        description: description.substring(0, 100) + "..."
        // Log first 100 chars
      });
      return {
        title: program.name,
        description: description || "Visit Hocking College's website for the latest program information.",
        courses,
        careers,
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching program details for ${programId}:`, error);
    return null;
  }
}
async function updateProgramCache() {
  const now = Date.now();
  if (now - lastFetchTime < CACHE_DURATION && Object.keys(programCache).length > 0) {
    return;
  }
  try {
    const response = await fetch("https://www.hocking.edu/majors");
    const html = await response.text();
    const $ = cheerio.load(html);
    $("h4").each((_, categoryHeader) => {
      const categoryName = $(categoryHeader).text().trim();
      const categorySection = $(categoryHeader).next("ul");
      if (categorySection.length && categoryName) {
        categorySection.find("li").each((_2, program) => {
          const programName = $(program).text().trim();
          if (programName) {
            const programId = programName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            if (!programCache[programId]) {
              programCache[programId] = {
                id: programId,
                name: programName,
                category: categoryName,
                details: {
                  title: programName,
                  description: "Program details are being updated.",
                  courses: [],
                  careers: [],
                  lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
                }
              };
              console.log(`Added program to cache: ${programName} (${programId})`);
            }
          }
        });
      }
    });
    console.log(`Cache updated with ${Object.keys(programCache).length} programs`);
    lastFetchTime = now;
  } catch (error) {
    console.error("Error updating program cache:", error);
  }
}
updateProgramCache();
router.get("/", async (req, res) => {
  await updateProgramCache();
  res.json(Object.values(programCache));
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await updateProgramCache();
  const program = programCache[id];
  if (!program) {
    return res.status(404).json({ error: "Program not found" });
  }
  if (!program.details) {
    program.details = await fetchProgramDetails(id);
  }
  res.json(program);
});
var programs_default = router;

// server/src/routes/calendar.ts
import express2 from "express";
import * as ical from "ical";
import fetch2 from "node-fetch";
var googleCalendarService2 = null;
try {
  const { googleCalendarService: service } = (init_googleCalendar(), __toCommonJS(googleCalendar_exports));
  googleCalendarService2 = service;
  console.log("Google Calendar service loaded successfully");
} catch (error) {
  console.log("Google Calendar service not available, will use iCal fallback:", error instanceof Error ? error.message : "Unknown error");
}
var router2 = express2.Router();
var ACADEMIC_CALENDAR_URL = "https://calendar.google.com/calendar/ical/c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03%40group.calendar.google.com/public/basic.ics";
var STUDENT_CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";
async function fetchCalendarEvents(url, calendarType, timeMin, timeMax) {
  console.log(`
=== GOOGLE CALENDAR DEBUG ===`);
  console.log(`Fetching calendar events from: ${url}`);
  try {
    const response = await fetch2(url);
    console.log(`Response status: ${response.status} ${response.statusText}`);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status} for URL: ${url}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const icalData = await response.text();
    console.log(`Received ${icalData.length} characters of iCal data`);
    console.log(`First 500 chars of iCal data:`, icalData.substring(0, 500));
    const parsedEvents = ical.parseICS(icalData);
    console.log(`Parsed ${Object.keys(parsedEvents).length} total events from iCal`);
    const eventTypes = new Set(Object.values(parsedEvents).map((event) => event.type));
    console.log(`Event types found:`, Array.from(eventTypes));
    const events2 = Object.values(parsedEvents).filter((event) => {
      const isVEvent = event.type === "VEVENT";
      if (!isVEvent) {
        console.log(`Skipping non-VEVENT: ${event.type}`);
        return false;
      }
      if (timeMin || timeMax) {
        const eventStart = event.start;
        if (eventStart) {
          const eventDate = new Date(eventStart);
          const minDate = timeMin || /* @__PURE__ */ new Date(0);
          const maxDate = timeMax || /* @__PURE__ */ new Date("2100-01-01");
          if (eventDate < minDate || eventDate > maxDate) {
            console.log(`Skipping event outside date range: ${event.summary} on ${eventDate.toISOString()}`);
            return false;
          }
        }
      }
      return true;
    }).map((event, index) => {
      console.log(`
--- Processing Event ${index + 1} ---`);
      console.log(`Raw event data:`, JSON.stringify(event, null, 2));
      let startDate = event.start;
      let endDate = event.end;
      console.log(`Original start: ${startDate} (type: ${typeof startDate})`);
      console.log(`Original end: ${endDate} (type: ${typeof endDate})`);
      if (typeof startDate === "string") {
        startDate = new Date(startDate);
        console.log(`Parsed start date: ${startDate.toISOString()}`);
      }
      if (typeof endDate === "string") {
        endDate = new Date(endDate);
        console.log(`Parsed end date: ${endDate.toISOString()}`);
      }
      const eventData = {
        id: event.uid || String(Math.random()),
        title: event.summary || "No Title",
        startTime: startDate ? startDate.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
        endTime: endDate ? endDate.toISOString() : startDate ? startDate.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
        location: event.location || "No Location",
        description: event.description || "No Description",
        calendarType
        // <-- ADD THIS LINE
      };
      console.log(`Final event data:`, eventData);
      return eventData;
    });
    console.log(`
=== SUMMARY ===`);
    console.log(`Fetched ${events2.length} events from ${url}`);
    if (events2.length > 0) {
      console.log("First event:", events2[0]);
      console.log("Last event:", events2[events2.length - 1]);
      const dates = events2.map((e) => new Date(e.startTime));
      const earliest = new Date(Math.min(...dates.map((d) => d.getTime())));
      const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
      console.log(`Event date range: ${earliest.toISOString()} to ${latest.toISOString()}`);
    } else {
      console.warn("No events found in calendar!");
    }
    return events2;
  } catch (error) {
    console.error(`Error in fetchCalendarEvents:`, error);
    throw error;
  }
}
router2.get("/events", async (req, res) => {
  console.log(`
=== API REQUEST ===`);
  console.log(`Query params:`, req.query);
  try {
    const calendarType = req.query.type;
    const timeMin = req.query.timeMin;
    const timeMax = req.query.timeMax;
    console.log(`Calendar type requested: ${calendarType}`);
    console.log(`Time range: ${timeMin || "no start"} to ${timeMax || "no end"}`);
    let events2;
    if (googleCalendarService2) {
      console.log(`Attempting to use Google Calendar API for ${calendarType} calendar`);
      try {
        events2 = await googleCalendarService2.getEvents(
          calendarType,
          timeMin ? new Date(timeMin) : void 0,
          timeMax ? new Date(timeMax) : void 0
        );
        console.log(`Successfully fetched ${events2.length} events via Google Calendar API`);
      } catch (apiError) {
        console.error("Google Calendar API failed, falling back to iCal:", apiError);
      }
    }
    if (!events2) {
      console.log(`Using iCal fallback for ${calendarType} calendar`);
      const minDate = timeMin ? new Date(timeMin) : void 0;
      const maxDate = timeMax ? new Date(timeMax) : void 0;
      console.log(`iCal date filtering: minDate=${minDate?.toISOString()}, maxDate=${maxDate?.toISOString()}`);
      if (calendarType === "academic") {
        events2 = await fetchCalendarEvents(ACADEMIC_CALENDAR_URL, "academic", minDate, maxDate);
      } else if (calendarType === "activities") {
        events2 = await fetchCalendarEvents(STUDENT_CALENDAR_URL, "activities", minDate, maxDate);
      }
    }
    if (timeMin || timeMax) {
      console.log(`Date filtering applied at source: ${timeMin || "no start"} to ${timeMax || "no end"}`);
    }
    console.log(`Sending ${events2.length} events to frontend`);
    res.json(events2);
  } catch (error) {
    console.error(`API Error:`, error);
    res.status(500).json({
      error: "Failed to fetch calendar events",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
var calendar_default = router2;

// server/index.ts
var app2 = express3();
app2.use(express3.json());
app2.use(express3.urlencoded({ extended: false }));
app2.use(cors());
app2.use("/api/calendar", calendar_default);
app2.use((req, res, next) => {
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
  const server = await registerRoutes(app2);
  app2.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  app2.use("/api/programs", programs_default);
  if (app2.get("env") === "development") {
    await setupVite(app2, server);
  } else {
    serveStatic(app2);
  }
  const port = 3e3;
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
