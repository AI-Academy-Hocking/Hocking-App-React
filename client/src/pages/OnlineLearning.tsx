import React, { useState } from 'react';
import { Laptop, HelpCircle, BookOpen, Video, MessageSquare, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

function OnlineLearningPage() {
  const [canvasExpanded, setCanvasExpanded] = useState(false);
  const [resourcesExpanded, setResourcesExpanded] = useState(false);

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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-300 mb-6">Online Learning</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Canvas Learning Management System */}
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn rounded-xl ${
            canvasExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300 bg-white dark:bg-gray-800' 
              : 'border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800'
          }`}
          onClick={() => setCanvasExpanded(!canvasExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center mb-2">
              Canvas Learning Management System
            </h3>
          </div>
          
          {canvasExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <p className="text-gray-900 dark:text-white mb-4">Canvas is Hocking College's online learning platform. Access your course materials, submit assignments, and view grades.</p>
              
              <div className="flex items-start gap-3 mt-4">
                <Laptop className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Access Canvas</p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">Log in to Canvas</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mt-4">
                <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Canvas Support</p>
                  <p className="text-gray-900 dark:text-white">Available 24/7</p>
                  <a href="tel:8554850526" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">(855) 485-0526</a>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Online Learning Resources */}
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
              Online Learning Resources
            </h3>
          </div>
          
          {resourcesExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 px-6 pb-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-blue-300">Digital Textbooks</p>
                    <p className="text-gray-900 dark:text-white">Access your course textbooks online</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-blue-300">Recorded Lectures</p>
                    <p className="text-gray-900 dark:text-white">Review lectures and course content at your own pace</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-blue-300">Virtual Office Hours</p>
                    <p className="text-gray-900 dark:text-white">Connect with instructors remotely during scheduled times</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default OnlineLearningPage;
