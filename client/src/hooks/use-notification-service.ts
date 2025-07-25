import { useEffect } from 'react';
import { useNotifications } from '../lib/notifications';
import NotificationService from '../lib/notificationService';

export function useNotificationService() {
  const { addNotification, settings } = useNotifications();

  useEffect(() => {
    // Initialize the notification service
    const service = NotificationService.getInstance();
    service.initialize(addNotification, settings);

    // Cleanup on unmount
    return () => {
      service.stop();
    };
  }, [addNotification, settings]);

  return NotificationService.getInstance();
} 