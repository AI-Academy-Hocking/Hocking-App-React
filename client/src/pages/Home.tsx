import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Wrench, School } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "../lib/auth";
import HockingBackground from "../components/assets/Campus.jpeg";
import ProgramDropdown from "../components/ProgramDropdown";

// Define the Event type
interface CalendarEvent {
  id: number;
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
  const { data: academicEvents = [] } = useQuery<CalendarEvent[]>({
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
  const { data: activityEvents = [] } = useQuery<CalendarEvent[]>({
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
  const getUpcomingEvents = (events: CalendarEvent[]) => {
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
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">
          {user?.isGuest ? "Welcome Guest" : "Welcome to Hocking College"}
        </h2>
        <Card className="overflow-hidden">
          <img 
            src={HockingBackground}
            alt="Hocking College Campus" 
            className="w-full h-48 object-cover" 
          />
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
        <h2 className="text-xl font-heading font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.href}>
              <a className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition">
                <link.icon className="text-primary text-3xl mb-2 h-8 w-8" />
                <span className="font-semibold">{link.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-heading font-semibold">Upcoming Events</h2>
          <Button asChild variant="default" size="default">
            <Link href="/calendar">
              View All Events
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Academic Events */}
          <Card>
            <div className="p-3 bg-primary-light/10 border-b border-neutral-light">
              <h3 className="font-medium text-primary">Academic Calendar</h3>
            </div>
            <CardContent className="p-4">
              {upcomingAcademicEvents.length > 0 ? (
                <ul className="space-y-4">
                  {upcomingAcademicEvents.map((event) => (
                    <li key={event.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-light text-white rounded-md p-2 text-center w-16">
                          <div className="text-xs font-medium">
                            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-sm font-bold">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-xl font-bold">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
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
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-neutral-dark">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-neutral-light" />
                  <p>No upcoming academic events</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Activities */}
          <Card>
            <div className="p-3 bg-primary-light/10 border-b border-neutral-light">
              <h3 className="font-medium text-primary">Student Activities</h3>
            </div>
            <CardContent className="p-4">
              {upcomingActivityEvents.length > 0 ? (
                <ul className="space-y-4">
                  {upcomingActivityEvents.map((event) => (
                    <li key={event.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-light text-white rounded-md p-2 text-center w-16">
                          <div className="text-xs font-medium">
                            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-sm font-bold">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-xl font-bold">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
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
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-neutral-dark">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-neutral-light" />
                  <p>No upcoming student activities</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
