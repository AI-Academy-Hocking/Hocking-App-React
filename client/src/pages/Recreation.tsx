import React, { useState } from 'react';
import { Phone, Mail, Clock, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import studentCenterImage from "@/components/assets/studentCenter.jpg"; // Import the image
import { Link } from "wouter";

function RecreationPage() {
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [facilitiesExpanded, setFacilitiesExpanded] = useState(false);

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

      <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-300 mb-6">Recreation & Student Center</h1>
      
      <Card className="overflow-hidden mb-6 border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
        <div className="h-48 w-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center border-b border-blue-600 dark:border-gray-700">
          <img 
            src={studentCenterImage} 
            alt="Recreation Center" 
            className="w-full h-full object-cover" 
          />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            infoExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setInfoExpanded(!infoExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Student Center Information
            </h3>
          </div>
          
          {infoExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <div className="space-y-4">
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
              </div>
            </div>
          )}
        </Card>
        
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
              Available Facilities
            </h3>
          </div>
          
          {facilitiesExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
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
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default RecreationPage;
