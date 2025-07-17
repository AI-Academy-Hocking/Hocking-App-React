import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  type: 'academic' | 'social' | 'housing' | 'career' | 'wellness';
}

interface UpcomingEventsWidgetProps {
  events: Event[];
}

export function UpcomingEventsWidget({ events }: UpcomingEventsWidgetProps) {
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'social':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'housing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'career':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'wellness':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Upcoming Events</h4>
      {events.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No upcoming events</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                  {event.title}
                </h5>
                <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {event.description}
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Users className="h-3 w-3" />
                  <span>
                    {event.attendees}
                    {event.maxAttendees && ` / ${event.maxAttendees}`} attending
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 