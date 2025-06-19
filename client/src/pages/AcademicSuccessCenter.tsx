import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Users, Clock, Phone, Mail, MapPin, LibraryBig, MessageSquare, Accessibility, FileText, AlertCircle, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Custom icon for Tutoring (chat bubble with pencil)
const ChatWithPencil: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className}`}>
    <MessageSquare className="h-8 w-8 text-blue-600" />
    <Pencil className="h-4 w-4 text-blue-600 absolute bottom-0 right-0" />
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <GraduationCap className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Academic Success Center</h1>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          We're here to help you succeed! Contact us for academic support and resources.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>DVD 114</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:740-753-4195" className="hover:text-blue-600">
                  740-753-4195
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:academicsuccess@hocking.edu" className="hover:text-blue-600">
                  academicsuccess@hocking.edu
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Monday – Friday: 8 a.m.-4 p.m.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Get Started</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <p className="text-neutral-dark">
                To access our services:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-neutral-dark">
                <li>Visit our office in DVD 114</li>
                <li>Call or email to schedule an appointment</li>
                <li>Check our hours of operation</li>
                <li>Bring any necessary documentation</li>
              </ol>
              <Button className="w-full">
                Schedule an Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

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
              {section.path && (
                <Link href={section.path}>
                  <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
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
