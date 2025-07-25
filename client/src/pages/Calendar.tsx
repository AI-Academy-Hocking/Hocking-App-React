import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import { enUS } from "date-fns/locale";
import { useLocation } from "wouter";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Info, X } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { Event } from "../../../shared/schema";
import { cn } from "../lib/utils";
import { Badge } from "../components/ui/badge";
import { Link } from "wouter";

interface CalendarEvent {
  id: string;
  title: string;
  date: string | undefined;
  time: string;
  end: string | undefined;
  location: string;
  description: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPage() {
  const [location, setLocation] = useLocation();
  const [date, setDate] = useState<Value>(new Date());
  const [view, setView] = useState<"month" | "list">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState<"academic" | "activities">("academic");
  const [error, setError] = useState<string | null>(null);
  
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', activeCalendar],
    queryFn: async () => {
      console.log(`\n=== FRONTEND API CALL ===`);
      console.log(`Fetching events for calendar type: ${activeCalendar}`);
      
      const res = await fetch(`/api/calendar/events?type=${activeCalendar}`);
      console.log(`API response status: ${res.status}`);
      
      if (!res.ok) {
        console.error(`API call failed: ${res.status} ${res.statusText}`);
        throw new Error('Failed to fetch events');
      }
      
      const data = await res.json();
      console.log(`Received ${data.length} events from API:`, data);
      
      return data;
    },
  });

  // Get current month's start and end dates
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  // Expand date range to show more events (past month to next 3 months)
  const expandedStart = subMonths(monthStart, 1);
  const expandedEnd = addMonths(monthEnd, 3);

  console.log(`\n=== FRONTEND STATE ===`);
  console.log(`Active calendar: ${activeCalendar}`);
  console.log(`Total events received: ${events.length}`);
  console.log(`Current date: ${date.toISOString()}`);
  console.log(`Month start: ${monthStart.toISOString()}`);
  console.log(`Month end: ${monthEnd.toISOString()}`);
  console.log(`Expanded start: ${expandedStart.toISOString()}`);
  console.log(`Expanded end: ${expandedEnd.toISOString()}`);
  console.log(`Selected date: ${selectedDate?.toISOString() || 'none'}`);

  // Filter events based on calendar type and date range
  const getFilteredEvents = (calendarType: "academic" | "activities") => {
    console.log(`Filtering events for ${calendarType}:`, {
      totalEvents: events.length,
      monthStart: monthStart.toISOString(),
      monthEnd: monthEnd.toISOString(),
      expandedStart: expandedStart.toISOString(),
      expandedEnd: expandedEnd.toISOString(),
      selectedDate: selectedDate?.toISOString()
    });
    
    const filtered = events
      .filter(event => {
        // Only filter by calendarType if it exists on the event
        if ('calendarType' in event && (event as any).calendarType !== calendarType) return false;
        const eventDate = new Date(event.startTime);
        if (selectedDate) {
          // List view: show only events for the selected day
          return isSameDay(eventDate, selectedDate);
        }
        // Month view: show events in the expanded date range (past month to next 3 months)
        return eventDate >= expandedStart && eventDate <= expandedEnd;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    
    console.log(`Filtered to ${filtered.length} events for ${calendarType}`);
    return filtered;
  };

  // Get events for both calendar types
  const academicEvents = getFilteredEvents("academic");
  const activityEvents = getFilteredEvents("activities");
  
  // Use the active calendar to determine which events to show in the main view
  const filteredEvents = activeCalendar === "academic" ? academicEvents : activityEvents;

  // Format events for the BigCalendar (use filteredEvents, not all events)
  const formattedEvents = filteredEvents.map(event => {
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

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDate(clickedDate);
    setShowEventModal(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.date) {
      const eventDate = new Date(event.date);
      setSelectedDate(eventDate);
      setShowEventModal(true);
    }
  };

  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="calendar-event-dots">
            {dayEvents.slice(0, 3).map((_, index) => (
              <div 
                key={index} 
                className="calendar-event-dot"
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="calendar-event-more">
                +{dayEvents.length - 3}
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      const classes = [];
      
      if (dayEvents.length > 0) {
        classes.push('has-events');
      }
      
      if (isToday(date)) {
        classes.push('today');
      }
      
      return classes.join(' ');
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      {/* Header */}
      <section className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-blue-300 mb-4">
          Academic Calendar
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Stay up-to-date with important dates and campus events
        </p>
      </section>

      {/* Calendar Type Toggle */}
      <section className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-center space-x-4">
          <Button 
            variant={activeCalendar === "academic" ? "default" : "ghost"}
            onClick={() => setActiveCalendar("academic")}
            className={cn(
              "rounded-xl px-6 py-3 font-medium transition-all",
              activeCalendar === "academic" 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800" 
                : "border-2 border-blue-500 dark:border-gray-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800"
            )}
          >
            Academic Calendar
          </Button>
          <Button 
            variant={activeCalendar === "activities" ? "default" : "ghost"}
            onClick={() => setActiveCalendar("activities")}
            className={cn(
              "rounded-xl px-6 py-3 font-medium transition-all",
              activeCalendar === "activities" 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800" 
                : "border-2 border-blue-500 dark:border-gray-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800"
            )}
          >
            Student Activities
          </Button>
        </div>
      </section>

      {/* Main Calendar Section */}
      <section className="max-w-6xl mx-auto">
        <Card className="border-2 border-blue-500 dark:border-none rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            {/* View Toggle */}
            <div className="flex justify-center space-x-2 mb-6">
              <Button 
                variant={view === "month" ? "default" : "ghost"} 
                onClick={() => setView("month")}
                className={cn(
                  "rounded-xl px-6 py-2 font-medium transition-all",
                  view === "month" 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800" 
                    : "border-2 border-blue-500 dark:border-gray-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                )}
              >
                Month View
              </Button>
              <Button 
                variant={view === "list" ? "default" : "ghost"} 
                onClick={() => setView("list")}
                className={cn(
                  "rounded-xl px-6 py-2 font-medium transition-all",
                  view === "list" 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800" 
                    : "border-2 border-blue-500 dark:border-gray-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                )}
              >
                List View
              </Button>
            </div>
            
            {/* Calendar Component */}
            {view === "month" && (
              <div className="mobile-calendar-container">
                <Calendar
                  onChange={setDate}
                  value={date}
                  tileContent={getTileContent}
                  tileClassName={getTileClassName}
                  onClickDay={handleDateClick}
                  locale="en-US"
                  calendarType="gregory"
                  showNavigation={true}
                  showNeighboringMonth={true}
                  className="mobile-calendar"
                />
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="max-h-[500px] overflow-auto">
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map(event => (
                      <div 
                        key={event.id}
                        className="p-4 border-2 border-white dark:border-none rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-blue-300">{event.title}</h4>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-300 rounded-xl">
                            {event.date ? format(new Date(event.date), 'MMM d') : 'TBD'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                            {event.end && <span> - {event.end}</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{event.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-blue-300 mb-2">
                      No Events Found
                    </h4>
                    <p className="text-gray-500 dark:text-gray-300">
                      No events are currently scheduled for this calendar.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Event Modal */}
      {showEventModal && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden border-2 border-blue-500 dark:border-none rounded-2xl bg-blue-950 dark:bg-blue-950">
            <CardContent className="p-0">
              {/* Modal Header */}
              <div className="bg-blue-950 text-white p-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <div className="text-blue-100">
                    {activeCalendar === "academic" ? "Academic Calendar" : "Student Activities Calendar"}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[50vh] overflow-auto">
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-6">
                    {getEventsForDate(selectedDate).map(event => (
                      <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {event.title}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="h-4 w-4 text-blue-300" />
                            <span className="font-medium">Time:</span>
                            <span>{event.time}</span>
                            {event.end && <span> - {event.end}</span>}
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="h-4 w-4 text-blue-300" />
                            <span className="font-medium">Location:</span>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.description && (
                          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-gray-300">Description:</span>
                                <p className="text-gray-300 mt-1">{event.description}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-blue-300" />
                    <h4 className="text-xl font-semibold text-white mb-2">
                      No Events Scheduled
                    </h4>
                    <p className="text-gray-300">
                      This day is free from scheduled events. Perfect time to plan something new!
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-blue-900/40 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-300">
                    Click on any date to view its events
                  </div>
                  <Button 
                    onClick={() => {
                      setShowEventModal(false);
                      setSelectedDate(null);
                    }}
                    className="text-blue-300 hover:text-blue-200 bg-transparent hover:bg-transparent"
                    variant="ghost"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Access Cards */}
      <section className="max-w-6xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-blue-300">
            Quick Access
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-2 border-blue-500 dark:border-none rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Academic Calendar</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              View important dates, deadlines, and events for the academic year.
            </p>
            <Button 
              className="w-full text-blue-600 dark:text-blue-300 bg-transparent hover:bg-transparent"
              variant="ghost"
              onClick={() => setActiveCalendar("academic")}
            >
              View Academic Calendar
            </Button>
          </Card>

          <Card className="p-6 border-2 border-blue-500 dark:border-none rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Student Activities</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover campus events, clubs, and activities to get involved.
            </p>
            <Button 
              className="w-full text-blue-600 dark:text-blue-300 bg-transparent hover:bg-transparent"
              variant="ghost"
              onClick={() => setActiveCalendar("activities")}
            >
              Explore Activities
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}