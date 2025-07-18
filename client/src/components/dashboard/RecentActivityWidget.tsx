import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Activity {
  id: string;
  type: 'social' | 'event' | 'study' | 'group';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ComponentType<any>;
}

interface RecentActivityWidgetProps {
  activities: Activity[];
}

export function RecentActivityWidget({ activities }: RecentActivityWidgetProps) {
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'social':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'event':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'study':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'group':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h4>
      {activities.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-2">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {activity.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 