import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isGuest: boolean("is_guest").default(false),
  name: text("name"),
  email: text("email"),
  // Location fields for user on campus map
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  isLocationShared: boolean("is_location_shared").default(false),
  lastLocationUpdate: timestamp("last_location_update"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Events schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: text("date").notNull(),  // YYYY-MM-DD format
  time: text("time").notNull(),  // HH:MM AM/PM - HH:MM AM/PM format
  location: text("location").notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

// Buildings schema
export const buildings = pgTable("buildings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // academic, housing, dining, parking
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
});

export const insertBuildingSchema = createInsertSchema(buildings).omit({
  id: true,
});

// Student Tools schema
export const studentTools = pgTable("student_tools", {
  id: text("id").primaryKey(), // e.g., course-schedule, grades
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // academic, financial, resources
  url: text("url").notNull(),
});

export const insertStudentToolSchema = createInsertSchema(studentTools);

// Comments schema
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  discussionId: integer("discussion_id").notNull(),
  parentId: integer("parent_id"), // For nested replies, null means top-level comment
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Building = typeof buildings.$inferSelect;
export type InsertBuilding = z.infer<typeof insertBuildingSchema>;

export type StudentTool = typeof studentTools.$inferSelect;
export type InsertStudentTool = z.infer<typeof insertStudentToolSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

// Location update schema
export const locationUpdateSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  isLocationShared: z.boolean().optional(),
});

export type LocationUpdate = z.infer<typeof locationUpdateSchema>;

// Safety Alerts schema
export const safetyAlerts = pgTable("safety_alerts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  severity: text("severity").notNull(), // critical, warning, info
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"), // null means indefinite
  isActive: boolean("is_active").default(true),
  location: text("location"), // Optional affected location
});

export const insertSafetyAlertSchema = createInsertSchema(safetyAlerts).omit({
  id: true,
});

// Safety Resources schema
export const safetyResources = pgTable("safety_resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // emergency, health, security, weather, contact
  phoneNumber: text("phone_number"),
  url: text("url"),
  icon: text("icon"), // Icon name for UI
  order: integer("order").default(0), // For sorting
});

export const insertSafetyResourceSchema = createInsertSchema(safetyResources).omit({
  id: true,
});

export type SafetyAlert = typeof safetyAlerts.$inferSelect;
export type InsertSafetyAlert = z.infer<typeof insertSafetyAlertSchema>;

export type SafetyResource = typeof safetyResources.$inferSelect;
export type InsertSafetyResource = z.infer<typeof insertSafetyResourceSchema>;
