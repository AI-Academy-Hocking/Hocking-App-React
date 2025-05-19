
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
        // For demo purposes, we'll split events based on their id to simulate different calendars
        const isActivityEvent = event.id % 2 === 0; // Even IDs for activities, odd for academic
        const matchesCalendarType = 
          (calendarType === "activities" && isActivityEvent) || 
          (calendarType === "academic" && !isActivityEvent);
        
        if (!matchesCalendarType) return false;
        
        const eventDate = new Date(event.date);
        if (selectedDate) {
          return isSameDay(eventDate, selectedDate);
        }
        return eventDate >= monthStart && eventDate <= monthEnd;
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
    <div className="space-y-6">
      <section>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Calendar</h2>
          <div className="flex flex-col gap-2 items-center">
            <div className="text-sm font-medium text-neutral-dark text-center mb-2">
              Calendar Type
            </div>
            <div className="flex gap-3">
            <button 
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md border-2 bg-primary text-white border-primary shadow-md ${
                activeCalendar === "academic" 
                  ? "ring-2 ring-primary-light ring-offset-2" 
                  : ""
              } hover:opacity-90`}
              onClick={() => setActiveCalendar("academic")}
            >
              Academic Calendar
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md border-2 bg-primary text-white border-primary shadow-md ${
                activeCalendar === "activities" 
                  ? "ring-2 ring-primary-light ring-offset-2" 
                  : ""
              } hover:opacity-90`}
              onClick={() => setActiveCalendar("activities")}
            >
              Student Activities
            </button>
            </div>
          </div>
        </div>
        <Card>
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
              <h3 className="font-semibold text-lg">
                {format(date, 'MMMM yyyy')}
              </h3>
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
                variant={view === "month" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setView("month")}
                aria-pressed={view === "month"}
              >
                Month View
              </Button>
              <Button 
                variant={view === "list" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
              >
                List View
              </Button>
              {view === "list" && selectedDate && (
                <Button 
                  variant="outline" 
                  size="sm" 
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
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading font-semibold">
            {selectedDate 
              ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}` 
              : `Upcoming Events`}
          </h2>
          {selectedDate && view === "month" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedDate(null)}
            >
              View All Events
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Academic Events */}
          <Card className={activeCalendar === "academic" ? "ring-2 ring-primary ring-offset-2" : ""}>
            <div className="p-3 bg-primary-light/10 border-b border-neutral-light flex justify-between items-center">
              <h3 className="font-medium text-primary">Academic Calendar</h3>
              <button 
                onClick={() => setActiveCalendar("academic")}
                className={`text-xs px-2 py-1 rounded ${activeCalendar === "academic" ? "bg-primary text-white" : "bg-white text-primary border border-primary"}`}
              >
                {activeCalendar === "academic" ? "Active" : "Set Active"}
              </button>
            </div>
            {isLoading ? (
              <div className="divide-y divide-neutral-light">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-start">
                      <Skeleton className="h-16 w-12 rounded mr-4" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto">
                <ul className="divide-y divide-neutral-light">
                  {academicEvents.length > 0 ? (
                    academicEvents.map((event) => {
                      const { weekday, month, day } = formatEventDate(event.date);
                      return (
                        <li key={event.id} className="p-4 hover:bg-neutral-50 transition-colors">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <div className="bg-primary-light text-white rounded-md p-2 text-center w-16">
                                <div className="text-xs font-medium">{weekday}</div>
                                <div className="text-sm font-bold">{month}</div>
                                <div className="text-xl font-bold">{day}</div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge variant="outline" className="ml-2">
                                  {event.time}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-neutral-dark mt-1">
                                {event.location && (
                                  <div className="flex items-center mr-3">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                              {event.description && (
                                <p className="text-sm mt-2">{event.description}</p>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="p-6 text-center">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                      <p className="text-neutral-dark">No academic events</p>
                      <p className="text-sm text-neutral-dark mt-1">
                        {selectedDate 
                          ? `No events scheduled for ${format(selectedDate, 'MMMM d, yyyy')}` 
                          : 'Check back later for new events'}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </Card>

          {/* Student Activities Events */}
          <Card className={activeCalendar === "activities" ? "ring-2 ring-primary ring-offset-2" : ""}>
            <div className="p-3 bg-primary-light/10 border-b border-neutral-light flex justify-between items-center">
              <h3 className="font-medium text-primary">Student Activities</h3>
              <button 
                onClick={() => setActiveCalendar("activities")}
                className={`text-xs px-2 py-1 rounded ${activeCalendar === "activities" ? "bg-primary text-white" : "bg-white text-primary border border-primary"}`}
              >
                {activeCalendar === "activities" ? "Active" : "Set Active"}
              </button>
            </div>
            {isLoading ? (
              <div className="divide-y divide-neutral-light">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-start">
                      <Skeleton className="h-16 w-12 rounded mr-4" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto">
                <ul className="divide-y divide-neutral-light">
                  {activityEvents.length > 0 ? (
                    activityEvents.map((event) => {
                      const { weekday, month, day } = formatEventDate(event.date);
                      return (
                        <li key={event.id} className="p-4 hover:bg-neutral-50 transition-colors">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <div className="bg-primary-light text-white rounded-md p-2 text-center w-16">
                                <div className="text-xs font-medium">{weekday}</div>
                                <div className="text-sm font-bold">{month}</div>
                                <div className="text-xl font-bold">{day}</div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge variant="outline" className="ml-2">
                                  {event.time}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-neutral-dark mt-1">
                                {event.location && (
                                  <div className="flex items-center mr-3">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                              {event.description && (
                                <p className="text-sm mt-2">{event.description}</p>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="p-6 text-center">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                      <p className="text-neutral-dark">No student activities</p>
                      <p className="text-sm text-neutral-dark mt-1">
                        {selectedDate 
                          ? `No events scheduled for ${format(selectedDate, 'MMMM d, yyyy')}` 
                          : 'Check back later for new events'}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </Card>
        </div>
      </section>

      <style jsx global>{`
        .rbc-month-view {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        
        .rbc-header {
          padding: 8px 0;
          background-color: #f8fafc;
          font-weight: 600;
        }
        
        .rbc-date-cell {
          padding: 8px;
          text-align: center;
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
      `}</style>
    </div>
  );
}
