import React from 'react';
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
          <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
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
        <Card className="border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
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
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <Button className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white" variant="ghost">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Game Schedule
              </Button>
              <Button className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white" variant="ghost">
                <Users className="h-4 w-4 mr-2" />
                Meet the Teams
              </Button>
              <Button className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white" variant="ghost">
                <Calendar className="h-4 w-4 mr-2" />
                Athletic Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-blue-300">Our Sports Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900 dark:text-blue-300">{sport.name}</CardTitle>
                  <Badge className={sport.color}>{sport.season}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-900 dark:text-white">{sport.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Athletic Facilities</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
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
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Student-Athlete Resources</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Athletics; 