import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Wrench, School } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Event } from "@shared/schema";
import HockingBackground from "../components/assets/Campus.jpeg";  
import ProgramDropdown from "@/components/ProgramDropdown";
import { Button } from "@/components/ui/button";


export default function Home() {
  const { user } = useAuth();
  
  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const handleProgramChange = (program: string) => {
    console.log('Selected program:', program);
    // Add any additional program selection logic here
  };

  const quickLinks = [
    { 
      href: "/calendar", 
      icon: Calendar, 
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
        <h2 className="text-xl font-heading font-semibold mb-4">Upcoming Events</h2>
        <Card>
          {eventsLoading ? (
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
              {events && events.length > 0 ? (
                events.slice(0, 3).map((event) => {
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
        <h1 className="text-2xl font-bold mb-6">Button Examples with Ripple Effect</h1>
        
        <div className="space-y-4">
          <div className="space-x-4">
            <Button variant="default">Default Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>

          <div className="space-x-4">
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>

          <div className="space-x-4">
            <Button size="sm">Small Button</Button>
            <Button size="default">Default Size</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
