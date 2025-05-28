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
  
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', activeCalendar],
    // In a real app, you would fetch different events based on activeCalendar
    // by adding a parameter to the API endpoint
  });

  // Get current month's start and end dates
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  // Format events for the BigCalendar
  const formattedEvents = events.map(event => ({
    title: event.title,
    start: new Date(event.date + 'T' + event.time.split(' - ')[0]),
    end: new Date(event.date + 'T' + (event.time.split(' - ')[1] || event.time.split(' - ')[0])),
    resource: { 
      location: event.location, 
      description: event.description,
      id: event.id,
      originalEvent: event
    },
  }));

  // Filter events based on calendar type and date range
  const getFilteredEvents = (calendarType: "academic" | "activities") => {
    return events
      .filter(event => {
        // In a real implementation, each event would have a 'calendarType' property
        // For now, we're using an empty array so no events will show
        return false;
        
        // When you add real events, uncomment this code:
        /*
        const eventDate = new Date(event.date);
        if (selectedDate) {
          return isSameDay(eventDate, selectedDate);
        }
        return eventDate >= monthStart && eventDate <= monthEnd;
        */
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Get events for both calendar types
  const academicEvents = getFilteredEvents("academic");
  const activityEvents = getFilteredEvents("activities");
  
  // Use the active calendar to determine which events to show in the main view
  const filteredEvents = activeCalendar === "academic" ? academicEvents : activityEvents;

  // Format date for display
  const formatEventDate = (date: string) => {
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
    const hasEvents = events.some(event => isSameDay(new Date(event.date), date));
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
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);


  return (
    <div className="min-h-screen bg-blue-800 py-8 flex justify-center">
      <div className="w-full px-4 space-y-6 bg-blue-800 p-6 rounded-xl shadow-lg">
        <section>
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl font-heading font-semibold mb-4 text-white [text-shadow:_-1px_-1px_0_#eab308,_1px_-1px_0_#eab308,_-1px_1px_0_#eab308,_1px_1px_0_#eab308]">Calendar</h2>
            <div className="flex flex-col gap-2 items-center">
              <div className="text-lg font-medium text-white [text-shadow:_-1px_-1px_0_#eab308,_1px_-1px_0_#eab308,_-1px_1px_0_#eab308,_1px_1px_0_#eab308] text-center mb-2">
                Calendar Type
              </div>
              <div className="flex gap-3">
                <button 
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md bg-white text-blue-800 ${
                    activeCalendar === "academic" 
                      ? "shadow-[0_0_0_2px_#eab308,0_0_10px_#eab308] font-bold" 
                      : "border-2 border-yellow-500 hover:shadow-[0_0_0_2px_#eab308,0_0_10px_#eab308]"
                  }`}
                  onClick={() => setActiveCalendar("academic")}
                >
                  Academic
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md bg-white text-blue-800 ${
                    activeCalendar === "activities" 
                      ? "shadow-[0_0_0_2px_#eab308,0_0_10px_#eab308] font-bold" 
                      : "border-2 border-yellow-500 hover:shadow-[0_0_0_2px_#eab308,0_0_10px_#eab308]"
                  }`}
                  onClick={() => setActiveCalendar("activities")}
                >
                  Activities
                </button>
              </div>
            </div>
          </div>
          <Card className="bg-yellow-500 border border-white rounded-lg shadow-[0_0_0_2px_white,0_0_10px_white,0_0_20px_white]">
            <CardContent className="p-4">
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
                  <h3 className="font-semibold text-lg text-white [text-shadow:_-1px_-1px_0_#1e40af,_1px_-1px_0_#1e40af,_-1px_1px_0_#1e40af,_1px_1px_0_#1e40af]">
                    {format(date, 'MMMM yyyy')}
                  </h3>
                  <div className="text-sm text-white [text-shadow:_-1px_-1px_0_#1e40af,_1px_-1px_0_#1e40af,_-1px_1px_0_#1e40af,_1px_1px_0_#1e40af] font-semibold">
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
                  className={view === "month" ? "bg-blue-800 text-white hover:bg-blue-900 shadow-[0_0_0_1px_white,0_0_5px_white,0_0_10px_white]" : "bg-blue-800 text-white hover:bg-blue-800"}
                >
                  Month View
                </Button>
                <Button 
                  variant={view === "list" ? "default" : "ghost"} 
                  size="default" 
                  onClick={() => setView("list")}
                  aria-pressed={view === "list"}
                  className={view === "list" ? "bg-blue-800 text-white hover:bg-blue-900 shadow-[0_0_0_1px_white,0_0_5px_white,0_0_10px_white]" : "bg-blue-800 text-white hover:bg-blue-800"}
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
                      toolbar: () => null,
                      event: () => <div className="event-dot" />
                    }}
                  />
                </div>
              )}
              
              {view === "list" && !isLoading && (
                <div className="border rounded-md p-2 h-[400px] overflow-auto bg-white shadow-[0_0_0_1px_#1e40af,0_0_5px_#1e40af,0_0_10px_#1e40af]">
                  {selectedDate && (
                    <div className="mb-3 px-2 py-1 bg-primary-light/10 rounded flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-[#1e40af]" />
                      <span className="font-medium text-[#1e40af]">
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
                            <div className="bg-[#1e40af] text-white rounded-full w-10 h-10 flex flex-col items-center justify-center text-sm mr-3">
                              <span className="font-bold">{day}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#1e40af]">{weekday}, {month} {day}</span>
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
                                  <Clock className="h-3.5 w-3.5 mr-1 inline" /> {event.time}
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
                    <div className="flex flex-col items-center justify-center h-full text-[#1e40af]">
                      <CalendarIcon className="h-20 w-20 mb-2 text-[#1e40af]" />
                      <p className="font-semibold">No events found for this month</p>
                      <p className="text-sm font-semibold">Select another month or add new events</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-heading font-semibold text-white [text-shadow:_-1px_-1px_0_#eab308,_1px_-1px_0_#eab308,_-1px_1px_0_#eab308,_1px_1px_0_#eab308]">
              {selectedDate 
                ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}` 
                : `Upcoming Events`}
            </h2>
            {selectedDate && view === "month" && (
              <Button 
                variant="ghost" 
                size="default" 
                onClick={() => setSelectedDate(null)}
              >
                View All Events
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Academic Events */}
            <Card className="border border-white rounded-lg shadow-[0_0_0_2px_white,0_0_10px_white,0_0_20px_white]">
              <div className="p-3 bg-[linear-gradient(to_bottom,#eab308_0%,#eab308_60%,#bfdbfe_100%)] flex justify-between items-center rounded-t-lg">
                <h3 className="font-medium text-white [text-shadow:_-1px_-1px_0_#1e40af,_1px_-1px_0_#1e40af,_-1px_1px_0_#1e40af,_1px_1px_0_#1e40af]">Academic Calendar</h3>
                <button 
                  onClick={() => setActiveCalendar("academic")}
                  className={`text-xs px-2 py-1 rounded border-2 bg-blue-800 text-white border-blue-800 hover:bg-blue-900`}
                >
                  View All
                </button>
              </div>
              <CardContent className="p-4">
                {/* Academic events content */}
              </CardContent>
            </Card>

            {/* Activity Events */}
            <Card className="border border-white rounded-lg shadow-[0_0_0_2px_white,0_0_10px_white,0_0_20px_white]">
              <div className="p-3 bg-[linear-gradient(to_bottom,#eab308_0%,#eab308_60%,#bfdbfe_100%)] flex justify-between items-center rounded-t-lg">
                <h3 className="font-medium text-white [text-shadow:_-1px_-1px_0_#1e40af,_1px_-1px_0_#1e40af,_-1px_1px_0_#1e40af,_1px_1px_0_#1e40af]">Activity Calendar</h3>
                <button 
                  onClick={() => setActiveCalendar("activities")}
                  className={`text-xs px-2 py-1 rounded border-2 bg-blue-800 text-white border-blue-800 hover:bg-blue-900`}
                >
                  View All
                </button>
              </div>
              <CardContent className="p-4">
                {/* Activity events content */}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}