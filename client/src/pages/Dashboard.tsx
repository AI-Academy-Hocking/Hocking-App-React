import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, Trophy, TrendingUp, Calendar, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardWidget, WidgetConfig } from '@/components/dashboard/DashboardWidget';
import { QuickStatsWidget } from '@/components/dashboard/QuickStatsWidget';
import { RecentActivityWidget } from '@/components/dashboard/RecentActivityWidget';
import { UpcomingEventsWidget } from '@/components/dashboard/UpcomingEventsWidget';
import { BadgeSystem, BadgeData } from '@/components/achievements/BadgeSystem';

// Mock data - in real app, this would come from API
const mockStats = {
  loginStreak: 7,
  studyHours: 24,
  eventsAttended: 5,
  achievements: 12
};

const mockActivities = [
  {
    id: '1',
    type: 'social' as const,
    title: 'Joined Study Group',
    description: 'You joined "Advanced Math Study Group"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    icon: Users
  },
  {
    id: '2',
    type: 'achievement' as const,
    title: 'First Week Complete!',
    description: 'You earned the "Week Warrior" badge',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: Award
  },
  {
    id: '3',
    type: 'event' as const,
    title: 'Campus Tour',
    description: 'You attended the campus orientation tour',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    icon: Calendar
  }
];

const mockEvents = [
  {
    id: '1',
    title: 'Study Group Meeting',
    description: 'Weekly math study session',
    date: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    time: '2:00 PM',
    location: 'Library Study Room 3',
    attendees: 8,
    maxAttendees: 12,
    type: 'academic' as const
  },
  {
    id: '2',
    title: 'Housing Social',
    description: 'Meet your neighbors!',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
    time: '6:00 PM',
    location: 'Common Room',
    attendees: 15,
    maxAttendees: 20,
    type: 'social' as const
  },
  {
    id: '3',
    title: 'Career Fair Prep',
    description: 'Resume workshop and interview tips',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // Day after tomorrow
    time: '3:00 PM',
    location: 'Career Center',
    attendees: 25,
    maxAttendees: 30,
    type: 'career' as const
  }
];

const mockBadges: BadgeData[] = [
  {
    id: '1',
    name: 'Week Warrior',
    description: 'Complete your first week of classes',
    category: 'academic',
    icon: Award,
    criteria: ['Attend 5 classes', 'Complete first assignment'],
    unlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Social Butterfly',
    description: 'Join 3 study groups or clubs',
    category: 'social',
    icon: Users,
    criteria: ['Join 3 groups', 'Attend 5 meetings'],
    unlocked: false,
    progress: 2,
    maxProgress: 3,
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Housing Hero',
    description: 'Complete all housing requirements',
    category: 'housing',
    icon: Award,
    criteria: ['Submit application', 'Complete orientation', 'Move in'],
    unlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'Wellness Champion',
    description: 'Maintain wellness streak for 30 days',
    category: 'wellness',
    icon: Award,
    criteria: ['Log wellness activities', '30 day streak'],
    unlocked: false,
    progress: 15,
    maxProgress: 30,
    rarity: 'legendary'
  }
];

// Default widget configuration
const defaultWidgets: WidgetConfig[] = [
  {
    id: 'stats',
    type: 'stats',
    title: 'Quick Stats',
    size: 'medium',
    position: { x: 0, y: 0 },
    enabled: true
  },
  {
    id: 'activity',
    type: 'activity',
    title: 'Recent Activity',
    size: 'large',
    position: { x: 2, y: 0 },
    enabled: true
  },
  {
    id: 'events',
    type: 'events',
    title: 'Upcoming Events',
    size: 'medium',
    position: { x: 0, y: 1 },
    enabled: true
  }
];

export default function Dashboard() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    const saved = localStorage.getItem('dashboard-widgets');
    return saved ? JSON.parse(saved) : defaultWidgets;
  });
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (type: WidgetConfig['type']) => {
    const newWidget: WidgetConfig = {
      id: `${type}-${Date.now()}`,
      type,
      title: getWidgetTitle(type),
      size: 'medium',
      position: { x: 0, y: widgets.length },
      enabled: true
    };
    setWidgets([...widgets, newWidget]);
    setShowWidgetSelector(false);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const getWidgetTitle = (type: WidgetConfig['type']) => {
    switch (type) {
      case 'stats':
        return 'Quick Stats';
      case 'activity':
        return 'Recent Activity';
      case 'events':
        return 'Upcoming Events';
      case 'weather':
        return 'Weather';
      case 'achievements':
        return 'Achievements';
      case 'study':
        return 'Study Tracker';
      case 'wellness':
        return 'Wellness Tracker';
      default:
        return 'Widget';
    }
  };

  const renderWidget = (widget: WidgetConfig) => {
    switch (widget.type) {
      case 'stats':
        return <QuickStatsWidget stats={mockStats} />;
      case 'activity':
        return <RecentActivityWidget activities={mockActivities} />;
      case 'events':
        return <UpcomingEventsWidget events={mockEvents} />;
      case 'achievements':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white">Recent Achievements</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAchievements(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                View All
              </Button>
            </div>
            <div className="space-y-2">
              {mockBadges.filter(b => b.unlocked).slice(0, 3).map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <badge.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{badge.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{badge.description}</p>
                  </div>
                  <Badge className={`text-xs ${
                    badge.rarity === 'legendary' ? 'bg-yellow-500 text-white' :
                    badge.rarity === 'epic' ? 'bg-purple-500 text-white' :
                    badge.rarity === 'rare' ? 'bg-blue-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {badge.rarity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="text-center text-gray-500">Widget content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, Student!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening on campus today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAchievements(true)}
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                Achievements
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowWidgetSelector(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Widget
              </Button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <Card className="border-2 border-blue-600">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {mockStats.loginStreak}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {mockStats.achievements}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {mockEvents.length}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Upcoming Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {mockActivities.length}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Recent Activities</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
          <AnimatePresence>
            {widgets.map((widget) => (
              <DashboardWidget
                key={widget.id}
                config={widget}
                onRemove={removeWidget}
                onConfigChange={() => {}}
              >
                {renderWidget(widget)}
              </DashboardWidget>
            ))}
          </AnimatePresence>
        </div>

        {/* Widget Selector Modal */}
        {showWidgetSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Add Widget
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: 'stats' as const, icon: TrendingUp, label: 'Quick Stats' },
                  { type: 'activity' as const, icon: Users, label: 'Activity Feed' },
                  { type: 'events' as const, icon: Calendar, label: 'Events' },
                  { type: 'achievements' as const, icon: Award, label: 'Achievements' }
                ].map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => addWidget(type)}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <Icon className="h-6 w-6 text-blue-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {label}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowWidgetSelector(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Achievements Modal */}
        {showAchievements && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Achievements
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setShowAchievements(false)}
                >
                  Close
                </Button>
              </div>
              <BadgeSystem 
                badges={mockBadges}
                onBadgeClick={(badge) => {
                  console.log('Badge clicked:', badge);
                }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 