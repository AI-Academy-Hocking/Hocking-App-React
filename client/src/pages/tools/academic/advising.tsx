import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Sample advisor data - this would be replaced with actual data from the catalog
const advisors = [
  {
    name: "Academic Success Center",
    title: "Student Support Services",
    department: "Academic Support",
    email: "academicsuccess@hocking.edu",
    phone: "740.753.7103",
    office: "Main Hall",
    availability: "Monday - Friday, 8:00 AM - 5:00 PM",
    description: "The Academic Success Center provides comprehensive academic support services including tutoring, study skills workshops, and academic advising."
  },
  {
    name: "School of Allied Health and Nursing",
    title: "Academic Advisor",
    department: "Allied Health",
    email: "alliedhealth@hocking.edu",
    phone: "740.753.6350",
    office: "Health Sciences Building",
    availability: "Monday - Friday, 8:00 AM - 5:00 PM",
    description: "Academic advising for nursing and allied health programs."
  },
  {
    name: "School of Arts and Science",
    title: "Academic Advisor",
    department: "Arts and Science",
    email: "artscience@hocking.edu",
    phone: "740.753.7122",
    office: "Main Hall",
    availability: "Monday - Friday, 8:00 AM - 5:00 PM",
    description: "Academic advising for business, criminal justice, and general education programs."
  }
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

      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-2xl text-primary">Academic Advising</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {advisors.map((advisor, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{advisor.name}</h3>
                      <p className="text-sm text-neutral-dark mb-4">{advisor.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-primary" />
                          <span>{advisor.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          <span>{advisor.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span>{advisor.office}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>{advisor.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
