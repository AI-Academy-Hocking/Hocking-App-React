import { Event } from '../../../shared/schema';
import type { NotificationSettings } from '../types/notifications';
import GlobalNotificationManager from './globalNotifications';

class NotificationService {
  private static instance: NotificationService;
  private addNotification: ((notification: any) => void) | null = null;
  private settings: NotificationSettings | null = null;
  private lastProcessedEvents: Set<string> = new Set();
  private checkInterval: ReturnType<typeof setInterval> | null = null;
  private globalManager = GlobalNotificationManager.getInstance();

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  initialize(addNotification: (notification: any) => void, settings: NotificationSettings) {
    this.addNotification = addNotification;
    this.settings = settings;
    this.stop();

    if (this.settings?.pushNotifications && this.settings?.eventNotifications) {
      this.checkUpcomingEvents();
      this.checkInterval = setInterval(() => this.checkUpcomingEvents(), 5 * 60 * 1000);
    }
  }

  // Called from Calendar page with already-loaded events
  processUpcomingEvents(
    events: Event[],
    options?: { maxCount?: number; categoryLabel?: string }
  ): number {
    if (!this.addNotification || !this.settings || !events || events.length === 0) {
      return 0;
    }

    if (!this.settings.pushNotifications || !this.settings.eventNotifications) {
      return 0;
    }

    const now = new Date();
    const maxCount = options?.maxCount ?? 3;

    const upcomingEvents = events
      .filter(event => new Date(event.startTime) >= now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, maxCount);

    let createdCount = 0;

    upcomingEvents.forEach(event => {
      const notificationKey = `upcoming_event_${event.id}`;

      if (!this.lastProcessedEvents.has(notificationKey) && this.addNotification) {
        const categoryTag = options?.categoryLabel ? `[${options.categoryLabel}] ` : '';

        this.addNotification({
          title: `Upcoming: ${event.title}`,
          message: `${categoryTag}${new Date(event.startTime).toLocaleDateString()} at ${new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          type: 'event',
          priority: 'medium',
          eventId: event.id.toString(),
          eventDate: new Date(event.startTime),
          actionUrl: `/calendar`,
        });

        this.lastProcessedEvents.add(notificationKey);
        createdCount += 1;
      }
    });

    if (this.lastProcessedEvents.size > 100) {
      const toKeep = Array.from(this.lastProcessedEvents).slice(-100);
      this.lastProcessedEvents = new Set(toKeep);
    }

    return createdCount;
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
  async triggerEventNotifications(): Promise<number> {
    console.log('Manually triggering event notifications...');
    return this.checkUpcomingEvents();
  }

  private async fetchEvents(type: 'academic' | 'activities'): Promise<Event[]> {
    const nowISO = new Date().toISOString();
    const response = await fetch(`/api/calendar/events?type=${type}&timeMin=${nowISO}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${type} events`);
    }
    return response.json();
  }

  private async checkUpcomingEvents(): Promise<number> {
    if (!this.settings || !this.settings.pushNotifications || !this.settings.eventNotifications) {
      return 0;
    }

    try {
      const [academicEvents, activityEvents] = await Promise.all([
        this.fetchEvents('academic').catch(() => []),
        this.fetchEvents('activities').catch(() => []),
      ]);

      this.globalManager.removeNotificationsByType('event');
      this.lastProcessedEvents.clear();

      const academicCount = this.processUpcomingEvents(academicEvents, {
        maxCount: 2,
        categoryLabel: 'Academic',
      });
      const activityCount = this.processUpcomingEvents(activityEvents, {
        maxCount: 2,
        categoryLabel: 'Activities',
      });

      return academicCount + activityCount;
    } catch (error) {
      console.error('NotificationService: Failed to check upcoming events', error);
      throw error;
    }
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

export default NotificationService; 