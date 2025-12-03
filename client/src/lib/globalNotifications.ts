import { Notification } from '../types/notifications';

// Global notification storage that persists across all users
class GlobalNotificationManager {
  private static instance: GlobalNotificationManager;
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];
  private lastUpdateTime: number = 0;

  static getInstance(): GlobalNotificationManager {
    if (!GlobalNotificationManager.instance) {
      GlobalNotificationManager.instance = new GlobalNotificationManager();
    }
    return GlobalNotificationManager.instance;
  }

  // Load notifications from localStorage
  private loadNotifications(): void {
    try {
      const stored = localStorage.getItem('globalNotifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
          eventDate: n.eventDate ? new Date(n.eventDate) : undefined,
        }));
      } else {
        // Add initial notifications if none exist
        this.notifications = [
          {
            id: 'welcome-1',
            title: 'Welcome to Hocking College!',
            message: 'Your notification system is now active. You\'ll receive updates about upcoming events and important announcements.',
            type: 'system',
            priority: 'medium',
            timestamp: new Date(),
            read: false,
          },
          {
            id: 'welcome-2',
            title: 'Calendar Events Available',
            message: 'Check your calendar for upcoming academic and student events. You can customize your notification preferences in Settings.',
            type: 'custom',
            priority: 'low',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            read: false,
          }
        ];
        this.saveNotifications();
      }
    } catch (error) {
      console.error('Error loading global notifications:', error);
    }
  }

  // Save notifications to localStorage
  private saveNotifications(): void {
    try {
      localStorage.setItem('globalNotifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Error saving global notifications:', error);
    }
  }

  // Get all notifications
  getNotifications(): Notification[] {
    this.loadNotifications();
    return [...this.notifications];
  }

  // Add a new notification (for admins)
  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    console.log('GlobalNotificationManager: Adding notification:', notification);
    const newNotification: Notification = {
      ...notification,
      id: `global_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };

    this.notifications.unshift(newNotification);
    this.lastUpdateTime = Date.now();
    console.log('GlobalNotificationManager: Total notifications after add:', this.notifications.length);
    this.saveNotifications();
    this.notifyListeners();
    
    // Dispatch a custom event for immediate updates
    window.dispatchEvent(new CustomEvent('notificationsUpdated', {
      detail: { notifications: this.notifications, timestamp: this.lastUpdateTime }
    }));
  }

  // Mark notification as read
  markAsRead(id: string): void {
    this.notifications = this.notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.lastUpdateTime = Date.now();
    this.saveNotifications();
    this.notifyListeners();
    
    // Dispatch a custom event for immediate updates
    window.dispatchEvent(new CustomEvent('notificationsUpdated', {
      detail: { notifications: this.notifications, timestamp: this.lastUpdateTime }
    }));
  }

  // Remove notification
  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.lastUpdateTime = Date.now();
    this.saveNotifications();
    this.notifyListeners();
    
    // Dispatch a custom event for immediate updates
    window.dispatchEvent(new CustomEvent('notificationsUpdated', {
      detail: { notifications: this.notifications, timestamp: this.lastUpdateTime }
    }));
  }

  // Clear all notifications
  clearAllNotifications(): void {
    this.notifications = [];
    this.lastUpdateTime = Date.now();
    this.saveNotifications();
    this.notifyListeners();
    
    // Dispatch a custom event for immediate updates
    window.dispatchEvent(new CustomEvent('notificationsUpdated', {
      detail: { notifications: this.notifications, timestamp: this.lastUpdateTime }
    }));
  }

  // Subscribe to notification changes
  subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener);
    // Immediately call with current notifications
    listener(this.getNotifications());
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  private notifyListeners(): void {
    const notifications = this.getNotifications();
    console.log('GlobalNotificationManager: Notifying listeners with', notifications.length, 'notifications');
    this.listeners.forEach(listener => listener(notifications));
  }

  // Get unread count
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Get last update time
  getLastUpdateTime(): number {
    return this.lastUpdateTime;
  }

  // Check if there are new notifications since a given timestamp
  hasNewNotificationsSince(timestamp: number): boolean {
    return this.lastUpdateTime > timestamp;
  }

  removeNotificationsByType(type: Notification['type']): void {
    const initialLength = this.notifications.length;
    this.notifications = this.notifications.filter(notification => notification.type !== type);

    if (this.notifications.length === initialLength) {
      return;
    }

    this.lastUpdateTime = Date.now();
    this.saveNotifications();
    this.notifyListeners();

    window.dispatchEvent(new CustomEvent('notificationsUpdated', {
      detail: { notifications: this.notifications, timestamp: this.lastUpdateTime }
    }));
  }
}

export default GlobalNotificationManager; 