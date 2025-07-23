"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationUpdateSchema = exports.insertSafetyResourceSchema = exports.safetyResources = exports.insertSafetyAlertSchema = exports.safetyAlerts = exports.insertStudentToolSchema = exports.studentTools = exports.insertBuildingSchema = exports.buildings = exports.insertEventSchema = exports.events = exports.insertUserSchema = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
// User schema
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    isGuest: (0, pg_core_1.boolean)("is_guest").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    lastLogin: (0, pg_core_1.timestamp)("last_login"),
    location: (0, pg_core_1.text)("location"),
    isSharingLocation: (0, pg_core_1.boolean)("is_sharing_location").notNull().default(false),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).omit({
    id: true,
    createdAt: true,
    lastLogin: true,
});
// Events schema
exports.events = (0, pg_core_1.pgTable)("events", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    startTime: (0, pg_core_1.timestamp)("start_time").notNull(),
    endTime: (0, pg_core_1.timestamp)("end_time").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    isRecurring: (0, pg_core_1.boolean)("is_recurring").notNull().default(false),
    recurrencePattern: (0, pg_core_1.text)("recurrence_pattern"),
});
exports.insertEventSchema = (0, drizzle_zod_1.createInsertSchema)(exports.events).omit({
    id: true,
    createdAt: true,
});
// Buildings schema
exports.buildings = (0, pg_core_1.pgTable)("buildings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    isOpen: (0, pg_core_1.boolean)("is_open").notNull().default(true),
    openHours: (0, pg_core_1.text)("open_hours"),
    contactInfo: (0, pg_core_1.text)("contact_info"),
});
exports.insertBuildingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.buildings).omit({
    id: true,
    createdAt: true,
});
// Student Tools schema
exports.studentTools = (0, pg_core_1.pgTable)("student_tools", {
    id: (0, pg_core_1.varchar)("id", { length: 50 }).primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    url: (0, pg_core_1.text)("url").notNull(),
    category: (0, pg_core_1.text)("category").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
});
exports.insertStudentToolSchema = (0, drizzle_zod_1.createInsertSchema)(exports.studentTools).omit({
    createdAt: true,
});
// Safety Alerts schema
exports.safetyAlerts = (0, pg_core_1.pgTable)("safety_alerts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    severity: (0, pg_core_1.text)("severity").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
    expiresAt: (0, pg_core_1.timestamp)("expires_at"),
});
exports.insertSafetyAlertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.safetyAlerts).omit({
    id: true,
    createdAt: true,
});
// Safety Resources schema
exports.safetyResources = (0, pg_core_1.pgTable)("safety_resources", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.text)("category").notNull(),
    url: (0, pg_core_1.text)("url").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
});
exports.insertSafetyResourceSchema = (0, drizzle_zod_1.createInsertSchema)(exports.safetyResources).omit({
    id: true,
    createdAt: true,
});
// Location update schema
exports.locationUpdateSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    location: true,
    isSharingLocation: true,
});
