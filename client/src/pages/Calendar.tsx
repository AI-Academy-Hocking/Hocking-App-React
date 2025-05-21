import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, format as formatDate } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@shared/schema";
import ical from 'ical';

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

// Replace this with your calendar's iCal URL
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
  const [googleEvents, setGoogleEvents] = useState<CalendarEvent[]>([]);
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const { data: localEvents, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });
  const [openEventDay, setOpenEventDay] = useState<string | null>(null);

  // Fetch calendar events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events from:', CALENDAR_URL);
        const response = await fetch(CALENDAR_URL);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch calendar events: ${response.status} ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Invalid content type:', contentType);
          throw new Error('Invalid response format - expected JSON');
        }
        
        const events = await response.json();
        console.log('Received events:', events.length);
        console.log('Sample event:', events[0]); // Log the first event for debugging
        
        // Validate and transform events
        const validEvents = events.map((event: any) => ({
          id: event.id || String(Math.random()),
          title: event.title || "No Title",
          date: event.date || new Date().toISOString(),
          time: event.time || "00:00 - 23:59",
          end: event.end || event.date || new Date().toISOString(),
          location: event.location || "No Location",
          description: event.description || "No Description",
        }));
        
        console.log('Processed events:', validEvents.length);
        setGoogleEvents(validEvents);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
        setGoogleEvents([]);
      }
    };

    fetchEvents();
  }, []);

  // Combine local events and calendar events
  const combinedEvents = [
    ...(localEvents || []).map(event => ({
      id: String(event.id),
      title: event.title,
      date: event.date,
      time: event.time,
      end: event.date, // Use date as end if no end time specified
      location: event.location,
      description: event.description || ""
    })),
    ...googleEvents,
  ];

  // Format events for the BigCalendar
  const formattedEvents = combinedEvents.map((event) => {
    const startDate = new Date(event.date || "");
    const endDate = new Date(event.end || event.date || "");
    
    // Safely handle time string
    let startHours = 0, startMinutes = 0, endHours = 23, endMinutes = 59;
    
    if (event.time) {
      const [startTime, endTime] = event.time.split(" - ");
      if (startTime) {
        const [hours, minutes] = startTime.split(":").map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
          startHours = hours;
          startMinutes = minutes;
        }
      }
      if (endTime) {
        const [hours, minutes] = endTime.split(":").map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
          endHours = hours;
          endMinutes = minutes;
        }
      }
    }
    
    // Set the time on the dates
    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);
    
    return {
      title: event.title || "Untitled Event",
      start: startDate,
      end: endDate,
      resource: { 
        location: event.location || "No Location", 
        description: event.description || "No Description" 
      },
    };
  });

  console.log('Formatted events:', formattedEvents.length);

  // Navigate between months
  const handlePreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
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

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Academic Calendar</h2>
        <Card>
          <CardContent className="p-4 bg-yellow-200">
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePreviousMonth}
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
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex gap-2 mb-4 bg-yellow-200 p-2 rounded">
              <Button variant={currentView === 'month' ? 'default' : 'outline'} className={currentView === 'month' ? '!bg-blue-800 !text-white' : ''} onClick={() => setCurrentView('month')}>Month</Button>
              <Button variant={currentView === 'week' ? 'default' : 'outline'} className={currentView === 'week' ? '!bg-blue-800 !text-white' : ''} onClick={() => setCurrentView('week')}>Week</Button>
              <Button variant={currentView === 'day' ? 'default' : 'outline'} className={currentView === 'day' ? '!bg-blue-800 !text-white' : ''} onClick={() => setCurrentView('day')}>Day</Button>
            </div>
            <div className="h-[500px] overflow-y-auto w-full">
              {currentView === 'week' ? (
                <div className="grid grid-rows-7 gap-2 h-full">
                  {getEventsForWeek(date).map(({ day, events }) => {
                    const dayKey = day.toISOString();
                    const isOpen = openEventDay === dayKey;
                    return (
                      <div key={dayKey} className="border rounded p-2 flex flex-row items-stretch bg-white">
                        <div className="font-semibold text-base w-1/4 h-full flex items-center justify-center bg-blue-800 text-white rounded mr-2">{format(day, 'EEE')}</div>
                        <div className="h-full w-px bg-gray-300 mx-0" />
                        <div className="font-semibold text-base w-1/3 h-full flex items-center justify-center">{format(day, 'MMM d')}</div>
                        <div className="h-full w-px bg-gray-300 mx-0" />
                        <div className="w-1/7 h-full flex items-center justify-end min-w-0 pl-4">
                          {events.length === 0 ? (
                            <div className="text-neutral-400 text-base text-center font-semibold">No events</div>
                          ) : (
                            <div className="relative flex flex-col items-end w-full">
                              <button
                                className="text-blue-700 underline text-base font-semibold text-center flex items-center gap-1 ml-4"
                                onClick={() => setOpenEventDay(isOpen ? null : dayKey)}
                              >
                                Events
                                <ChevronDown className={`inline h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                              </button>
                              <div
                                className={`absolute left-1/2 -translate-x-1/2 top-full bg-white border border-blue-200 rounded shadow p-2 z-10 min-w-[150px] transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 max-h-60' : 'opacity-0 max-h-0 pointer-events-none'}`}
                                style={{
                                  transitionProperty: 'opacity, max-height',
                                }}
                              >
                                {isOpen && events.map((event, idx) => {
                                  const startTime = event.start ? formatDate(event.start, 'h:mm a') : '';
                                  const endTime = event.end ? formatDate(event.end, 'h:mm a') : '';
                                  return (
                                    <div key={idx} className="mb-1 p-1 bg-yellow-100 rounded text-blue-900">
                                      <div className="font-semibold text-base">{event.title}</div>
                                      <div className="text-blue-800 font-semibold text-base">{startTime}{endTime && ` - ${endTime}`}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <BigCalendar
                  localizer={localizer}
                  events={formattedEvents}
                  startAccessor="start"
                  endAccessor="end"
                  date={date}
                  onNavigate={setDate}
                  view={currentView}
                  onView={setCurrentView as any}
                  views={['month', 'week', 'day']}
                  tooltipAccessor={(event: { title: string }) => event.title}
                  formats={{
                    weekdayFormat: (date: Date) => format(date, "EEE"),
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}