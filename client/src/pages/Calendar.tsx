import { useState } from "react";
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
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  // Format events for the BigCalendar
  const formattedEvents = events?.map(event => ({
    title: event.title,
    start: new Date(event.date + 'T' + event.time.split(' - ')[0]),
    end: new Date(event.date + 'T' + (event.time.split(' - ')[1] || event.time.split(' - ')[0])),
    resource: { location: event.location, description: event.description },
  })) || [];

  // Format date for display
  const formatEventDate = (date: string) => {
    const eventDate = new Date(date);
    return {
      month: eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      day: eventDate.getDate()
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
                tooltipAccessor={(event) => event.title}
                formats={{
                  weekdayFormat: (date) => format(date, "EEEE"), // Full day name (e.g., "Monday")
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Upcoming Events</h2>
        <Card>
          {isLoading ? (
            <div className="divide-y divide-neutral-light">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start">
                    <Skeleton className="h-16 w-12 rounded mr-4" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-neutral-light">
              {events && events.length > 0 ? (
                events.map((event) => {
                  const { month, day } = formatEventDate(event.date);
                  return (
                    <li key={event.id} className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-primary-light text-white rounded p-2 text-center mr-4">
                          <div className="text-sm font-bold">{month}</div>
                          <div className="text-xl font-bold">{day}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-neutral-dark">{event.time} - {event.location}</p>
                          <p className="text-sm mt-1">{event.description}</p>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="p-4 text-center text-neutral-dark">No upcoming events</li>
              )}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}
