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
        const parsedEvents = ical_1.default.parseICS(icalData);
        if (!parsedEvents) {
            throw new Error('Failed to parse calendar data');
        }
        const events = Object.values(parsedEvents)
            .filter(event => event.type === 'VEVENT')
            .map(event => {
            var _a, _b, _c, _d, _e;
            return ({
                id: event.uid || String(Math.random()),
                title: event.summary || "No Title",
                date: ((_a = event.start) === null || _a === void 0 ? void 0 : _a.toISOString()) || new Date().toISOString(),
                time: `${((_b = event.start) === null || _b === void 0 ? void 0 : _b.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })) || "00:00"} - ${((_c = event.end) === null || _c === void 0 ? void 0 : _c.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })) || "23:59"}`,
                end: ((_d = event.end) === null || _d === void 0 ? void 0 : _d.toISOString()) || ((_e = event.start) === null || _e === void 0 ? void 0 : _e.toISOString()) || new Date().toISOString(),
                location: event.location || "No Location",
                description: event.description || "No Description",
            });
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
