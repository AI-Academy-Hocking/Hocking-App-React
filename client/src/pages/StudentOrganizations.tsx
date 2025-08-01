import React, { useState } from 'react';
import { Users, Calendar, Mail, Award, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

function StudentOrganizationsPage() {
  const [sgaExpanded, setSgaExpanded] = useState(false);
  const [adventureExpanded, setAdventureExpanded] = useState(false);
  const [artsExpanded, setArtsExpanded] = useState(false);
  const [businessExpanded, setBusinessExpanded] = useState(false);
  const [startOwnExpanded, setStartOwnExpanded] = useState(false);

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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-300 mb-6">Student Organizations</h1>
      
      <p className="mb-6 text-gray-900 dark:text-white">Hocking College offers a variety of student organizations to enhance your college experience, develop leadership skills, and connect with peers who share your interests.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Government Association */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            sgaExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setSgaExpanded(!sgaExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Student Government Association
            </h3>
          </div>
          
          {sgaExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <p className="mb-4 text-gray-900 dark:text-white">The voice of the student body, advocating for student interests and organizing campus events.</p>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Meetings: Every Tuesday, 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mt-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a href="mailto:sga@hocking.edu" className="text-blue-600 dark:text-blue-400">sga@hocking.edu</a>
              </div>
            </div>
          )}
        </Card>
        
        {/* Outdoor Adventure Club */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            adventureExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setAdventureExpanded(!adventureExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Outdoor Adventure Club
            </h3>
          </div>
          
          {adventureExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <p className="mb-4 text-gray-900 dark:text-white">Experience hiking, camping, rock climbing, and more with fellow adventure enthusiasts.</p>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Meetings: Every Wednesday, 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mt-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a href="mailto:adventure@hocking.edu" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">adventure@hocking.edu</a>
              </div>
            </div>
          )}
        </Card>
        
        {/* Arts & Culture Society */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            artsExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setArtsExpanded(!artsExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Arts & Culture Society
            </h3>
          </div>
          
          {artsExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <p className="mb-4 text-gray-900 dark:text-white">Celebrates diversity through art exhibitions, performances, and cultural events.</p>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Meetings: Every Thursday, 5:30 PM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mt-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a href="mailto:arts@hocking.edu" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">arts@hocking.edu</a>
              </div>
            </div>
          )}
        </Card>
        
        {/* Future Business Leaders */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            businessExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setBusinessExpanded(!businessExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Future Business Leaders
            </h3>
          </div>
          
          {businessExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <p className="mb-4 text-gray-900 dark:text-white">Develop professional skills through networking events, guest speakers, and business competitions.</p>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Meetings: Every Monday, 4:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mt-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a href="mailto:business@hocking.edu" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">business@hocking.edu</a>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      {/* Start Your Own Organization */}
      <div className="mt-6 max-w-md mx-auto">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            startOwnExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setStartOwnExpanded(!startOwnExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Start Your Own Organization
            </h3>
          </div>
          
          {startOwnExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <p className="mb-4 text-gray-900 dark:text-white">Have an idea for a new student organization? We're here to help you get started!</p>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-blue-300">Contact the Student Life Office</p>
                  <p className="text-gray-900 dark:text-white">Email: <a href="mailto:studentlife@hocking.edu" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">studentlife@hocking.edu</a></p>
                  <p className="text-gray-900 dark:text-white">Phone: <a href="tel:7407536462" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">(740) 753-6462</a></p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default StudentOrganizationsPage;
