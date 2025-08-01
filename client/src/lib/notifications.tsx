import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Notification, NotificationSettings } from '../types/notifications';
import NotificationService from './notificationService';
import GlobalNotificationManager from './globalNotifications';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  settings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const defaultSettings: NotificationSettings = {
  eventNotifications: true,
  academicNotifications: true,
  customNotifications: true,
  systemNotifications: true,
  emailNotifications: false,
  pushNotifications: true,
  reminderTime: 30, // 30 minutes before event
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const globalManager = GlobalNotificationManager.getInstance();

  // Subscribe to global notifications and set up continuous polling
  useEffect(() => {
    const unsubscribe = globalManager.subscribe((globalNotifications) => {
      console.log('NotificationContext: Received update with', globalNotifications.length, 'notifications');
      setNotifications(globalNotifications);
    });

    // Listen for immediate notification updates via custom event
    const handleNotificationUpdate = (event: CustomEvent) => {
      console.log('NotificationContext: Received immediate update via custom event');
      setNotifications(event.detail.notifications);
    };

    window.addEventListener('notificationsUpdated', handleNotificationUpdate as EventListener);

    // Set up continuous polling to check for new notifications every 1 second
    const pollInterval = setInterval(() => {
      const currentNotifications = globalManager.getNotifications();
      setNotifications(currentNotifications);
    }, 1000);

    return () => {
      unsubscribe();
      window.removeEventListener('notificationsUpdated', handleNotificationUpdate as EventListener);
      clearInterval(pollInterval);
    };
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('notificationSettings');
    
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (error) {
        console.error('Error parsing stored settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    // Update notification service with new settings
    NotificationService.getInstance().initialize(addNotification, settings);
  }, [settings]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    globalManager.addNotification(notification);
  };

  const markAsRead = (id: string) => {
    globalManager.markAsRead(id);
  };

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        globalManager.markAsRead(notification.id);
      }
    });
  };

  const removeNotification = (id: string) => {
    globalManager.removeNotification(id);
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const clearAllNotifications = () => {
    globalManager.clearAllNotifications();
  };

  const unreadCount = globalManager.getUnreadCount();

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        settings,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        updateSettings,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 