"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSafetyResourceSchema = exports.safetyResources = exports.insertSafetyAlertSchema = exports.safetyAlerts = exports.locationUpdateSchema = exports.insertCommentSchema = exports.comments = exports.insertDiscussionSchema = exports.discussions = exports.insertStudentToolSchema = exports.studentTools = exports.insertBuildingSchema = exports.buildings = exports.insertEventSchema = exports.events = exports.insertUserSchema = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var zod_1 = require("zod");
// User schema
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    isGuest: (0, pg_core_1.boolean)("is_guest").default(false),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email"),
    // Location fields for user on campus map
    lat: (0, pg_core_1.doublePrecision)("lat"),
    lng: (0, pg_core_1.doublePrecision)("lng"),
    isLocationShared: (0, pg_core_1.boolean)("is_location_shared").default(false),
    lastLocationUpdate: (0, pg_core_1.timestamp)("last_location_update"),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).omit({
    id: true,
});
// Events schema
exports.events = (0, pg_core_1.pgTable)("events", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    date: (0, pg_core_1.text)("date").notNull(), // YYYY-MM-DD format
    time: (0, pg_core_1.text)("time").notNull(), // HH:MM AM/PM - HH:MM AM/PM format
    location: (0, pg_core_1.text)("location").notNull(),
});
exports.insertEventSchema = (0, drizzle_zod_1.createInsertSchema)(exports.events).omit({
    id: true,
});
// Buildings schema
exports.buildings = (0, pg_core_1.pgTable)("buildings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.text)("category").notNull(), // academic, housing, dining, parking
    lat: (0, pg_core_1.doublePrecision)("lat").notNull(),
    lng: (0, pg_core_1.doublePrecision)("lng").notNull(),
});
exports.insertBuildingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.buildings).omit({
    id: true,
});
// Student Tools schema
exports.studentTools = (0, pg_core_1.pgTable)("student_tools", {
    id: (0, pg_core_1.text)("id").primaryKey(), // e.g., course-schedule, grades
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.text)("category").notNull(), // academic, financial, resources
    url: (0, pg_core_1.text)("url").notNull(),
});
exports.insertStudentToolSchema = (0, drizzle_zod_1.createInsertSchema)(exports.studentTools);
// Discussions schema
exports.discussions = (0, pg_core_1.pgTable)("discussions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    authorId: (0, pg_core_1.integer)("author_id").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    category: (0, pg_core_1.text)("category").default("general"), // general, academic, social, etc.
    isPinned: (0, pg_core_1.boolean)("is_pinned").default(false),
});
exports.insertDiscussionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.discussions).omit({
    id: true,
    createdAt: true,
});
// Comments schema
exports.comments = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    content: (0, pg_core_1.text)("content").notNull(),
    authorId: (0, pg_core_1.integer)("author_id").notNull(),
    discussionId: (0, pg_core_1.integer)("discussion_id").notNull(),
    parentId: (0, pg_core_1.integer)("parent_id"), // For nested replies, null means top-level comment
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.insertCommentSchema = (0, drizzle_zod_1.createInsertSchema)(exports.comments).omit({
    id: true,
    createdAt: true,
});
// Location update schema
exports.locationUpdateSchema = zod_1.z.object({
    lat: zod_1.z.number(),
    lng: zod_1.z.number(),
    isLocationShared: zod_1.z.boolean().optional(),
});
// Safety Alerts schema
exports.safetyAlerts = (0, pg_core_1.pgTable)("safety_alerts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    severity: (0, pg_core_1.text)("severity").notNull(), // critical, warning, info
    startDate: (0, pg_core_1.timestamp)("start_date").defaultNow().notNull(),
    endDate: (0, pg_core_1.timestamp)("end_date"), // null means indefinite
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    location: (0, pg_core_1.text)("location"), // Optional affected location
});
exports.insertSafetyAlertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.safetyAlerts).omit({
    id: true,
});
// Safety Resources schema
exports.safetyResources = (0, pg_core_1.pgTable)("safety_resources", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.text)("category").notNull(), // emergency, health, security, weather, contact
    phoneNumber: (0, pg_core_1.text)("phone_number"),
    url: (0, pg_core_1.text)("url"),
    icon: (0, pg_core_1.text)("icon"), // Icon name for UI
    order: (0, pg_core_1.integer)("order").default(0), // For sorting
});
exports.insertSafetyResourceSchema = (0, drizzle_zod_1.createInsertSchema)(exports.safetyResources).omit({
    id: true,
});
