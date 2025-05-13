import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@shared/schema";
import { gapi } from "gapi-script";

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

const CLIENT_ID = "1036288758884-urd6mf6id8ul2ke8rvde56qi0770fo4a.apps.googleusercontent.com";
const API_KEY = "AIzaSyA2x4Azi6mg7XFxAFftaQPBUmlwq1dEDvA";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

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
  const [googleEvents, setGoogleEvents] = useState<CalendarEvent[]>([]);
  const { data: localEvents, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Fetch Google Calendar events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await fetchGoogleCalendarEvents();
        setGoogleEvents(events); // Pass the events directly
      } catch (error) {
        console.error("Error fetching Google Calendar events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Combine local events and Google Calendar events
  const combinedEvents = [
    ...(localEvents || []),
    ...googleEvents,
  ];

  // Format events for the BigCalendar
  const formattedEvents = combinedEvents.map((event) => ({
    title: event.title,
    start: new Date((event.date || "") + "T" + (event.time?.split(" - ")[0] || "00:00")),
    end: new Date((event.date || "") + "T" + (event.time?.split(" - ")[1] || "23:59")),
    resource: { location: event.location, description: event.description },
  }));

  // Format date for display
  const formatEventDate = (date: string | undefined) => {
    const eventDate = new Date(date ?? "1970-01-01"); // Fallback for undefined date
    return {
      month: eventDate.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: eventDate.getDate(),
    };
  };

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

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Academic Calendar</h2>
        <Card>
          <CardContent className="p-4">
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
                  weekdayFormat: (date: Date) => format(date, "EEEE"), // Full day name (e.g., "Monday")
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Upcoming Events</h2>
        <Card>
          <div className="p-4 text-center text-neutral-dark">No events to display.</div>
        </Card>
      </section>
    </div>
  );
}

const fetchGoogleCalendarEvents = async () => {
  const response = await gapi.client.calendar.events.list({
    calendarId: "c_bdfbce4d1083b9ce63634af03adc5df285e99b0124f589c8344ebb2a2f821784@group.calendar.google.com", // Fetch events from the user's primary calendar
    timeMin: new Date().toISOString(), // Only fetch future events
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: "startTime",
  });

  const events = response.result.items || [];
  return events.map((event) => ({
    id: event.id!,
    title: event.summary || "No Title",
    date: event.start?.dateTime || event.start?.date,
    time: event.start?.dateTime
      ? `${new Date(event.start.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${
          event.end?.dateTime
            ? new Date(event.end.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Unknown End Time"
        }`
      : "All Day",
    end: event.end?.dateTime,
    location: event.location || "No Location",
    description: event.description || "No Description",
  }));
};