import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./src/storage";
import { 
  insertUserSchema, insertEventSchema, insertBuildingSchema, 
  insertStudentToolSchema, locationUpdateSchema, 
  insertSafetyAlertSchema, insertSafetyResourceSchema
} from "../shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // For development, create a mock user with the provided credentials
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
  
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Don't send password in response
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
  
  // Events routes
  app.get("/api/events", async (_req: Request, res: Response) => {
    try {
      const events = await storage.getEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/events/:id", async (req: Request, res: Response) => {
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
  
  app.post("/api/events", async (req: Request, res: Response) => {
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
  
  // Buildings routes
  app.get("/api/buildings", async (_req: Request, res: Response) => {
    try {
      const buildings = await storage.getBuildings();
      res.status(200).json(buildings);
    } catch (error) {
      console.error("Error fetching buildings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/buildings/:id", async (req: Request, res: Response) => {
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
  
  app.post("/api/buildings", async (req: Request, res: Response) => {
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
  
  // Student Tools routes
  app.get("/api/student-tools", async (_req: Request, res: Response) => {
    try {
      const tools = await storage.getStudentTools();
      res.status(200).json(tools);
    } catch (error) {
      console.error("Error fetching student tools:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/student-tools/:id", async (req: Request, res: Response) => {
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
  
  app.post("/api/student-tools", async (req: Request, res: Response) => {
    try {
      const toolData = insertStudentToolSchema.parse(req.body);
      
      // Check if tool ID already exists
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

  // Location API routes
  app.post("/api/users/:id/location", async (req: Request, res: Response) => {
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
      
      // Broadcast location update to all connected clients
      broadcastLocationUpdate();
      
      // Don't send password in response
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
  
  app.get("/api/locations/shared", async (_req: Request, res: Response) => {
    try {
      const sharedLocations = await storage.getSharedLocations();
      
      // Don't send passwords in response
      const locationsWithoutPasswords = sharedLocations.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.status(200).json(locationsWithoutPasswords);
    } catch (error) {
      console.error("Error fetching shared locations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Safety Alert routes
  app.get("/api/safety/alerts", async (req: Request, res: Response) => {
    try {
      const activeOnly = req.query.active === "true";
      const alerts = activeOnly 
        ? await storage.getActiveSafetyAlerts() 
        : await storage.getSafetyAlerts();
      
      res.status(200).json(alerts);
    } catch (error) {
      console.error("Error fetching safety alerts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/safety/alerts/:id", async (req: Request, res: Response) => {
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
  
  app.post("/api/safety/alerts", async (req: Request, res: Response) => {
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
  
  // Safety Resource routes
  app.get("/api/safety/resources", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const resources = category 
        ? await storage.getSafetyResourcesByCategory(category) 
        : await storage.getSafetyResources();
      
      res.status(200).json(resources);
    } catch (error) {
      console.error("Error fetching safety resources:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/safety/resources/:id", async (req: Request, res: Response) => {
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
  
  app.post("/api/safety/resources", async (req: Request, res: Response) => {
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

  // Create HTTP server
  const httpServer = createServer(app);
  
  // Set up WebSocket server for real-time location updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (socket) => {
    console.log('WebSocket client connected');
    
    socket.on('message', async (message) => {
      try {
        // Parse and process location updates from clients if needed
        console.log('Received message:', message.toString());
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });
    
    socket.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
  
  // Broadcast location updates to all connected clients
  async function broadcastLocationUpdate() {
    const sharedLocations = await storage.getSharedLocations();
    
    // Remove sensitive info like passwords
    const sanitizedLocations = sharedLocations.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    // Broadcast to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'location_update',
          data: sanitizedLocations
        }));
      }
    });
  }
  
  return httpServer;
}
