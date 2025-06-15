import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Sample data for advisors - replace with actual data
const advisors = [
  {
    name: "Dr. Sarah Johnson",
    title: "Academic Advisor",
    department: "Natural Resources",
    email: "sarah.johnson@hocking.edu",
    phone: "(740) 555-1234",
    office: "Main Hall, Room 204",
    availability: "Mon-Fri, 9:00 AM - 4:00 PM",
    image: "https://placehold.co/100x100",
  },
  {
    name: "Prof. Michael Chen",
    title: "Academic Advisor",
    department: "Public Safety",
    email: "michael.chen@hocking.edu",
    phone: "(740) 555-5678",
    office: "Davidson Hall, Room 105",
    availability: "Mon-Thu, 10:00 AM - 5:00 PM",
    image: "https://placehold.co/100x100",
  },
];

export default function Advising() {
  const [activeTab, setActiveTab] = useState("advisor");

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

      <h1 className="text-2xl font-bold text-primary mb-6">Academic Advising</h1>

      <Card className="mb-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Advising Services</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="advisor" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="advisor">Your Advisor</TabsTrigger>
              <TabsTrigger value="appointments">Schedule Appointment</TabsTrigger>
            </TabsList>

            <TabsContent value="advisor">
              <div className="space-y-6">
                {advisors.map((advisor) => (
                  <div key={advisor.name} className="bg-white rounded-lg border border-neutral-light p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={advisor.image}
                          alt={advisor.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">{advisor.name}</h3>
                          <p className="text-neutral-dark">{advisor.title}</p>
                          <p className="text-primary font-medium">{advisor.department}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-neutral-dark">Email</p>
                              <a href={`mailto:${advisor.email}`} className="text-primary hover:underline">
                                {advisor.email}
                              </a>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-neutral-dark">Phone</p>
                              <a href={`tel:${advisor.phone}`} className="text-primary hover:underline">
                                {advisor.phone}
                              </a>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-neutral-dark">Office</p>
                              <p>{advisor.office}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-neutral-dark">Availability</p>
                              <p>{advisor.availability}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <div className="space-y-6">
                <div className="bg-primary-light/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Schedule an Advising Appointment</h3>
                  <div className="space-y-4">
                    <p className="text-neutral-dark">
                      Book a meeting with your academic advisor to discuss your academic progress,
                      course selection, or any other concerns.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule Online
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call to Schedule
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Advising Resources</h3>
                  <div className="grid gap-4">
                    <a href="#" className="p-4 border border-neutral-light rounded-lg hover:bg-neutral-lightest transition">
                      <h4 className="font-medium mb-1">Advising Handbook</h4>
                      <p className="text-sm text-neutral-dark">Complete guide to academic advising</p>
                    </a>
                    <a href="#" className="p-4 border border-neutral-light rounded-lg hover:bg-neutral-lightest transition">
                      <h4 className="font-medium mb-1">Degree Planning Tools</h4>
                      <p className="text-sm text-neutral-dark">Plan your academic journey</p>
                    </a>
                    <a href="#" className="p-4 border border-neutral-light rounded-lg hover:bg-neutral-lightest transition">
                      <h4 className="font-medium mb-1">FAQs</h4>
                      <p className="text-sm text-neutral-dark">Common advising questions and answers</p>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 