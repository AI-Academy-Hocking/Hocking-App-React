import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Calendar, MapPin, Wrench, School } from "lucide-react";
import { useAuth } from "@/lib/auth";
import HockingBackground from "../components/assets/Campus.jpeg";  

// Define a local Event type for type safety
export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
};
import ProgramDropdown from "@/components/ProgramDropdown";
import { Button } from "@/components/ui/button";


export default function Home() {
  const { user } = useAuth();
  
  // Remove unused destructured elements from useQuery
  useQuery<Event[]>({
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
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          {user?.isGuest ? "Welcome Guest" : "Welcome to Hocking College"}
        </h2>
        <Card className="overflow-hidden rounded-lg shadow-md transition border border-[var(--color-border)]">
          <img 
            src={HockingBackground}
            alt="Hocking College Campus" 
            className="w-full h-48 object-cover" 
          />
          <CardContent className="p-4">
            <div className="space-y-4">
              <p className="" style={{ color: 'var(--color-text)' }}>
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
        <h2 className="text-xl font-heading font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => {
            // Assign a more noticeable background color to each button
            const bgColors = [
              '#f8bbd0', // Calendar - soft pink
              '#80cbc4', // Student Tools - teal/green
              '#ffe082', // Maps & Directions - vivid yellow
              '#ce93d8'  // Resources - vivid purple
            ];
            const textColors = [
              '#f06292', // Calendar - pink
              '#00c389', // Student Tools - green
              '#ffb300', // Maps & Directions - yellow
              '#8e24aa'  // Resources - purple
            ];
            return (
              <Link key={index} href={link.href}>
                <a
                  className="hover:bg-[#f4faff] rounded-lg border border-[var(--color-border)] shadow-sm p-4 flex flex-col items-center text-center transition"
                  style={{ backgroundColor: bgColors[index] }}
                >
                  <link.icon className="text-primary text-3xl mb-2 h-8 w-8" />
                  <span className="font-bold text-base" style={{ color: '#009e6d' }}>{link.label}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Academic Calendar Box */}
          <div className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-sm p-4">
            <h3 className="font-bold mb-2" style={{ color: '#232f3e' }}>Academic Calendar</h3>
            {/* Placeholder for academic events */}
            <div className="text-center py-8" style={{ color: '#232f3e' }}>
              No upcoming academic events
            </div>
          </div>
          {/* Student Activities Box */}
          <div className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-sm p-4">
            <h3 className="font-bold mb-2" style={{ color: '#232f3e' }}>Student Activities</h3>
            {/* Placeholder for student activities */}
            <div className="text-center py-8" style={{ color: '#232f3e' }}>
              No upcoming student activities
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
