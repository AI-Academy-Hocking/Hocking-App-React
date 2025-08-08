import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import { format, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths, isToday, startOfToday } from "date-fns";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Info } from "lucide-react";
import { Event } from "../../../shared/schema";
import { cn } from "../lib/utils";
import { Badge } from "../components/ui/badge";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPage() {
  const [date, setDate] = useState<Value>(new Date());
  const [view, setView] = useState<"month" | "list">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState<"academic" | "activities">("academic");
  
  // Get today's date for upcoming events filtering
  const today = startOfToday();
  const todayISO = today.toISOString();

  // Fetch all events for calendar view (includes past events for navigation)
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ['/api/events', activeCalendar],
    queryFn: async () => {
      console.log(`\n=== FRONTEND API CALL ===`);
      console.log(`Fetching events for calendar type: ${activeCalendar}`);
      
      // Get current year start and end dates
      const currentYear = new Date().getFullYear();
      const yearStart = new Date(currentYear, 0, 1).toISOString(); // January 1st
      const yearEnd = new Date(currentYear, 11, 31).toISOString(); // December 31st
      
      const res = await fetch(`/api/calendar/events?type=${activeCalendar}&timeMin=${yearStart}&timeMax=${yearEnd}`);
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

  // Fetch upcoming events for both calendar types (same as Home page)
  const { data: upcomingAcademicEvents = [] } = useQuery<Event[]>({
    queryKey: ['/api/events', 'academic', 'upcoming', todayISO],
    queryFn: async () => {
      console.log(`\n=== FRONTEND UPCOMING ACADEMIC EVENTS API CALL ===`);
      const res = await fetch(`/api/calendar/events?type=academic&timeMin=${todayISO}`);
      console.log(`Upcoming academic events API response status: ${res.status}`);
      
      if (!res.ok) {
        console.error(`Upcoming academic events API call failed: ${res.status} ${res.statusText}`);
        throw new Error('Failed to fetch upcoming academic events');
      }
      
      const data = await res.json();
      console.log(`Received ${data.length} upcoming academic events from API:`, data);
      
      return data;
    },
  });

  const { data: upcomingActivityEvents = [] } = useQuery<Event[]>({
    queryKey: ['/api/events', 'activities', 'upcoming', todayISO],
    queryFn: async () => {
      console.log(`\n=== FRONTEND UPCOMING ACTIVITY EVENTS API CALL ===`);
      const res = await fetch(`/api/calendar/events?type=activities&timeMin=${todayISO}`);
      console.log(`Upcoming activity events API response status: ${res.status}`);
      
      if (!res.ok) {
        console.error(`Upcoming activity events API call failed: ${res.status} ${res.statusText}`);
        throw new Error('Failed to fetch upcoming activity events');
      }
      
      const data = await res.json();
      console.log(`Received ${data.length} upcoming activity events from API:`, data);
      
      return data;
    },
  });

  // Use the appropriate upcoming events based on active calendar
  const upcomingEvents = activeCalendar === "academic" ? upcomingAcademicEvents : upcomingActivityEvents;

  // Get current month's start and end dates - handle null date properly
  const currentDate = Array.isArray(date) ? date[0] || new Date() : date || new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Show all events for the entire year (current year)
  const currentYear = new Date().getFullYear();
  const yearStart = new Date(currentYear, 0, 1); // January 1st of current year
  const yearEnd = new Date(currentYear, 11, 31); // December 31st of current year

  console.log(`\n=== FRONTEND STATE ===`);
  console.log(`Active calendar: ${activeCalendar}`);
  console.log(`Total events received: ${events.length}`);
  console.log(`Current date: ${currentDate.toISOString()}`);
  console.log(`Month start: ${monthStart.toISOString()}`);
  console.log(`Month end: ${monthEnd.toISOString()}`);
  console.log(`Year start: ${yearStart.toISOString()}`);
  console.log(`Year end: ${yearEnd.toISOString()}`);
  console.log(`Selected date: ${selectedDate?.toISOString() || 'none'}`);

  // Filter events based on calendar type and date range
  const getFilteredEvents = (calendarType: "academic" | "activities") => {
    console.log(`Filtering events for ${calendarType}:`, {
      totalEvents: events.length,
      monthStart: monthStart.toISOString(),
      monthEnd: monthEnd.toISOString(),
      yearStart: yearStart.toISOString(),
      yearEnd: yearEnd.toISOString(),
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
        // Month view: show events for the entire current year
        return eventDate >= yearStart && eventDate <= yearEnd;
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

  const getEventsForDate = (date: Date) => {
    // For calendar dots, use all events for the active calendar type
    // This ensures dots show for all months in the current year
    return events.filter(event => {
      // Only include events for the active calendar type
      if ('calendarType' in event && (event as any).calendarType !== activeCalendar) return false;
      
      const eventDate = new Date(event.startTime);
      return isSameDay(eventDate, date);
    });
  };

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDate(clickedDate);
    setShowEventModal(true);
  };

  const handleEventClick = (event: Event) => {
    const eventDate = new Date(event.startTime);
    setSelectedDate(eventDate);
    setShowEventModal(true);
  };

  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="calendar-event-dot-container">
            <div className="calendar-event-dot" />
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

  // Helper function to format time from startTime
  const formatEventTime = (startTime: Date, endTime: Date) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return {
      time: format(start, 'h:mm a'),
      end: format(end, 'h:mm a')
    };
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
                ? "bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 text-white hover:from-blue-900 hover:to-blue-950 dark:hover:from-blue-700 dark:hover:to-blue-800" 
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
                ? "bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 text-white hover:from-blue-900 hover:to-blue-950 dark:hover:from-blue-700 dark:hover:to-blue-800" 
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
                    ? "bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 text-white hover:from-blue-900 hover:to-blue-950 dark:hover:from-blue-700 dark:hover:to-blue-800" 
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
                    ? "bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 text-white hover:from-blue-900 hover:to-blue-950 dark:hover:from-blue-700 dark:hover:to-blue-800" 
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
                  minDate={yearStart}
                  maxDate={yearEnd}
                  className="mobile-calendar"
                />
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="max-h-[500px] overflow-auto">
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map(event => {
                      const { time, end } = formatEventTime(event.startTime, event.endTime);
                      return (
                        <div 
                          key={event.id}
                          className="p-4 border-2 border-blue-600 dark:border-none rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer transition-colors bg-white dark:bg-[#0f172a]"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-blue-300">{event.title}</h4>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-300 rounded-xl">
                              {format(new Date(event.startTime), 'MMM d')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{time}</span>
                              {end && <span> - {end}</span>}
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
                      );
                    })}
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
        <div className="fixed inset-0 flex items-center justify-center p-2 z-50 bg-black/50">
          <Card className="w-full max-w-sm sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-hidden border-2 border-blue-500 dark:border-none rounded-2xl bg-blue-950 dark:bg-blue-950">
            <CardContent className="p-0">
              {/* Modal Header */}
              <div className="bg-blue-950 text-white p-4 sm:p-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 break-words">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <div className="text-blue-100 text-sm sm:text-base">
                    {activeCalendar === "academic" ? "Academic Calendar" : "Student Activities Calendar"}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {getEventsForDate(selectedDate).map(event => {
                      const { time, end } = formatEventTime(event.startTime, event.endTime);
                      return (
                        <div key={event.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-2 break-words">
                            {event.title}
                          </h4>
                          
                          <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                              <Clock className="h-4 w-4 text-blue-300 flex-shrink-0" />
                              <span className="font-medium">Time:</span>
                              <span className="break-words">{time}</span>
                              {end && <span className="break-words"> - {end}</span>}
                            </div>
                            
                            <div className="flex items-start gap-2 text-gray-300 text-sm sm:text-base">
                              <MapPin className="h-4 w-4 text-blue-300 flex-shrink-0 mt-0.5" />
                              <span className="font-medium">Location:</span>
                              <span className="break-words">{event.location}</span>
                            </div>
                          </div>

                          {event.description && (
                            <div className="mt-3 sm:mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                              <div className="flex items-start gap-2">
                                <Info className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <span className="font-medium text-gray-300 text-sm sm:text-base">Description:</span>
                                  <p className="text-gray-300 mt-1 text-sm sm:text-base break-words leading-relaxed">{event.description}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <CalendarIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-blue-300" />
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      No Events Scheduled
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base px-2">
                      This day is free from scheduled events. Perfect time to plan something new!
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-blue-900/40 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-between items-center">
                  <div className="text-xs sm:text-sm text-gray-300">
                    Click on any date to view its events
                  </div>
                  <Button 
                    onClick={() => {
                      setShowEventModal(false);
                      setSelectedDate(null);
                    }}
                    className="text-blue-300 hover:text-blue-200 bg-transparent hover:bg-transparent text-sm sm:text-base"
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

      {/* Upcoming Events Section */}
      <section className="max-w-6xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-blue-300">
            Upcoming Events
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, activeCalendar === "academic" ? 5 : 3).map(event => {
            const { time, end } = formatEventTime(event.startTime, event.endTime);
            return (
              <Card key={event.id} className="p-4 border-2 border-blue-600 dark:border-none rounded-xl shadow-lg bg-white dark:bg-[#0f172a] hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-blue-300 line-clamp-2">
                    {event.title}
                  </h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-300 rounded-xl flex-shrink-0 ml-2">
                    {format(new Date(event.startTime), 'MMM d')}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{time}</span>
                    {end && <span>- {end}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                {event.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
                    {event.description}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-blue-300 mb-2">
              No Upcoming Events
            </h4>
            <p className="text-gray-500 dark:text-gray-300">
              Check back later for new events and activities.
            </p>
          </div>
        )}
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-6xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-blue-300">
            Quick Access
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-2 border-blue-600 dark:border-none rounded-xl shadow-lg bg-white dark:bg-[#0f172a] hover:shadow-xl transition-shadow">
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

          <Card className="p-6 border-2 border-blue-600 dark:border-none rounded-xl shadow-lg bg-white dark:bg-[#0f172a] hover:shadow-xl transition-shadow">
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
