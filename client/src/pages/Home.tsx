import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Calendar, MapPin, Wrench, School, Clock, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/auth";
import HockingBackground from "../components/assets/Campus.jpeg";  

import { format, isAfter, startOfToday } from "date-fns";
import { Event } from "../../../shared/schema";

export default function Home() {
  const { user } = useAuth();
  
  // Get today's date for filtering upcoming events
  const today = startOfToday();
  const todayISO = today.toISOString();
  
  // Fetch upcoming events only (from today onwards) for better performance
  // Note: Calendar page fetches all events and filters client-side for full calendar view
  const { data: academicEvents = [], isLoading: academicLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', 'academic', 'upcoming', todayISO],
    queryFn: async () => {
      console.log('Fetching upcoming academic events...');
      const res = await fetch(`/api/calendar/events?type=academic&timeMin=${todayISO}`);
      console.log('Academic events response status:', res.status);
      if (!res.ok) throw new Error('Failed to fetch academic events');
      const data = await res.json();
      console.log('Upcoming academic events received:', data.length, 'events');
      console.log('Academic events data:', data);
      return data;
    },
  });

  const { data: activityEvents = [], isLoading: activityLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', 'activities', 'upcoming', todayISO],
    queryFn: async () => {
      console.log('Fetching upcoming activity events...');
      const res = await fetch(`/api/calendar/events?type=activities&timeMin=${todayISO}`);
      console.log('Activity events response status:', res.status);
      if (!res.ok) throw new Error('Failed to fetch activity events');
      const data = await res.json();
      console.log('Upcoming activity events received:', data.length, 'events');
      console.log('Activity events data:', data);
      return data;
    },
  });

  // Since we're now fetching only upcoming events from the server, we just need to sort and limit them
  const now = new Date();
  console.log('Today (start of day):', today.toISOString());
  console.log('Current time:', now.toISOString());
  console.log('Total upcoming academic events:', academicEvents.length);
  console.log('Total upcoming activity events:', activityEvents.length);
  
  const upcomingAcademicEvents = academicEvents
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5); // Show only next 5 events

  const upcomingActivityEvents = activityEvents
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3); // Show only next 3 events

  console.log('Displaying academic events:', upcomingAcademicEvents.length);
  console.log('Displaying activity events:', upcomingActivityEvents.length);

  // Helper function to format event time
  const formatEventTime = (startTime: Date, endTime: Date) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return {
      time: format(start, 'h:mm a'),
      end: format(end, 'h:mm a')
    };
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
      href: "/housing", 
      icon: GraduationCap, 
      label: "Housing" 
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-blue-300">
          {user?.isGuest ? "Welcome Guest" : "Welcome to Hocking College"}
        </h2>
        <Card className="overflow-hidden rounded-xl shadow-md transition border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
          <img 
            src={HockingBackground} 
            alt="Hocking College Campus" 
            className="w-full h-64 object-cover" 
          />
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Explore all that Hocking College has to offer. Access your student resources, 
                check the academic calendar, find your way around campus, and more.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-blue-300">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <a
                className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-4 flex flex-col items-center text-center transition w-full aspect-square min-h-[120px] justify-center hover:shadow-md"
              >
                <link.icon className="text-blue-600 dark:text-blue-400 text-3xl mb-2 h-8 w-8" />
                <span className="font-bold text-base text-blue-600 dark:text-white">{link.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Academic Calendar Box */}
          <div className="rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-6 bg-white dark:bg-gray-800">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-blue-300">Academic Calendar</h3>
            {academicLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : upcomingAcademicEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingAcademicEvents.map(event => {
                  const { time, end } = formatEventTime(event.startTime, event.endTime);
                  return (
                    <div key={event.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-blue-300 mb-1 line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <Clock className="h-3 w-3" />
                        <span>{format(new Date(event.startTime), 'MMM d')} • {time}</span>
                        {end && <span>- {end}</span>}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {event.location}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                No upcoming academic events
              </div>
            )}
          </div>
          
          {/* Student Activities Box */}
          <div className="rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-6 bg-white dark:bg-gray-800">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-blue-300">Student Activities</h3>
            {activityLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : upcomingActivityEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingActivityEvents.map(event => {
                  const { time, end } = formatEventTime(event.startTime, event.endTime);
                  return (
                    <div key={event.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-blue-300 mb-1 line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <Clock className="h-3 w-3" />
                        <span>{format(new Date(event.startTime), 'MMM d')} • {time}</span>
                        {end && <span>- {end}</span>}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {event.location}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                No upcoming student activities
              </div>
            )}
          </div>
        </div>
        

      </section>
    </div>
  );
}
