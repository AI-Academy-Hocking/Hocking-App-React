import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
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

interface CalendarEvent {
  id: string;
  title: string;
  date: string | undefined;
  time: string;
  end: string | undefined;
  location: string;
  description: string;
}

export default function CalendarPage() {
  const [location, setLocation] = useLocation();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<"month" | "list">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState<"academic" | "activities">("academic");
  
  // Sample events for demonstration
  const sampleEvents = [
    {
      id: "1",
      title: "Math 101 Exam",
      startTime: new Date(2024, 11, 15, 9, 0).toISOString(),
      endTime: new Date(2024, 11, 15, 11, 0).toISOString(),
      location: "Room 204",
      description: "Final exam for Math 101"
    },
    {
      id: "2", 
      title: "Campus Tour",
      startTime: new Date(2024, 11, 18, 14, 0).toISOString(),
      endTime: new Date(2024, 11, 18, 15, 30).toISOString(),
      location: "Student Center",
      description: "Guided campus tour for new students"
    },
    {
      id: "3",
      title: "Holiday Break Begins",
      startTime: new Date(2024, 11, 20, 17, 0).toISOString(), 
      endTime: new Date(2024, 11, 20, 17, 0).toISOString(),
      location: "Campus Wide",
      description: "Winter break begins"
    }
  ];

  const { data: events = sampleEvents, isLoading } = useQuery({
    queryKey: ['calendar-events', activeCalendar],
    queryFn: () => Promise.resolve(sampleEvents),
  });

  // Format events for BigCalendar
  const formattedEvents = events.map(event => ({
    title: event.title,
    start: new Date(event.startTime),
    end: new Date(event.endTime),
    resource: event,
  }));

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(new Date(event.startTime), date)
    );
  };

  // Handle date click
  const handleDateClick = (slotInfo: any) => {
    console.log('Date clicked:', slotInfo);
    setSelectedDate(slotInfo.start);
    setShowEventModal(true);
  };

  // Handle event click
  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event);
    setSelectedDate(event.start);
    setShowEventModal(true);
  };

  // Format time
  const formatTime = (date: string) => {
    return format(new Date(date), 'h:mm a');
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-heading font-semibold mb-4 text-gray-900 dark:text-blue-300">
          Calendar
        </h2>
        
        {/* Calendar Type Selector */}
        <div className="flex flex-col gap-2 items-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white text-center mb-2">
            Calendar Type
          </div>
          <div className="flex gap-3">
            <Button 
              variant={activeCalendar === "academic" ? "default" : "ghost"}
              onClick={() => setActiveCalendar("academic")}
              className="rounded-md px-6 py-2 min-w-[140px]"
            >
              Academic Calendar
            </Button>
            <Button 
              variant={activeCalendar === "activities" ? "default" : "ghost"}
              onClick={() => setActiveCalendar("activities")}
              className="rounded-md px-6 py-2 min-w-[140px]"
            >
              Student Activities
            </Button>
          </div>
        </div>
      </div>

      {/* Main Calendar */}
      <Card className="p-6 border-0 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDate(subMonths(date, 1))}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-blue-300">
                {format(date, 'MMMM yyyy')}
              </h3>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {activeCalendar === "academic" ? "Academic Calendar" : "Student Activities Calendar"}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDate(addMonths(date, 1))}
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex space-x-2 mb-4">
            <Button 
              variant={view === "month" ? "default" : "ghost"} 
              onClick={() => setView("month")}
              className="rounded-xl"
            >
              Month View
            </Button>
            <Button 
              variant={view === "list" ? "default" : "ghost"} 
              onClick={() => setView("list")}
              className="rounded-xl"
            >
              List View
            </Button>
          </div>
          
          {/* Calendar Component */}
          {view === "month" && (
            <div className="calendar-container h-[500px]">
              <BigCalendar
                localizer={localizer}
                events={formattedEvents}
                startAccessor="start"
                endAccessor="end"
                date={date}
                onNavigate={setDate}
                views={["month"]}
                onSelectSlot={handleDateClick}
                onSelectEvent={handleEventClick}
                selectable
                popup={false}
                className="modern-calendar"
                step={60}
                showMultiDayTimes
                components={{
                  month: {
                    dateHeader: ({ date, label }) => (
                      <div 
                        onClick={() => handleDateClick({ start: date })}
                        className="rbc-date-header-custom"
                        style={{ cursor: 'pointer', padding: '4px', zIndex: 10 }}
                      >
                        {label}
                      </div>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* List View */}
          {view === "list" && (
            <div className="h-[500px] overflow-auto">
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map(event => (
                    <div 
                      key={event.id}
                      className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedDate(new Date(event.startTime));
                        setShowEventModal(true);
                      }}
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(event.startTime), 'MMM d, yyyy • h:mm a')}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <CalendarIcon className="h-12 w-12 mb-2" />
                  <p>No events found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Modal - Large Display */}
      {showEventModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] bg-white dark:bg-gray-800 shadow-2xl">
            <CardContent className="p-0">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {selectedDateEvents.length === 0 
                        ? 'No events scheduled' 
                        : `${selectedDateEvents.length} event${selectedDateEvents.length === 1 ? '' : 's'} scheduled`
                      }
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowEventModal(false)}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Event
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Time:</span>
                            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">Location:</span>
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.description && (
                          <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-blue-100 dark:border-blue-800">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-gray-900 dark:text-white">Description:</span>
                                <p className="text-gray-700 dark:text-gray-300 mt-1">{event.description}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No Events Scheduled
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      This day is free from scheduled events. Perfect time to plan something new!
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Click on any date to view its events
                  </div>
                  <Button 
                    onClick={() => setShowEventModal(false)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
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
          <Card className="p-6 border-0 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Academic Calendar</h3>
            <p className="text-gray-600 dark:text-white mb-4">
              View important dates, deadlines, and events for the academic year.
            </p>
            <Button 
              className="w-full text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={() => setActiveCalendar("academic")}
            >
              View Academic Calendar
            </Button>
          </Card>

          <Card className="p-6 border-0 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Student Activities</h3>
            <p className="text-gray-600 dark:text-white mb-4">
              Discover campus events, clubs, and activities to get involved.
            </p>
            <Button 
              className="w-full text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
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