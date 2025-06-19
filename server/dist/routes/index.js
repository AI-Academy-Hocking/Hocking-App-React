"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const http_1 = require("http");
const ws_1 = require("ws");
const storage_1 = require("../storage");
const calendar_1 = __importDefault(require("./calendar"));
const schema_1 = require("@shared/schema");
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const zod_2 = require("zod");
// Define the location update schema here since we can't import it directly
const locationUpdateSchema = zod_2.z.object({
    lat: zod_2.z.number(),
    lng: zod_2.z.number(),
    isLocationShared: zod_2.z.boolean().optional(),
});
async function registerRoutes(app) {
    // Create HTTP server
    const httpServer = (0, http_1.createServer)(app);
    // Set up WebSocket server for real-time location updates
    const wss = new ws_1.WebSocketServer({ server: httpServer, path: "/ws" });
    // Store connected clients
    const clients = new Set();
    // Handle WebSocket connections
    wss.on("connection", (ws) => {
        console.log("WebSocket client connected");
        clients.add(ws);
        ws.on("message", async (message) => {
            try {
                // Parse and process location updates from clients if needed
                console.log("Received message:", message.toString());
            }
            catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        });
        ws.on("close", () => {
            console.log("WebSocket client disconnected");
            clients.delete(ws);
        });
    });
    // Function to broadcast location updates to all connected clients
    async function broadcastLocationUpdate() {
        const sharedLocations = await storage_1.storage.getSharedLocations();
        const message = JSON.stringify({
            type: 'location_update',
            locations: sharedLocations.map(user => ({
                id: user.id,
                lat: user.lat,
                lng: user.lng,
                isLocationShared: user.isLocationShared
            }))
        });
        clients.forEach(client => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
    // Register calendar routes
    app.use("/api/calendar", calendar_1.default);
    // Auth routes
    app.post("/api/auth/login", async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res
                    .status(400)
                    .json({ message: "Username and password are required" });
            }
            // For development, create a mock user with the provided credentials
            const mockUser = {
                id: 1,
                username,
                name: username,
                isGuest: false,
            };
            res.status(200).json(mockUser);
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/auth/register", async (req, res) => {
        try {
            const userData = schema_1.insertUserSchema.parse(req.body);
            // Check if username already exists
            const existingUser = await storage_1.storage.getUserByUsername(userData.username);
            if (existingUser) {
                return res.status(409).json({ message: "Username already exists" });
            }
            const newUser = await storage_1.storage.createUser(userData);
            // Don't send password in response
            const { password, ...userWithoutPassword } = newUser;
            res.status(201).json(userWithoutPassword);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Registration error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Events routes
    app.get("/api/events", async (req, res) => {
        try {
            const events = await storage_1.storage.getEvents();
            res.status(200).json(events);
        }
        catch (error) {
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "Failed to fetch events" });
        }
    });
    app.get("/api/events/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid event ID" });
            }
            const event = await storage_1.storage.getEvent(id);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(event);
        }
        catch (error) {
            console.error("Error fetching event:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/events", async (req, res) => {
        try {
            const eventData = schema_1.insertEventSchema.parse(req.body);
            const newEvent = await storage_1.storage.createEvent(eventData);
            res.status(201).json(newEvent);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error creating event:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Buildings routes
    app.get("/api/buildings", async (_req, res) => {
        try {
            const buildings = await storage_1.storage.getBuildings();
            res.status(200).json(buildings);
        }
        catch (error) {
            console.error("Error fetching buildings:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.get("/api/buildings/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid building ID" });
            }
            const building = await storage_1.storage.getBuilding(id);
            if (!building) {
                return res.status(404).json({ message: "Building not found" });
            }
            res.status(200).json(building);
        }
        catch (error) {
            console.error("Error fetching building:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/buildings", async (req, res) => {
        try {
            const buildingData = schema_1.insertBuildingSchema.parse(req.body);
            const newBuilding = await storage_1.storage.createBuilding(buildingData);
            res.status(201).json(newBuilding);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error creating building:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Student Tools routes
    app.get("/api/student-tools", async (_req, res) => {
        try {
            const tools = await storage_1.storage.getStudentTools();
            res.status(200).json(tools);
        }
        catch (error) {
            console.error("Error fetching student tools:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.get("/api/student-tools/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const tool = await storage_1.storage.getStudentTool(id);
            if (!tool) {
                return res.status(404).json({ message: "Student tool not found" });
            }
            res.status(200).json(tool);
        }
        catch (error) {
            console.error("Error fetching student tool:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/student-tools", async (req, res) => {
        try {
            const toolData = schema_1.insertStudentToolSchema.parse(req.body);
            // Check if tool ID already exists
            const existingTool = await storage_1.storage.getStudentTool(toolData.id);
            if (existingTool) {
                return res
                    .status(409)
                    .json({ message: "Student tool ID already exists" });
            }
            const newTool = await storage_1.storage.createStudentTool(toolData);
            res.status(201).json(newTool);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error creating student tool:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Location API routes
    app.post("/api/users/:id/location", async (req, res) => {
        try {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            const locationData = locationUpdateSchema.parse(req.body);
            const updatedUser = await storage_1.storage.updateUserLocation(userId, {
                lat: locationData.lat,
                lng: locationData.lng,
                isLocationShared: locationData.isLocationShared
            });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            // Broadcast location update to all connected clients
            broadcastLocationUpdate();
            // Don't send password in response
            const { password, ...userWithoutPassword } = updatedUser;
            res.status(200).json(userWithoutPassword);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error updating user location:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.get("/api/locations/shared", async (_req, res) => {
        try {
            const sharedLocations = await storage_1.storage.getSharedLocations();
            // Don't send passwords in response
            const locationsWithoutPasswords = sharedLocations.map((user) => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            res.status(200).json(locationsWithoutPasswords);
        }
        catch (error) {
            console.error("Error fetching shared locations:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Discussion routes
    app.get("/api/discussions", async (req, res) => {
        try {
            const category = req.query.category;
            let discussions;
            if (category && category !== "all") {
                discussions = await storage_1.storage.getDiscussionsByCategory(category);
            }
            else {
                discussions = await storage_1.storage.getDiscussions();
            }
            // Fetch author info for each discussion
            const discussionsWithAuthor = await Promise.all(discussions.map(async (discussion) => {
                const author = await storage_1.storage.getUser(discussion.authorId);
                let authorInfo = { id: discussion.authorId, username: "Unknown" };
                if (author) {
                    const { password, ...userWithoutPassword } = author;
                    authorInfo = { ...userWithoutPassword };
                }
                const comments = await storage_1.storage.getComments(discussion.id);
                const commentCount = comments ? comments.length : 0;
                return { ...discussion, author: authorInfo, commentCount };
            }));
            res.status(200).json(discussionsWithAuthor);
        }
        catch (error) {
            console.error("Error fetching discussions:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.get("/api/discussions/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid discussion ID" });
            }
            const discussion = await storage_1.storage.getDiscussion(id);
            if (!discussion) {
                return res.status(404).json({ message: "Discussion not found" });
            }
            // Get author info
            const author = await storage_1.storage.getUser(discussion.authorId);
            let authorInfo = { id: discussion.authorId, username: "Unknown" };
            if (author) {
                const { password, ...userWithoutPassword } = author;
                authorInfo = { ...userWithoutPassword };
            }
            res.status(200).json({ ...discussion, author: authorInfo });
        }
        catch (error) {
            console.error("Error fetching discussion:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/discussions", async (req, res) => {
        try {
            const discussionData = schema_1.insertDiscussionSchema.parse(req.body);
            const newDiscussion = await storage_1.storage.createDiscussion(discussionData);
            // Get author info
            const author = await storage_1.storage.getUser(newDiscussion.authorId);
            let authorInfo = { id: newDiscussion.authorId, username: "Unknown" };
            if (author) {
                const { password, ...userWithoutPassword } = author;
                authorInfo = { ...userWithoutPassword };
            }
            res.status(201).json({ ...newDiscussion, author: authorInfo });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error creating discussion:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Comment routes
    // Get all comments for a user
    app.get("/api/comments", async (req, res) => {
        try {
            const comments = await storage_1.storage.getAllComments();
            const commentsWithDetails = await Promise.all(comments.map(async (comment) => {
                const author = await storage_1.storage.getUser(comment.authorId);
                let authorInfo = { id: comment.authorId, username: "Unknown" };
                if (author) {
                    const { password, ...userWithoutPassword } = author;
                    authorInfo = { ...userWithoutPassword };
                }
                const discussion = await storage_1.storage.getDiscussion(comment.discussionId);
                return {
                    ...comment,
                    author: authorInfo,
                    discussionTitle: discussion?.title || "Unknown Discussion",
                };
            }));
            res.status(200).json(commentsWithDetails);
        }
        catch (error) {
            console.error("Error fetching all comments:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.get("/api/discussions/:id/comments", async (req, res) => {
        try {
            const discussionId = parseInt(req.params.id);
            if (isNaN(discussionId)) {
                return res.status(400).json({ message: "Invalid discussion ID" });
            }
            // Get top-level comments for the discussion
            const comments = await storage_1.storage.getComments(discussionId);
            // Fetch author info and replies for each comment
            const commentsWithDetails = await Promise.all(comments.map(async (comment) => {
                // Get author info
                const author = await storage_1.storage.getUser(comment.authorId);
                let authorInfo = { id: comment.authorId, username: "Unknown" };
                if (author) {
                    const { password, ...userWithoutPassword } = author;
                    authorInfo = { ...userWithoutPassword };
                }
                // Get replies
                const replies = await storage_1.storage.getCommentReplies(comment.id);
                // Get author info for each reply
                const repliesWithAuthor = await Promise.all(replies.map(async (reply) => {
                    const replyAuthor = reply.authorId ? await storage_1.storage.getUser(reply.authorId) : null;
                    let replyAuthorInfo = { id: reply.authorId ?? 0, username: "Unknown" };
                    if (replyAuthor) {
                        const { password, ...userWithoutPassword } = replyAuthor;
                        replyAuthorInfo = { ...userWithoutPassword };
                    }
                    return { ...reply, author: replyAuthorInfo };
                }));
                return {
                    ...comment,
                    author: authorInfo,
                    replies: repliesWithAuthor,
                };
            }));
            res.status(200).json(commentsWithDetails);
        }
        catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/discussions/:id/comments", async (req, res) => {
        try {
            const discussionId = parseInt(req.params.id);
            if (isNaN(discussionId)) {
                return res.status(400).json({ message: "Invalid discussion ID" });
            }
            const commentData = schema_1.insertCommentSchema.parse({
                ...req.body,
                discussionId,
            });
            const newComment = await storage_1.storage.createComment(commentData);
            // Get author info
            const author = await storage_1.storage.getUser(newComment.authorId);
            let authorInfo = { id: newComment.authorId, username: "Unknown" };
            if (author) {
                const { password, ...userWithoutPassword } = author;
                authorInfo = { ...userWithoutPassword };
            }
            res
                .status(201)
                .json({ ...newComment, author: authorInfo, replies: [] });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error creating comment:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Safety Alert routes
    app.get("/api/safety/alerts", async (req, res) => {
        try {
            const activeOnly = req.query.active === "true";
            const alerts = activeOnly
                ? await storage_1.storage.getActiveSafetyAlerts()
                : await storage_1.storage.getSafetyAlerts();
            res.status(200).json(alerts);
        }
        catch (error) {
            console.error("Error fetching safety alerts:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.get("/api/safety/alerts/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid alert ID" });
            }
            const alert = await storage_1.storage.getSafetyAlert(id);
            if (!alert) {
                return res.status(404).json({ message: "Safety alert not found" });
            }
            res.status(200).json(alert);
        }
        catch (error) {
            console.error("Error fetching safety alert:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/safety/alerts", async (req, res) => {
        try {
            const alertData = schema_1.insertSafetyAlertSchema.parse(req.body);
            const newAlert = await storage_1.storage.createSafetyAlert(alertData);
            res.status(201).json(newAlert);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error creating safety alert:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    // Safety Resource routes
    app.get("/api/safety/resources", async (req, res) => {
        try {
            const category = req.query.category;
            const resources = category
                ? await storage_1.storage.getSafetyResourcesByCategory(category)
                : await storage_1.storage.getSafetyResources();
            res.status(200).json(resources);
        }
        catch (error) {
            console.error("Error fetching safety resources:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.get("/api/safety/resources/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid resource ID" });
            }
            const resource = await storage_1.storage.getSafetyResource(id);
            if (!resource) {
                return res.status(404).json({ message: "Safety resource not found" });
            }
            res.status(200).json(resource);
        }
        catch (error) {
            console.error("Error fetching safety resource:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    app.post("/api/safety/resources", async (req, res) => {
        try {
            const resourceData = schema_1.insertSafetyResourceSchema.parse(req.body);
            const newResource = await storage_1.storage.createSafetyResource(resourceData);
            res.status(201).json(newResource);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const validationError = (0, zod_validation_error_1.fromZodError)(error);
                return res.status(400).json({ message: validationError.message });
            }
            console.error("Error creating safety resource:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    return httpServer;
}
