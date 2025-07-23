import React from 'react';
import { Link } from "wouter";
import { Card, CardContent } from "../components/ui/card";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Heart, 
  Laptop, 
  Star 
} from "lucide-react";

export default function Resources() {
  // Background images for resource boxes
  const davisHallImage = "/davishall.JPG";
  const library2Image = "/library2.JPG";
  const libraryBenchImage = "/librarybench.JPG";
  const libraryLoungeImage = "/library-lounge.JPG";
  const library3Image = "/library3.JPG";
  const scFoosballImage = "/sc-foosball.JPG";
  
  const resources = [
    {
      title: "Academic Success Center",
      description: "Get support with study skills, time management, and academic coaching to help you succeed.",
      icon: GraduationCap,
      href: "/academic-success-center"
    },
    {
      title: "Library Resources",
      description: "Access books, databases, research assistance, and quiet study spaces.",
      icon: BookOpen,
      href: "/library"
    },
    {
      title: "Accessibility Resources",
      description: "Support services and accommodations for students with disabilities.",
      icon: Heart,
      href: "/accessibility-resources"
    },
    {
      title: "Student Organizations",
      description: "Join clubs, organizations, and groups to connect with other students.",
      icon: Users,
      href: "/student-organizations"
    },
    {
      title: "Learning Labs",
      description: "Access computer labs, tutoring, and specialized learning resources.",
      icon: Laptop,
      href: "/learning-labs"
    },
    {
      title: "Trio Services",
      description: "Support programs for first-generation college students and those with financial need.",
      icon: Star,
      href: "/trio-services"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300 mb-4">
            Student Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find all the support and resources you need to succeed at Hocking College.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Link key={index} href={resource.href}>
              <a className="block h-full">
                <Card 
                  className={`h-full hover:shadow-lg transition-shadow duration-200 border-2 border-blue-600 dark:border-none ${
                    resource.title === 'Academic Success Center' || resource.title === 'Library Resources' || resource.title === 'Accessibility Resources' || resource.title === 'Trio Services' || resource.title === 'Learning Labs' || resource.title === 'Student Organizations'
                      ? 'relative overflow-hidden' 
                      : 'bg-white dark:bg-gray-800'
                  }`}
                  style={
                    resource.title === 'Academic Success Center' 
                      ? {
                          backgroundImage: `url(${davisHallImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        } 
                      : resource.title === 'Library Resources'
                      ? {
                          backgroundImage: `url(${library2Image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : resource.title === 'Accessibility Resources'
                      ? {
                          backgroundImage: `url(${libraryBenchImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : resource.title === 'Trio Services'
                      ? {
                          backgroundImage: `url(${libraryLoungeImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : resource.title === 'Learning Labs'
                      ? {
                          backgroundImage: `url(${library3Image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : resource.title === 'Student Organizations'
                      ? {
                          backgroundImage: `url(${scFoosballImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : {}
                  }
                >
                  {(resource.title === 'Academic Success Center' || resource.title === 'Library Resources' || resource.title === 'Accessibility Resources' || resource.title === 'Trio Services' || resource.title === 'Learning Labs' || resource.title === 'Student Organizations') && (
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  )}
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start space-x-4">
                      <resource.icon className="h-8 w-8 flex-shrink-0 text-blue-400" />
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 ${
                          resource.title === 'Academic Success Center' || resource.title === 'Library Resources' || resource.title === 'Accessibility Resources' || resource.title === 'Trio Services' || resource.title === 'Learning Labs' || resource.title === 'Student Organizations'
                            ? 'text-white' 
                            : 'text-gray-900 dark:text-blue-300'
                        }`}>
                          {resource.title}
                        </h3>
                        <p className={`text-sm ${
                          resource.title === 'Academic Success Center' || resource.title === 'Library Resources' || resource.title === 'Accessibility Resources' || resource.title === 'Trio Services' || resource.title === 'Learning Labs' || resource.title === 'Student Organizations'
                            ? 'text-gray-300' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="border-2 border-blue-600 dark:border-none bg-white dark:bg-gray-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300 mb-4">
                Need Additional Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Can't find what you're looking for? Contact our Student Success team for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:740-753-3591" 
                  className="bg-white hover:bg-gray-50 border-2 border-blue-600 dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-none text-blue-600 dark:text-blue-400 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Call: (740) 753-3591
                </a>
                <a 
                  href="mailto:studentservices@hocking.edu" 
                  className="bg-white hover:bg-gray-50 border-2 border-blue-600 dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-none text-blue-600 dark:text-blue-400 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Email Student Services
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 