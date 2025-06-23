import express from 'express';
import * as ical from 'ical';
import fetch from 'node-fetch';

type CalendarEvent = {
  type: 'VEVENT';
  uid?: string;
  summary?: string;
  start?: Date;
  end?: Date;
  location?: string;
  description?: string;
};

const router = express.Router();

// Academic calendar URL
const ACADEMIC_CALENDAR_URL = "https://calendar.google.com/calendar/ical/c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03%40group.calendar.google.com/public/basic.ics";

// Student activities calendar URL
const STUDENT_CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";

async function fetchCalendarEvents(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const icalData = await response.text();
  const parsedEvents = ical.parseICS(icalData);

  const events = Object.values(parsedEvents)
    .filter(event => event.type === 'VEVENT')
    .map(event => {
      // Handle both Date and string for start/end
      let startDate = (event as any).start;
      let endDate = (event as any).end;
      if (typeof startDate === 'string') startDate = new Date(startDate);
      if (typeof endDate === 'string') endDate = new Date(endDate);

      return {
        id: (event as any).uid || String(Math.random()),
        title: (event as any).summary || "No Title",
        date: startDate ? startDate.toISOString() : new Date().toISOString(),
        time: `${startDate ? startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "00:00"} - ${endDate ? endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "23:59"}`,
        end: endDate ? endDate.toISOString() : (startDate ? startDate.toISOString() : new Date().toISOString()),
        location: (event as any).location || "No Location",
        description: (event as any).description || "No Description",
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
    const calendarType = req.query.type as string;
    const calendarUrl = calendarType === 'activities' ? STUDENT_CALENDAR_URL : ACADEMIC_CALENDAR_URL;
    const events = await fetchCalendarEvents(calendarUrl);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calendar events', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 