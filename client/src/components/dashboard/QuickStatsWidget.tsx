import React from 'react';
import { TrendingUp, Users, Calendar, Award } from 'lucide-react';

interface QuickStatsWidgetProps {
  stats: {
    loginStreak: number;
    studyHours: number;
    eventsAttended: number;
    achievements: number;
  };
}

export function QuickStatsWidget({ stats }: QuickStatsWidgetProps) {
  const statItems = [
    {
      label: 'Login Streak',
      value: stats.loginStreak,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Study Hours',
      value: stats.studyHours,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      label: 'Events',
      value: stats.eventsAttended,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      label: 'Achievements',
      value: stats.achievements,
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {statItems.map((item, index) => (
        <div key={index} className="text-center p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.bgColor} mb-2`}>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {item.value}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
} 