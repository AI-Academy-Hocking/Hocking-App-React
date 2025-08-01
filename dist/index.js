var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename, __dirname, vite_config_default;
var init_vite_config = __esm({
  "vite.config.ts"() {
    "use strict";
    __filename = fileURLToPath(import.meta.url);
    __dirname = dirname(__filename);
    vite_config_default = defineConfig({
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
  }
});

// server/vite.ts
var vite_exports = {};
__export(vite_exports, {
  auth: () => auth,
  db: () => db,
  log: () => log,
  serveStatic: () => serveStatic,
  setupVite: () => setupVite,
  storage: () => storage2
});
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { nanoid } from "nanoid";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
  const { createServer: createServer2 } = await Promise.resolve().then(() => (init_vite(), vite_exports));
  const vite = await createServer2({
    ...vite_config_default,
    configFile: false,
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: ["localhost"]
    },
    appType: "custom"
  });
  app3.use(vite.middlewares);
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
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
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
var __filename2, __dirname2, firebaseConfig, app, auth, db, storage2;
var init_vite = __esm({
  "server/vite.ts"() {
    "use strict";
    init_vite_config();
    __filename2 = fileURLToPath2(import.meta.url);
    __dirname2 = dirname2(__filename2);
    firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage2 = getStorage(app);
  }
});

// server/index.ts
import express7 from "express";

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
    return this.users.get(id) || null;
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    ) || null;
  }
  async createUser(insertUser) {
    const id = this.nextUserId++;
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      lastLogin: null,
      location: null,
      isSharingLocation: false,
      isGuest: insertUser.isGuest ?? false
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
      location: location.location ?? null,
      isSharingLocation: location.isSharingLocation ?? false
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  async getSharedLocations() {
    return Array.from(this.users.values()).filter(
      (user) => user.isSharingLocation && user.location !== null
    );
  }
  // Event operations
  async getEvents() {
    return Array.from(this.events.values());
  }
  async getEvent(id) {
    return this.events.get(id) || null;
  }
  async createEvent(insertEvent) {
    const id = this.nextEventId++;
    const event = {
      ...insertEvent,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isRecurring: insertEvent.isRecurring ?? false,
      recurrencePattern: insertEvent.recurrencePattern ?? null
    };
    this.events.set(id, event);
    return event;
  }
  // Building operations
  async getBuildings() {
    return Array.from(this.buildings.values());
  }
  async getBuilding(id) {
    return this.buildings.get(id) || null;
  }
  async createBuilding(insertBuilding) {
    const id = this.nextBuildingId++;
    const building = {
      ...insertBuilding,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isOpen: insertBuilding.isOpen ?? true,
      openHours: insertBuilding.openHours ?? null,
      contactInfo: insertBuilding.contactInfo ?? null
    };
    this.buildings.set(id, building);
    return building;
  }
  // Student Tool operations
  async getStudentTools() {
    return Array.from(this.studentTools.values());
  }
  async getStudentTool(id) {
    return this.studentTools.get(id) || null;
  }
  async createStudentTool(tool) {
    const studentTool = {
      ...tool,
      createdAt: /* @__PURE__ */ new Date(),
      isActive: tool.isActive ?? true
    };
    this.studentTools.set(tool.id, studentTool);
    return studentTool;
  }
  // Safety Alert operations
  async getSafetyAlerts() {
    return Array.from(this.safetyAlerts.values());
  }
  async getActiveSafetyAlerts() {
    const now = /* @__PURE__ */ new Date();
    return Array.from(this.safetyAlerts.values()).filter(
      (alert) => alert.isActive && (alert.expiresAt === null || alert.expiresAt > now)
    );
  }
  async getSafetyAlert(id) {
    return this.safetyAlerts.get(id) || null;
  }
  async createSafetyAlert(insertAlert) {
    const id = this.nextSafetyAlertId++;
    const alert = {
      ...insertAlert,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isActive: insertAlert.isActive ?? true,
      expiresAt: insertAlert.expiresAt ?? null
    };
    this.safetyAlerts.set(id, alert);
    return alert;
  }
  // Safety Resource operations
  async getSafetyResources() {
    return Array.from(this.safetyResources.values());
  }
  async getSafetyResourcesByCategory(category) {
    return Array.from(this.safetyResources.values()).filter((resource) => resource.category === category);
  }
  async getSafetyResource(id) {
    return this.safetyResources.get(id) || null;
  }
  async createSafetyResource(insertResource) {
    const id = this.nextSafetyResourceId++;
    const resource = {
      ...insertResource,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      isActive: insertResource.isActive ?? true
    };
    this.safetyResources.set(id, resource);
    return resource;
  }
  // Initialize with sample data
  async initializeSampleData() {
    await this.createUser({
      username: "admin",
      password: "password",
      name: "Admin User",
      isGuest: false
    });
    await this.createUser({
      username: "student",
      password: "password",
      name: "Student User",
      isGuest: false
    });
    await this.createEvent({
      title: "Fall Festival",
      description: "Annual celebration with food, games, and activities for students and faculty.",
      startTime: /* @__PURE__ */ new Date("2023-10-15T12:00:00"),
      endTime: /* @__PURE__ */ new Date("2023-10-15T16:00:00"),
      location: "Student Center"
    });
    await this.createEvent({
      title: "Career Fair",
      description: "Meet with employers from around the region for internship and job opportunities.",
      startTime: /* @__PURE__ */ new Date("2023-10-20T10:00:00"),
      endTime: /* @__PURE__ */ new Date("2023-10-20T14:00:00"),
      location: "Main Hall"
    });
    await this.createEvent({
      title: "Registration Deadline",
      description: "Last day to register for Spring semester classes without late fees.",
      startTime: /* @__PURE__ */ new Date("2023-11-05T23:59:00"),
      endTime: /* @__PURE__ */ new Date("2023-11-06T00:00:00"),
      location: "For Spring Semester"
    });
    await this.createBuilding({
      name: "Main Hall",
      description: "Administrative offices, classrooms",
      location: "Main Campus",
      isOpen: true,
      openHours: "8:00 AM - 5:00 PM",
      contactInfo: "740-753-6000"
    });
    await this.createBuilding({
      name: "Student Center",
      description: "Dining, recreation, student services",
      location: "Main Campus",
      isOpen: true,
      openHours: "7:00 AM - 10:00 PM",
      contactInfo: "740-753-6100"
    });
    await this.createBuilding({
      name: "Davidson Hall",
      description: "Science labs, lecture halls",
      location: "Main Campus",
      isOpen: true,
      openHours: "8:00 AM - 6:00 PM",
      contactInfo: "740-753-6200"
    });
    await this.createBuilding({
      name: "Library",
      description: "Books, study spaces, computer labs",
      location: "Main Campus",
      isOpen: true,
      openHours: "8:00 AM - 11:00 PM",
      contactInfo: "740-753-6300"
    });
    await this.createBuilding({
      name: "Recreation Center",
      description: "Gym, pool, fitness classes",
      location: "Main Campus",
      isOpen: true,
      openHours: "6:00 AM - 10:00 PM",
      contactInfo: "740-753-6400"
    });
    await this.createStudentTool({
      id: "course-schedule",
      name: "Course Schedule",
      description: "View your current classes",
      category: "academic",
      url: "#",
      isActive: true
    });
    await this.createStudentTool({
      id: "grades",
      name: "Grades",
      description: "Check your academic performance",
      category: "academic",
      url: "#",
      isActive: true
    });
    await this.createStudentTool({
      id: "course-catalog",
      name: "Course Catalog",
      description: "Browse available courses",
      category: "academic",
      url: "#",
      isActive: true
    });
    await this.createStudentTool({
      id: "advising",
      name: "Advising",
      description: "Connect with your advisor",
      category: "academic",
      url: "#",
      isActive: true
    });
    await this.createStudentTool({
      id: "academic-history",
      name: "Academic History",
      description: "View your transcript",
      category: "academic",
      url: "#",
      isActive: true
    });
    await this.createStudentTool({
      id: "graduation",
      name: "Graduation",
      description: "Track degree requirements",
      category: "academic",
      url: "#",
      isActive: true
    });
    await this.createStudentTool({
      id: "financial-aid",
      name: "Financial Aid",
      description: "View and manage your financial aid",
      category: "financial",
      url: "/financial-aid",
      isActive: true
    });
    await this.createStudentTool({
      id: "billing",
      name: "Billing",
      description: "Pay tuition and view statements",
      category: "financial",
      url: "/billing",
      isActive: true
    });
    await this.createStudentTool({
      id: "scholarships",
      name: "Scholarships",
      description: "Apply for available scholarships",
      category: "financial",
      url: "/scholarships",
      isActive: true
    });
    await this.createStudentTool({
      id: "campus-resources",
      name: "Campus Resources",
      description: "Access campus services",
      category: "resources",
      url: "#",
      isActive: true
    });
    await this.createStudentTool({
      id: "health-services",
      name: "Campus Health and Wellness",
      description: "Schedule health appointments",
      category: "resources",
      url: "/campus-health",
      isActive: true
    });
    await this.createStudentTool({
      id: "career-services",
      name: "Career & University Center",
      description: "Job search and career planning",
      category: "resources",
      url: "/career-university-center",
      isActive: true
    });
    await this.createSafetyAlert({
      title: "Weather Alert: Winter Storm Warning",
      description: "A winter storm warning is in effect for our area from 6pm today until 6am tomorrow. Expect heavy snowfall and icy conditions. Please use caution when traveling and allow extra time for your commute.",
      severity: "warning",
      location: "All Campus",
      isActive: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3)
      // 24 hours from now
    });
    await this.createSafetyAlert({
      title: "Planned Power Outage: Davidson Hall",
      description: "There will be a planned power outage in Davidson Hall on Saturday from 8am to 12pm for electrical system maintenance. Plan accordingly and please avoid this building during this time.",
      severity: "info",
      location: "Davidson Hall",
      isActive: true,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1e3)
      // 3 days from now
    });
    await this.createSafetyResource({
      title: "Campus Police",
      description: "24/7 emergency assistance and security services",
      category: "emergency",
      url: "#",
      isActive: true
    });
    await this.createSafetyResource({
      title: "Emergency Notification System",
      description: "Sign up for emergency text alerts",
      category: "emergency",
      url: "#",
      isActive: true
    });
    await this.createSafetyResource({
      title: "Health Center",
      description: "Medical services for students",
      category: "health",
      url: "#",
      isActive: true
    });
    await this.createSafetyResource({
      title: "Counseling Services",
      description: "Confidential mental health support",
      category: "health",
      url: "#",
      isActive: true
    });
    await this.createSafetyResource({
      title: "Campus Escort Service",
      description: "Safe accompaniment across campus after dark",
      category: "security",
      url: "#",
      isActive: true
    });
    await this.createSafetyResource({
      title: "Anonymous Tip Line",
      description: "Report suspicious activity anonymously",
      category: "security",
      url: "#",
      isActive: true
    });
    await this.createSafetyResource({
      title: "Weather Updates",
      description: "Local weather forecasts and alerts",
      category: "weather",
      url: "https://weather.gov",
      isActive: true
    });
    await this.createSafetyResource({
      title: "Emergency Procedures",
      description: "Step-by-step guides for emergency situations",
      category: "emergency",
      url: "#",
      isActive: true
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
      const events3 = await storage.getEvents();
      res.status(200).json(events3);
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

// server/index.ts
init_vite();
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

// server/api/verification.ts
import express2 from "express";

// server/services/emailService.ts
import nodemailer from "nodemailer";
var verificationRequests = /* @__PURE__ */ new Map();
var createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "hocking.social.hub@gmail.com",
      pass: process.env.EMAIL_PASS || "your-app-password"
    }
  });
};
var sendVerificationEmail = async (user) => {
  const requestId = `verification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const verificationRequest = {
    id: requestId,
    user,
    status: "pending",
    createdAt: /* @__PURE__ */ new Date()
  };
  verificationRequests.set(requestId, verificationRequest);
  console.log("=== VERIFICATION EMAIL WOULD BE SENT ===");
  console.log("To: housing@hocking.edu");
  console.log("Subject: Campus Social Hub - New User Verification Request");
  console.log("User Details:", user);
  console.log("Verification URL:", `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-user/${requestId}`);
  console.log("========================================");
  return requestId;
};
var verifyUser = async (requestId, action, verifiedBy) => {
  const request = verificationRequests.get(requestId);
  if (!request) {
    throw new Error("Verification request not found");
  }
  if (request.status !== "pending") {
    throw new Error("Verification request already processed");
  }
  request.status = action === "approve" ? "approved" : "rejected";
  request.verifiedAt = /* @__PURE__ */ new Date();
  request.verifiedBy = verifiedBy;
  verificationRequests.set(requestId, request);
  await sendUserNotification(request);
  return request;
};
var sendUserNotification = async (request) => {
  const transporter = createTransporter();
  const status = request.status === "approved" ? "APPROVED" : "REJECTED";
  const statusColor = request.status === "approved" ? "#28a745" : "#dc3545";
  const statusIcon = request.status === "approved" ? "\u2705" : "\u274C";
  const mailOptions = {
    from: process.env.EMAIL_USER || "hocking.social.hub@gmail.com",
    to: request.user.email,
    subject: `Campus Social Hub - Account ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Campus Social Hub</h1>
          <p style="margin: 10px 0 0 0;">Account Verification ${status}</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 48px; margin-bottom: 20px;">${statusIcon}</div>
            <h2 style="color: ${statusColor}; margin: 0;">Your account has been ${status.toLowerCase()}!</h2>
          </div>
          
          <div style="background: ${request.status === "approved" ? "#d4edda" : "#f8d7da"}; border: 1px solid ${request.status === "approved" ? "#c3e6cb" : "#f5c6cb"}; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: ${request.status === "approved" ? "#155724" : "#721c24"};">
              ${request.status === "approved" ? "Congratulations! Your Campus Social Hub account has been approved. You can now access all features of the platform." : "We regret to inform you that your Campus Social Hub account has been rejected. Please contact the housing office for more information."}
            </p>
          </div>
          
          ${request.status === "approved" ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/housing/social" 
                 style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                \u{1F680} Access Campus Social Hub
              </a>
            </div>
          ` : ""}
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Verified by:</strong> ${request.verifiedBy}<br>
              <strong>Verified on:</strong> ${request.verifiedAt?.toLocaleString()}<br>
              <strong>Verification ID:</strong> ${request.id}
            </p>
          </div>
        </div>
        
        <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Hocking College Campus Social Hub - Automated Notification System</p>
        </div>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to user: ${request.user.email}`);
  } catch (error) {
    console.error("Error sending user notification:", error);
  }
};
var getVerificationStatus = (requestId) => {
  return verificationRequests.get(requestId) || null;
};
var getAllPendingVerifications = () => {
  return Array.from(verificationRequests.values()).filter((req) => req.status === "pending");
};

// server/api/verification.ts
var router2 = express2.Router();
router2.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      studentId,
      email,
      userType,
      dormBuilding,
      roomNumber,
      program,
      username
    } = req.body;
    if (!firstName || !lastName || !studentId || !email || !userType || !dormBuilding || !roomNumber || !program || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }
    if (!["student", "faculty"].includes(userType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user type"
      });
    }
    const userData = {
      firstName,
      lastName,
      studentId,
      email,
      userType,
      dormBuilding,
      roomNumber,
      program,
      username
    };
    const requestId = await sendVerificationEmail(userData);
    res.json({
      success: true,
      message: "Registration submitted successfully. Verification email sent to housing office.",
      requestId
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process registration. Please try again."
    });
  }
});
router2.post("/verify", async (req, res) => {
  try {
    const { requestId, action, verifiedBy } = req.body;
    if (!requestId || !action || !verifiedBy) {
      return res.status(400).json({
        success: false,
        message: "Request ID, action, and verified by are required"
      });
    }
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "approve" or "reject"'
      });
    }
    const result = await verifyUser(requestId, action, verifiedBy);
    res.json({
      success: true,
      message: `User ${action === "approve" ? "approved" : "rejected"} successfully`,
      verification: result
    });
  } catch (error) {
    console.error("Error in user verification:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to process verification"
    });
  }
});
router2.get("/status/:requestId", (req, res) => {
  try {
    const { requestId } = req.params;
    const status = getVerificationStatus(requestId);
    if (!status) {
      return res.status(404).json({
        success: false,
        message: "Verification request not found"
      });
    }
    res.json({
      success: true,
      verification: status
    });
  } catch (error) {
    console.error("Error getting verification status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get verification status"
    });
  }
});
router2.get("/pending", (req, res) => {
  try {
    const pendingVerifications = getAllPendingVerifications();
    res.json({
      success: true,
      verifications: pendingVerifications
    });
  } catch (error) {
    console.error("Error getting pending verifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get pending verifications"
    });
  }
});
var verification_default = router2;

// server/api/posts.ts
import express3 from "express";

// server/services/postVerificationService.ts
import nodemailer2 from "nodemailer";
var postSubmissions = /* @__PURE__ */ new Map();
var createTransporter2 = () => {
  return nodemailer2.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "hocking.social.hub@gmail.com",
      pass: process.env.EMAIL_PASS || "your-app-password"
    }
  });
};
var submitPostForVerification = async (postData) => {
  const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const postSubmission = {
    ...postData,
    id: postId,
    submittedAt: /* @__PURE__ */ new Date(),
    status: "pending"
  };
  postSubmissions.set(postId, postSubmission);
  console.log("=== POST VERIFICATION EMAIL WOULD BE SENT ===");
  console.log("To: housing@hocking.edu");
  console.log("Subject: Campus Social Hub - New Post Approval Request");
  console.log("Post Details:", postData);
  console.log("Verification URL:", `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-post/${postId}`);
  console.log("=============================================");
  return postId;
};
var verifyPost = async (postId, action, reviewedBy, rejectionReason) => {
  const post = postSubmissions.get(postId);
  if (!post) {
    throw new Error("Post submission not found");
  }
  if (post.status !== "pending") {
    throw new Error("Post submission already processed");
  }
  post.status = action === "approve" ? "approved" : "rejected";
  post.reviewedAt = /* @__PURE__ */ new Date();
  post.reviewedBy = reviewedBy;
  if (action === "reject" && rejectionReason) {
    post.rejectionReason = rejectionReason;
  }
  postSubmissions.set(postId, post);
  await sendPostNotification(post);
  if (post.status === "approved") {
    await sendNewPostNotification(post);
  }
  return post;
};
var sendPostNotification = async (post) => {
  const transporter = createTransporter2();
  const status = post.status === "approved" ? "APPROVED" : "REJECTED";
  const statusColor = post.status === "approved" ? "#28a745" : "#dc3545";
  const statusIcon = post.status === "approved" ? "\u2705" : "\u274C";
  const mailOptions = {
    from: process.env.EMAIL_USER || "hocking.social.hub@gmail.com",
    to: post.author.email,
    subject: `Campus Social Hub - Post ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Campus Social Hub</h1>
          <p style="margin: 10px 0 0 0;">Post ${status}</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 48px; margin-bottom: 20px;">${statusIcon}</div>
            <h2 style="color: ${statusColor}; margin: 0;">Your post has been ${status.toLowerCase()}!</h2>
          </div>
          
          <div style="background: ${post.status === "approved" ? "#d4edda" : "#f8d7da"}; border: 1px solid ${post.status === "approved" ? "#c3e6cb" : "#f5c6cb"}; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: ${post.status === "approved" ? "#155724" : "#721c24"};">
              ${post.status === "approved" ? "Your post has been approved and is now live on the Campus Social Hub!" : `Your post has been rejected.${post.rejectionReason ? ` Reason: ${post.rejectionReason}` : ""}`}
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0;">Post Details:</h4>
            <p style="margin: 0;"><strong>Content:</strong> ${post.content.substring(0, 100)}${post.content.length > 100 ? "..." : ""}</p>
            <p style="margin: 5px 0 0 0;"><strong>Type:</strong> ${post.type}</p>
            <p style="margin: 5px 0 0 0;"><strong>Category:</strong> ${post.category}</p>
          </div>
          
          ${post.status === "approved" ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/housing/social" 
                 style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                \u{1F680} View Your Post
              </a>
            </div>
          ` : ""}
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Reviewed by:</strong> ${post.reviewedBy}<br>
              <strong>Reviewed on:</strong> ${post.reviewedAt?.toLocaleString()}<br>
              <strong>Post ID:</strong> ${post.id}
            </p>
          </div>
        </div>
        
        <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Hocking College Campus Social Hub - Content Moderation System</p>
        </div>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Post notification sent to author: ${post.author.email}`);
  } catch (error) {
    console.error("Error sending post notification:", error);
  }
};
var sendNewPostNotification = async (post) => {
  console.log(`New post approved: ${post.content.substring(0, 50)}... by ${post.author.firstName} ${post.author.lastName}`);
  const verifiedUsers = [
    "student1@hocking.edu",
    "student2@hocking.edu",
    "faculty1@hocking.edu"
  ];
  const transporter = createTransporter2();
  for (const userEmail of verifiedUsers) {
    if (userEmail === post.author.email) continue;
    const mailOptions = {
      from: process.env.EMAIL_USER || "hocking.social.hub@gmail.com",
      to: userEmail,
      subject: "\u{1F4DD} New Post on Campus Social Hub",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Campus Social Hub</h1>
            <p style="margin: 10px 0 0 0;">New Post Available</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <div style="text-align: center; margin: 20px 0;">
              <div style="font-size: 48px; margin-bottom: 20px;">\u{1F4DD}</div>
              <h2 style="color: #333; margin: 0;">New ${post.type.charAt(0).toUpperCase() + post.type.slice(1)} Post</h2>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #007bff;">
              <p style="margin: 0; line-height: 1.6;"><strong>${post.author.firstName} ${post.author.lastName}</strong> posted:</p>
              <p style="margin: 10px 0 0 0; color: #666;">${post.content}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/housing/social" 
                 style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                \u{1F680} View Post
              </a>
            </div>
            
            <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <strong>Category:</strong> ${post.category}<br>
                <strong>Posted:</strong> ${post.reviewedAt?.toLocaleString()}<br>
                <strong>Type:</strong> ${post.type}
              </p>
            </div>
          </div>
          
          <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Hocking College Campus Social Hub - Notification System</p>
          </div>
        </div>
      `
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log(`New post notification sent to: ${userEmail}`);
    } catch (error) {
      console.error(`Error sending new post notification to ${userEmail}:`, error);
    }
  }
};
var getPostStatus = (postId) => {
  return postSubmissions.get(postId) || null;
};
var getAllPendingPosts = () => {
  return Array.from(postSubmissions.values()).filter((post) => post.status === "pending");
};
var getApprovedPosts = () => {
  return Array.from(postSubmissions.values()).filter((post) => post.status === "approved");
};

// server/api/posts.ts
var router3 = express3.Router();
router3.post("/submit", async (req, res) => {
  try {
    const {
      type,
      content,
      author,
      category,
      hashtags,
      emoji,
      pollOptions,
      eventDetails,
      image,
      video
    } = req.body;
    if (!type || !content || !author || !category) {
      return res.status(400).json({
        success: false,
        message: "Type, content, author, and category are required"
      });
    }
    const validTypes = ["text", "image", "video", "poll", "event", "alert"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post type"
      });
    }
    if (!author.firstName || !author.lastName || !author.email || !author.userType) {
      return res.status(400).json({
        success: false,
        message: "Author information is incomplete"
      });
    }
    const postData = {
      type,
      content,
      author,
      category,
      hashtags: hashtags || [],
      emoji,
      pollOptions,
      eventDetails,
      image,
      video
    };
    const postId = await submitPostForVerification(postData);
    res.json({
      success: true,
      message: "Post submitted for verification. You will be notified once it is reviewed.",
      postId
    });
  } catch (error) {
    console.error("Error in post submission:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit post. Please try again."
    });
  }
});
router3.post("/verify", async (req, res) => {
  try {
    const { postId, action, reviewedBy, rejectionReason } = req.body;
    if (!postId || !action || !reviewedBy) {
      return res.status(400).json({
        success: false,
        message: "Post ID, action, and reviewed by are required"
      });
    }
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "approve" or "reject"'
      });
    }
    const result = await verifyPost(postId, action, reviewedBy, rejectionReason);
    res.json({
      success: true,
      message: `Post ${action === "approve" ? "approved" : "rejected"} successfully`,
      post: result
    });
  } catch (error) {
    console.error("Error in post verification:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to process verification"
    });
  }
});
router3.get("/status/:postId", (req, res) => {
  try {
    const { postId } = req.params;
    const status = getPostStatus(postId);
    if (!status) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }
    res.json({
      success: true,
      post: status
    });
  } catch (error) {
    console.error("Error getting post status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get post status"
    });
  }
});
router3.get("/pending", (req, res) => {
  try {
    const pendingPosts = getAllPendingPosts();
    res.json({
      success: true,
      posts: pendingPosts
    });
  } catch (error) {
    console.error("Error getting pending posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get pending posts"
    });
  }
});
router3.get("/approved", (req, res) => {
  try {
    const approvedPosts = getApprovedPosts();
    res.json({
      success: true,
      posts: approvedPosts
    });
  } catch (error) {
    console.error("Error getting approved posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get approved posts"
    });
  }
});
var posts_default = router3;

// server/api/analytics.ts
import express4 from "express";
import { z } from "zod";
var router4 = express4.Router();
var StudySessionSchema = z.object({
  userId: z.string(),
  subject: z.string(),
  duration: z.number(),
  date: z.string(),
  goals: z.array(z.string()),
  completedGoals: z.array(z.string()),
  notes: z.string().optional()
});
var WellnessActivitySchema = z.object({
  userId: z.string(),
  type: z.enum(["sleep", "exercise", "nutrition", "social", "mindfulness"]),
  value: z.number(),
  date: z.string(),
  notes: z.string().optional()
});
var SocialActivitySchema = z.object({
  userId: z.string(),
  type: z.enum(["event", "study_group", "message", "connection"]),
  activityId: z.string(),
  date: z.string(),
  metadata: z.record(z.any()).optional()
});
var CareerActivitySchema = z.object({
  userId: z.string(),
  type: z.enum(["application", "interview", "skill", "networking"]),
  title: z.string(),
  date: z.string(),
  status: z.string().optional(),
  metadata: z.record(z.any()).optional()
});
var analyticsData = /* @__PURE__ */ new Map();
router4.post("/study-session", async (req, res) => {
  try {
    const data = StudySessionSchema.parse(req.body);
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: []
      });
    }
    const userData = analyticsData.get(data.userId);
    userData.studySessions.push({
      ...data,
      id: Date.now().toString(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    res.json({ success: true, message: "Study session recorded" });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router4.post("/wellness-activity", async (req, res) => {
  try {
    const data = WellnessActivitySchema.parse(req.body);
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: []
      });
    }
    const userData = analyticsData.get(data.userId);
    userData.wellnessActivities.push({
      ...data,
      id: Date.now().toString(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    res.json({ success: true, message: "Wellness activity recorded" });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router4.post("/social-activity", async (req, res) => {
  try {
    const data = SocialActivitySchema.parse(req.body);
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: []
      });
    }
    const userData = analyticsData.get(data.userId);
    userData.socialActivities.push({
      ...data,
      id: Date.now().toString(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    res.json({ success: true, message: "Social activity recorded" });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router4.post("/career-activity", async (req, res) => {
  try {
    const data = CareerActivitySchema.parse(req.body);
    if (!analyticsData.has(data.userId)) {
      analyticsData.set(data.userId, {
        studySessions: [],
        wellnessActivities: [],
        socialActivities: [],
        careerActivities: []
      });
    }
    const userData = analyticsData.get(data.userId);
    userData.careerActivities.push({
      ...data,
      id: Date.now().toString(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    res.json({ success: true, message: "Career activity recorded" });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router4.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeRange = "week" } = req.query;
    const userData = analyticsData.get(userId);
    if (!userData) {
      return res.json({
        studyHours: { daily: [], weekly: [], monthly: [] },
        wellnessScores: { sleep: [], exercise: [], social: [], nutrition: [] },
        socialEngagement: { eventsAttended: 0, studyGroupsJoined: 0, connectionsMade: 0, messagesSent: 0 },
        academicProgress: { assignmentsCompleted: 0, averageGrade: 0, studySessions: 0, attendanceRate: 0 },
        careerMetrics: { applicationsSubmitted: 0, interviewsScheduled: 0, skillsDeveloped: 0, networkingEvents: 0 }
      });
    }
    const now = /* @__PURE__ */ new Date();
    const timeRangeMs = timeRange === "week" ? 7 * 24 * 60 * 60 * 1e3 : timeRange === "month" ? 30 * 24 * 60 * 60 * 1e3 : 90 * 24 * 60 * 60 * 1e3;
    const filteredStudySessions = userData.studySessions.filter(
      (session) => now.getTime() - new Date(session.timestamp).getTime() <= timeRangeMs
    );
    const filteredWellness = userData.wellnessActivities.filter(
      (activity) => now.getTime() - new Date(activity.timestamp).getTime() <= timeRangeMs
    );
    const filteredSocial = userData.socialActivities.filter(
      (activity) => now.getTime() - new Date(activity.timestamp).getTime() <= timeRangeMs
    );
    const filteredCareer = userData.careerActivities.filter(
      (activity) => now.getTime() - new Date(activity.timestamp).getTime() <= timeRangeMs
    );
    const studyHours = {
      daily: Array(7).fill(0),
      weekly: [filteredStudySessions.reduce((sum, session) => sum + session.duration, 0) / 60],
      monthly: [filteredStudySessions.reduce((sum, session) => sum + session.duration, 0) / 60]
    };
    const wellnessScores = {
      sleep: filteredWellness.filter((a) => a.type === "sleep").map((a) => a.value),
      exercise: filteredWellness.filter((a) => a.type === "exercise").map((a) => a.value),
      social: filteredWellness.filter((a) => a.type === "social").map((a) => a.value),
      nutrition: filteredWellness.filter((a) => a.type === "nutrition").map((a) => a.value)
    };
    const socialEngagement = {
      eventsAttended: filteredSocial.filter((a) => a.type === "event").length,
      studyGroupsJoined: filteredSocial.filter((a) => a.type === "study_group").length,
      connectionsMade: filteredSocial.filter((a) => a.type === "connection").length,
      messagesSent: filteredSocial.filter((a) => a.type === "message").length
    };
    const academicProgress = {
      assignmentsCompleted: filteredStudySessions.filter((s) => s.completedGoals.length > 0).length,
      averageGrade: 85,
      // Mock data
      studySessions: filteredStudySessions.length,
      attendanceRate: 92
      // Mock data
    };
    const careerMetrics = {
      applicationsSubmitted: filteredCareer.filter((a) => a.type === "application").length,
      interviewsScheduled: filteredCareer.filter((a) => a.type === "interview").length,
      skillsDeveloped: filteredCareer.filter((a) => a.type === "skill").length,
      networkingEvents: filteredCareer.filter((a) => a.type === "networking").length
    };
    res.json({
      studyHours,
      wellnessScores,
      socialEngagement,
      academicProgress,
      careerMetrics
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve analytics" });
  }
});
router4.get("/recommendations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = analyticsData.get(userId);
    if (!userData) {
      return res.json([]);
    }
    const recommendations = [];
    const totalStudyHours = userData.studySessions.reduce((sum, session) => sum + session.duration, 0) / 60;
    if (totalStudyHours < 20) {
      recommendations.push({
        id: "1",
        type: "study",
        title: "Increase Study Time",
        description: `You've studied ${totalStudyHours.toFixed(1)} hours this week. Consider increasing to 20+ hours for better performance.`,
        confidence: 0.85,
        priority: "high",
        category: "Academic Performance",
        impact: "High - Direct impact on grades",
        timeToComplete: "Ongoing"
      });
    }
    const sleepActivities = userData.wellnessActivities.filter((a) => a.type === "sleep");
    if (sleepActivities.length > 0) {
      const avgSleep = sleepActivities.reduce((sum, a) => sum + a.value, 0) / sleepActivities.length;
      if (avgSleep < 7) {
        recommendations.push({
          id: "2",
          type: "wellness",
          title: "Improve Sleep Schedule",
          description: `Your average sleep is ${avgSleep.toFixed(1)} hours. Aim for 7-9 hours for better focus.`,
          confidence: 0.92,
          priority: "high",
          category: "Health & Wellness",
          impact: "High - Better focus and energy",
          timeToComplete: "Ongoing"
        });
      }
    }
    const socialActivities = userData.socialActivities.filter((a) => a.type === "event");
    if (socialActivities.length < 2) {
      recommendations.push({
        id: "3",
        type: "social",
        title: "Attend More Events",
        description: "You've attended few social events. Consider joining campus activities to build connections.",
        confidence: 0.78,
        priority: "medium",
        category: "Social Connection",
        impact: "Medium - Improved collaboration",
        timeToComplete: "1-2 hours"
      });
    }
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});
var analytics_default = router4;

// server/api/achievements.ts
import express5 from "express";
import { z as z2 } from "zod";
var router5 = express5.Router();
var ACHIEVEMENTS = [
  {
    id: "week_warrior",
    name: "Week Warrior",
    description: "Complete your first week of classes",
    category: "academic",
    criteria: [
      { type: "attendance", value: 5, description: "Attend 5 classes" },
      { type: "assignment", value: 1, description: "Complete first assignment" }
    ],
    rarity: "common",
    icon: "award",
    points: 10
  },
  {
    id: "social_butterfly",
    name: "Social Butterfly",
    description: "Join 3 study groups or clubs",
    category: "social",
    criteria: [
      { type: "study_groups", value: 3, description: "Join 3 groups" },
      { type: "meetings", value: 5, description: "Attend 5 meetings" }
    ],
    rarity: "rare",
    icon: "users",
    points: 25
  },
  {
    id: "housing_hero",
    name: "Housing Hero",
    description: "Complete all housing requirements",
    category: "housing",
    criteria: [
      { type: "application", value: 1, description: "Submit application" },
      { type: "orientation", value: 1, description: "Complete orientation" },
      { type: "move_in", value: 1, description: "Move in" }
    ],
    rarity: "epic",
    icon: "home",
    points: 50
  },
  {
    id: "wellness_champion",
    name: "Wellness Champion",
    description: "Maintain wellness streak for 30 days",
    category: "wellness",
    criteria: [
      { type: "wellness_streak", value: 30, description: "30 day streak" }
    ],
    rarity: "legendary",
    icon: "heart",
    points: 100
  },
  {
    id: "study_master",
    name: "Study Master",
    description: "Complete 50 study sessions",
    category: "academic",
    criteria: [
      { type: "study_sessions", value: 50, description: "Complete 50 sessions" },
      { type: "completion_rate", value: 80, description: "Maintain 80% completion rate" }
    ],
    rarity: "rare",
    icon: "book-open",
    points: 75
  },
  {
    id: "career_explorer",
    name: "Career Explorer",
    description: "Attend 5 career events",
    category: "career",
    criteria: [
      { type: "career_events", value: 5, description: "Attend 5 events" }
    ],
    rarity: "epic",
    icon: "target",
    points: 60
  },
  {
    id: "perfect_attendance",
    name: "Perfect Attendance",
    description: "Attend all classes for a full semester",
    category: "academic",
    criteria: [
      { type: "attendance_rate", value: 100, description: "100% attendance" },
      { type: "semester_complete", value: 1, description: "Complete semester" }
    ],
    rarity: "legendary",
    icon: "star",
    points: 150
  },
  {
    id: "community_leader",
    name: "Community Leader",
    description: "Organize 3 campus events",
    category: "social",
    criteria: [
      { type: "events_organized", value: 3, description: "Organize 3 events" },
      { type: "attendees", value: 20, description: "Get 20+ attendees" }
    ],
    rarity: "epic",
    icon: "users",
    points: 80
  },
  {
    id: "fitness_fanatic",
    name: "Fitness Fanatic",
    description: "Exercise for 30 days straight",
    category: "wellness",
    criteria: [
      { type: "exercise_streak", value: 30, description: "30 day exercise streak" }
    ],
    rarity: "rare",
    icon: "heart",
    points: 40
  },
  {
    id: "academic_excellence",
    name: "Academic Excellence",
    description: "Maintain 4.0 GPA for a semester",
    category: "academic",
    criteria: [
      { type: "gpa", value: 4, description: "4.0 GPA" },
      { type: "semester_complete", value: 1, description: "Complete semester" }
    ],
    rarity: "legendary",
    icon: "trophy",
    points: 200
  }
];
var userAchievements = /* @__PURE__ */ new Map();
var ProgressUpdateSchema = z2.object({
  userId: z2.string(),
  achievementId: z2.string(),
  progress: z2.number(),
  metadata: z2.record(z2.any()).optional()
});
router5.get("/", async (req, res) => {
  try {
    res.json(ACHIEVEMENTS);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve achievements" });
  }
});
router5.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = userAchievements.get(userId) || { unlocked: [], progress: {} };
    const achievementsWithProgress = ACHIEVEMENTS.map((achievement) => {
      const userProgress = userData.progress[achievement.id] || 0;
      const isUnlocked = userData.unlocked.includes(achievement.id);
      return {
        ...achievement,
        unlocked: isUnlocked,
        progress: userProgress,
        maxProgress: Math.max(...achievement.criteria.map((c) => c.value)),
        unlockedAt: isUnlocked ? userData.unlockedDates?.[achievement.id] : void 0
      };
    });
    res.json(achievementsWithProgress);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user achievements" });
  }
});
router5.post("/progress", async (req, res) => {
  try {
    const data = ProgressUpdateSchema.parse(req.body);
    if (!userAchievements.has(data.userId)) {
      userAchievements.set(data.userId, {
        unlocked: [],
        progress: {},
        unlockedDates: {},
        totalPoints: 0
      });
    }
    const userData = userAchievements.get(data.userId);
    const achievement = ACHIEVEMENTS.find((a) => a.id === data.achievementId);
    if (!achievement) {
      return res.status(404).json({ error: "Achievement not found" });
    }
    userData.progress[data.achievementId] = data.progress;
    const shouldUnlock = achievement.criteria.every((criterion) => {
      const currentProgress = userData.progress[data.achievementId] || 0;
      return currentProgress >= criterion.value;
    });
    if (shouldUnlock && !userData.unlocked.includes(data.achievementId)) {
      userData.unlocked.push(data.achievementId);
      userData.unlockedDates[data.achievementId] = (/* @__PURE__ */ new Date()).toISOString();
      userData.totalPoints += achievement.points;
      console.log(`Achievement unlocked: ${achievement.name} for user ${data.userId}`);
    }
    res.json({
      success: true,
      unlocked: shouldUnlock && !userData.unlocked.includes(data.achievementId),
      totalPoints: userData.totalPoints
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router5.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = Array.from(userAchievements.entries()).map(([userId, data]) => ({
      userId,
      totalPoints: data.totalPoints || 0,
      unlockedCount: data.unlocked?.length || 0,
      achievements: data.unlocked || []
    })).sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
});
router5.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = userAchievements.get(userId) || { unlocked: [], progress: {} };
    const stats = {
      totalAchievements: ACHIEVEMENTS.length,
      unlockedCount: userData.unlocked?.length || 0,
      totalPoints: userData.totalPoints || 0,
      completionRate: Math.round((userData.unlocked?.length || 0) / ACHIEVEMENTS.length * 100),
      rarityBreakdown: {
        common: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.rarity === "common"
        ).length || 0,
        rare: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.rarity === "rare"
        ).length || 0,
        epic: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.rarity === "epic"
        ).length || 0,
        legendary: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.rarity === "legendary"
        ).length || 0
      },
      categoryBreakdown: {
        academic: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.category === "academic"
        ).length || 0,
        social: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.category === "social"
        ).length || 0,
        wellness: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.category === "wellness"
        ).length || 0,
        career: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.category === "career"
        ).length || 0,
        housing: userData.unlocked?.filter(
          (id) => ACHIEVEMENTS.find((a) => a.id === id)?.category === "housing"
        ).length || 0
      }
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve achievement stats" });
  }
});
router5.post("/bulk-progress", async (req, res) => {
  try {
    const { userId, activities } = req.body;
    if (!userAchievements.has(userId)) {
      userAchievements.set(userId, {
        unlocked: [],
        progress: {},
        unlockedDates: {},
        totalPoints: 0
      });
    }
    const userData = userAchievements.get(userId);
    const newlyUnlocked = [];
    for (const activity of activities) {
      for (const achievement of ACHIEVEMENTS) {
        for (const criterion of achievement.criteria) {
          if (criterion.type === activity.type) {
            const currentProgress = userData.progress[achievement.id] || 0;
            const newProgress = Math.min(currentProgress + activity.value, criterion.value);
            userData.progress[achievement.id] = newProgress;
            const shouldUnlock = achievement.criteria.every((c) => {
              const progress = userData.progress[achievement.id] || 0;
              return progress >= c.value;
            });
            if (shouldUnlock && !userData.unlocked.includes(achievement.id)) {
              userData.unlocked.push(achievement.id);
              userData.unlockedDates[achievement.id] = (/* @__PURE__ */ new Date()).toISOString();
              userData.totalPoints += achievement.points;
              newlyUnlocked.push(achievement);
            }
          }
        }
      }
    }
    res.json({
      success: true,
      newlyUnlocked,
      totalPoints: userData.totalPoints
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
var achievements_default = router5;

// server/api/social.ts
import express6 from "express";
import { z as z3 } from "zod";
var router6 = express6.Router();
var studyGroups = /* @__PURE__ */ new Map();
var events2 = /* @__PURE__ */ new Map();
var userConnections = /* @__PURE__ */ new Map();
var messages = /* @__PURE__ */ new Map();
var StudyGroupSchema = z3.object({
  name: z3.string(),
  subject: z3.string(),
  description: z3.string(),
  maxMembers: z3.number(),
  meetingTime: z3.string(),
  meetingDays: z3.array(z3.string()),
  location: z3.string(),
  difficulty: z3.enum(["beginner", "intermediate", "advanced"]),
  tags: z3.array(z3.string()),
  createdBy: z3.string()
});
var EventSchema = z3.object({
  title: z3.string(),
  description: z3.string(),
  date: z3.string(),
  time: z3.string(),
  location: z3.string(),
  maxAttendees: z3.number().optional(),
  category: z3.enum(["academic", "social", "housing", "career", "wellness", "sports"]),
  tags: z3.array(z3.string()),
  organizer: z3.string(),
  isFree: z3.boolean(),
  price: z3.number().optional()
});
var MessageSchema = z3.object({
  senderId: z3.string(),
  receiverId: z3.string(),
  content: z3.string(),
  type: z3.enum(["text", "image", "file"]).default("text")
});
router6.get("/study-groups", async (req, res) => {
  try {
    const { subject, difficulty, search } = req.query;
    let filteredGroups = Array.from(studyGroups.values());
    if (subject && subject !== "all") {
      filteredGroups = filteredGroups.filter((group) => group.subject === subject);
    }
    if (difficulty && difficulty !== "all") {
      filteredGroups = filteredGroups.filter((group) => group.difficulty === difficulty);
    }
    if (search) {
      const searchLower = search.toString().toLowerCase();
      filteredGroups = filteredGroups.filter(
        (group) => group.name.toLowerCase().includes(searchLower) || group.description.toLowerCase().includes(searchLower) || group.subject.toLowerCase().includes(searchLower)
      );
    }
    const groupsWithStats = filteredGroups.map((group) => ({
      ...group,
      members: group.members?.length || 0,
      rating: group.ratings ? group.ratings.reduce((sum, rating) => sum + rating, 0) / group.ratings.length : 0
    }));
    res.json(groupsWithStats);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve study groups" });
  }
});
router6.post("/study-groups", async (req, res) => {
  try {
    const data = StudyGroupSchema.parse(req.body);
    const newGroup = {
      id: Date.now().toString(),
      ...data,
      members: [data.createdBy],
      ratings: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      isActive: true
    };
    studyGroups.set(newGroup.id, newGroup);
    res.json({ success: true, group: newGroup });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router6.post("/study-groups/:groupId/join", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const group = studyGroups.get(groupId);
    if (!group) {
      return res.status(404).json({ error: "Study group not found" });
    }
    if (group.members.includes(userId)) {
      return res.status(400).json({ error: "Already a member" });
    }
    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ error: "Group is full" });
    }
    group.members.push(userId);
    res.json({ success: true, message: "Joined study group" });
  } catch (error) {
    res.status(500).json({ error: "Failed to join study group" });
  }
});
router6.post("/study-groups/:groupId/rate", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, rating } = req.body;
    const group = studyGroups.get(groupId);
    if (!group) {
      return res.status(404).json({ error: "Study group not found" });
    }
    if (!group.members.includes(userId)) {
      return res.status(400).json({ error: "Must be a member to rate" });
    }
    if (!group.ratings) {
      group.ratings = [];
    }
    group.ratings.push(rating);
    res.json({ success: true, message: "Rating submitted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit rating" });
  }
});
router6.get("/events", async (req, res) => {
  try {
    const { category, date, search } = req.query;
    let filteredEvents = Array.from(events2.values());
    if (category && category !== "all") {
      filteredEvents = filteredEvents.filter((event) => event.category === category);
    }
    if (date) {
      const targetDate = new Date(date.toString());
      filteredEvents = filteredEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === targetDate.toDateString();
      });
    }
    if (search) {
      const searchLower = search.toString().toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) => event.title.toLowerCase().includes(searchLower) || event.description.toLowerCase().includes(searchLower) || event.organizer.toLowerCase().includes(searchLower)
      );
    }
    const eventsWithStats = filteredEvents.map((event) => ({
      ...event,
      attendees: event.attendees?.length || 0
    }));
    res.json(eventsWithStats);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve events" });
  }
});
router6.post("/events", async (req, res) => {
  try {
    const data = EventSchema.parse(req.body);
    const newEvent = {
      id: Date.now().toString(),
      ...data,
      attendees: [data.organizer],
      likes: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    events2.set(newEvent.id, newEvent);
    res.json({ success: true, event: newEvent });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router6.post("/events/:eventId/attend", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;
    const event = events2.get(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const isAttending = event.attendees.includes(userId);
    if (isAttending) {
      event.attendees = event.attendees.filter((id) => id !== userId);
    } else {
      if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
        return res.status(400).json({ error: "Event is full" });
      }
      event.attendees.push(userId);
    }
    res.json({
      success: true,
      message: isAttending ? "Removed from event" : "Added to event",
      isAttending: !isAttending
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update attendance" });
  }
});
router6.post("/events/:eventId/like", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;
    const event = events2.get(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const isLiked = event.likes.includes(userId);
    if (isLiked) {
      event.likes = event.likes.filter((id) => id !== userId);
    } else {
      event.likes.push(userId);
    }
    res.json({
      success: true,
      message: isLiked ? "Removed like" : "Added like",
      isLiked: !isLiked
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update like" });
  }
});
router6.get("/connections/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userConnectionsList = userConnections.get(userId) || [];
    res.json(userConnectionsList);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve connections" });
  }
});
router6.post("/connections", async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    if (!userConnections.has(userId)) {
      userConnections.set(userId, []);
    }
    if (!userConnections.has(targetUserId)) {
      userConnections.set(targetUserId, []);
    }
    const userConnectionsList = userConnections.get(userId);
    const targetConnectionsList = userConnections.get(targetUserId);
    if (userConnectionsList.includes(targetUserId)) {
      return res.status(400).json({ error: "Already connected" });
    }
    userConnectionsList.push(targetUserId);
    targetConnectionsList.push(userId);
    res.json({ success: true, message: "Connection established" });
  } catch (error) {
    res.status(500).json({ error: "Failed to establish connection" });
  }
});
router6.get("/messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { conversationId } = req.query;
    let userMessages = Array.from(messages.values()).filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId
    );
    if (conversationId) {
      userMessages = userMessages.filter(
        (msg) => msg.conversationId === conversationId
      );
    }
    const conversations = /* @__PURE__ */ new Map();
    userMessages.forEach((message) => {
      const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;
      const conversationKey = [userId, otherUserId].sort().join("-");
      if (!conversations.has(conversationKey)) {
        conversations.set(conversationKey, []);
      }
      conversations.get(conversationKey).push(message);
    });
    const conversationList = Array.from(conversations.entries()).map(([key, messages2]) => ({
      conversationId: key,
      messages: messages2.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    }));
    res.json(conversationList);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});
router6.post("/messages", async (req, res) => {
  try {
    const data = MessageSchema.parse(req.body);
    const newMessage = {
      id: Date.now().toString(),
      ...data,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      conversationId: [data.senderId, data.receiverId].sort().join("-")
    };
    messages.set(newMessage.id, newMessage);
    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});
router6.get("/roommates", async (req, res) => {
  try {
    const { year, dorm, sleepSchedule, studyHabits, minCompatibility } = req.query;
    const mockRoommates = [
      {
        id: "1",
        name: "Alex Johnson",
        age: 19,
        major: "Computer Science",
        year: "sophomore",
        dormPreference: "East Hall",
        budget: "$800-1000/month",
        lifestyle: {
          sleepSchedule: "early",
          studyHabits: "quiet",
          cleanliness: "very-clean",
          socialLevel: "moderate"
        },
        interests: ["Programming", "Gaming", "Music"],
        compatibility: 95,
        lastActive: (/* @__PURE__ */ new Date()).toISOString(),
        bio: "Looking for a quiet roommate who values cleanliness and study time."
      }
      // Add more mock roommates...
    ];
    let filteredRoommates = mockRoommates;
    if (year && year !== "all") {
      filteredRoommates = filteredRoommates.filter((roommate) => roommate.year === year);
    }
    if (dorm && dorm !== "all") {
      filteredRoommates = filteredRoommates.filter((roommate) => roommate.dormPreference === dorm);
    }
    if (sleepSchedule && sleepSchedule !== "all") {
      filteredRoommates = filteredRoommates.filter((roommate) => roommate.lifestyle.sleepSchedule === sleepSchedule);
    }
    if (studyHabits && studyHabits !== "all") {
      filteredRoommates = filteredRoommates.filter((roommate) => roommate.lifestyle.studyHabits === studyHabits);
    }
    if (minCompatibility) {
      const minComp = parseInt(minCompatibility.toString());
      filteredRoommates = filteredRoommates.filter((roommate) => roommate.compatibility >= minComp);
    }
    res.json(filteredRoommates);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve roommates" });
  }
});
var social_default = router6;

// server/index.ts
var app2 = express7();
app2.use(express7.json());
app2.use(express7.urlencoded({ extended: false }));
app2.use(cors());
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
  app2.use("/api/verification", verification_default);
  app2.use("/api/posts", posts_default);
  app2.use("/api/analytics", analytics_default);
  app2.use("/api/achievements", achievements_default);
  app2.use("/api/social", social_default);
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
