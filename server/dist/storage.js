"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
class MemStorage {
    constructor() {
        this.users = new Map();
        this.events = new Map();
        this.buildings = new Map();
        this.studentTools = new Map();
        this.safetyAlerts = new Map();
        this.safetyResources = new Map();
        this.currentUserId = 1;
        this.currentEventId = 1;
        this.currentBuildingId = 1;
        this.currentSafetyAlertId = 1;
        this.currentSafetyResourceId = 1;
        // Initialize with sample data
        this.initializeSampleData();
    }
    // User operations
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        return Array.from(this.users.values()).find(user => user.username === username);
    }
    async createUser(insertUser) {
        const id = this.currentUserId++;
        const user = {
            id,
            username: insertUser.username,
            password: insertUser.password,
            name: insertUser.name,
            isGuest: insertUser.isGuest ?? false,
            createdAt: new Date(),
            lastLogin: null,
            location: insertUser.location ?? null,
            isSharingLocation: insertUser.isSharingLocation ?? false
        };
        this.users.set(id, user);
        return user;
    }
    async updateUserLocation(userId, locationUpdate) {
        const user = await this.getUser(userId);
        if (!user) {
            return undefined;
        }
        const updatedUser = {
            ...user,
            location: locationUpdate.location ?? user.location,
            isSharingLocation: locationUpdate.isSharingLocation ?? user.isSharingLocation
        };
        this.users.set(userId, updatedUser);
        return updatedUser;
    }
    async getSharedLocations() {
        return Array.from(this.users.values()).filter((user) => user.isSharingLocation && user.location !== null);
    }
    // Event operations
    async getEvents() {
        return Array.from(this.events.values());
    }
    async getEvent(id) {
        return this.events.get(id);
    }
    async createEvent(insertEvent) {
        const id = this.currentEventId++;
        const event = {
            id,
            title: insertEvent.title,
            description: insertEvent.description,
            startTime: insertEvent.startTime,
            endTime: insertEvent.endTime,
            location: insertEvent.location,
            createdAt: new Date(),
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
        return this.buildings.get(id);
    }
    async createBuilding(insertBuilding) {
        const id = this.currentBuildingId++;
        const building = {
            id,
            name: insertBuilding.name,
            description: insertBuilding.description,
            location: insertBuilding.location,
            createdAt: new Date(),
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
        return this.studentTools.get(id);
    }
    async createStudentTool(tool) {
        const studentTool = {
            ...tool,
            createdAt: new Date(),
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
        const now = new Date();
        return Array.from(this.safetyAlerts.values()).filter(alert => alert.isActive &&
            (alert.expiresAt === null || alert.expiresAt > now));
    }
    async getSafetyAlert(id) {
        return this.safetyAlerts.get(id);
    }
    async createSafetyAlert(insertAlert) {
        const id = this.currentSafetyAlertId++;
        const alert = {
            id,
            title: insertAlert.title,
            description: insertAlert.description,
            severity: insertAlert.severity,
            location: insertAlert.location,
            createdAt: new Date(),
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
        return Array.from(this.safetyResources.values())
            .filter(resource => resource.category === category);
    }
    async getSafetyResource(id) {
        return this.safetyResources.get(id);
    }
    async createSafetyResource(insertResource) {
        const id = this.currentSafetyResourceId++;
        const resource = {
            id,
            title: insertResource.title,
            description: insertResource.description,
            category: insertResource.category,
            url: insertResource.url,
            createdAt: new Date(),
            isActive: insertResource.isActive ?? true
        };
        this.safetyResources.set(id, resource);
        return resource;
    }
    // Initialize with sample data
    async initializeSampleData() {
        // Sample users
        await this.createUser({
            username: "admin",
            password: "password",
            isGuest: false,
            name: "Admin User",
            email: "admin@hocking.edu",
        });
        await this.createUser({
            username: "student",
            password: "password",
            isGuest: false,
            name: "Student User",
            email: "student@hocking.edu",
        });
        // No sample events - removed
        // Sample buildings
        await this.createBuilding({
            name: "Main Hall",
            description: "Administrative offices, classrooms",
            category: "academic",
            lat: 39.5274,
            lng: -82.4156,
        });
        await this.createBuilding({
            name: "Student Center",
            description: "Dining, recreation, student services",
            category: "dining",
            lat: 39.5280,
            lng: -82.4150,
        });
        await this.createBuilding({
            name: "Davidson Hall",
            description: "Science labs, lecture halls",
            category: "academic",
            lat: 39.5268,
            lng: -82.4162,
        });
        await this.createBuilding({
            name: "Library",
            description: "Books, study spaces, computer labs",
            category: "academic",
            lat: 39.5265,
            lng: -82.4145,
        });
        await this.createBuilding({
            name: "Recreation Center",
            description: "Gym, pool, fitness classes",
            category: "housing",
            lat: 39.529,
            lng: -82.417
        });
        // Sample student tools
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
            url: "/tools/academic/course-catalog",
        });
        await this.createStudentTool({
            id: "course-schedule",
            name: "Course Schedule",
            description: "View your current classes",
            category: "academic",
            url: "#",
        });
        await this.createStudentTool({
            id: "advising",
            name: "Advising",
            description: "Connect with your advisor",
            category: "academic",
            url: "/tools/academic/advising",
        });
        await this.createStudentTool({
            id: "graduation",
            name: "Graduation",
            description: "Apply for graduation and view commencement info",
            category: "academic",
            url: "/tools/academic/graduation",
        });
        await this.createStudentTool({
            id: "academic-history",
            name: "Academic History",
            description: "View your transcript",
            category: "academic",
            url: "#",
        });
        await this.createStudentTool({
            id: "office-administration",
            name: "Office & Administration",
            description: "Info on Registrar, Financial Aid, and more",
            category: "academic",
            url: "/tools/academic/office-administration",
        });
        await this.createStudentTool({
            id: "career-university-center",
            name: "Career & University Center",
            description: "Career counseling, job fairs, and transfer services",
            category: "academic",
            url: "/tools/academic/career-university-center",
        });
        await this.createStudentTool({
            id: "financial-aid",
            name: "Financial Aid",
            description: "View and manage your financial aid",
            category: "financial",
            url: "#",
        });
        await this.createStudentTool({
            id: "billing",
            name: "Billing",
            description: "Pay tuition and view statements",
            category: "financial",
            url: "#",
        });
        await this.createStudentTool({
            id: "campus-resources",
            name: "Campus Resources",
            description: "Access campus services",
            category: "resources",
            url: "#",
        });
        await this.createStudentTool({
            id: "health-services",
            name: "Health Services",
            description: "Schedule health appointments",
            category: "resources",
            url: "#",
        });
        await this.createStudentTool({
            id: "career-services",
            name: "Career Services",
            description: "Job search and career planning",
            category: "resources",
            url: "#",
        });
        // Sample safety alerts
        await this.createSafetyAlert({
            title: "Weather Advisory",
            content: "A winter storm warning is in effect for our area from 6pm today until 6am tomorrow. Expect heavy snowfall and icy conditions. Please use caution when traveling and allow extra time for your commute.",
            severity: "warning",
            startDate: new Date(),
            isActive: true,
            location: "All Campus"
        });
        await this.createSafetyAlert({
            title: "Planned Power Outage: Davidson Hall",
            content: "There will be a planned power outage in Davidson Hall on Saturday from 8am to 12pm for electrical system maintenance. Plan accordingly and please avoid this building during this time.",
            severity: "info",
            startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            isActive: true,
            location: "Davidson Hall"
        });
        // Sample safety resources
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
}
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
