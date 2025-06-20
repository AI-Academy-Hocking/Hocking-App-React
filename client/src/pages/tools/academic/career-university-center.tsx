import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Briefcase } from "lucide-react";

const info = {
  name: "Career & University Center",
  description: "Your hub for career counseling, resume building, job fairs, and university transfer services.",
  location: "Student Center, Room 301",
  phone: "740.753.7060",
  email: "careercenter@hocking.edu",
  hours: [
    { days: "Monday-Friday:", time: "9:00 AM - 5:00 PM" },
  ],
  services: [
    {
      title: "Career Counseling",
      description: "Meet with our counselors to explore career paths, identify your strengths, and set professional goals.",
    },
    {
      title: "University Transfer",
      description: "Get assistance with transfer applications, credit evaluation, and connecting with four-year institutions.",
    },
    {
      title: "Resume Building & Mock Interviews",
      description: "Craft a winning resume and practice your interview skills with our expert staff.",
    },
    {
      title: "Job Fairs & Employer Events",
      description: "Connect with local and regional employers at our regular job fairs and networking events.",
    },
  ],
  staff: [
    { name: "David Wright", title: "Director of Career Services", email: "dwright@hocking.edu" },
    { name: "Maria Garcia", title: "University Transfer Coordinator", email: "mgarcia@hocking.edu" },
    { name: "Kevin Chen", title: "Career Counselor", email: "kchen@hocking.edu" },
  ],
};

export default function CareerUniversityCenter() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Briefcase className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-heading font-semibold">{info.name}</h1>
          <p className="text-gray-600">{info.description}</p>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact & Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /> {info.location}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> {info.phone}</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" /> {info.email}</div>
                <div className="flex items-center gap-2 mt-2"><Clock className="h-4 w-4 text-gray-500" /> <strong>Hours:</strong></div>
                <ul className="ml-7 text-gray-700">
                  {info.hours.map((h, i) => <li key={i}>{h.days} <span className="font-mono">{h.time}</span></li>)}
                </ul>
              </div>
              <h3 className="text-lg font-semibold mt-6 mb-3">Key Staff</h3>
              <div className="space-y-3">
                {info.staff.map((person, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-600">{person.title}</p>
                    <a href={`mailto:${person.email}`} className="text-primary text-xs underline mt-1">{person.email}</a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Services Offered</h3>
              <div className="space-y-4">
                {info.services.map((service, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-800">{service.title}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 