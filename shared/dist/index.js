import { pgTable, serial, text, timestamp, boolean, integer, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
// User schema
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),
    name: text('name'),
    email: text('email'),
    isGuest: boolean('is_guest'),
    lat: text('lat'),
    lng: text('lng'),
    isLocationShared: boolean('is_location_shared').default(false),
    lastLocationUpdate: timestamp('last_location_update')
});
// Event schema
export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    date: text('date').notNull(),
    time: text('time').notNull(),
    location: text('location').notNull()
});
// Building schema
export const buildings = pgTable('buildings', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    category: text('category').notNull(),
    lat: text('lat').notNull(),
    lng: text('lng').notNull()
});
// Student Tool schema
export const studentTools = pgTable('student_tools', {
    id: varchar('id', { length: 50 }).primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    category: text('category').notNull(),
    url: text('url').notNull()
});
// Discussion schema
export const discussions = pgTable('discussions', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    authorId: integer('author_id').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    isPinned: boolean('is_pinned').default(false),
    category: text('category').default('general')
});
// Comment schema (fixed circular reference)
// @ts-expect-error drizzle-orm callback form
export const comments = pgTable('comments', (table) => ({
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    authorId: integer('author_id').references(() => users.id),
    discussionId: integer('discussion_id').references(() => discussions.id),
    parentId: integer('parent_id').references(() => table.id),
    createdAt: timestamp('created_at').defaultNow()
}));
// Safety Alert schema
export const safetyAlerts = pgTable('safety_alerts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    severity: text('severity').notNull(),
    startDate: timestamp('start_date').defaultNow(),
    endDate: timestamp('end_date'),
    isActive: boolean('is_active').default(true),
    location: text('location')
});
// Safety Resource schema
export const safetyResources = pgTable('safety_resources', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    category: text('category').notNull(),
    phoneNumber: text('phone_number'),
    url: text('url'),
    icon: text('icon'),
    order: integer('order').default(0)
});
// Zod schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertEventSchema = createInsertSchema(events);
export const selectEventSchema = createSelectSchema(events);
export const insertBuildingSchema = createInsertSchema(buildings);
export const selectBuildingSchema = createSelectSchema(buildings);
export const insertStudentToolSchema = createInsertSchema(studentTools);
export const selectStudentToolSchema = createSelectSchema(studentTools);
export const insertDiscussionSchema = createInsertSchema(discussions);
export const selectDiscussionSchema = createSelectSchema(discussions);
export const insertCommentSchema = createInsertSchema(comments);
export const selectCommentSchema = createSelectSchema(comments);
export const insertSafetyAlertSchema = createInsertSchema(safetyAlerts);
export const selectSafetyAlertSchema = createSelectSchema(safetyAlerts);
export const insertSafetyResourceSchema = createInsertSchema(safetyResources);
export const selectSafetyResourceSchema = createSelectSchema(safetyResources);
