import React, { useState } from 'react';
import { ArrowLeft, Trophy, Users, Calendar, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Sport {
  name: string;
  season: string;
  description: string;
  color: string;
}

function Athletics() {
  const [contactExpanded, setContactExpanded] = useState(false);
  const [quickLinksExpanded, setQuickLinksExpanded] = useState(false);
  const [facilitiesExpanded, setFacilitiesExpanded] = useState(false);
  const [resourcesExpanded, setResourcesExpanded] = useState(false);
  const [sportsExpanded, setSportsExpanded] = useState(false);

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
    <div className="container mx-auto py-8 px-4 bg-white dark:bg-gray-900">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Hocking College Athletics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Contact Information */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            contactExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setContactExpanded(!contactExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Contact Information
            </h3>
          </div>
          
          {contactExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Athletic Department - Nelsonville Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <a href="tel:740-753-3591" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    740-753-3591
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <a href="mailto:athletics@hocking.edu" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    athletics@hocking.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Monday – Friday: 8 a.m.-4 p.m.</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Links */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            quickLinksExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setQuickLinksExpanded(!quickLinksExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Quick Links
            </h3>
          </div>
          
          {quickLinksExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <div className="space-y-4">
                <Button className="w-full bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-[6px]" variant="ghost">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Game Schedule
                </Button>
                <Button className="w-full bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-[6px]" variant="ghost">
                  <Users className="h-4 w-4 mr-2" />
                  Meet the Teams
                </Button>
                <Button className="w-full bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-[6px]" variant="ghost">
                  <Calendar className="h-4 w-4 mr-2" />
                  Athletic Calendar
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Sports Programs */}
      <div className="mb-8">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl max-w-md mx-auto ${
            sportsExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setSportsExpanded(!sportsExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Our Sports Programs
            </h3>
          </div>
          
          {sportsExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sports.map((sport, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-blue-300">{sport.name}</h4>
                      <Badge className={sport.color}>{sport.season}</Badge>
                    </div>
                    <p className="text-gray-900 dark:text-white text-sm">{sport.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Athletic Facilities */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            facilitiesExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setFacilitiesExpanded(!facilitiesExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Athletic Facilities
            </h3>
          </div>
          
          {facilitiesExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Hocking College Baseball Complex</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">John Light Gymnasium</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Softball Field</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Fitness Center</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Student-Athlete Resources */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            resourcesExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setResourcesExpanded(!resourcesExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Student-Athlete Resources
            </h3>
          </div>
          
          {resourcesExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Athletic Training Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Academic Support for Athletes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">Strength & Conditioning Program</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-900 dark:text-white">NCAA Compliance Information</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Athletics; 