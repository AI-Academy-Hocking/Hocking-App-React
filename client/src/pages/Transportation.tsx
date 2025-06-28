import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock, Bus, Car, Bike, HelpCircle, Calendar, Map } from "lucide-react";

const quickLinks = [
  { label: "Shuttle Schedule", icon: Bus, href: "#" },
  { label: "Parking Map", icon: Map, href: "#" },
  { label: "Request a Ride", icon: Car, href: "#" },
  { label: "Bike Rack Locations", icon: Bike, href: "#" },
];

const serviceHours = [
  { days: "Monday - Friday", time: "7:00 AM - 7:00 PM" },
  { days: "Saturday - Sunday", time: "8:00 AM - 4:00 PM" },
];

const transportationOptions = [
  {
    icon: Bus,
    title: "Campus Shuttle",
    description: "Free shuttle service around campus and to key off-campus locations. Runs every 30 minutes during service hours."
  },
  {
    icon: Car,
    title: "Parking Lots",
    description: "Multiple parking lots available for students, staff, and visitors. Parking permits required."
  },
  {
    icon: Bike,
    title: "Bike Racks",
    description: "Secure bike racks are located at major campus buildings."
  },
  {
    icon: Map,
    title: "Accessible Transportation",
    description: "Accessible shuttle and parking options are available for students with disabilities."
  },
];

const faqs = [
  {
    question: "How do I find the shuttle schedule?",
    answer: "You can view the shuttle schedule by clicking the 'Shuttle Schedule' button above or visiting the campus transportation office."
  },
  {
    question: "Do I need a permit to park on campus?",
    answer: "Yes, all vehicles parked on campus must display a valid parking permit. Permits can be purchased online or at the campus security office."
  },
  {
    question: "Is there transportation for students with disabilities?",
    answer: "Yes, accessible shuttles and parking are available. Please contact the transportation office for arrangements."
  },
  {
    question: "Where can I store my bike?",
    answer: "Bike racks are available at most major campus buildings. Please lock your bike securely."
  },
];

const contactInfo = {
  location: "Student Center, Room 105",
  phone: "740-753-7000",
  email: "transport@hocking.edu",
  hours: "Monday - Friday: 8:00 AM - 5:00 PM"
};

export default function Transportation() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Bus className="h-8 w-8 text-blue-600" /> Transportation
        </h1>
        <p className="text-gray-600">Get around campus with ease. Find shuttle schedules, parking info, and more.</p>
      </header>

      {/* Quick Access Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map(link => (
            <Button asChild key={link.label} className="flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6">
              <a href={link.href}>
                <link.icon className="h-6 w-6 mb-1" />
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Service Hours */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Clock className="h-6 w-6 text-blue-600" /> Service Hours</h2>
        <Card>
          <CardContent className="py-4">
            <ul className="space-y-2">
              {serviceHours.map((h, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-700">
                  <span className="font-medium w-40">{h.days}:</span>
                  <span className="font-mono">{h.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Transportation Options */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Car className="h-6 w-6 text-blue-600" /> Transportation Options</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {transportationOptions.map(opt => (
            <Card key={opt.title} className="h-full">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <opt.icon className="h-7 w-7 text-blue-600" />
                <CardTitle className="text-lg font-semibold">{opt.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{opt.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><HelpCircle className="h-6 w-6 text-blue-600" /> Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="text-lg font-medium text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Mail className="h-6 w-6 text-blue-600" /> Contact Information</h2>
        <Card>
          <CardContent className="py-4 space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Location:</span>
              <span>{contactInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Phone:</span>
              <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">{contactInfo.phone}</a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Email:</span>
              <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">{contactInfo.email}</a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Office Hours:</span>
              <span>{contactInfo.hours}</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 