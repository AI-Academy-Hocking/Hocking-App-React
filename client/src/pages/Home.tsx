import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Wrench, School } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import ProgramDropdown from "@/components/ProgramDropdown";

// Define the Event interface locally since we can't import from @shared/schema
interface Event {
  id: string;
  title: string;
  date: string;
  end?: string;
  time: string;
  location: string;
  description: string | null;
}

export default function HomePage() {
  const { user } = useAuth();

  // Fetch academic calendar events
  const { data: academicEvents = [], isLoading: academicLoading } = useQuery<Event[]>({
    queryKey: ['/api/calendar/events', 'academic'],
    queryFn: async () => {
      const response = await fetch('/api/calendar/events?type=academic');
      if (!response.ok) {
        throw new Error('Failed to fetch academic events');
      }
      return response.json();
    }
  });

  // Fetch student activities events
  const { data: activityEvents = [], isLoading: activityLoading } = useQuery<Event[]>({
    queryKey: ['/api/calendar/events', 'activities'],
    queryFn: async () => {
      const response = await fetch('/api/calendar/events?type=activities');
      if (!response.ok) {
        throw new Error('Failed to fetch activity events');
      }
      return response.json();
    }
  });

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = (events: Event[]) => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3); // Show only next 3 events
  };

  const upcomingAcademicEvents = getUpcomingEvents(academicEvents);
  const upcomingActivityEvents = getUpcomingEvents(activityEvents);

  const handleProgramChange = (program: string) => {
    // Handle program change
  };

  const quickLinks = [
    { 
      href: "/calendar", 
      icon: CalendarIcon, 
      label: "Calendar" 
    },
    { 
      href: "/tools", 
      icon: Wrench, 
      label: "Student Tools" 
    },
    { 
      href: "/maps", 
      icon: MapPin, 
      label: "Maps & Directions" 
    },
    { 
      href: "#", 
      icon: School, 
      label: "Resources" 
    },
  ];

  // Format date for display
  const formatEventDate = (date: string) => {
    const eventDate = new Date(date);
    return {
      month: eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      day: eventDate.getDate()
    };
  };

  return (
    <div className="min-h-screen bg-blue-800 scale-90">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-white [text-shadow:_-1px_-1px_0_#eab308,_1px_-1px_0_#eab308,_-1px_1px_0_#eab308,_1px_1px_0_#eab308]">
          {user?.isGuest ? "Welcome Guest" : "Welcome to Hocking College"}
        </h2>
        <Card className="overflow-hidden rounded-lg shadow-[0_0_0_2px_#eab308,0_0_10px_#eab308] hover:shadow-[0_0_0_2px_#eab308,0_0_15px_#eab308] transition">
          {/* Remove the image since HockingBackground is not available */}
          {/* <img 
            src={HockingBackground}
            alt="Hocking College Campus" 
            className="w-full h-48 object-cover" 
          /> */}
          <CardContent className="p-4">
            <div className="space-y-4">
              <p className="text-neutral-dark">
                Explore all that Hocking College has to offer. Access your student resources, 
                check the academic calendar, find your way around campus, and more.
              </p>
              <div className="w-full max-w-xs">
                <ProgramDropdown onChange={handleProgramChange} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-white [text-shadow:_-1px_-1px_0_#eab308,_1px_-1px_0_#eab308,_-1px_1px_0_#eab308,_1px_1px_0_#eab308]">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <a className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition">
                <link.icon className="text-primary text-3xl mb-2 h-8 w-8" />
                <span className="font-semibold">{link.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-white [text-shadow:_-1px_-1px_0_#eab308,_1px_-1px_0_#eab308,_-1px_1px_0_#eab308,_1px_1px_0_#eab308]">Upcoming Events</h2>
        
        {/* Academic Events */}
        <Card className="mb-4">
          <div className="p-3 bg-primary-light/10 border-b border-neutral-light">
            <h3 className="font-medium text-primary">Academic Calendar</h3>
          </div>
          {academicLoading ? (
            <div className="divide-y divide-neutral-light">
              {[1, 2, 3].map((i) => (
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
            <ul className="divide-y divide-neutral-light">
              {upcomingAcademicEvents.length > 0 ? (
                upcomingAcademicEvents.map((event) => {
                  const { month, day } = formatEventDate(event.date);
                  return (
                    <li key={event.id} className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-primary-light text-white rounded p-2 text-center mr-4">
                          <div className="text-sm font-bold">{month}</div>
                          <div className="text-xl font-bold">{day}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="flex items-center text-sm text-neutral-dark mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                            {event.location && (
                              <span className="ml-3 flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="p-4 text-center text-neutral-dark">No upcoming academic events</li>
              )}
            </ul>
          )}
          <div className="p-3 border-t border-neutral-light">
            <Link href="/calendar">
              <a className="text-primary hover:text-primary-dark text-sm font-semibold flex items-center justify-center">
                View Full Calendar
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </a>
            </Link>
          </div>
        </Card>

        {/* Student Activities */}
        <Card>
          <div className="p-3 bg-[linear-gradient(to_bottom,#eab308_0%,#eab308_60%,#bfdbfe_100%)] flex justify-between items-center rounded-t-lg">
            <h3 className="font-medium text-white [text-shadow:_-1px_-1px_0_#1e40af,_1px_-1px_0_#1e40af,_-1px_1px_0_#1e40af,_1px_1px_0_#1e40af]">Student Activities</h3>
          </div>
          {activityLoading ? (
            <div className="divide-y divide-neutral-light">
              {[1, 2, 3].map((i) => (
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
            <ul className="divide-y divide-neutral-light">
              {upcomingActivityEvents.length > 0 ? (
                upcomingActivityEvents.map((event) => {
                  const { month, day } = formatEventDate(event.date);
                  return (
                    <li key={event.id} className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-primary-light text-white rounded p-2 text-center mr-4">
                          <div className="text-sm font-bold">{month}</div>
                          <div className="text-xl font-bold">{day}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="flex items-center text-sm text-neutral-dark mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                            {event.location && (
                              <span className="ml-3 flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="p-4 text-center text-neutral-dark">No upcoming student activities</li>
              )}
            </ul>
          )}
          <div className="p-3 border-t border-neutral-light">
            <Link href="/calendar">
              <a className="text-primary hover:text-primary-dark text-sm font-semibold flex items-center justify-center">
                View Full Calendar
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </a>
            </Link>
          </div>
        </Card>
      </section>

      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Button Examples with Ripple Effect</h1>
        
        <div className="space-y-4">
          <div className="space-x-4">
            <Button variant="default">Default Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>

          <div className="space-x-4">
            <Button variant="ghost">Ghost Button</Button>
          </div>

          <div className="space-x-4">
            <Button size="sm">Small Button</Button>
            <Button size="default">Default Size</Button>
            <Button size="icon">Icon Button</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
