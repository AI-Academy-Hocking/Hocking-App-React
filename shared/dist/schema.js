import { pgTable, text, serial, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
// User schema
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    name: text("name").notNull(),
    isGuest: boolean("is_guest").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    lastLogin: timestamp("last_login"),
    location: text("location"),
    isSharingLocation: boolean("is_sharing_location").notNull().default(false),
});
export const insertUserSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true,
    lastLogin: true,
});
// Events schema
export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    location: text("location").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isRecurring: boolean("is_recurring").notNull().default(false),
    recurrencePattern: text("recurrence_pattern"),
});
export const insertEventSchema = createInsertSchema(events).omit({
    id: true,
    createdAt: true,
});
// Buildings schema
export const buildings = pgTable("buildings", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    location: text("location").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isOpen: boolean("is_open").notNull().default(true),
    openHours: text("open_hours"),
    contactInfo: text("contact_info"),
});
export const insertBuildingSchema = createInsertSchema(buildings).omit({
    id: true,
    createdAt: true,
});
// Student Tools schema
export const studentTools = pgTable("student_tools", {
    id: varchar("id", { length: 50 }).primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    url: text("url").notNull(),
    category: text("category").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isActive: boolean("is_active").notNull().default(true),
});
export const insertStudentToolSchema = createInsertSchema(studentTools).omit({
    createdAt: true,
});
// Safety Alerts schema
export const safetyAlerts = pgTable("safety_alerts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    severity: text("severity").notNull(),
    location: text("location").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isActive: boolean("is_active").notNull().default(true),
    expiresAt: timestamp("expires_at"),
});
export const insertSafetyAlertSchema = createInsertSchema(safetyAlerts).omit({
    id: true,
    createdAt: true,
});
// Safety Resources schema
export const safetyResources = pgTable("safety_resources", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    category: text("category").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isActive: boolean("is_active").notNull().default(true),
});
export const insertSafetyResourceSchema = createInsertSchema(safetyResources).omit({
    id: true,
    createdAt: true,
});
// Location update schema
export const locationUpdateSchema = createInsertSchema(users).pick({
    location: true,
    isSharingLocation: true,
});
