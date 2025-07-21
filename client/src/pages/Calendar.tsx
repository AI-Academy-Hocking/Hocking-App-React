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
  
  // Sample events for demonstration
  const sampleEvents = [
    {
      id: "1",
      title: "Spring Registration Begins",
      date: "2024-12-15",
      time: "08:00",
      end: undefined,
      location: "Online",
      description: "Online registration opens for spring semester courses."
    },
    {
      id: "2", 
      title: "Winter Break Begins",
      date: "2024-12-20",
      time: "17:00",
      end: undefined,
      location: "Campus",
      description: "Classes end and winter break begins for all students."
    },
    {
      id: "3",
      title: "New Year's Day - No Classes",
      date: "2025-01-01",
      time: "00:00",
      end: undefined,
      location: "Campus Closed",
      description: "Campus is closed for New Year's Day holiday."
    },
    {
      id: "4",
      title: "Spring Semester Begins",
      date: "2025-01-20",
      time: "08:00",
      end: undefined,
      location: "Campus",
      description: "First day of spring semester classes."
    },
    {
      id: "5",
      title: "Career Fair",
      date: "2025-01-25",
      time: "10:00",
      end: "16:00",
      location: "Student Center",
      description: "Annual career fair with local employers and internship opportunities."
    }
  ];

  const activities = [
    {
      id: "a1",
      title: "Basketball Game",
      date: "2024-12-18",
      time: "19:00",
      end: undefined,
      location: "Hawks Gymnasium",
      description: "Hocking Hawks vs. Regional Rivals - Home game."
    },
    {
      id: "a2",
      title: "Winter Dance",
      date: "2024-12-19",
      time: "20:00",
      end: "23:00",
      location: "Student Center Ballroom",
      description: "Semi-formal winter dance event for all students."
    },
    {
      id: "a3",
      title: "Intramural Soccer Registration",
      date: "2025-01-15",
      time: "09:00",
      end: "17:00",
      location: "Recreation Center",
      description: "Sign up for spring intramural soccer league."
    },
    {
      id: "a4",
      title: "Study Abroad Info Session",
      date: "2025-01-22",
      time: "15:00",
      end: "16:30",
      location: "International Office",
      description: "Learn about study abroad opportunities for next academic year."
    }
  ];

  const events = activeCalendar === "academic" ? sampleEvents : activities;

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {/* Header */}
      <section className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-blue-300 mb-4">
          Academic Calendar
        </h1>
        <p className="text-xl text-gray-600 dark:text-white">
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
                : "border-2 border-blue-500 dark:border-white text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                : "border-2 border-blue-500 dark:border-white text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20"
            )}
          >
            Student Activities
          </Button>
        </div>
      </section>

      {/* Main Calendar Section */}
      <section className="max-w-6xl mx-auto">
        <Card className="border-2 border-blue-500 dark:border-white rounded-xl shadow-lg bg-white dark:bg-gray-800">
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
                    : "border-2 border-blue-500 dark:border-white text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                    : "border-2 border-blue-500 dark:border-white text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                        className="p-4 border-2 border-white dark:border-white rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-blue-300">{event.title}</h4>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-xl">
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
                    <p className="text-gray-500 dark:text-gray-400">
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
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden border-2 border-blue-500 dark:border-white rounded-2xl bg-blue-950 dark:bg-blue-950">
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
                          <div className="flex items-center gap-2 text-white">
                            <Clock className="h-4 w-4 text-blue-300" />
                            <span className="font-medium">Time:</span>
                            <span>{event.time}</span>
                            {event.end && <span> - {event.end}</span>}
                          </div>
                          
                          <div className="flex items-center gap-2 text-white">
                            <MapPin className="h-4 w-4 text-blue-300" />
                            <span className="font-medium">Location:</span>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.description && (
                          <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-400">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-white">Description:</span>
                                <p className="text-white mt-1">{event.description}</p>
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
                    <p className="text-white">
                      This day is free from scheduled events. Perfect time to plan something new!
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-blue-900/40 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-white">
                    Click on any date to view its events
                  </div>
                  <Button 
                    onClick={() => {
                      setShowEventModal(false);
                      setSelectedDate(null);
                    }}
                    className="text-blue-400 hover:text-blue-300 bg-transparent hover:bg-transparent"
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
          <Card className="p-6 border-2 border-blue-500 dark:border-white rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Academic Calendar</h3>
            <p className="text-gray-600 dark:text-white mb-4">
              View important dates, deadlines, and events for the academic year.
            </p>
            <Button 
              className="w-full text-blue-600 dark:text-blue-400 bg-transparent hover:bg-transparent"
              variant="ghost"
              onClick={() => setActiveCalendar("academic")}
            >
              View Academic Calendar
            </Button>
          </Card>

          <Card className="p-6 border-2 border-blue-500 dark:border-white rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Student Activities</h3>
            <p className="text-gray-600 dark:text-white mb-4">
              Discover campus events, clubs, and activities to get involved.
            </p>
            <Button 
              className="w-full text-blue-600 dark:text-blue-400 bg-transparent hover:bg-transparent"
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