import { Event } from '../../../shared/schema';
import { addMinutes, isBefore, isAfter } from 'date-fns';

class NotificationService {
  private static instance: NotificationService;
  private checkInterval: number | null = null;
  private addNotification: ((notification: any) => void) | null = null;
  private settings: any = null;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  initialize(addNotification: (notification: any) => void, settings: any) {
    this.addNotification = addNotification;
    this.settings = settings;
    this.startEventChecking();
  }

  private startEventChecking() {
    // Check for upcoming events every minute
    this.checkInterval = setInterval(() => {
      this.checkUpcomingEvents();
    }, 60000); // 1 minute

    // Also check immediately
    this.checkUpcomingEvents();
  }

  private async checkUpcomingEvents() {
    if (!this.addNotification || !this.settings) return;

    try {
      // Fetch upcoming events for the next week
      const now = new Date();
      const timeMin = now.toISOString();
      const timeMax = addMinutes(now, 7 * 24 * 60).toISOString(); // Check next week

      // Fetch events for both academic and activities calendars
      const academicResponse = await fetch(`/api/calendar/events?type=academic&timeMin=${timeMin}&timeMax=${timeMax}`);
      const activitiesResponse = await fetch(`/api/calendar/events?type=activities&timeMin=${timeMin}&timeMax=${timeMax}`);
      
      let allEvents: Event[] = [];
      
      if (academicResponse.ok) {
        const academicEvents = await academicResponse.json();
        allEvents = allEvents.concat(academicEvents);
      }
      
      if (activitiesResponse.ok) {
        const activitiesEvents = await activitiesResponse.json();
        allEvents = allEvents.concat(activitiesEvents);
      }
      
      console.log('Fetched upcoming events for notifications:', allEvents.length);
      this.processEvents(allEvents, 'event');
    } catch (error) {
      console.error('Error checking upcoming events:', error);
    }
  }

  private processEvents(events: Event[], type: 'academic' | 'event') {
    if (!this.addNotification || !this.settings) return;

    const now = new Date();
    console.log('Processing events for notifications:', events.length);

    events.forEach(event => {
      if (!event.startTime || !event.endTime) return;

      const eventStart = new Date(event.startTime);
      const timeUntilEvent = eventStart.getTime() - now.getTime();
      const minutesUntilEvent = Math.floor(timeUntilEvent / (1000 * 60));

      // Only create notifications for events in the next week
      if (minutesUntilEvent > 0 && minutesUntilEvent <= 7 * 24 * 60) {
        // Check if we've already sent a notification for this event
        const notificationKey = `event_reminder_${event.id}`;
        const hasNotified = localStorage.getItem(notificationKey);
        
        if (!hasNotified && this.addNotification) {
          console.log('Creating notification for event:', event.title);
          
          this.addNotification({
            title: `Upcoming Event: ${event.title}`,
            message: `${event.title} is coming up. ${event.location && event.location !== 'No Location' ? `Location: ${event.location}` : ''}`,
            type: 'event',
            priority: 'medium',
            eventId: event.id.toString(),
            eventDate: eventStart,
            actionUrl: `/calendar`,
          });

          // Mark as notified
          localStorage.setItem(notificationKey, 'true');
        }
      }
    });
  }

  // Method to send custom notifications from admin
  sendCustomNotification(notification: {
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    targetAudience: 'all' | 'students' | 'faculty' | 'staff';
  }) {
    if (!this.addNotification) return;

    this.addNotification({
      title: notification.title,
      message: notification.message,
      type: 'custom',
      priority: notification.priority,
    });
  }

  // Method to send system notifications
  sendSystemNotification(title: string, message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    if (!this.addNotification) return;

    this.addNotification({
      title,
      message,
      type: 'system',
      priority,
    });
  }

  // Method to manually trigger event notifications for testing
  async triggerEventNotifications() {
    console.log('Manually triggering event notifications...');
    await this.checkUpcomingEvents();
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

export default NotificationService; 