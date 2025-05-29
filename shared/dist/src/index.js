"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSafetyResourceSchema = exports.insertSafetyResourceSchema = exports.selectSafetyAlertSchema = exports.insertSafetyAlertSchema = exports.selectCommentSchema = exports.insertCommentSchema = exports.selectDiscussionSchema = exports.insertDiscussionSchema = exports.selectStudentToolSchema = exports.insertStudentToolSchema = exports.selectBuildingSchema = exports.insertBuildingSchema = exports.selectEventSchema = exports.insertEventSchema = exports.selectUserSchema = exports.insertUserSchema = exports.safetyResources = exports.safetyAlerts = exports.comments = exports.discussions = exports.studentTools = exports.buildings = exports.events = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
// User schema
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    username: (0, pg_core_1.text)('username').notNull().unique(),
    password: (0, pg_core_1.text)('password').notNull(),
    name: (0, pg_core_1.text)('name'),
    email: (0, pg_core_1.text)('email'),
    isGuest: (0, pg_core_1.boolean)('is_guest'),
    lat: (0, pg_core_1.text)('lat'),
    lng: (0, pg_core_1.text)('lng'),
    isLocationShared: (0, pg_core_1.boolean)('is_location_shared').default(false),
    lastLocationUpdate: (0, pg_core_1.timestamp)('last_location_update')
});
// Event schema
exports.events = (0, pg_core_1.pgTable)('events', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    date: (0, pg_core_1.text)('date').notNull(),
    time: (0, pg_core_1.text)('time').notNull(),
    location: (0, pg_core_1.text)('location').notNull()
});
// Building schema
exports.buildings = (0, pg_core_1.pgTable)('buildings', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    category: (0, pg_core_1.text)('category').notNull(),
    lat: (0, pg_core_1.text)('lat').notNull(),
    lng: (0, pg_core_1.text)('lng').notNull()
});
// Student Tool schema
exports.studentTools = (0, pg_core_1.pgTable)('student_tools', {
    id: (0, pg_core_1.varchar)('id', { length: 50 }).primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    category: (0, pg_core_1.text)('category').notNull(),
    url: (0, pg_core_1.text)('url').notNull()
});
// Discussion schema
exports.discussions = (0, pg_core_1.pgTable)('discussions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    authorId: (0, pg_core_1.integer)('author_id').references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    isPinned: (0, pg_core_1.boolean)('is_pinned').default(false),
    category: (0, pg_core_1.text)('category').default('general')
});
// Comment schema (fixed circular reference)
exports.comments = (0, pg_core_1.pgTable)('comments', (table) => ({
    id: (0, pg_core_1.serial)('id').primaryKey(),
    content: (0, pg_core_1.text)('content').notNull(),
    authorId: (0, pg_core_1.integer)('author_id').references(() => exports.users.id),
    discussionId: (0, pg_core_1.integer)('discussion_id').references(() => exports.discussions.id),
    parentId: (0, pg_core_1.integer)('parent_id').references(() => table.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow()
}));
// Safety Alert schema
exports.safetyAlerts = (0, pg_core_1.pgTable)('safety_alerts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    severity: (0, pg_core_1.text)('severity').notNull(),
    startDate: (0, pg_core_1.timestamp)('start_date').defaultNow(),
    endDate: (0, pg_core_1.timestamp)('end_date'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    location: (0, pg_core_1.text)('location')
});
// Safety Resource schema
exports.safetyResources = (0, pg_core_1.pgTable)('safety_resources', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    category: (0, pg_core_1.text)('category').notNull(),
    phoneNumber: (0, pg_core_1.text)('phone_number'),
    url: (0, pg_core_1.text)('url'),
    icon: (0, pg_core_1.text)('icon'),
    order: (0, pg_core_1.integer)('order').default(0)
});
// Zod schemas
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users);
exports.selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users);
exports.insertEventSchema = (0, drizzle_zod_1.createInsertSchema)(exports.events);
exports.selectEventSchema = (0, drizzle_zod_1.createSelectSchema)(exports.events);
exports.insertBuildingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.buildings);
exports.selectBuildingSchema = (0, drizzle_zod_1.createSelectSchema)(exports.buildings);
exports.insertStudentToolSchema = (0, drizzle_zod_1.createInsertSchema)(exports.studentTools);
exports.selectStudentToolSchema = (0, drizzle_zod_1.createSelectSchema)(exports.studentTools);
exports.insertDiscussionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.discussions);
exports.selectDiscussionSchema = (0, drizzle_zod_1.createSelectSchema)(exports.discussions);
exports.insertCommentSchema = (0, drizzle_zod_1.createInsertSchema)(exports.comments);
exports.selectCommentSchema = (0, drizzle_zod_1.createSelectSchema)(exports.comments);
exports.insertSafetyAlertSchema = (0, drizzle_zod_1.createInsertSchema)(exports.safetyAlerts);
exports.selectSafetyAlertSchema = (0, drizzle_zod_1.createSelectSchema)(exports.safetyAlerts);
exports.insertSafetyResourceSchema = (0, drizzle_zod_1.createInsertSchema)(exports.safetyResources);
exports.selectSafetyResourceSchema = (0, drizzle_zod_1.createSelectSchema)(exports.safetyResources);
