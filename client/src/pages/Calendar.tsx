import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.css";
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import { enUS } from "date-fns/locale";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Info } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { Event } from "../../../shared/schema";
import { cn } from "../lib/utils";
import { Badge } from "../components/ui/badge";
import { Link } from "wouter";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CALENDAR_URL = "/api/calendar/events";

interface CalendarEvent {
  id: string;
  title: string;
  date: string | undefined;
  time: string;
  end: string | undefined;
  location: string;
  description: string;
}

// Custom gutter header for day view to show abbreviated day of the week
const CustomTimeGutterHeader = ({ date }: any) => (
  <div className="text-base font-bold text-white text-center py-2">
    {format(date, 'EEE')}
  </div>
);

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<"month" | "list">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeCalendar, setActiveCalendar] = useState<"academic" | "activities">("academic");
  const [error, setError] = useState<string | null>(null);
  
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', activeCalendar],
    // In a real app, you would fetch different events based on activeCalendar
    // by adding a parameter to the API endpoint
  });

  // Get current month's start and end dates
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  // Format events for the BigCalendar
  const formattedEvents = events.map(event => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    
    return {
      title: event.title || "Untitled Event",
      start: startDate,
      end: endDate,
      resource: { 
        location: event.location || "No Location", 
        description: event.description || "No Description",
        id: event.id,
        originalEvent: event
      },
    };
  });

  // Filter events based on calendar type and date range
  const getFilteredEvents = (calendarType: "academic" | "activities") => {
    return events
      .filter(event => {
        // In a real implementation, each event would have a 'calendarType' property
        // For now, we're using an empty array so no events will show
        return false;
        
        // When you add real events, uncomment this code:
        /*
        const eventDate = new Date(event.startTime);
        if (selectedDate) {
          return isSameDay(eventDate, selectedDate);
        }
        return eventDate >= monthStart && eventDate <= monthEnd;
        */
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };

  // Get events for both calendar types
  const academicEvents = getFilteredEvents("academic");
  const activityEvents = getFilteredEvents("activities");
  
  // Use the active calendar to determine which events to show in the main view
  const filteredEvents = activeCalendar === "academic" ? academicEvents : activityEvents;

  // Format date for display
  const formatEventDate = (date: string | Date) => {
    const eventDate = new Date(date);
    return {
      weekday: eventDate.toLocaleString('en-US', { weekday: 'short' }),
      month: eventDate.toLocaleString('en-US', { month: 'short' }),
      day: eventDate.getDate()
    };
  };

  // Navigate between months
  const handlePreviousMonth = () => {
    setDate(subMonths(date, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
    setSelectedDate(null);
  };

  // Handle date selection
  const handleDateSelect = (slotInfo: any) => {
    setSelectedDate(slotInfo.start);
  };

  // Custom day renderer for the calendar
  const dayPropGetter = (date: Date) => {
    const hasEvents = events.some(event => isSameDay(new Date(event.startTime), date));
    const isSelectedDay = selectedDate && isSameDay(date, selectedDate);
    const isTodayDate = isToday(date);
    
    return {
      className: cn(
        hasEvents && "has-events",
        isSelectedDay && "selected-day",
        isTodayDate && "today-date"
      ),
      style: {
        backgroundColor: isSelectedDay ? 'var(--primary-light)' : undefined,
        color: isSelectedDay ? 'white' : undefined,
        borderRadius: isSelectedDay ? '50%' : undefined,
        border: isTodayDate && !isSelectedDay ? '2px solid var(--primary)' : undefined,
      }
    };
  };

  // Helper to get events for each day in the current week
  const getEventsForWeek = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
    return days.map(day => ({
      day,
      events: formattedEvents.filter(event =>
        event.start.toDateString() === day.toDateString()
      ),
    }));
  };

  // Group events by date
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.startTime).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Helper to format time range
  const formatTimeRange = (start: Date, end: Date) => {
    const startStr = start ? format(start, 'h:mm a') : '';
    const endStr = end ? format(end, 'h:mm a') : '';
    return startStr && endStr ? `${startStr} - ${endStr}` : startStr || endStr;
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <section>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-heading font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Calendar</h2>
          <div className="flex flex-col gap-2 items-center">
            <div className="text-sm font-medium text-[var(--color-text)] text-center mb-2">
              Calendar Type
            </div>
            <div className="flex gap-3">
              <Button 
                variant="default"
                size="default"
                onClick={() => setActiveCalendar("academic")}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md border-2 border-primary`}
                style={{ background: 'var(--calendar-surface)', color: 'var(--calendar-button-text)' }}
              >
                Academic Calendar
              </Button>
              <Button 
                variant="default"
                size="default"
                onClick={() => setActiveCalendar("activities")}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md border-2 border-primary`}
                style={{ background: 'var(--calendar-surface)', color: 'var(--calendar-button-text)' }}
              >
                Student Activities
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl" style={{ background: 'var(--calendar-surface)' }}>
          <Card className="p-6 border-2 border-blue-600 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800">
            <CardContent className="p-0">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              <div className="flex justify-between items-center mb-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handlePreviousMonth}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="text-center">
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text)' }}>
                    {format(date, 'MMMM yyyy')}
                  </h3>
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {activeCalendar === "academic" ? "Academic Calendar" : "Student Activities Calendar"}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleNextMonth}
                  aria-label="Next month"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex space-x-2 mb-4">
                <Button 
                  variant={view === "month" ? "default" : "ghost"} 
                  size="default" 
                  onClick={() => setView("month")}
                  aria-pressed={view === "month"}
                >
                  Month View
                </Button>
                <Button 
                  variant={view === "list" ? "default" : "ghost"} 
                  size="default" 
                  onClick={() => setView("list")}
                  aria-pressed={view === "list"}
                >
                  List View
                </Button>
                {view === "list" && selectedDate && (
                  <Button 
                    variant="ghost" 
                    size="default" 
                    onClick={() => setSelectedDate(null)}
                    className="ml-auto flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to All Events
                  </Button>
                )}
              </div>
              
              {view === "month" && (
                <div className="h-[400px]">
                  <BigCalendar
                    localizer={localizer}
                    events={formattedEvents}
                    startAccessor="start"
                    endAccessor="end"
                    date={date}
                    onNavigate={setDate}
                    views={["month"]}
                    onSelectSlot={handleDateSelect}
                    selectable
                    dayPropGetter={dayPropGetter}
                    onView={() => {}}
                    tooltipAccessor={(event: any) => event.title}
                    formats={{
                      weekdayFormat: (date: Date) => format(date, "EEE"),
                    }}
                    components={{
                      toolbar: () => null, // Hide the default toolbar
                      event: () => <div className="event-dot" /> // Render a dot instead of event text
                    }}
                  />
                </div>
              )}
              
              {view === "list" && !isLoading && (
                <div className="border rounded-md p-2 h-[400px] overflow-auto">
                  {selectedDate && (
                    <div className="mb-3 px-2 py-1 bg-primary-light/10 rounded flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">
                        {format(selectedDate, 'MMMM d, yyyy')}
                      </span>
                    </div>
                  )}
                  {Object.keys(groupedEvents).length > 0 ? (
                    Object.keys(groupedEvents).map(date => {
                      const { weekday, month, day } = formatEventDate(date);
                      return (
                        <div key={date} className="mb-4">
                          <div className="flex items-center mb-2">
                            <div className="bg-primary-light text-white rounded-full w-10 h-10 flex flex-col items-center justify-center text-sm mr-3">
                              <span className="font-bold">{day}</span>
                            </div>
                            <div>
                              <span className="font-semibold">{weekday}, {month} {day}</span>
                            </div>
                          </div>
                          <div className="ml-13 pl-13">
                            {groupedEvents[date].map(event => (
                              <div 
                                key={event.id} 
                                className="p-3 mb-2 border-l-4 border-primary bg-primary-light/10 rounded-r-md hover:bg-primary-light/20 transition-colors"
                              >
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="text-sm text-neutral-dark mt-1 flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1 inline" /> {formatTimeRange(new Date(event.startTime), new Date(event.endTime))}
                                  {event.location && (
                                    <span className="ml-2 flex items-center">
                                      <MapPin className="h-3.5 w-3.5 mr-1 inline" /> {event.location}
                                    </span>
                                  )}
                                </div>
                                {event.description && (
                                  <p className="mt-1 text-sm flex items-start">
                                    <Info className="h-3.5 w-3.5 mr-1 mt-0.5 inline-flex" /> {event.description}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-neutral-dark">
                      <CalendarIcon className="h-12 w-12 mb-2 text-primary-light" />
                      <p>No events found for this month</p>
                      <p className="text-sm">Select another month or add new events</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading font-semibold" style={{ color: 'var(--color-text)' }}>
            Upcoming Events
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-2 border-blue-600 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Academic Calendar</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              View important dates, deadlines, and events for the academic year.
            </p>
            <Link href="/calendar">
              <Button className="w-full">View Calendar</Button>
            </Link>
          </Card>

          <Card className="p-6 border-2 border-blue-600 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Student Activities</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover campus events, clubs, and activities to get involved.
            </p>
            <Link href="/activities">
              <Button className="w-full">Explore Activities</Button>
            </Link>
          </Card>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .rbc-month-view {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        
        .rbc-header {
          padding: 8px 0;
          background-color: #1e3a8a;
          font-weight: 600;
          color: white;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
        }
        
        .rbc-date-cell {
          padding: 8px;
          text-align: center;
          background-color: #e5e7eb;
        }

        .rbc-month-row {
          background-color: #d1d5db;
        }
        
        .rbc-day-bg.selected-day {
          background-color: var(--primary-light);
          border-radius: 50%;
        }
        
        .rbc-day-bg.today-date {
          position: relative;
        }
        
        .rbc-day-bg.has-events:before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: var(--primary);
          border-radius: 50%;
        }
        
        .rbc-event {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .event-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
          margin: 2px auto;
        }
        
        .rbc-event-content {
          display: flex;
          justify-content: center;
        }
        
        .rbc-date-cell > a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        
        .rbc-date-cell.rbc-now > a {
          background-color: var(--primary);
          color: white;
        }
      ` }} />
    </div>
  );
}