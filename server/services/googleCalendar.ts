
import { google } from 'googleapis';
import { Event } from '../../shared/schema';

// Initialize the Google Calendar API client
const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY,
});

export async function getEvents(calendarType?: string): Promise<Event[]> {
  try {
    // Calendar ID from your Google Calendar settings
    // In a real implementation, you would use different calendar IDs for different calendar types
    const calendarId = calendarType === 'activities' 
      ? process.env.GOOGLE_ACTIVITIES_CALENDAR_ID 
      : process.env.GOOGLE_CALENDAR_ID || 'primary';

    const response = await calendar.events.list({
      calendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    
    // Map Google Calendar events to our app's Event format
    return events.map((event, index) => {
      const start = event.start?.dateTime || event.start?.date || '';
      const end = event.end?.dateTime || event.end?.date || '';
      
      // Format the date and time
      const date = new Date(start).toISOString().split('T')[0];
      const startTime = new Date(start).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      const endTime = new Date(end).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      return {
        id: event.id || String(index),
        title: event.summary || 'Unnamed Event',
        date,
        time: `${startTime} - ${endTime}`,
        location: event.location || 'TBD',
        description: event.description || '',
      };
    });
  } catch (error) {
    console.error('Error fetching events from Google Calendar:', error);
    return [];
  }
}
