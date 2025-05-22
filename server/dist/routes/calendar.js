"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ical_1 = __importDefault(require("ical"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = (0, express_1.Router)();
const CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";
router.get('/events', async (req, res) => {
    try {
        console.log('Fetching calendar from URL:', CALENDAR_URL);
        const response = await (0, node_fetch_1.default)(CALENDAR_URL);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const icalData = await response.text();
        console.log('Received data length:', icalData.length);
        console.log('First 100 characters:', icalData.substring(0, 100));
        if (!icalData || icalData.includes('<!DOCTYPE')) {
            console.error('Invalid calendar data received. Data starts with:', icalData.substring(0, 200));
            throw new Error('Invalid calendar data received');
        }
        const parsedEvents = ical_1.default.parseICS(icalData);
        if (!parsedEvents) {
            throw new Error('Failed to parse calendar data');
        }
        const events = Object.values(parsedEvents)
            .filter(event => event.type === 'VEVENT')
            .map(event => {
            var _a, _b, _c, _d, _e;
            const startTime = ((_a = event.start) === null || _a === void 0 ? void 0 : _a.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            })) || "00:00";
            const endTime = ((_b = event.end) === null || _b === void 0 ? void 0 : _b.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            })) || "23:59";
            return {
                id: event.uid || String(Math.random()),
                title: event.summary || "No Title",
                date: ((_c = event.start) === null || _c === void 0 ? void 0 : _c.toISOString()) || new Date().toISOString(),
                time: `${startTime} - ${endTime}`,
                end: ((_d = event.end) === null || _d === void 0 ? void 0 : _d.toISOString()) || ((_e = event.start) === null || _e === void 0 ? void 0 : _e.toISOString()) || new Date().toISOString(),
                location: event.location || "No Location",
                description: event.description || "No Description",
            };
        });
        console.log('Successfully processed events:', events.length);
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
