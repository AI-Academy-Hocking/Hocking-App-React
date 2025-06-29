import express from 'express';
import * as ical from 'ical';
import fetch from 'node-fetch';
import { googleCalendarService } from '../../services/googleCalendar';

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

// Academic calendar URL (public - can use iCal)
const ACADEMIC_CALENDAR_URL = "https://calendar.google.com/calendar/ical/c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03%40group.calendar.google.com/public/basic.ics";

// Student activities calendar URL (private - needs API)
const STUDENT_CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";

async function fetchCalendarEvents(url: string) {
  console.log(`\n=== GOOGLE CALENDAR DEBUG ===`);
  console.log(`Fetching calendar events from: ${url}`);
  
  try {
    const response = await fetch(url);
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
    const eventTypes = new Set(Object.values(parsedEvents).map((event: any) => event.type));
    console.log(`Event types found:`, Array.from(eventTypes));

    const events = Object.values(parsedEvents)
      .filter(event => {
        const isVEvent = event.type === 'VEVENT';
        if (!isVEvent) {
          console.log(`Skipping non-VEVENT: ${(event as any).type}`);
        }
        return isVEvent;
      })
      .map((event, index) => {
        console.log(`\n--- Processing Event ${index + 1} ---`);
        console.log(`Raw event data:`, JSON.stringify(event, null, 2));
        
        // Handle both Date and string for start/end
        let startDate = (event as any).start;
        let endDate = (event as any).end;
        
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
          id: (event as any).uid || String(Math.random()),
          title: (event as any).summary || "No Title",
          startTime: startDate ? startDate.toISOString() : new Date().toISOString(),
          endTime: endDate ? endDate.toISOString() : (startDate ? startDate.toISOString() : new Date().toISOString()),
          location: (event as any).location || "No Location",
          description: (event as any).description || "No Description",
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
    } else {
      console.warn('No events found in calendar!');
    }

    return events;
  } catch (error) {
    console.error(`Error in fetchCalendarEvents:`, error);
    throw error;
  }
}

// GET /api/calendar/events
router.get('/events', async (req, res) => {
  console.log(`\n=== API REQUEST ===`);
  console.log(`Query params:`, req.query);
  
  try {
    const calendarType = req.query.type as string;
    console.log(`Calendar type requested: ${calendarType}`);
    
    let events;
    
    // Use Google Calendar API for both calendars since you already have OAuth 2.0 set up
    console.log(`Using Google Calendar API for ${calendarType} calendar`);
    try {
      events = await googleCalendarService.getEvents(calendarType as 'academic' | 'activities');
      console.log(`Successfully fetched ${events.length} events via Google Calendar API`);
    } catch (apiError) {
      console.error('Google Calendar API failed, falling back to iCal:', apiError);
      
      // Fallback to iCal for public calendars only
      if (calendarType === 'academic') {
        console.log(`Falling back to iCal for public academic calendar`);
        events = await fetchCalendarEvents(ACADEMIC_CALENDAR_URL);
      } else {
        console.error('Cannot fallback to iCal for private calendar');
        throw new Error('Failed to fetch events from private calendar');
      }
    }
    
    console.log(`Sending ${events.length} events to frontend`);
    res.json(events);
  } catch (error) {
    console.error(`API Error:`, error);
    res.status(500).json({ 
      error: 'Failed to fetch calendar events', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router; 