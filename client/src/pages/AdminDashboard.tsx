import React, { useState } from 'react';
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
import { Send, Users, Bell, Shield, ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import GlobalNotificationManager from '../lib/globalNotifications';

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

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const globalManager = GlobalNotificationManager.getInstance();
  
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'medium' as const,
    scheduledFor: '',
  });

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

    // Add to global notification system
    console.log('AdminDashboard: Sending notification to global manager');
    globalManager.addNotification({
      title: formData.title,
      message: formData.message,
      type: 'custom',
      priority: formData.priority,
    });
    console.log('AdminDashboard: Notification sent to global manager');

    // Add to admin history
    const newNotification: AdminNotification = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      targetAudience: 'all',
      priority: formData.priority,
      status: 'sent',
      sentAt: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    toast({
      title: "Notification Sent",
      description: "Successfully sent notification to all users.",
    });

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

        {/* Stats and Recent Notifications */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Users</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Today</span>
                <span className="font-semibold">892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Notifications Sent</span>
                <span className="font-semibold">{notifications.filter(n => n.status === 'sent').length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
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