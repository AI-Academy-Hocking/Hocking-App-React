import React, { useCallback, useMemo, useState } from 'react';
import { useAuth } from '../lib/auth';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Send, Bell, Shield, ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import GlobalNotificationManager from '../lib/globalNotifications';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

interface AdminNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'students' | 'faculty' | 'staff';
  priority: 'low' | 'medium' | 'high';
  scheduledFor?: Date;
  sentAt?: Date;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
}

type SendableNotification = Pick<
  AdminNotification,
  'id' | 'title' | 'message' | 'targetAudience' | 'priority' | 'scheduledFor'
>;

const HISTORY_STORAGE_KEY = 'adminNotificationsHistory';
const SCHEDULED_STORAGE_KEY = 'adminScheduledNotifications';

const parseStoredNotifications = (stored: any[] | null): AdminNotification[] => {
  if (!stored) return [];
  return stored.map((notification) => ({
    ...notification,
    scheduledFor: notification.scheduledFor ? new Date(notification.scheduledFor) : undefined,
    sentAt: notification.sentAt ? new Date(notification.sentAt) : undefined,
  }));
};

const safeGetFromStorage = (key: string) => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Failed to read ${key} from localStorage`, error);
    return null;
  }
};

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const globalManager = GlobalNotificationManager.getInstance();
  
  const [notifications, setNotifications] = useState<AdminNotification[]>(() =>
    parseStoredNotifications(safeGetFromStorage(HISTORY_STORAGE_KEY))
  );
  const [scheduledNotifications, setScheduledNotifications] = useState<AdminNotification[]>(() =>
    parseStoredNotifications(safeGetFromStorage(SCHEDULED_STORAGE_KEY))
  );
  const [isHistoryDialogOpen, setHistoryDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'medium' as const,
    scheduledFor: '',
  });

  // Persist history + scheduled notifications
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SCHEDULED_STORAGE_KEY, JSON.stringify(scheduledNotifications));
  }, [scheduledNotifications]);

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin) {
      setLocation('/home');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
    }
  }, [isAdmin, setLocation, toast]);

  if (!isAdmin) {
    return null;
  }

  const sendNotificationNow = useCallback(
    (notificationData: SendableNotification, showToast = true) => {
      console.log('AdminDashboard: Sending notification to global manager');
      globalManager.addNotification({
        title: notificationData.title,
        message: notificationData.message,
        type: 'custom',
        priority: notificationData.priority,
      });
      console.log('AdminDashboard: Notification sent to global manager');

      const newNotification: AdminNotification = {
        ...notificationData,
        id: notificationData.id ?? Date.now().toString(),
        status: 'sent',
        sentAt: new Date(),
      };

      setNotifications((prev) => [newNotification, ...prev]);

      if (showToast) {
        toast({
          title: 'Notification Sent',
          description: 'Successfully sent notification to all users.',
        });
      }
    },
    [globalManager, toast]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const scheduledDate = formData.scheduledFor ? new Date(formData.scheduledFor) : null;

    if (scheduledDate && isNaN(scheduledDate.getTime())) {
      toast({
        title: 'Invalid Schedule',
        description: 'Please provide a valid future date and time.',
        variant: 'destructive',
      });
      return;
    }

    if (scheduledDate && scheduledDate > new Date()) {
      const scheduledNotification: AdminNotification = {
        id: Date.now().toString(),
        title: formData.title,
        message: formData.message,
        targetAudience: 'all',
        priority: formData.priority,
        status: 'scheduled',
        scheduledFor: scheduledDate,
      };

      setScheduledNotifications((prev) =>
        [...prev, scheduledNotification].sort(
          (a, b) =>
            (a.scheduledFor?.getTime() ?? 0) - (b.scheduledFor?.getTime() ?? 0)
        )
      );

      toast({
        title: 'Notification Scheduled',
        description: 'It will be delivered automatically at the scheduled time.',
      });
    } else {
      sendNotificationNow(
        {
          id: Date.now().toString(),
          title: formData.title,
          message: formData.message,
          targetAudience: 'all',
          priority: formData.priority,
        },
        true
      );
    }

    // Reset form
    setFormData({
      title: '',
      message: '',
      priority: 'medium',
      scheduledFor: '',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDateTime = (date?: Date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  const cancelScheduledNotification = (id: string) => {
    setScheduledNotifications((prev) => prev.filter((notification) => notification.id !== id));
    toast({
      title: 'Scheduled notification removed',
      description: 'It will no longer be sent.',
    });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setScheduledNotifications((prev) => {
        if (!prev.length) return prev;

        const now = new Date();
        const remaining: AdminNotification[] = [];

        prev.forEach((notification) => {
          if (notification.scheduledFor && notification.scheduledFor <= now) {
            sendNotificationNow(notification, false);
          } else {
            remaining.push(notification);
          }
        });

        return remaining;
      });
    }, 15000); // check every 15 seconds

    return () => clearInterval(interval);
  }, [sendNotificationNow]);

  const sortedScheduled = useMemo(
    () =>
      [...scheduledNotifications].sort(
        (a, b) => (a.scheduledFor?.getTime() ?? 0) - (b.scheduledFor?.getTime() ?? 0)
      ),
    [scheduledNotifications]
  );

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return notifications;
    const lowerQuery = searchQuery.toLowerCase();
    return notifications.filter(
      (notification) =>
        notification.title.toLowerCase().includes(lowerQuery) ||
        notification.message.toLowerCase().includes(lowerQuery)
    );
  }, [notifications, searchQuery]);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => setLocation('/home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage notifications and system settings
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send Notification Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Push Notification
              </CardTitle>
              <CardDescription>
                Send a notification to all users or specific audience groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Notification Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter notification title"
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter notification message"
                    rows={4}
                    maxLength={500}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduledFor">Schedule For (Optional)</Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                  />
                  <p className="text-sm text-gray-500">
                    Leave empty to send immediately
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled and Recent Notifications */}
        <div className="space-y-6">
          {/* Scheduled Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Scheduled Notifications
              </CardTitle>
              <CardDescription>Notifications waiting to be delivered</CardDescription>
            </CardHeader>
            <CardContent>
              {!sortedScheduled.length ? (
                <p className="text-sm text-gray-500 text-center py-4">No scheduled notifications</p>
              ) : (
                <div className="space-y-3">
                  {sortedScheduled.map((notification) => (
                    <div key={notification.id} className="space-y-2 rounded-md border p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold truncate">{notification.title}</h4>
                          <p className="text-xs text-gray-500 truncate">{notification.message}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => cancelScheduledNotification(notification.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>Scheduled for: {formatDateTime(notification.scheduledFor)}</span>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Notifications
                </CardTitle>
                <Dialog open={isHistoryDialogOpen} onOpenChange={setHistoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      See All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Notification History</DialogTitle>
                      <DialogDescription>
                        Search every notification that has been sent.
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search by title or message"
                      className="mb-4"
                    />
                    <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-2">
                      {!filteredHistory.length ? (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No notifications match your search.
                        </p>
                      ) : (
                        filteredHistory.map((notification) => (
                          <div key={notification.id} className="space-y-1 rounded-md border p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold">{notification.title}</h4>
                                <p className="text-xs text-gray-500">{notification.message}</p>
                              </div>
                              <div className="text-xs text-gray-500">
                                Sent {formatDateTime(notification.sentAt)}
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              <Badge variant="secondary">{notification.targetAudience}</Badge>
                              {notification.scheduledFor && (
                                <Badge variant="outline">
                                  Scheduled {formatDateTime(notification.scheduledFor)}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>Most recent notifications appear first</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No notifications sent yet
                </p>
              ) : (
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {getStatusIcon(notification.status)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        <Badge variant="secondary">
                          {notification.targetAudience}
                        </Badge>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
