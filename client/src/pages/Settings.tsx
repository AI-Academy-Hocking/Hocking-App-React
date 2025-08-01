import React from 'react';
import { useNotifications } from '../lib/notifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Bell, Clock, Mail, Smartphone, Settings as SettingsIcon, Trash2, RefreshCw } from 'lucide-react';
import { Slider } from '../components/ui/slider';
import { useNotificationService } from '../hooks/use-notification-service';

export default function Settings() {
  const { settings, updateSettings, clearAllNotifications, notifications } = useNotifications();
  const notificationService = useNotificationService();

  const handleSettingChange = (key: keyof typeof settings, value: boolean | number) => {
    updateSettings({ [key]: value });
  };

  const handleTestNotifications = async () => {
    await notificationService.triggerEventNotifications();
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your notification preferences and app settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose which types of notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-notifications">Event Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Get notified about upcoming campus events and activities
                  </p>
                </div>
                <Switch
                  id="event-notifications"
                  checked={settings.eventNotifications}
                  onCheckedChange={(checked) => handleSettingChange('eventNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="academic-notifications">Academic Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive updates about academic deadlines, exams, and important dates
                  </p>
                </div>
                <Switch
                  id="academic-notifications"
                  checked={settings.academicNotifications}
                  onCheckedChange={(checked) => handleSettingChange('academicNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-notifications">Custom Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive announcements and updates from administrators
                  </p>
                </div>
                <Switch
                  id="custom-notifications"
                  checked={settings.customNotifications}
                  onCheckedChange={(checked) => handleSettingChange('customNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-notifications">System Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Get notified about app updates and maintenance
                  </p>
                </div>
                <Switch
                  id="system-notifications"
                  checked={settings.systemNotifications}
                  onCheckedChange={(checked) => handleSettingChange('systemNotifications', checked)}
                />
              </div>
            </div>

            <Separator />

            {/* Delivery Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Delivery Methods</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications in the app
                    </p>
                  </div>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
            </div>

            <Separator />

            {/* Reminder Timing */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <Label>Event Reminder Time</Label>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>5 minutes</span>
                  <span>{settings.reminderTime} minutes</span>
                  <span>60 minutes</span>
                </div>
                <Slider
                  value={[settings.reminderTime]}
                  onValueChange={(value) => handleSettingChange('reminderTime', value[0])}
                  max={60}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Get notified this many minutes before events start
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Notification Management
            </CardTitle>
            <CardDescription>
              Manage your existing notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Clear All Notifications</Label>
                  <p className="text-sm text-gray-500">
                    You have {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={clearAllNotifications}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Test Event Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Manually check for upcoming events and create notifications
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleTestNotifications}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Check Events
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
