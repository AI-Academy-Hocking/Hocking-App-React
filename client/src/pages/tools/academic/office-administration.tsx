import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock, Users, Briefcase } from "lucide-react";

const offices = [
  {
    id: "admissions",
    name: "Admissions Office",
    description: "Student enrollment, applications, and admission requirements",
    location: "Student Center, Room 101",
    phone: "740.753.7050",
    email: "admissions@hocking.edu",
    color: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-500",
    icon: <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 3v4m0 0a4 4 0 01-4 4H4m8-4a4 4 0 014 4h4m-8 0v4m0 0a4 4 0 004 4h4m-8-4a4 4 0 00-4 4H4" /></svg>,
    hours: [
      { days: "Monday:", time: "8:00 AM - 5:00 PM" },
      { days: "Tuesday-Thursday:", time: "8:00 AM - 5:00 PM" },
      { days: "Friday:", time: "8:00 AM - 4:30 PM" },
    ],
    services: [
      "Application Processing",
      "Campus Tours",
      "Admission Requirements",
      "Transfer Credit Evaluation",
      "New Student Orientation"
    ],
    staff: [
      { name: "Sarah Johnson", title: "Director of Admissions", email: "sjohnson@hocking.edu" },
      { name: "Michael Davis", title: "Admissions Counselor", email: "mdavis@hocking.edu" },
      { name: "Jennifer Smith", title: "Admissions Coordinator", email: "jsmith@hocking.edu" },
    ],
  },
  {
    id: "financial-aid",
    name: "Financial Aid Office",
    description: "Student financial assistance, scholarships, and payment plans",
    location: "Student Center, Room 102",
    phone: "740.753.7053",
    email: "finaid@hocking.edu",
    color: "bg-green-100 text-green-700",
    iconBg: "bg-green-500",
    icon: <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v4m0 0h4m-4 0H8" /></svg>,
    hours: [
      { days: "Monday:", time: "8:00 AM - 5:00 PM" },
      { days: "Tuesday-Thursday:", time: "8:00 AM - 5:00 PM" },
      { days: "Friday:", time: "8:00 AM - 4:30 PM" },
    ],
    services: [
      "FAFSA Processing",
      "Scholarship Applications",
      "Student Loans",
      "Work-Study Programs",
      "Payment Plans"
    ],
    staff: [
      { name: "Robert Wilson", title: "Director of Financial Aid", email: "rwilson@hocking.edu" },
      { name: "Lisa Anderson", title: "Financial Aid Counselor", email: "landerson@hocking.edu" },
      { name: "David Brown", title: "Scholarship Coordinator", email: "dbrown@hocking.edu" },
    ],
  },
  {
    id: "registrar",
    name: "Registrar's Office",
    description: "Student records, transcripts, and academic registration",
    location: "Administration Building, Room 201",
    phone: "740.753.7051",
    email: "registrar@hocking.edu",
    color: "bg-purple-100 text-purple-700",
    iconBg: "bg-purple-500",
    icon: <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>,
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
    id: "student-services",
    name: "Student Services",
    description: "Student support, counseling, and campus life services",
    location: "Student Center, Room 201",
    phone: "740.753.7052",
    email: "studentservices@hocking.edu",
    color: "bg-orange-100 text-orange-700",
    iconBg: "bg-orange-500",
    icon: <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 10-8 0 4 4 0 008 0zm6 6v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2a6 6 0 0112 0z" /></svg>,
    hours: [
      { days: "Monday:", time: "8:00 AM - 5:00 PM" },
      { days: "Tuesday-Thursday:", time: "8:00 AM - 5:00 PM" },
      { days: "Friday:", time: "8:00 AM - 4:30 PM" },
    ],
    services: [
      "Academic Advising",
      "Personal Counseling",
      "Disability Services",
      "Student Activities",
      "Housing Services"
    ],
    staff: [
      { name: "Christian Martinez", title: "Director of Student Services", email: "cmartinez@hocking.edu" },
      { name: "Kevin Lee", title: "Student Counselor", email: "klee@hocking.edu" },
      { name: "Rachel Green", title: "Student Activities Coordinator", email: "rgreen@hocking.edu" },
    ],
  },
  {
    id: "academic-advising",
    name: "Academic Advising Center",
    description: "Academic planning, course selection, and degree progress tracking",
    location: "Student Center, Room 203",
    phone: "740.753.7054",
    email: "advising@hocking.edu",
    color: "bg-indigo-100 text-indigo-700",
    iconBg: "bg-indigo-500",
    icon: <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    hours: [
      { days: "Monday:", time: "8:00 AM - 5:00 PM" },
      { days: "Tuesday-Thursday:", time: "8:00 AM - 5:00 PM" },
      { days: "Friday:", time: "8:00 AM - 4:30 PM" },
    ],
    services: [
      "Degree Planning",
      "Course Selection",
      "Transfer Credit Advising",
      "Academic Probation Support",
      "Graduation Planning"
    ],
    staff: [
      { name: "Dr. Emily Rodriguez", title: "Director of Academic Advising", email: "erodriguez@hocking.edu" },
      { name: "James Wilson", title: "Academic Advisor", email: "jwilson@hocking.edu" },
      { name: "Maria Garcia", title: "Transfer Student Advisor", email: "mgarcia@hocking.edu" },
    ],
  },
  {
    id: "career-services",
    name: "Career Services",
    description: "Career counseling, job placement, and professional development",
    location: "Student Center, Room 204",
    phone: "740.753.7055",
    email: "careers@hocking.edu",
    color: "bg-teal-100 text-teal-700",
    iconBg: "bg-teal-500",
    icon: <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" /></svg>,
    hours: [
      { days: "Monday:", time: "8:00 AM - 5:00 PM" },
      { days: "Tuesday-Thursday:", time: "8:00 AM - 5:00 PM" },
      { days: "Friday:", time: "8:00 AM - 4:30 PM" },
    ],
    services: [
      "Resume Writing",
      "Interview Preparation",
      "Job Search Assistance",
      "Internship Placement",
      "Career Fairs"
    ],
    staff: [
      { name: "Thomas Chen", title: "Director of Career Services", email: "tchen@hocking.edu" },
      { name: "Jessica Park", title: "Career Counselor", email: "jpark@hocking.edu" },
      { name: "Alex Johnson", title: "Employer Relations Coordinator", email: "ajohnson@hocking.edu" },
    ],
  },
];

export default function OfficeAdministration() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Office & Administration</h1>
        <p className="text-gray-600">Select an office or service below to view detailed information, contact details, and available services.</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {offices.map((office) => (
          <AccordionItem key={office.id} value={office.id} className="border rounded-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-4 w-full">
                <div className={`rounded-full p-2 ${office.iconBg}`}>
                  {office.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`text-lg font-semibold ${office.color}`}>{office.name}</h3>
                  <p className="text-sm text-gray-600">{office.description}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Location:</span>
                      <span>{office.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Phone:</span>
                      <a href={`tel:${office.phone.replace(/[^\d]/g, "")}`} className="text-primary hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Email:</span>
                      <a href={`mailto:${office.email}`} className="text-primary hover:underline">
                        {office.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Office Hours:</span>
                        <ul className="mt-1 space-y-1">
                          {office.hours.map((h, i) => (
                            <li key={i} className="text-gray-600">
                              {h.days} <span className="font-mono">{h.time}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Services Offered</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {office.services.map((service, i) => (
                      <span key={i} className="bg-gray-100 border border-gray-300 text-sm px-3 py-1 rounded-full text-gray-700">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Staff */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Key Staff</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {office.staff.map((person, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 border">
                        <div className="font-semibold text-gray-900 text-sm">{person.name}</div>
                        <div className="text-xs text-gray-600 mb-1">{person.title}</div>
                        <a href={`mailto:${person.email}`} className="text-primary text-xs hover:underline">
                          {person.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <a 
                    href={`tel:${office.phone.replace(/[^\d]/g, "")}`} 
                    className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${office.iconBg} text-white hover:opacity-90 transition-opacity`}
                  >
                    <Phone className="h-4 w-4" /> Call Office
                  </a>
                  <a 
                    href={`mailto:${office.email}`} 
                    className="bg-white border border-primary text-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" /> Send Email
                  </a>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 