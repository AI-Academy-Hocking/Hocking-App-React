import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Users, Clock, Phone, Mail, MapPin, LibraryBig, OwlWithGlasses, MessageSquare, Heart, Accessibility, FileText, Home, Utensils, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

function AcademicSuccessCenter() {
  const quickLinks = [
    {
      id: "library",
      label: "Library Resources",
      icon: LibraryBig,
      path: "/library-resources",
      description: "Access library services and resources"
    },
    {
      id: "learning-labs",
      label: "Learning Labs",
      icon: BookOpen,
      path: "/learning-labs",
      description: "Get help with your coursework"
    },
    {
      id: "accessibility",
      label: "Accessibility Resources",
      icon: Accessibility,
      path: "/accessibility-resources",
      description: "Get support for disabilities and accommodations"
    },
    {
      id: "trio",
      label: "TRIO Student Support",
      icon: Users,
      path: "/trio-services",
      description: "Support for first-generation students"
    },
    {
      id: "testing",
      label: "Testing Center",
      icon: FileText,
      path: "/testing-center",
      description: "Schedule and take exams"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/student-tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <OwlWithGlasses className="h-8 w-8 text-blue-600" />
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
        {quickLinks.map((link) => (
          <Link key={link.id} href={link.path}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="bg-primary-light/10">
                <div className="flex items-center gap-3">
                  <link.icon className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-xl">{link.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-neutral-dark">{link.description}</p>
                <Button variant="ghost" className="w-full mt-4">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AcademicSuccessCenter;
