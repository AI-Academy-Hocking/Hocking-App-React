import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

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
];

export default function OfficeAdministration() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-heading font-semibold mb-4">Office & Administration</h1>
      {offices.map((office) => (
        <Card key={office.id} className="p-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`rounded-full p-2 ${office.iconBg}`}>{office.icon}</div>
              <div>
                <h2 className={`text-lg font-bold ${office.color}`}>{office.name}</h2>
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
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <Clock className="h-4 w-4" /> <span className="font-medium">Office Hours:</span>
            </div>
            <ul className="ml-7 text-sm text-gray-700">
              {office.hours.map((h, i) => (
                <li key={i}>{h.days} <span className="font-mono">{h.time}</span></li>
              ))}
            </ul>
            <div className="mt-4">
              <span className="font-medium text-gray-700">Services Offered</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {office.services.map((service, i) => (
                  <span key={i} className="bg-gray-100 border border-gray-300 text-xs px-3 py-1 rounded-full text-gray-700">{service}</span>
                ))}
              </div>
            </div>
            <div className="mt-4">
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
              <a href={`tel:${office.phone.replace(/[^\d]/g, "")}`} className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${office.iconBg} text-white`}><Phone className="h-4 w-4" /> Call Office</a>
              <a href={`mailto:${office.email}`} className="bg-white border border-primary text-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><Mail className="h-4 w-4" /> Send Email</a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 