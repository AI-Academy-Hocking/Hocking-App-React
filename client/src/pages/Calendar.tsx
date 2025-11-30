import { useState, useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar as BigCalendar, dateFnsLocalizer, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../styles/big-calendar.css";
import { format, parse, startOfWeek, getDay, addDays, addWeeks, addMonths, addYears, subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay } from "date-fns";
import enUS from 'date-fns/locale/en-US';

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, RefreshCw } from "lucide-react";
import { Event } from "../../../shared/schema";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<View>('month' as View);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState<"academic" | "activities">("academic");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all events for calendar view
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ['/api/events', activeCalendar],
    staleTime: 6 * 60 * 60 * 1000, // 6 hours
    queryFn: async () => {
      const res = await fetch(`/api/calendar/events?type=${activeCalendar}`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
  });

  // Convert events to BigCalendar format
  const calendarEvents = useMemo(() => {
    return events.map(event => ({
      title: event.title,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      resource: event,
    }));
  }, [events]);

  // Navigation handlers
  const handleNavigate = useCallback((action: 'PREV' | 'NEXT' | 'TODAY') => {
    let newDate = new Date(currentDate);
    
    if (action === 'TODAY') {
      newDate = new Date();
    } else if (action === 'PREV') {
      switch (view) {
        case 'day':
          newDate = subDays(currentDate, 1);
          break;
        case 'week':
          newDate = subWeeks(currentDate, 1);
          break;
        case 'month':
          newDate = subMonths(currentDate, 1);
          break;
      }
    } else if (action === 'NEXT') {
      switch (view) {
        case 'day':
          newDate = addDays(currentDate, 1);
          break;
        case 'week':
          newDate = addWeeks(currentDate, 1);
          break;
        case 'month':
          newDate = addMonths(currentDate, 1);
          break;
      }
    }
    
    setCurrentDate(newDate);
  }, [currentDate, view]);

  // Get header text based on current view
  const getHeaderText = useCallback(() => {
    switch (view) {
      case 'day':
        return format(currentDate, 'EEE, MMM d, yyyy');
      case 'week':
        const weekStart = startOfWeek(currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return format(currentDate, 'MMMM yyyy');
    }
  }, [currentDate, view]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetch('/api/calendar/refresh', { method: 'POST' });
      await queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Calendar Refreshed",
        description: "Events have been updated from Google Calendar",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Could not refresh calendar events",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectEvent = useCallback((event: any) => {
    setSelectedEvent(event.resource);
    setShowEventModal(true);
  }, []);

  return (
    <div className="min-h-screen dark:bg-popover pb-6">
      {/* Page Header - Mobile Optimized */}
      <section className="text-center mb-4 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-blue-300 mb-2">
          Calendar
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-300">
          Stay up-to-date with campus events
        </p>
      </section>

      {/* Calendar Type Toggle & Refresh - Mobile Optimized */}
      <section className="max-w-7xl mx-auto mb-4 px-2">
        <div className="space-y-3">
          {/* Calendar Type Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={activeCalendar === "academic" ? "default" : "ghost"}
              onClick={() => setActiveCalendar("academic")}
              className={cn(
                "rounded-xl py-3 font-medium transition-all text-sm sm:text-base",
                activeCalendar === "academic" 
                  ? "bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 text-white" 
                  : "border-2 border-blue-500 dark:border-gray-700 text-blue-600 dark:text-blue-300"
              )}
            >
              Academic
            </Button>
            <Button 
              variant={activeCalendar === "activities" ? "default" : "ghost"}
              onClick={() => setActiveCalendar("activities")}
              className={cn(
                "rounded-xl py-3 font-medium transition-all text-sm sm:text-base",
                activeCalendar === "activities" 
                  ? "bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 text-white" 
                  : "border-2 border-blue-500 dark:border-gray-700 text-blue-600 dark:text-blue-300"
              )}
            >
              Activities
            </Button>
          </div>
          
          {/* Refresh Button */}
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full rounded-xl py-3 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Refreshing..." : "Refresh Events"}
          </Button>
        </div>
      </section>

      {/* Main Calendar Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <Card className="border-2 border-blue-500 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-2 sm:p-4 md:p-6">
            {/* Custom Toolbar - Mobile Optimized */}
            <div className="space-y-3 mb-4">
              {/* Row 1: Navigation Header (back/forward with date) */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  onClick={() => handleNavigate('PREV')}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded px-2 flex-shrink-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <div className="flex-1 px-2 py-1 text-center font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 overflow-hidden">
                  <div className="truncate">{getHeaderText()}</div>
                </div>
                
                <Button
                  onClick={() => handleNavigate('NEXT')}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded px-2 flex-shrink-0"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Row 2: Today Button and View Selector */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleNavigate('TODAY')}
                  className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg w-full"
                >
                  Today
                </Button>
                
                <Select value={view as string} onValueChange={(val) => setView(val as View)}>
                  <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem value="day" className="dark:text-gray-200 dark:focus:bg-gray-600">Day</SelectItem>
                    <SelectItem value="week" className="dark:text-gray-200 dark:focus:bg-gray-600">Week</SelectItem>
                    <SelectItem value="month" className="dark:text-gray-200 dark:focus:bg-gray-600">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Calendar Component */}
            <div className="calendar-container" style={{ height: '600px' }}>
              <BigCalendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                view={view}
                onView={setView}
                date={currentDate}
                onNavigate={setCurrentDate}
                onSelectEvent={handleSelectEvent}
                toolbar={false}
                views={['day', 'week', 'month']}
                style={{ height: '100%' }}
                eventPropGetter={() => ({
                  className: 'bg-blue-600 dark:bg-blue-700 text-white border-blue-700 dark:border-blue-800',
                })}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center p-2 z-50 bg-black/50">
          <Card className="w-full max-w-sm sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-hidden border-2 border-blue-500 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
            <CardContent className="p-0">
              {/* Modal Header */}
              <div className="bg-blue-900 dark:bg-blue-950 text-white p-4 sm:p-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 break-words">
                    {selectedEvent.title}
                  </h3>
                  <div className="text-blue-100 text-sm sm:text-base">
                    {activeCalendar === "academic" ? "Academic Calendar" : "Student Activities"}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-medium">
                        {format(new Date(selectedEvent.startTime), 'EEEE, MMMM d, yyyy')}
                      </div>
                      <div className="text-sm">
                        {format(new Date(selectedEvent.startTime), 'h:mm a')} - {format(new Date(selectedEvent.endTime), 'h:mm a')}
                      </div>
                    </div>
                  </div>

                  {selectedEvent.location && selectedEvent.location !== "No Location" && (
                    <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}

                  {selectedEvent.description && selectedEvent.description !== "No Description" && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Description</h4>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedEvent.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t dark:border-gray-700 flex justify-end">
                <Button
                  onClick={() => setShowEventModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
