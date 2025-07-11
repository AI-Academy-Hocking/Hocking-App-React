// Notification Service for Campus Social Hub
// Handles push notifications and notification counters

export interface Notification {
  id: string;
  type: 'post_approved' | 'post_rejected' | 'new_post' | 'system' | 'event';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  data?: {
    postId?: string;
    authorId?: string;
    eventId?: string;
    [key: string]: any;
  };
}

class NotificationService {
  private notifications: Notification[] = [];
  private unreadCount: number = 0;
  private isSupported: boolean = false;
  private permission: NotificationPermission = 'default';

  constructor() {
    this.checkSupport();
    this.loadNotifications();
  }

  private async checkSupport() {
    // Check if notifications are supported
    this.isSupported = 'Notification' in window;
    
    if (this.isSupported) {
      this.permission = Notification.permission;
      
      // Request permission if not granted
      if (this.permission === 'default') {
        this.permission = await Notification.requestPermission();
      }
    }
  }

  private loadNotifications() {
    try {
      const stored = localStorage.getItem('campus_social_notifications');
      if (stored) {
        this.notifications = JSON.parse(stored).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        this.updateUnreadCount();
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  private saveNotifications() {
    try {
      localStorage.setItem('campus_social_notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  private updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  }

  // Get all notifications
  public getNotifications(): Notification[] {
    return [...this.notifications].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Get unread notifications
  public getUnreadNotifications(): Notification[] {
    return this.notifications.filter(n => !n.isRead);
  }

  // Get unread count
  public getUnreadCount(): number {
    return this.unreadCount;
  }

  // Add a new notification
  public addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>): string {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      isRead: false
    };

    this.notifications.unshift(newNotification);
    this.updateUnreadCount();
    this.saveNotifications();

    // Send push notification if supported and permitted
    this.sendPushNotification(newNotification);

    return id;
  }

  // Mark notification as read
  public markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.updateUnreadCount();
      this.saveNotifications();
    }
  }

  // Mark all notifications as read
  public markAllAsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
    this.updateUnreadCount();
    this.saveNotifications();
  }

  // Delete a notification
  public deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.updateUnreadCount();
    this.saveNotifications();
  }

  // Clear all notifications
  public clearAllNotifications(): void {
    this.notifications = [];
    this.updateUnreadCount();
    this.saveNotifications();
  }

  // Send push notification
  private sendPushNotification(notification: Notification): void {
    if (!this.isSupported || this.permission !== 'granted') {
      return;
    }

    try {
      const pushNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/HawkLogo.png', // Use your app icon
        badge: '/HawkLogo.png',
        tag: notification.id,
        requireInteraction: notification.type === 'post_rejected',
        data: notification.data
      });

      // Auto-close after 5 seconds (except for important notifications)
      if (notification.type !== 'post_rejected') {
        setTimeout(() => {
          pushNotification.close();
        }, 5000);
      }

      // Handle click on notification
      pushNotification.onclick = () => {
        window.focus();
        pushNotification.close();
        
        // Navigate to appropriate page based on notification type
        if (notification.data?.postId) {
          window.location.href = `/housing/social?post=${notification.data.postId}`;
        } else {
          window.location.href = '/housing/social';
        }
      };
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  // Request notification permission
  public async requestPermission(): Promise<boolean> {
    if (!this.isSupported) {
      return false;
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Check if notifications are supported and permitted
  public isNotificationSupported(): boolean {
    return this.isSupported && this.permission === 'granted';
  }

  // Create notification for post approval
  public notifyPostApproved(postId: string, authorName: string, postContent: string): string {
    return this.addNotification({
      type: 'post_approved',
      title: '🎉 Post Approved!',
      message: `Your post "${postContent.substring(0, 50)}..." has been approved and is now live!`,
      data: { postId, authorName }
    });
  }

  // Create notification for post rejection
  public notifyPostRejected(postId: string, authorName: string, postContent: string, reason?: string): string {
    return this.addNotification({
      type: 'post_rejected',
      title: '❌ Post Rejected',
      message: `Your post "${postContent.substring(0, 50)}..." was rejected.${reason ? ` Reason: ${reason}` : ''}`,
      data: { postId, authorName, reason }
    });
  }

  // Create notification for new post (for all users)
  public notifyNewPost(postId: string, authorName: string, postType: string, postContent: string): string {
    return this.addNotification({
      type: 'new_post',
      title: `📝 New ${postType.charAt(0).toUpperCase() + postType.slice(1)} Post`,
      message: `${authorName} posted: "${postContent.substring(0, 50)}..."`,
      data: { postId, authorName, postType }
    });
  }

  // Create system notification
  public notifySystem(title: string, message: string, data?: any): string {
    return this.addNotification({
      type: 'system',
      title,
      message,
      data
    });
  }

  // Create event notification
  public notifyEvent(eventId: string, eventTitle: string, eventDate: string): string {
    return this.addNotification({
      type: 'event',
      title: '📅 New Event',
      message: `${eventTitle} on ${eventDate}`,
      data: { eventId, eventTitle, eventDate }
    });
  }

  // Subscribe to real-time notifications (WebSocket simulation)
  public subscribeToNotifications(userId: string): void {
    // In a real implementation, this would connect to a WebSocket
    // For now, we'll simulate real-time notifications
    setInterval(() => {
      // Simulate receiving notifications
      // This would be replaced with actual WebSocket events
    }, 30000); // Check every 30 seconds
  }

  // Get notification statistics
  public getNotificationStats() {
    const total = this.notifications.length;
    const unread = this.unreadCount;
    const read = total - unread;
    const byType = this.notifications.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      unread,
      read,
      byType
    };
  }
}

// Export singleton instance
export const notificationService = new NotificationService(); 