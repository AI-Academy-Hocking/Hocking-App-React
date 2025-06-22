import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, ExternalLink, Search, ArrowRight, FileText, Mic, MapPin, Phone, Mail, Clock, Users, Target, Info } from "lucide-react";

// Placeholder data
const quickAccessLinks = [
  { name: "LinkedIn", icon: ExternalLink, href: "https://www.linkedin.com/school/hocking-college", color: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" },
  { name: "Handshake", icon: ExternalLink, href: "https://joinhandshake.com/", color: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" },
  { name: "Job Board", icon: Search, href: "https://www.hocking.edu/career-and-university-center-job-board", color: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" },
  { name: "Transfer Portal", icon: ArrowRight, href: "https://www.hocking.edu/transfer-resource-center", color: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" },
];

const careerResources = [
  {
    title: "Resume Builder",
    icon: FileText,
    description: "Create professional resumes with our online tool.",
    internal: true,
    href: "#",
  },
  {
    title: "Interview Prep",
    icon: Mic,
    description: "Practice interviews and get feedback.",
    internal: true,
    href: "#",
  },
  {
    title: "Career Workshops",
    icon: Briefcase,
    description: "Join workshops to enhance your career skills.",
    internal: false,
    href: "#",
  },
];

const officeInfo = {
  location: "John Light Hall 193",
  phone: "740.753.7055",
  email: "careers@hocking.edu",
  hours: [
    { days: "Monday - Friday:", time: "8am - 5pm" },
  ],
  about: "This session is dedicated to those who want more traditional face-to-face assistance. Please note that drop-ins are accepted on a first-come, first-served basis."
};

const teamMembers = [
  { name: "Terry Koons", title: "Executive Director for student engagement and success", email: "koonst@hocking.edu" },
];

export default function CareerUniversityCenter() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <div className="bg-primary text-primary-foreground p-3 rounded-lg">
          <Briefcase className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career & University Center</h1>
          <p className="text-lg text-gray-600">Your gateway to career opportunities and continuing education pathways.</p>
        </div>
      </header>

      {/* Quick Access Links */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" /> Quick Access Links
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickAccessLinks.map((link) => (
            <Button 
              key={link.name} 
              asChild 
              className={`text-white font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ${link.color}`}
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <link.icon className="h-4 w-4 mr-2" />
                {link.name}
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Career Services & Resources */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Career Services & Resources</h2>
        <Tabs defaultValue="development">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="development">Career Development Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="development" className="mt-4">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Career Development Resources</h3>
            <p className="text-gray-600 mb-6">Build skills and prepare for your career.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerResources.map((resource) => (
                <Card key={resource.title} className="border-l-4 border-primary overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <resource.icon className="h-8 w-8 text-gray-500" />
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        {resource.internal && (
                           <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">Internal</span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                       <a href={resource.href}>
                         <ArrowRight className="h-4 w-4 mr-2" /> Access
                       </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
           <TabsContent value="all" className="mt-4">
             <p>All services will be listed here.</p>
           </TabsContent>
        </Tabs>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Visit Our Office */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Visit Our Office</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800">About In-Person Visits</h3>
                  <p className="text-gray-700 text-sm">{officeInfo.about}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600">{officeInfo.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href={`tel:${officeInfo.phone}`} className="text-primary hover:underline">{officeInfo.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href={`mailto:${officeInfo.email}`} className="text-primary hover:underline">{officeInfo.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Office Hours</h3>
                  <ul className="text-gray-600">
                    {officeInfo.hours.map(h => <li key={h.days}>{h.days} {h.time}</li>)}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Meet Our Team */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
          <div className="space-y-4">
            {teamMembers.map(member => (
              <Card key={member.name}>
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="bg-gray-200 p-3 rounded-full">
                    <Users className="h-6 w-6 text-gray-600"/>
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.title}</p>
                    <a href={`mailto:${member.email}`} className="text-primary text-sm hover:underline">{member.email}</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 