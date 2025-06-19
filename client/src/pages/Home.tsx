import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Calendar, MapPin, Wrench, School } from "lucide-react";
import { useAuth } from "@/lib/auth";
import HockingBackground from "../components/assets/Campus.jpeg";  
import ProgramDropdown from "@/components/ProgramDropdown";
import { Button } from "@/components/ui/button";

// Define a local Event type for type safety
export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
};

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

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {user?.isGuest ? "Welcome Guest" : "Welcome to Hocking College"}
        </h2>
        <Card className="overflow-hidden rounded-xl shadow-md transition border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
          <img 
            src={HockingBackground} 
            alt="Hocking College Campus" 
            className="w-full h-48 object-cover" 
          />
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Explore all that Hocking College has to offer. Access your student resources, 
                check the academic calendar, find your way around campus, and more.
              </p>
              <div className="w-full max-w-xs bg-gray-900 dark:bg-gray-900 rounded-xl p-2 shadow-sm">
                <ProgramDropdown onChange={handleProgramChange} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <a
                className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-4 flex flex-col items-center text-center transition w-full aspect-square min-h-[120px] justify-center hover:shadow-md"
              >
                <link.icon className="text-blue-600 dark:text-white text-3xl mb-2 h-8 w-8" />
                <span className="font-bold text-base text-gray-900 dark:text-white">{link.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Academic Calendar Box */}
          <div className="rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-6 bg-white dark:bg-gray-800">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Academic Calendar</h3>
            <div className="text-center py-8 text-gray-600 dark:text-gray-300">
              No upcoming academic events
            </div>
          </div>
          {/* Student Activities Box */}
          <div className="rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-6 bg-white dark:bg-gray-800">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Student Activities</h3>
            <div className="text-center py-8 text-gray-600 dark:text-gray-300">
              No upcoming student activities
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
