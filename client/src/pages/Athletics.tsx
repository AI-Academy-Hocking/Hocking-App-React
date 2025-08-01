import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trophy, Users, Calendar, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import images properly
import WeightsImage from "../components/assets/sc weights.JPG";
import BaseballHomebaseImage from "../components/assets/baseball homebase.JPG";
import BasketballCourtImage from "../components/assets/basketball court.JPG";
import SportsWallImage from "../components/assets/sports wall.JPG";

interface Sport {
  name: string;
  season: string;
  description: string;
  color: string;
}

function Athletics() {
  const [openSection, setOpenSection] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSectionToggle = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  // Close section when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenSection("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sports: Sport[] = [
    {
      name: "Basketball",
      season: "Winter",
      description: "Men's and Women's basketball teams competing in the OCCAC",
      color: "bg-orange-500"
    },
    {
      name: "Volleyball",
      season: "Fall",
      description: "Women's volleyball team with competitive schedule",
      color: "bg-green-500"
    },
    {
      name: "Baseball",
      season: "Spring",
      description: "Men's baseball team with home games at the Hocking College Baseball Complex",
      color: "bg-blue-500"
    },
    {
      name: "Softball",
      season: "Spring",
      description: "Women's softball team competing in regional tournaments",
      color: "bg-pink-500"
    }
  ];

  return (
    <div ref={containerRef} className="container mx-auto py-8 px-4 bg-white dark:bg-gray-900">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-blue-300">Hocking College Athletics</h1>
      </div>

      <div className="mb-8">
        {/* Contact Information */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl max-w-md mx-auto overflow-hidden relative ${
            openSection === "contact" 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => handleSectionToggle("contact")}
          style={{ 
            backgroundImage: `url(${SportsWallImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="p-6 flex flex-col items-center relative z-10">
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Contact Information
            </h3>
          </div>
          
          {openSection === "contact" && (
            <div className="pt-4 px-6 pb-6 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-white" />
                  <span className="text-white">Athletic Department - Nelsonville Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-white" />
                  <a href="tel:740-753-3591" className="text-white hover:text-gray-300">
                    740-753-3591
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-white" />
                  <a href="mailto:athletics@hocking.edu" className="text-white hover:text-gray-300">
                    athletics@hocking.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-white" />
                  <span className="text-white">Monday – Friday: 8 a.m.-4 p.m.</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Sports Programs */}
      <div className="mb-8">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl max-w-md mx-auto overflow-hidden relative ${
            openSection === "sports" 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => handleSectionToggle("sports")}
          style={{ 
            backgroundImage: `url(${BaseballHomebaseImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="p-6 flex flex-col items-center relative z-10">
            <h3 className="text-2xl font-bold text-white text-center mb-2">
              Our Sports Programs
            </h3>
          </div>
          
          {openSection === "sports" && (
            <div className="pt-4 px-6 pb-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sports.map((sport, index) => (
                  <div key={index} className="border border-white border-opacity-30 rounded-xl p-4 bg-black bg-opacity-30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{sport.name}</h4>
                      <Badge className={sport.color}>{sport.season}</Badge>
                    </div>
                    <p className="text-white text-sm">{sport.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Athletic Facilities */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl overflow-hidden relative ${
            openSection === "facilities" 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => handleSectionToggle("facilities")}
          style={{ 
            backgroundImage: `url(${WeightsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="p-6 flex flex-col items-center relative z-10">
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Athletic Facilities
            </h3>
          </div>
          
          {openSection === "facilities" && (
            <div className="pt-4 px-6 pb-6 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="text-white">Hocking College Baseball Complex</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="text-white">John Light Gymnasium</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="text-white">Softball Field</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="text-white">Fitness Center</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Student-Athlete Resources */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl overflow-hidden relative ${
            openSection === "resources" 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => handleSectionToggle("resources")}
          style={{ 
            backgroundImage: `url(${BasketballCourtImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="p-6 flex flex-col items-center relative z-10">
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Student-Athlete Resources
            </h3>
          </div>
          
          {openSection === "resources" && (
            <div className="pt-4 px-6 pb-6 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-white" />
                  <span className="text-white">Athletic Training Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-white" />
                  <span className="text-white">Academic Support for Athletes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-white" />
                  <span className="text-white">Strength & Conditioning Program</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-white" />
                  <span className="text-white">NCAA Compliance Information</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <div className="max-w-4xl mx-auto">
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-blue-300 text-left mb-6">
             Quick Links
           </h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Link href="#">
               <a className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-6 flex flex-col items-center text-center transition hover:shadow-md">
                 <ExternalLink className="text-blue-600 dark:text-blue-400 mb-3 h-8 w-8" />
                 <span className="font-bold text-base text-blue-600 dark:text-white">View Game Schedule</span>
               </a>
             </Link>
             <Link href="#">
               <a className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-6 flex flex-col items-center text-center transition hover:shadow-md">
                 <Users className="text-blue-600 dark:text-blue-400 mb-3 h-8 w-8" />
                 <span className="font-bold text-base text-blue-600 dark:text-white">Meet the Teams</span>
               </a>
             </Link>
             <Link href="#">
               <a className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-6 flex flex-col items-center text-center transition hover:shadow-md">
                 <Calendar className="text-blue-600 dark:text-blue-400 mb-3 h-8 w-8" />
                 <span className="font-bold text-base text-blue-600 dark:text-white">Athletic Calendar</span>
               </a>
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Athletics; 
