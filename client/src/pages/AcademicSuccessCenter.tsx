import React from 'react';
import { 
  ArrowLeft, BookOpen, GraduationCap, Users, Clock, Phone, Mail, MapPin, LibraryBig, MessageSquare, Accessibility, FileText, AlertCircle, Pencil,
  Award, Building, CheckCircle, BookOpen as BookOpenIcon, ExternalLink,
  UserCheck, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Academic Success Center</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          We're here to help you succeed! The Academic Success Center provides comprehensive academic support and resources to enhance your learning experience at Hocking College.
        </p>
      </div>

      {/* Welcome Alert */}
      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          We're here to help you succeed! Contact us for academic support and resources.
        </AlertDescription>
      </Alert>

      {/* Contact Information */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Building className="mr-3 h-6 w-6" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">DVD 114</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:740-753-4195" className="text-blue-600 hover:underline">740-753-4195</a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:academicsuccess@hocking.edu" className="text-blue-600 hover:underline">academicsuccess@hocking.edu</a>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monday – Friday: 8 a.m.-4 p.m.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Get Started */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <UserCheck className="mr-3 h-6 w-6" />
            Get Started
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            To access our services:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Visit our office in DVD 114</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Call or email to schedule an appointment</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Check our hours of operation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Bring any necessary documentation</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Schedule an Appointment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Academic Support Services */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Award className="mr-3 h-6 w-6" />
            Academic Support Services
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <section.icon className={`h-8 w-8 ${section.color}`} />
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200">{section.title}</h3>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">{section.description}</p>
                {section.path && (
                  <Link href={section.path}>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Learn More →
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Overview */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Target className="mr-3 h-6 w-6" />
            Services Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Academic Support</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">One-on-one tutoring, study skills, and academic coaching</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Resource Access</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">Library resources, databases, and study materials</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Specialized Services</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">Accessibility support, testing services, and TRIO programs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-8 border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <BookOpenIcon className="mr-3 h-6 w-6" />
            Frequently Asked Questions (FAQ)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="appointment">
              <AccordionTrigger className="text-left">
                How do I schedule an appointment?
              </AccordionTrigger>
              <AccordionContent>
                You can schedule an appointment by calling 740-753-4195, emailing academicsuccess@hocking.edu, or visiting our office in DVD 114 during business hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services">
              <AccordionTrigger className="text-left">
                What services are available?
              </AccordionTrigger>
              <AccordionContent>
                We offer tutoring, library resources, learning labs, accessibility support, TRIO services, and testing center services. Each service is designed to support your academic success.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eligibility">
              <AccordionTrigger className="text-left">
                Who is eligible for these services?
              </AccordionTrigger>
              <AccordionContent>
                Most services are available to all Hocking College students. Some specialized services like TRIO have specific eligibility requirements. Contact us to learn more about eligibility for specific programs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hours">
              <AccordionTrigger className="text-left">
                What are your hours of operation?
              </AccordionTrigger>
              <AccordionContent>
                We are open Monday through Friday from 8 a.m. to 4 p.m. Some services may have extended hours or weekend availability. Contact us for specific service hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cost">
              <AccordionTrigger className="text-left">
                Are these services free?
              </AccordionTrigger>
              <AccordionContent>
                Most Academic Success Center services are free to Hocking College students. Some specialized testing services may have associated fees. Contact us for specific pricing information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Access Links */}
      <Card className="border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <ExternalLink className="mr-3 h-6 w-6" />
            Quick Access Links
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Service</h4>
              <div className="space-y-1 text-sm">
                <p>Tutoring Services</p>
                <p>Library Resources</p>
                <p>Learning Labs</p>
                <p>Accessibility Resources</p>
                <p>TRIO Services</p>
                <p>Testing Center</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Link</h4>
              <div className="space-y-1 text-sm">
                <Link href="/tutoring" className="text-blue-600 hover:underline block text-left">
                  /tutoring
                </Link>
                <Link href="/library" className="text-blue-600 hover:underline block text-left">
                  /library
                </Link>
                <Link href="/learning-labs" className="text-blue-600 hover:underline block text-left">
                  /learning-labs
                </Link>
                <Link href="/accessibility-resources" className="text-blue-600 hover:underline block text-left">
                  /accessibility-resources
                </Link>
                <Link href="/trio-services" className="text-blue-600 hover:underline block text-left">
                  /trio-services
                </Link>
                <Link href="/testing-center" className="text-blue-600 hover:underline block text-left">
                  /testing-center
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AcademicSuccessCenter;
