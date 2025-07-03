import React, { useState } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Users, Clock, Phone, Mail, MapPin, LibraryBig, MessageSquare, Accessibility, FileText, AlertCircle, Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import libraryLoungeImage from "../components/assets/librarylounge.JPG";
import library3Image from "../components/assets/library3.JPG";
import library1Image from "../components/assets/library1.JPG";
import libraryBenchImage from "../components/assets/librarybench.JPG";
import libraryLounge2Image from "../components/assets/librarylounge2.JPG";
import davisHallImage from "../components/assets/davishall.JPG";

// Custom icon for Tutoring (chat bubble with pencil)
const ChatWithPencil: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className}`}>
    <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    <Pencil className="h-4 w-4 text-blue-600 dark:text-blue-400 absolute bottom-0 right-0" />
  </div>
);

interface Section {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  path?: string;
}

function AcademicSuccessCenter() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  const sections: Section[] = [
    {
      title: "Tutoring",
      icon: ChatWithPencil,
      description: "Get help with your coursework from qualified tutors",
      color: "text-blue-600",
      path: "/tutoring"
    },
    {
      title: "Library Resources",
      icon: LibraryBig,
      description: "Access books, databases, and study materials",
      color: "text-blue-600",
      path: "/library"
    },
    {
      title: "Learning Labs",
      icon: BookOpen,
      description: "Enhance your learning through specialized labs",
      color: "text-blue-600",
      path: "/learning-labs"
    },
    {
      title: "Accessibility Resources",
      icon: Accessibility,
      description: "Support services for students with disabilities",
      color: "text-blue-600",
      path: "/accessibility-resources"
    },
    {
      title: "TRIO Student Support Services",
      icon: Users,
      description: "Comprehensive support for eligible students",
      color: "text-blue-600",
      path: "/trio-services"
    },
    {
      title: "Testing Center",
      icon: FileText,
      description: "Professional testing and assessment services",
      color: "text-blue-600",
      path: "/testing-center"
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

      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-blue-300">Academic Success Center</h1>
      </div>

      <Alert className="mb-6 border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-gray-900 dark:text-white">
          We're here to help you succeed! Contact us for academic support and resources.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Collapsible open={isContactOpen} onOpenChange={setIsContactOpen}>
          <Card className="border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
            <CollapsibleTrigger className="w-full">
              <CardHeader className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isContactOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
                <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Contact Information</CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-4 rounded-b-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-900 dark:text-white">DVD 114</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <a href="tel:740-753-4195" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      740-753-4195
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <a href="mailto:academicsuccess@hocking.edu" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      academicsuccess@hocking.edu
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-900 dark:text-white">Monday – Friday: 8 a.m.-4 p.m.</span>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible open={isGetStartedOpen} onOpenChange={setIsGetStartedOpen}>
          <Card className="border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
            <CollapsibleTrigger className="w-full">
              <CardHeader className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isGetStartedOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
                <CardTitle className="text-xl text-gray-900 dark:text-blue-300">Get Started</CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-4 rounded-b-xl">
                <div className="space-y-4">
                  <p className="text-gray-900 dark:text-white">
                    To access our services:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-900 dark:text-white">
                    <li>Visit our office in DVD 114</li>
                    <li>Call or email to schedule an appointment</li>
                    <li>Check our hours of operation</li>
                    <li>Bring any necessary documentation</li>
                  </ol>
                  <Button className="w-full bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-cyan-300 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-white rounded">
                    Schedule an Appointment
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow duration-200 border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl relative overflow-hidden"
            style={
              section.title === 'Tutoring' ? {
                backgroundImage: `url(${libraryLoungeImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : section.title === 'Library Resources' ? {
                backgroundImage: `url(${library3Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : section.title === 'Learning Labs' ? {
                backgroundImage: `url(${library1Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : section.title === 'Accessibility Resources' ? {
                backgroundImage: `url(${libraryBenchImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : section.title === 'TRIO Student Support Services' ? {
                backgroundImage: `url(${libraryLounge2Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : section.title === 'Testing Center' ? {
                backgroundImage: `url(${davisHallImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}
            }
          >
            {(section.title === 'Tutoring' || section.title === 'Library Resources' || section.title === 'Learning Labs' || section.title === 'Accessibility Resources' || section.title === 'TRIO Student Support Services' || section.title === 'Testing Center') && (
              <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-60"></div>
            )}
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-3">
                <section.icon className={`h-8 w-8 ${(section.title === 'Tutoring' || section.title === 'Library Resources' || section.title === 'Learning Labs' || section.title === 'Accessibility Resources' || section.title === 'TRIO Student Support Services' || section.title === 'Testing Center') ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <CardTitle className={`text-2xl font-semibold ${(section.title === 'Tutoring' || section.title === 'Library Resources' || section.title === 'Learning Labs' || section.title === 'Accessibility Resources' || section.title === 'TRIO Student Support Services' || section.title === 'Testing Center') ? 'text-white' : 'text-gray-900 dark:text-blue-300'}`}>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 relative z-10">
              <p className={`text-lg ${(section.title === 'Tutoring' || section.title === 'Library Resources' || section.title === 'Learning Labs' || section.title === 'Accessibility Resources' || section.title === 'TRIO Student Support Services' || section.title === 'Testing Center') ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{section.description}</p>
              {section.path && (
                <Link href={section.path}>
                  <button className={`mt-4 font-medium ${(section.title === 'Tutoring' || section.title === 'Library Resources' || section.title === 'Learning Labs' || section.title === 'Accessibility Resources' || section.title === 'TRIO Student Support Services' || section.title === 'Testing Center') ? 'text-white hover:text-gray-200' : 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'}`}>
                    Learn More →
                  </button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AcademicSuccessCenter;
