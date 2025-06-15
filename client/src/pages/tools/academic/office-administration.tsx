import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Clock, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const offices = [
  {
    id: "registrar",
    name: "Registrar's Office",
    description: "Student records, transcripts, and academic registration",
    location: "Administration Building, Room 201",
    phone: "740.753.7050",
    email: "registrar@hocking.edu",
    hours: [
      { days: "Monday:", time: "8:00 AM - 5:00 PM" },
      { days: "Tuesday-Thursday:", time: "8:00 AM - 5:00 PM" },
      { days: "Friday:", time: "8:00 AM - 4:30 PM" },
    ],
    services: [
      "Course Registration",
      "Official Transcripts",
      "Degree Verification",
      "Grade Reports",
      "Academic Records"
    ],
    staff: [
      { name: "Patricia Taylor", title: "Registrar", email: "ptaylor@hocking.edu" },
      { name: "Mark Thompson", title: "Assistant Registrar", email: "mthompson@hocking.edu" },
      { name: "Amy Clark", title: "Records Specialist", email: "aclark@hocking.edu" },
    ],
  },
  {
    id: "financial-aid",
    name: "Financial Aid Office",
    description: "Assistance with FAFSA, scholarships, grants, and student loans.",
    location: "Administration Building, Room 205",
    phone: "740.753.7055",
    email: "finaid@hocking.edu",
    hours: [
      { days: "Monday-Friday:", time: "8:00 AM - 5:00 PM" },
    ],
    services: [
      "FAFSA Assistance",
      "Scholarships",
      "Grants",
      "Student Loans",
      "Financial Counseling"
    ],
    staff: [
      { name: "Linda Evans", title: "Director of Financial Aid", email: "levans@hocking.edu" },
      { name: "Brian Lee", title: "Financial Aid Advisor", email: "blee@hocking.edu" },
    ],
  },
  {
    id: "admissions",
    name: "Admissions Office",
    description: "Admissions process, campus visits, and application support.",
    location: "Administration Building, Room 101",
    phone: "740.753.7050",
    email: "admissions@hocking.edu",
    hours: [
      { days: "Monday-Friday:", time: "8:00 AM - 5:00 PM" },
    ],
    services: [
      "Campus Tours",
      "Application Support",
      "Transfer Resources",
      "International Admissions",
      "New Student Orientation"
    ],
    staff: [
      { name: "Jessica Miller", title: "Director of Admissions", email: "jmiller@hocking.edu" },
      { name: "Tom Reed", title: "Admissions Counselor", email: "treed@hocking.edu" },
    ],
  },
  {
    id: "student-services",
    name: "Student Services",
    description: "Support for student success, conduct, and campus life.",
    location: "Student Center, Room 100",
    phone: "740.753.7000",
    email: "studentservices@hocking.edu",
    hours: [
      { days: "Monday-Friday:", time: "8:00 AM - 5:00 PM" },
    ],
    services: [
      "Academic Success Center",
      "Student Conduct",
      "Career Services",
      "Disability Services",
      "Student Activities"
    ],
    staff: [
      { name: "Rachel Green", title: "Director of Student Services", email: "rgreen@hocking.edu" },
      { name: "Mike Brown", title: "Student Success Coach", email: "mbrown@hocking.edu" },
    ],
  },
];

export default function OfficeAdministration() {
  const [activeTab, setActiveTab] = useState(offices[0].id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-heading font-semibold">Office & Administration</h1>
      </div>
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {offices.map((office) => (
                <TabsTrigger key={office.id} value={office.id} className="truncate">
                  {office.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {offices.map((office) => (
              <TabsContent key={office.id} value={office.id} className="p-0">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-primary h-6 w-6" />
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-1">{office.name}</h2>
                      <p className="text-sm text-gray-700">{office.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" /> {office.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" /> {office.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" /> {office.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" /> <span className="font-medium">Office Hours:</span>
                  </div>
                  <ul className="ml-7 text-sm text-gray-700">
                    {office.hours.map((h, i) => (
                      <li key={i}>{h.days} <span className="font-mono">{h.time}</span></li>
                    ))}
                  </ul>
                  <div>
                    <span className="font-medium text-gray-700">Services Offered</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {office.services.map((service, i) => (
                        <span key={i} className="bg-gray-100 border border-gray-300 text-xs px-3 py-1 rounded-full text-gray-700">{service}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Key Staff</span>
                    <div className="mt-2 space-y-2">
                      {office.staff.map((person, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3 flex flex-col">
                          <span className="font-semibold text-gray-900">{person.name}</span>
                          <span className="text-xs text-gray-600">{person.title}</span>
                          <a href={`mailto:${person.email}`} className="text-primary text-xs underline mt-1">{person.email}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <a href={`tel:${office.phone.replace(/[^\d]/g, "")}`} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><Phone className="h-4 w-4" /> Call Office</a>
                    <a href={`mailto:${office.email}`} className="bg-white border border-primary text-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><Mail className="h-4 w-4" /> Send Email</a>
                  </div>
                </CardContent>
              </TabsContent>
            ))}
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
} 