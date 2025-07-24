import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock, Bus, Car, Bike, HelpCircle, Calendar, Map, ExternalLink, DollarSign, Wifi } from "lucide-react";

const quickLinks = [
  { label: "Line N7 Schedule", icon: Calendar, href: "#", description: "View N7 Schedule PDF" },
  { label: "Live Bus Tracker", icon: Map, href: "https://athenstransit.org", description: "Track N7 bus in real-time" },
  { label: "GoBus Tickets", icon: Bus, href: "https://ridegobus.com", description: "Book intercity travel" },
  { label: "GoBus Contact", icon: Phone, href: "tel:1-888-954-6287", description: "Call 1-888-954-6287" },
];

const serviceHours = [
  { days: "Monday - Friday", time: "7:00 AM - 7:00 PM", service: "Athens Transit Line N7 (hourly)" },
  { days: "Daily", time: "6 trips daily", service: "GoBus Intercity Service" },
  { days: "Year-round", time: "365 days/year", service: "GoBus Route A" },
];

const transportationOptions = [
  {
    icon: Bus,
    title: "Athens Transit – Line N7",
    description: "Local route connecting Hocking College to Athens downtown",
    details: [
      "Route: Hocking College ↔ Athens downtown",
      "Fare: $1 cash fare (exact change)",
      "Schedule: Mon–Fri, hourly from 7 AM–7 PM",
      "Hail anywhere along route",
      "Stop at marked hail zones and landmarks"
    ],
    features: ["Local Service", "Hourly Schedule", "Cash Fare"]
  },
  {
    icon: Bus,
    title: "GoBus – Intercity Service",
    description: "Statewide travel from Hocking College to Columbus, Parkersburg, and beyond",
    details: [
      "Route: Hocking College → Athens → Columbus → Parkersburg",
      "Service: 6 times daily, 365 days/year on Route A",
      "Boarding: Hocking College Bus Stop (in front of mailroom)",
      "Fare: $6–$12 to Athens, varies for longer trips",
      "Buy tickets at Cashier's Office or Student Center kiosk"
    ],
    features: ["Wi-Fi", "Outlets", "Restrooms", "Wheelchair-accessible"]
  },
  {
    icon: Car,
    title: "Campus Parking",
    description: "Multiple parking lots available for students, staff, and visitors",
    details: [
      "Parking permits required",
      "Various lot locations across campus",
      "Accessible parking available"
    ],
    features: ["Permit Required", "Multiple Locations", "Accessible"]
  },
  {
    icon: Bike,
    title: "Bike Racks",
    description: "Secure bike racks located at major campus buildings",
    details: [
      "Available at most major campus buildings",
      "Secure locking recommended",
      "Free to use"
    ],
    features: ["Free", "Secure", "Multiple Locations"]
  },
];

const faqs = [
  {
    question: "Which buses serve campus?",
    answer: "Athens Transit Line N7 ($1, hourly, Mon–Fri) and GoBus (intercity, six daily trips, runs year-round)."
  },
  {
    question: "How much is a bus ride?",
    answer: "N7: $1 exact cash. GoBus: $6–$12 (Athens); fares vary for longer routes."
  },
  {
    question: "How can I track the buses?",
    answer: "N7: Live tracking via Athens Transit. GoBus: Booked via website; check departures via app or kiosk."
  },
  {
    question: "Where do I buy GoBus tickets?",
    answer: "Buy tickets at the Cashier's Office or kiosk in Student Center. Buses depart three times daily in both directions."
  },
  {
    question: "Do I need a permit to park on campus?",
    answer: "Yes, all vehicles parked on campus must display a valid parking permit. Permits can be purchased online or at the campus security office."
  },
  {
    question: "Is there transportation for students with disabilities?",
    answer: "Yes, GoBus offers wheelchair-accessible coaches. Please contact the transportation office for additional arrangements."
  },
];

const contactInfo = {
  location: "Student Center, Room 105",
  phone: "740-753-7000",
  email: "transport@hocking.edu",
  hours: "Monday - Friday: 8:00 AM - 5:00 PM",
  gobusPhone: "1-888-954-6287",
  gobusWebsite: "https://ridegobus.com"
};

export default function Transportation() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Bus className="h-8 w-8 text-blue-600" /> Campus Transportation
        </h1>
        <p className="text-gray-600 text-lg">Get around easily, from local Athens trips to statewide travel, plus on-campus fleet access for projects.</p>
      </header>

      {/* Quick Access Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map(link => (
            <Button asChild key={link.label} className="flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 h-auto">
              <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                <link.icon className="h-6 w-6 mb-1" />
                <span className="text-sm">{link.label}</span>
                <span className="text-xs opacity-90">{link.description}</span>
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
            <ul className="space-y-3">
              {serviceHours.map((h, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-700">
                  <span className="font-medium w-40 flex-shrink-0">{h.days}:</span>
                  <div>
                    <span className="font-mono">{h.time}</span>
                    <div className="text-sm text-gray-500 mt-1">{h.service}</div>
                  </div>
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
              <CardContent className="space-y-4">
                <p className="text-gray-700">{opt.description}</p>
                <div className="space-y-2">
                  {opt.details.map((detail, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {opt.features.map((feature, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {feature === "Wi-Fi" && <Wifi className="h-3 w-3" />}
                      {feature === "Wheelchair-accessible" && null}
                      {feature === "Cash Fare" && <DollarSign className="h-3 w-3" />}
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><HelpCircle className="h-6 w-6 text-blue-600" /> Transportation FAQ</h2>
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
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Campus Transportation Office</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">GoBus Customer Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Phone:</span>
                <a href={`tel:${contactInfo.gobusPhone}`} className="text-blue-600 hover:underline">{contactInfo.gobusPhone}</a>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <ExternalLink className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Website:</span>
                <a href={contactInfo.gobusWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ridegobus.com</a>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Boarding:</span>
                <span>Hocking College Bus Stop (in front of mailroom)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 