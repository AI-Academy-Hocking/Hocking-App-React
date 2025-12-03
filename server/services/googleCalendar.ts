import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { JWT } from 'google-auth-library';
import { Event } from '../../shared/schema';

// Google Calendar API configuration
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Calendar IDs from environment variables
const CALENDAR_IDS = {
  academic: process.env.GOOGLE_CALENDAR_ACADEMIC_ID || 'c_2f3ba38d9128bf58be13ba960fcb919f3205c2644137cd26a32f0bb7d2d3cf03@group.calendar.google.com',
  activities: process.env.GOOGLE_CALENDAR_ACTIVITIES_ID || 'gabby@aiowl.org'
};

// OAuth2 credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

// Service Account credentials (recommended for production)
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

export class GoogleCalendarService {
  private oauth2Client: OAuth2Client;
  private serviceAccountClient: JWT | null = null;

  constructor() {
    this.oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
    
    if (REFRESH_TOKEN) {
      this.oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
      });
    }

    // Initialize service account if credentials are available
    if (SERVICE_ACCOUNT_EMAIL && SERVICE_ACCOUNT_PRIVATE_KEY) {
      this.serviceAccountClient = new JWT({
        email: SERVICE_ACCOUNT_EMAIL,
        key: SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: SCOPES,
      });
    }
  }

  async getEvents(calendarType: 'academic' | 'activities', timeMin?: Date, timeMax?: Date) {
    try {
      const calendarId = CALENDAR_IDS[calendarType];
      
      // Try service account first (easier setup)
      if (this.serviceAccountClient) {
        console.log(`Using service account for ${calendarType} calendar`);
        const calendar = google.calendar({ version: 'v3', auth: this.serviceAccountClient });
        
        const response = await calendar.events.list({
          calendarId: calendarId,
          timeMin: timeMin?.toISOString(),
          timeMax: timeMax?.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
          maxResults: 100
        });

        const events = response.data.items?.map(event => ({
          id: event.id || String(Math.random()),
          title: event.summary || 'No Title',
          startTime: event.start?.dateTime || event.start?.date || new Date().toISOString(),
          endTime: event.end?.dateTime || event.end?.date || new Date().toISOString(),
          location: event.location || 'No Location',
          description: event.description || 'No Description',
          calendarType,
        })) || [];

        console.log(`Fetched ${events.length} events from Google Calendar API for ${calendarType}`);
        return events;
      }
      
      // Fallback to OAuth2
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
      
      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: timeMin?.toISOString(),
        timeMax: timeMax?.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 100
      });

      const events = response.data.items?.map(event => ({
        id: event.id || String(Math.random()),
        title: event.summary || 'No Title',
        startTime: event.start?.dateTime || event.start?.date || new Date().toISOString(),
        endTime: event.end?.dateTime || event.end?.date || new Date().toISOString(),
        location: event.location || 'No Location',
        description: event.description || 'No Description',
        calendarType,
      })) || [];

      console.log(`Fetched ${events.length} events from Google Calendar API for ${calendarType}`);
      return events;
    } catch (error) {
      console.error('Google Calendar API error:', error);
      throw error;
    }
  }

  // Helper method to get authorization URL for setting up OAuth
  getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent'
    });
  }

  // Helper method to exchange authorization code for tokens
  async getTokensFromCode(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }
}

export const googleCalendarService = new GoogleCalendarService();
