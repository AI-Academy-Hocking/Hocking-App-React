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
const CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";
// GET /api/calendar/events
router.get('/events', async (req, res) => {
    try {
        console.log('Attempting to fetch calendar from URL:', CALENDAR_URL);
        const response = await (0, node_fetch_1.default)(CALENDAR_URL, {
            headers: {
                'Accept': 'text/calendar',
                'User-Agent': 'Hocking-App/1.0'
            }
        });
        console.log('Calendar fetch response status:', response.status);
        console.log('Calendar fetch response headers:', Object.fromEntries(response.headers.entries()));
        if (response.status === 403) {
            console.error('Calendar access forbidden - check calendar sharing settings');
            return res.status(403).json({
                error: 'Calendar access forbidden',
                details: 'Please check calendar sharing settings and ensure the calendar is publicly accessible'
            });
        }
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Calendar fetch failed:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const icalData = await response.text();
        console.log('Received iCal data length:', icalData.length);
        console.log('First 100 characters of iCal data:', icalData.substring(0, 100));
        if (!icalData || icalData.includes('<!DOCTYPE')) {
            console.error('Invalid calendar data received');
            return res.status(400).json({
                error: 'Invalid calendar data',
                details: 'The calendar URL may be incorrect or the calendar may not be publicly accessible'
            });
        }
        const parsedEvents = ical.parseICS(icalData);
        if (!parsedEvents) {
            throw new Error('Failed to parse calendar data');
        }
        const events = Object.values(parsedEvents)
            .filter(event => event.type === 'VEVENT')
            .map(event => {
            const startTime = event.start?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }) || "00:00";
            const endTime = event.end?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }) || "23:59";
            return {
                id: event.uid || String(Math.random()),
                title: event.summary || "No Title",
                date: event.start?.toISOString() || new Date().toISOString(),
                time: `${startTime} - ${endTime}`,
                end: event.end?.toISOString() || event.start?.toISOString() || new Date().toISOString(),
                location: event.location || "No Location",
                description: event.description || "No Description",
            };
        });
        console.log('Successfully parsed events:', events.length);
        res.json(events);
    }
    catch (error) {
        console.error('Error fetching calendar:', error);
        res.status(500).json({
            error: 'Failed to fetch calendar events',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
