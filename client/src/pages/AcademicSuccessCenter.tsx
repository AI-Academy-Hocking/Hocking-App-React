import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Lightbulb, Heart, Brain, MessageSquare, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

// Custom icon for Tutoring (chat bubble with pencil)
const ChatWithPencil = () => (
  <div className="relative">
    <MessageSquare className="h-8 w-8 text-blue-600" />
    <Pencil className="h-4 w-4 text-blue-600 absolute bottom-0 right-0" />
  </div>
);

function AcademicSuccessCenter() {
  const sections = [
    {
      title: "Tutoring",
      icon: ChatWithPencil,
      description: "Get help with your coursework from qualified tutors",
      color: "text-blue-600"
    },
    {
      title: "Library Resources",
      icon: BookOpen,
      description: "Access books, databases, and study materials",
      color: "text-blue-600"
    },
    {
      title: "Learning Labs",
      icon: Lightbulb,
      description: "Enhance your learning through specialized labs",
      color: "text-blue-600"
    },
    {
      title: "Accessibility Resources",
      icon: Heart,
      description: "Support services for students with disabilities",
      color: "text-blue-600"
    },
    {
      title: "TRIO Student Support Services",
      icon: GraduationCap,
      description: "Comprehensive support for eligible students",
      color: "text-blue-600"
    },
    {
      title: "Testing Center",
      icon: Brain,
      description: "Professional testing and assessment services",
      color: "text-blue-600"
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
                <CardTitle className="text-2xl font-semibold text-black">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-black text-lg">{section.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AcademicSuccessCenter;
