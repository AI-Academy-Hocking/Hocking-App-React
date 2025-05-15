import { Router } from 'express';
import ical from 'ical';
import fetch from 'node-fetch';

const router = Router();

const CALENDAR_URL = "https://calendar.google.com/calendar/ical/gabby%40aiowl.org/private-69bad1405fa24c9e808cf441b3acadf2/basic.ics";

router.get('/events', async (req, res) => {
  try {
    console.log('Fetching calendar from URL:', CALENDAR_URL);
    const response = await fetch(CALENDAR_URL);
    
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

    console.log('Successfully processed events:', events.length);
    res.json(events);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ 
      error: 'Failed to fetch calendar events',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 