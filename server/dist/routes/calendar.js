"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ical = __importStar(require("ical"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = express_1.default.Router();
// Academic calendar URL
const ACADEMIC_CALENDAR_URL = "https://calendar.google.com/calendar/ical/c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03%40group.calendar.google.com/public/basic.ics";
// Student activities calendar URL
const STUDENT_CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";
async function fetchCalendarEvents(url) {
    const response = await (0, node_fetch_1.default)(url);
    if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    const icalData = await response.text();
    const parsedEvents = ical.parseICS(icalData);
    const events = Object.values(parsedEvents)
        .filter(event => event.type === 'VEVENT')
        .map(event => {
        // Handle both Date and string for start/end
        let startDate = event.start;
        let endDate = event.end;
        if (typeof startDate === 'string')
            startDate = new Date(startDate);
        if (typeof endDate === 'string')
            endDate = new Date(endDate);
        return {
            id: event.uid || String(Math.random()),
            title: event.summary || "No Title",
            date: startDate ? startDate.toISOString() : new Date().toISOString(),
            time: `${startDate ? startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "00:00"} - ${endDate ? endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "23:59"}`,
            end: endDate ? endDate.toISOString() : (startDate ? startDate.toISOString() : new Date().toISOString()),
            location: event.location || "No Location",
            description: event.description || "No Description",
        };
    });
    // Debug log
    console.log(`Fetched ${events.length} events from ${url}`);
    if (events.length > 0) {
        console.log('First event:', events[0]);
    }
    return events;
}
// GET /api/calendar/events
router.get('/events', async (req, res) => {
    try {
        const calendarType = req.query.type;
        const calendarUrl = calendarType === 'activities' ? STUDENT_CALENDAR_URL : ACADEMIC_CALENDAR_URL;
        const events = await fetchCalendarEvents(calendarUrl);
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch calendar events', details: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = router;
