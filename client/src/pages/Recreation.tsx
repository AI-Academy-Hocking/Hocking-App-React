import React from 'react';
import { Phone, Mail, Clock, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import studentCenterImage from "@/components/assets/studentCenter.jpg"; // Import the image
import { Link } from "wouter";

function RecreationPage() {
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

      <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-300 mb-6">Recreation & Student Center</h1>
      
      <Card className="overflow-hidden mb-6 border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="h-48 w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center border-b border-blue-600 dark:border-gray-700">
          <img 
            src={studentCenterImage} 
            alt="Recreation Center" 
            className="w-full h-full object-cover" 
          />
        </div>
      </Card>
      
      <Card className="mb-6 border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Student Center Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-blue-300">Hours of Operation</p>
              <p className="text-gray-900 dark:text-white">Monday – Friday: 8:00 AM – 10:00 PM</p>
              <p className="text-gray-900 dark:text-white">Saturday & Sunday: 11:00 AM – 8:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-blue-300">Phone</p>
              <a href="tel:7407536535" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">(740) 753-6535</a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-blue-300">Email</p>
              <a href="mailto:studentcenter@hocking.edu" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">studentcenter@hocking.edu</a>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Available Facilities</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-900 dark:text-white">
            <li>Full-size gymnasium</li>
            <li>Fitness center with cardio and strength equipment</li>
            <li>Student lounge with TV and recreational games</li>
            <li>Study spaces and meeting rooms</li>
            <li>Outdoor recreation equipment rentals</li>
            <li>Indoor pool and diving board</li>
            <li>Rock climbing wall</li>
            <li>Indoor track</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecreationPage;
