import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Calendar, MapPin, Wrench, School } from "lucide-react";
<<<<<<< HEAD
import { useAuth } from "@/lib/auth";
import HockingBackground from "../components/assets/Campus.jpeg";  
import { Button } from "@/components/ui/button";
=======
import { useAuth } from "../lib/auth";
// import HockingBackground from "../components/assets/Campus.jpeg";
>>>>>>> c638959b24dc6c36aa7b047bc0d62fea3619d794

// Define a local Event type for type safety
export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
};import ProgramDropdown from "@/components/ProgramDropdown";
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
              <a className="bg-blue-100 hover:bg-blue-200 rounded-lg border-2 border-white shadow-[0_0_10px_2px_white,0_0_0_2px_white] p-4 flex flex-col items-center text-center transition">
                <link.icon className="text-primary text-3xl mb-2 h-8 w-8" stroke="#1e40af" strokeWidth={2.5} fill="#fff" />
                <span className="font-semibold" style={{ color: '#1e40af' }}>{link.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-white [text-shadow:_-1px_-1px_0_#eab308,_1px_-1px_0_#eab308,_-1px_1px_0_#eab308,_1px_1px_0_#eab308]">Upcoming Events</h2>
        <Card className="rounded-lg border-2 border-white bg-white shadow-[0_0_16px_4px_white]">
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
            <ul className="divide-y divide-neutral-light bg-transparent">
              {events && events.length > 0 ? (
                events.slice(0, 3).map((event) => {
                  const { month, day } = formatEventDate(event.date);
                  return (
                    <li key={event.id} className="p-4 bg-transparent">
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
                <li className="p-4 text-center bg-[linear-gradient(to_bottom,#facc15_0%,#facc15_40%,#e0f2fe_100%)] text-neutral-dark rounded-t-lg">No upcoming events</li>
              )}
            </ul>
          )}
          <div className="p-3 bg-blue-100 rounded-b-lg">
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
<<<<<<< HEAD
            <Button variant="default">Default Button</Button>
=======
            <Button>Default Button</Button>
>>>>>>> c638959b24dc6c36aa7b047bc0d62fea3619d794
            <Button variant="ghost">Ghost Button</Button>
          </div>

          <div className="space-x-4">
<<<<<<< HEAD
            <Button variant="default">Default Variant</Button>
            <Button variant="ghost">Ghost Variant</Button>
          </div>

          <div className="space-x-4">
=======
>>>>>>> c638959b24dc6c36aa7b047bc0d62fea3619d794
            <Button size="default">Default Size</Button>
            <Button size="icon">Icon Size</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
