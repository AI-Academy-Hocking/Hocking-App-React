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
<<<<<<< HEAD
// Try to import Google Calendar service, but don't fail if it's not available
let googleCalendarService = null;
try {
    const { googleCalendarService: service } = require('../../services/googleCalendar');
    googleCalendarService = service;
    console.log('Google Calendar service loaded successfully');
}
catch (error) {
    console.log('Google Calendar service not available, will use iCal fallback:', error instanceof Error ? error.message : 'Unknown error');
}
const router = express_1.default.Router();
// Academic calendar URL (public - can use iCal)
const ACADEMIC_CALENDAR_URL = "https://calendar.google.com/calendar/ical/c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03%40group.calendar.google.com/public/basic.ics";
// Student activities calendar URL (private - needs API)
const STUDENT_CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";
async function fetchCalendarEvents(url, calendarType, timeMin, timeMax) {
    console.log(`\n=== GOOGLE CALENDAR DEBUG ===`);
    console.log(`Fetching calendar events from: ${url}`);
    try {
        const response = await (0, node_fetch_1.default)(url);
        console.log(`Response status: ${response.status} ${response.statusText}`);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} for URL: ${url}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const icalData = await response.text();
        console.log(`Received ${icalData.length} characters of iCal data`);
        // Log first 500 characters to see the structure
        console.log(`First 500 chars of iCal data:`, icalData.substring(0, 500));
        const parsedEvents = ical.parseICS(icalData);
        console.log(`Parsed ${Object.keys(parsedEvents).length} total events from iCal`);
        // Log all event types found
        const eventTypes = new Set(Object.values(parsedEvents).map((event) => event.type));
        console.log(`Event types found:`, Array.from(eventTypes));
        const events = Object.values(parsedEvents)
            .filter(event => {
            const isVEvent = event.type === 'VEVENT';
            if (!isVEvent) {
                console.log(`Skipping non-VEVENT: ${event.type}`);
                return false;
            }
            // Filter by date range if specified
            if (timeMin || timeMax) {
                const eventStart = event.start;
                if (eventStart) {
                    const eventDate = new Date(eventStart);
                    const minDate = timeMin || new Date(0);
                    const maxDate = timeMax || new Date('2100-01-01');
                    if (eventDate < minDate || eventDate > maxDate) {
                        console.log(`Skipping event outside date range: ${event.summary} on ${eventDate.toISOString()}`);
                        return false;
                    }
                }
            }
            return true;
        })
            .map((event, index) => {
            console.log(`\n--- Processing Event ${index + 1} ---`);
            console.log(`Raw event data:`, JSON.stringify(event, null, 2));
            // Handle both Date and string for start/end
            let startDate = event.start;
            let endDate = event.end;
            console.log(`Original start: ${startDate} (type: ${typeof startDate})`);
            console.log(`Original end: ${endDate} (type: ${typeof endDate})`);
            if (typeof startDate === 'string') {
                startDate = new Date(startDate);
                console.log(`Parsed start date: ${startDate.toISOString()}`);
            }
            if (typeof endDate === 'string') {
                endDate = new Date(endDate);
                console.log(`Parsed end date: ${endDate.toISOString()}`);
            }
            const eventData = {
                id: event.uid || String(Math.random()),
                title: event.summary || "No Title",
                startTime: startDate ? startDate.toISOString() : new Date().toISOString(),
                endTime: endDate ? endDate.toISOString() : (startDate ? startDate.toISOString() : new Date().toISOString()),
                location: event.location || "No Location",
                description: event.description || "No Description",
                calendarType, // <-- ADD THIS LINE
            };
            console.log(`Final event data:`, eventData);
            return eventData;
        });
        console.log(`\n=== SUMMARY ===`);
        console.log(`Fetched ${events.length} events from ${url}`);
        if (events.length > 0) {
            console.log('First event:', events[0]);
            console.log('Last event:', events[events.length - 1]);
            // Check date ranges
            const dates = events.map(e => new Date(e.startTime));
            const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
            const latest = new Date(Math.max(...dates.map(d => d.getTime())));
            console.log(`Event date range: ${earliest.toISOString()} to ${latest.toISOString()}`);
        }
        else {
            console.warn('No events found in calendar!');
        }
        return events;
    }
    catch (error) {
        console.error(`Error in fetchCalendarEvents:`, error);
        throw error;
    }
}
// GET /api/calendar/events
router.get('/events', async (req, res) => {
    console.log(`\n=== API REQUEST ===`);
    console.log(`Query params:`, req.query);
    try {
        const calendarType = req.query.type;
        const timeMin = req.query.timeMin; // Optional: filter events from this date
        const timeMax = req.query.timeMax; // Optional: filter events until this date
        console.log(`Calendar type requested: ${calendarType}`);
        console.log(`Time range: ${timeMin || 'no start'} to ${timeMax || 'no end'}`);
        let events;
        // Try Google Calendar API first if available
        if (googleCalendarService) {
            console.log(`Attempting to use Google Calendar API for ${calendarType} calendar`);
            try {
                events = await googleCalendarService.getEvents(calendarType, timeMin ? new Date(timeMin) : undefined, timeMax ? new Date(timeMax) : undefined);
                console.log(`Successfully fetched ${events.length} events via Google Calendar API`);
            }
            catch (apiError) {
                console.error('Google Calendar API failed, falling back to iCal:', apiError);
                // Continue to iCal fallback
            }
        }
        // If Google Calendar API failed or is not available, use iCal
        if (!events) {
            console.log(`Using iCal fallback for ${calendarType} calendar`);
            const minDate = timeMin ? new Date(timeMin) : undefined;
            const maxDate = timeMax ? new Date(timeMax) : undefined;
            console.log(`iCal date filtering: minDate=${minDate?.toISOString()}, maxDate=${maxDate?.toISOString()}`);
            if (calendarType === 'academic') {
                events = await fetchCalendarEvents(ACADEMIC_CALENDAR_URL, 'academic', minDate, maxDate);
            }
            else if (calendarType === 'activities') {
                events = await fetchCalendarEvents(STUDENT_CALENDAR_URL, 'activities', minDate, maxDate);
            }
            else {
                // Default to academic if no type specified
                console.log('No calendar type specified, defaulting to academic');
                events = await fetchCalendarEvents(ACADEMIC_CALENDAR_URL, 'academic', minDate, maxDate);
            }
        }
        // Date filtering is now handled at the source (Google Calendar API or iCal parsing)
        if (timeMin || timeMax) {
            console.log(`Date filtering applied at source: ${timeMin || 'no start'} to ${timeMax || 'no end'}`);
        }
        // Ensure events is always an array
        const eventsArray = events || [];
        console.log(`Sending ${eventsArray.length} events to frontend`);
        res.json(eventsArray);
    }
    catch (error) {
        console.error(`API Error:`, error);
        res.status(500).json({
            error: 'Failed to fetch calendar events',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
=======
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
>>>>>>> Jodian-Branch
    }
});
exports.default = router;
