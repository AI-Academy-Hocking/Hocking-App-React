import express from 'express';
import fetch from 'node-fetch';
import { createRequire } from 'module';

// Using iCal public URLs for calendar events (no authentication required)
console.log('Calendar service initialized - using public iCal URLs');

// Use require() for CommonJS module to avoid ESM compatibility issues
const require = createRequire(import.meta.url);
const ical = require('ical');

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

// ============================================================================
// PERSISTENT EVENT STORAGE - Single source of truth for all clients
// ============================================================================
// This ensures only the server fetches from Google, not each client
const eventStorage = new Map<string, { data: any[], timestamp: number, lastFetchAttempt: number }>();
const STORAGE_DURATION = 24 * 60 * 60 * 1000; // 24 hours - events are valid for a day
const FETCH_INTERVAL = 60 * 60 * 1000; // Fetch every 1 hour
const FETCH_COOLDOWN = 5 * 60 * 1000; // 5 minutes between fetch attempts (rate limit protection)

// Initialize storage for both calendar types
const CALENDAR_TYPES = {
  academic: { url: '', key: 'academic_all' },
  activities: { url: '', key: 'activities_all' }
};

function initializeStorage() {
  CALENDAR_TYPES.academic.url = process.env.GOOGLE_CALENDAR_ACADEMIC_URL || 
    "https://calendar.google.com/calendar/ical/c_48553b3826989867c9512386c55643ea5e9768a4439ba027beb782cb6ad652b9%40group.calendar.google.com/public/basic.ics";
  CALENDAR_TYPES.activities.url = process.env.GOOGLE_CALENDAR_ACTIVITIES_URL || 
    "https://calendar.google.com/calendar/ical/c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03%40group.calendar.google.com/public/basic.ics";
}

function getStoredEvents(calendarType: string): any[] | null {
  const key = `${calendarType}_all`;
  const stored = eventStorage.get(key);
  
  if (!stored) return null;
  
  const age = Date.now() - stored.timestamp;
  const ageMinutes = Math.floor(age / 1000 / 60);
  
  if (age < STORAGE_DURATION) {
    console.log(`✓ Serving stored events for ${calendarType} (age: ${ageMinutes} minutes, ${stored.data.length} events)`);
    return stored.data;
  }
  
  console.log(`⚠️ Stored events for ${calendarType} are stale (age: ${ageMinutes} minutes)`);
  return null;
}

function setStoredEvents(calendarType: string, data: any[]) {
  const key = `${calendarType}_all`;
  eventStorage.set(key, {
    data,
    timestamp: Date.now(),
    lastFetchAttempt: Date.now()
  });
  console.log(`✓ Stored ${data.length} events for ${calendarType}`);
}

function shouldFetchNow(calendarType: string): boolean {
  const key = `${calendarType}_all`;
  const stored = eventStorage.get(key);
  
  if (!stored) {
    console.log(`🔄 No stored events for ${calendarType} - will fetch`);
    return true;
  }
  
  const timeSinceLastFetch = Date.now() - stored.lastFetchAttempt;
  const timeSinceStorage = Date.now() - stored.timestamp;
  
  // Don't fetch if we tried recently (rate limit protection)
  if (timeSinceLastFetch < FETCH_COOLDOWN) {
    const waitMinutes = Math.ceil((FETCH_COOLDOWN - timeSinceLastFetch) / 1000 / 60);
    console.log(`⏳ Rate limit cooldown - wait ${waitMinutes} more minutes before fetching ${calendarType}`);
    return false;
  }
  
  // Fetch if data is older than fetch interval
  if (timeSinceStorage >= FETCH_INTERVAL) {
    const ageMinutes = Math.floor(timeSinceStorage / 1000 / 60);
    console.log(`🔄 Events for ${calendarType} are ${ageMinutes} minutes old - will fetch fresh data`);
    return true;
  }
  
  return false;
}

function markFetchAttempt(calendarType: string) {
  const key = `${calendarType}_all`;
  const stored = eventStorage.get(key);
  if (stored) {
    stored.lastFetchAttempt = Date.now();
  }
}

// Initialize storage and start background refresh
initializeStorage();

// Background job: Refresh events every hour
async function backgroundRefreshEvents() {
  console.log('\n🔄 Background job: Refreshing calendar events...');
  
  for (const [type, config] of Object.entries(CALENDAR_TYPES)) {
    try {
      if (shouldFetchNow(type)) {
        console.log(`Fetching ${type} events...`);
        markFetchAttempt(type);
        const events = await fetchCalendarEvents(config.url, type);
        setStoredEvents(type, events);
      } else {
        console.log(`Skipping ${type} - using cached data`);
      }
    } catch (error) {
      console.error(`Error refreshing ${type} events:`, error);
    }
  }
  
  console.log('✓ Background refresh complete\n');
}

// Run background job every 30 minutes
setInterval(backgroundRefreshEvents, 30 * 60 * 1000);

// Initial fetch on server startup (after a delay to not block startup)
setTimeout(backgroundRefreshEvents, 10000); // Wait 10 seconds after server starts

async function fetchCalendarEvents(url: string, calendarType: string) {
  console.log(`\n=== FETCHING FROM GOOGLE ===`);
  console.log(`URL: ${url}`);
  console.log(`Type: ${calendarType}`);
  
  try {
    const response = await fetch(url);
    console.log(`Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status} for URL: ${url}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const icalData = await response.text();
    console.log(`Received ${icalData.length} characters of iCal data`);
    
    // Use ical.parseICS (loaded via require, so it has proper context)
    const parsedEvents = ical.parseICS(icalData);
    console.log(`Parsed ${Object.keys(parsedEvents).length} total events from iCal`);
    
    // Log all event types found
    const eventTypes = new Set(Object.values(parsedEvents).map((event: any) => event.type));
    console.log(`Event types found:`, Array.from(eventTypes));

    const events = Object.values(parsedEvents)
      .filter(event => event.type === 'VEVENT')
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
  console.log(`\n=== CLIENT REQUEST ===`);
  console.log(`Query params:`, req.query);
  
  try {
    const calendarType = (req.query.type as string) || 'academic';
    const timeMin = req.query.timeMin as string;
    const timeMax = req.query.timeMax as string;
    
    console.log(`Calendar type: ${calendarType}, Time range: ${timeMin || 'none'} to ${timeMax || 'none'}`);
    
    // ALWAYS serve from storage first (single source of truth for all clients)
    let events = getStoredEvents(calendarType);
    
    // If no stored events, try to fetch immediately (first request scenario)
    if (!events && shouldFetchNow(calendarType)) {
      console.log(`📥 First request for ${calendarType} - fetching from Google...`);
      markFetchAttempt(calendarType);
      
      const config = CALENDAR_TYPES[calendarType as keyof typeof CALENDAR_TYPES];
      if (config) {
        try {
          events = await fetchCalendarEvents(config.url, calendarType);
          setStoredEvents(calendarType, events);
        } catch (error) {
          console.error(`Error fetching ${calendarType} events:`, error);
          events = []; // Return empty array on error
        }
      }
    }
    
    // If still no events, return empty array
    if (!events) {
      console.log(`⚠️ No events available for ${calendarType}`);
      events = [];
    }
    
    // Filter by date range if specified
    let filteredEvents = events;
    
    // Apply client-requested date filtering
    if (timeMin || timeMax) {
      const minDate = timeMin ? new Date(timeMin) : null;
      const maxDate = timeMax ? new Date(timeMax) : null;
      
      filteredEvents = filteredEvents.filter(event => {
        const eventStart = new Date(event.startTime);
        
        if (minDate && eventStart < minDate) return false;
        if (maxDate && eventStart > maxDate) return false;
        
        return true;
      });
      
      console.log(`Filtered from ${events.length} to ${filteredEvents.length} events (${timeMin || 'any'} to ${timeMax || 'any'})`);
    }
    
    console.log(`📤 Sending ${filteredEvents.length} events to client`);
    res.json(filteredEvents);
  } catch (error) {
    console.error(`API Error:`, error);
    res.status(500).json({ 
      error: 'Failed to fetch calendar events', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// POST /api/calendar/refresh - Force refresh calendar data
router.post('/refresh', async (req, res) => {
  console.log('\n🔄 Manual refresh requested');
  
  try {
    // Clear all stored events to force fresh fetch
    eventStorage.clear();
    console.log('✓ Cleared event storage');
    
    // Trigger immediate background refresh
    await backgroundRefreshEvents();
    
    res.json({ 
      success: true, 
      message: 'Calendar events refreshed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error refreshing calendar:', error);
    res.status(500).json({ 
      error: 'Failed to refresh calendar events', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router; 