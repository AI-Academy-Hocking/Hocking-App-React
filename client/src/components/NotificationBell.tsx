import React, { useState } from 'react';
import { Bell, X, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '../lib/notifications';
import { useToast } from '../hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  // Listen for new notifications
  React.useEffect(() => {
    const handleNotificationUpdate = (event: CustomEvent) => {
      const newNotifications = event.detail.notifications;
      const previousCount = notifications.length;
      
      if (newNotifications.length > previousCount) {
        setHasNewNotifications(true);
        // Clear the indicator after 3 seconds
        setTimeout(() => setHasNewNotifications(false), 3000);
        
        // Show toast for new notifications
        const newCount = newNotifications.length - previousCount;
        toast({
          title: "New Notification" + (newCount > 1 ? "s" : ""),
          description: `You have ${newCount} new notification${newCount > 1 ? "s" : ""}`,
        });
      }
    };

    window.addEventListener('notificationsUpdated', handleNotificationUpdate as EventListener);
    return () => {
      window.removeEventListener('notificationsUpdated', handleNotificationUpdate as EventListener);
    };
  }, [notifications.length, toast]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return '📅';
      case 'academic':
        return '🎓';
      case 'custom':
        return '📢';
      case 'system':
        return '⚙️';
      default:
        return '📌';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative ${hasNewNotifications ? 'animate-pulse' : ''}`}
      >
        <Bell className={`h-5 w-5 ${hasNewNotifications ? 'text-blue-500' : ''}`} />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <span className="text-lg">{getTypeIcon(notification.type)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {notification.title}
                              </h4>
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                              </span>
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNotificationClick(notification.id);
                                    }}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 