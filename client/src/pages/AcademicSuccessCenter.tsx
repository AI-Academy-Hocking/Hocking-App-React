import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Lightbulb, Heart, Brain, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

// Custom icon components
const OwlWithGlasses = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="9" cy="10" r="2" />
    <circle cx="15" cy="10" r="2" />
    <path d="M8 14h8" />
    <path d="M9 6l-1 2" />
    <path d="M15 6l1 2" />
    <path d="M7 4l2 2" />
    <path d="M17 4l-2 2" />
    <path d="M9 8l-1 2" />
    <path d="M15 8l1 2" />
  </svg>
);

const HelpingHandWithPaw = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
  >
    <path d="M12 2L9 7h6l-3-5z" />
    <path d="M12 7v4" />
    <path d="M8 11h8" />
    <path d="M7 15c0-2 2-3 5-3s5 1 5 3" />
    <path d="M12 15v4" />
    <path d="M9 19c0-2 2-3 3-3s3 1 3 3" />
  </svg>
);

function AcademicSuccessCenter() {
  const sections = [
    {
      title: "Tutoring",
      icon: OwlWithGlasses,
      description: "Get help with your coursework from qualified tutors",
      color: "text-blue-600"
    },
    {
      title: "Library Resources",
      icon: BookOpen,
      description: "Access books, databases, and study materials",
      color: "text-green-600"
    },
    {
      title: "Learning Labs",
      icon: Lightbulb,
      description: "Enhance your learning through specialized labs",
      color: "text-yellow-600"
    },
    {
      title: "Accessibility Resources",
      icon: HelpingHandWithPaw,
      description: "Support services for students with disabilities",
      color: "text-purple-600"
    },
    {
      title: "TRIO Student Support Services",
      icon: GraduationCap,
      description: "Comprehensive support for eligible students",
      color: "text-red-600"
    },
    {
      title: "Testing Center",
      icon: Brain,
      description: "Professional testing and assessment services",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-primary mb-8">Academic Success Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="bg-primary-light/10">
              <div className="flex items-center gap-3">
                <section.icon className={`h-8 w-8 ${section.color}`} />
                <CardTitle className="text-2xl font-semibold text-primary">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-neutral-dark text-lg">{section.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AcademicSuccessCenter;
