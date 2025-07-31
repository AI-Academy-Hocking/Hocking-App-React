import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import studentCenterImage from "../components/assets/studentCenter.jpg"; // Import the image
import scPianoImage from "../components/assets/sc piano.JPG";
import scPatioImage from "../components/assets/sc patio.JPG";
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
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl overflow-hidden relative ${
            infoExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => setInfoExpanded(!infoExpanded)}
          style={{ 
            backgroundImage: `url(${scPianoImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="p-6 flex flex-col items-center relative z-10">
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Student Center Information
            </h3>
          </div>
          
          {infoExpanded && (
            <div className="pt-4 px-6 pb-6 relative z-10">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Hours of Operation</p>
                    <p className="text-gray-300">Monday – Friday: 8:00 AM – 10:00 PM</p>
                    <p className="text-gray-300">Saturday & Sunday: 11:00 AM – 8:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a href="tel:7407536535" className="text-blue-300 hover:text-blue-200 hover:underline">(740) 753-6535</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href="mailto:studentcenter@hocking.edu" className="text-blue-300 hover:text-blue-200 hover:underline">studentcenter@hocking.edu</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl overflow-hidden relative ${
            facilitiesExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => setFacilitiesExpanded(!facilitiesExpanded)}
          style={{ 
            backgroundImage: `url(${scPatioImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-35"></div>
          <div className="p-6 flex flex-col items-center relative z-10">
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Available Facilities
            </h3>
          </div>
          
          {facilitiesExpanded && (
            <div className="pt-4 px-6 pb-6 relative z-10">
              <ul className="list-disc list-inside space-y-2 pl-2 text-white">
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
