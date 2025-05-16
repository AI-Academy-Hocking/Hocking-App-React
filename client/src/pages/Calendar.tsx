import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { Event } from "@shared/schema";

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

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: localEvents, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Fetch calendar events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError(null);
        const response = await fetch(CALENDAR_URL);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || `Failed to fetch calendar events: ${response.status}`);
        }
        
        const events = await response.json();
        setCalendarEvents(events);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch calendar events");
        setCalendarEvents([]);
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
      end: event.date,
      location: event.location,
      description: event.description || ""
    })),
    ...calendarEvents,
  ];

  // Format events for the BigCalendar
  const formattedEvents = combinedEvents.map((event) => {
    const startDate = new Date(event.date || "");
    const endDate = new Date(event.end || event.date || "");
    
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-heading font-semibold mb-4">Academic Calendar</h2>
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-[500px] w-full" />
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Academic Calendar</h2>
        <Card>
          <CardContent className="p-4">
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
            
            <div className="h-[500px]">
              <BigCalendar
                localizer={localizer}
                events={formattedEvents}
                startAccessor="start"
                endAccessor="end"
                date={date}
                onNavigate={setDate}
                views={["month", "week", "day"]}
                tooltipAccessor={(event: { title: string }) => event.title}
                formats={{
                  weekdayFormat: (date: Date) => format(date, "EEEE"),
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}