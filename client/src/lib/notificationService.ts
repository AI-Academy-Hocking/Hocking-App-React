import { Event } from '../../../shared/schema';
import { addMinutes, isBefore, isAfter, isWithinInterval, addDays } from 'date-fns';

class NotificationService {
  private static instance: NotificationService;
  private addNotification: ((notification: any) => void) | null = null;
  private settings: any = null;
  private lastProcessedEvents: Set<string> = new Set();

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  initialize(addNotification: (notification: any) => void, settings: any) {
    this.addNotification = addNotification;
    this.settings = settings;
    // No automatic checking - we'll be called explicitly with event data
  }

  // Called from Calendar page with already-loaded events
  processUpcomingEvents(events: Event[]) {
    if (!this.addNotification || !this.settings || !events || events.length === 0) {
      return;
    }

    const now = new Date();
    const nextWeek = addDays(now, 7);

    // Filter to upcoming events in the next 7 days
    const upcomingEvents = events
      .filter(event => {
        const eventStart = new Date(event.startTime);
        return eventStart >= now && eventStart <= nextWeek;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 3); // Get top 3 most recent

    // Process each upcoming event
    upcomingEvents.forEach(event => {
      const notificationKey = `upcoming_event_${event.id}`;
      
      // Only notify if we haven't already notified about this event
      if (!this.lastProcessedEvents.has(notificationKey) && this.addNotification) {
        this.addNotification({
          title: `Upcoming: ${event.title}`,
          message: `${new Date(event.startTime).toLocaleDateString()} at ${new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          type: 'event',
          priority: 'medium',
          eventId: event.id.toString(),
          eventDate: new Date(event.startTime),
          actionUrl: `/calendar`,
        });

        this.lastProcessedEvents.add(notificationKey);
      }
    });

    // Clean up old processed events (keep last 100)
    if (this.lastProcessedEvents.size > 100) {
      const toKeep = Array.from(this.lastProcessedEvents).slice(-100);
      this.lastProcessedEvents = new Set(toKeep);
    }
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