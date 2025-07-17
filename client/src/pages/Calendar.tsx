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
    setSelectedDate(slotInfo.start);
    setShowEventModal(true);
  };

  // Handle event click
  const handleEventClick = (event: any) => {
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
              className="rounded-xl"
            >
              Academic Calendar
            </Button>
            <Button 
              variant={activeCalendar === "activities" ? "default" : "ghost"}
              onClick={() => setActiveCalendar("activities")}
              className="rounded-xl"
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
                popup
                className="modern-calendar"
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

      {/* Event Modal */}
      {showEventModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowEventModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        )}
                        {event.description && (
                          <div className="flex items-start gap-1">
                            <Info className="h-3 w-3 mt-0.5" />
                            {event.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2" />
                  <p>No events scheduled for this day</p>
                </div>
              )}
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