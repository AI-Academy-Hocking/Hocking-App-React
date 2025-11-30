import React, { useState } from 'react';
import { Link as RouterLink } from "wouter";
import { useNotifications } from '../lib/notifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Bell, Clock, Smartphone, Settings as SettingsIcon, Trash2, RefreshCw } from 'lucide-react';
import { Slider } from '../components/ui/slider';
import { useNotificationService } from '../hooks/use-notification-service';
import { useToast } from '../hooks/use-toast';

export default function Settings() {
  const { settings, updateSettings, clearAllNotifications, notifications } = useNotifications();
  const notificationService = useNotificationService();
  const { toast } = useToast();
  const [isTestingEvents, setIsTestingEvents] = useState(false);
  const [showEventToggleReminder, setShowEventToggleReminder] = useState(false);

  const handleSettingChange = (key: keyof typeof settings, value: boolean | number) => {
    updateSettings({ [key]: value });
    if ((key === 'eventNotifications' || key === 'pushNotifications') && value === true) {
      setShowEventToggleReminder(false);
    }
  };

  const handleTestNotifications = async () => {
    if (!settings.eventNotifications || !settings.pushNotifications) {
      setShowEventToggleReminder(true);
      toast({
        title: "Enable Event Notifications",
        description: "Turn on event notifications and push notifications before testing.",
        variant: "destructive",
      });
      return;
    }

    setShowEventToggleReminder(false);
    setIsTestingEvents(true);
    try {
      const created = await notificationService.triggerEventNotifications();
      if (created > 0) {
        toast({
          title: "Notifications Sent",
          description: `Queued ${created} upcoming event${created > 1 ? 's' : ''}.`,
        });
      } else {
        toast({
          title: "Unable to Find Events",
          description: (
            <span>
              Please try again later or{" "}
              <RouterLink href="/calendar">
                <a className="font-semibold underline underline-offset-2">view the calendar</a>
              </RouterLink>{" "}
              for full schedules.
            </span>
          ),
        });
      }
    } catch (error) {
      toast({
        title: "Unable to check events",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsTestingEvents(false);
    }
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
            </div>

            <Separator />

            {/* General */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">General</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <p className="text-sm text-gray-500">
                    Show the greeting notification when opening the app
                  </p>
                </div>
                <Switch
                  id="welcome-message"
                  checked={settings.welcomeMessageEnabled}
                  onCheckedChange={(checked) => handleSettingChange('welcomeMessageEnabled', checked)}
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
              
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-0.5 md:max-w-xl">
                  <Label>Test Event Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Manually check for upcoming events and create notifications
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleTestNotifications}
                  className="flex items-center gap-2 justify-center w-full md:w-auto"
                  disabled={isTestingEvents}
                >
                  <RefreshCw className={`h-4 w-4 ${isTestingEvents ? 'animate-spin' : ''}`} />
                  {isTestingEvents ? 'Checking…' : 'Check Events'}
                </Button>
              </div>
              {showEventToggleReminder && (
                <p className="text-sm text-red-500">
                  Turn on Event Notifications in the preferences above before testing.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
