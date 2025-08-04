import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock, Bus, Car, Bike, HelpCircle, Calendar, Map, ExternalLink, DollarSign, Wifi } from "lucide-react";
import { motion } from "framer-motion";



const serviceHours = [
  { days: "Monday - Friday", time: "7:00 AM - 7:00 PM", service: "Local Athens bus (every hour)" },
  { days: "Every Day", time: "6 trips daily", service: "Long-distance GoBus" },
  { days: "All Year", time: "365 days", service: "No holiday breaks" },
];

const transportationOptions = [
  {
    icon: Bus,
    title: "Local Athens Bus (N7)",
    description: "Get to downtown Athens for shopping, dining, and entertainment",
    details: [
      "Runs between campus and Athens downtown",
      "Cost: Just $1 (bring exact change)",
      "When: Monday-Friday, every hour from 7 AM to 7 PM",
      "How: Wave down the bus anywhere along the route",
      "Stops: At marked bus stops and major landmarks"
    ],
    features: ["Affordable", "Convenient", "No Reservations"]
  },
  {
    icon: Bus,
    title: "Long-Distance Travel (GoBus)",
    description: "Travel across Ohio to Columbus, Parkersburg, and other cities",
    details: [
      "Goes to: Athens → Columbus → Parkersburg and beyond",
      "How often: 6 trips daily, runs every day of the year",
      "Where to board: Hocking College bus stop (by the mailroom)",
      "Cost: $6-$12 to Athens, more for longer trips",
      "Tickets: Buy at Cashier's Office or Student Center kiosk"
    ],
    features: ["Wi-Fi", "Power Outlets", "Restrooms", "Wheelchair Access"]
  },
  {
    icon: Car,
    title: "Campus Parking",
    description: "Drive to campus and park in our student lots",
    details: [
      "You need: A parking permit (required for all vehicles)",
      "Where: Multiple lots throughout campus",
      "Accessibility: Special spaces available for students with disabilities",
      "Cost: Contact campus security for permit pricing"
    ],
    features: ["Permit Required", "Multiple Lots", "Accessible Spaces"]
  },
  {
    icon: Bike,
    title: "Bike Parking",
    description: "Bike to campus and secure your ride at our bike racks",
    details: [
      "Where: Bike racks at all major buildings",
      "Security: Bring your own lock for safety",
      "Cost: Completely free to use",
      "Tip: Register your bike with campus security"
    ],
    features: ["Free", "Convenient", "Multiple Locations"]
  },
];

const faqs = [
  {
    question: "What buses can I take from campus?",
    answer: "Two options: The local N7 bus to Athens ($1, every hour on weekdays) and GoBus for long-distance travel (6 trips daily, runs every day)."
  },
  {
    question: "How much does it cost to ride the bus?",
    answer: "Local N7 bus costs $1 (exact change only). GoBus costs $6-$12 to Athens, with higher fares for longer trips like Columbus."
  },
  {
    question: "Can I see where the bus is in real-time?",
    answer: "Yes! Track the N7 bus live on the Athens Transit website. For GoBus, check departure times on their website or at the Student Center kiosk."
  },
  {
    question: "Where do I buy long-distance bus tickets?",
    answer: "Buy GoBus tickets at the Cashier's Office or the kiosk in the Student Center. You can also buy them online at ridegobus.com."
  },
  {
    question: "Do I need a parking permit?",
    answer: "Yes, every car parked on campus needs a valid parking permit. Get yours from campus security or buy online."
  },
  {
    question: "What if I need accessible transportation?",
    answer: "GoBus has wheelchair-accessible buses. For other needs, contact our transportation office and we'll help arrange something."
  },
  {
    question: "What if I miss the last bus?",
    answer: "Plan ahead! The N7 stops running at 7 PM on weekdays. GoBus has 6 trips daily, so check the schedule. Consider carpooling or rideshare as backup options."
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
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAccordionChange = (value: string) => {
    setOpenAccordion(value === openAccordion ? "" : value);
  };

  // Close accordion when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenAccordion("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-popover p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Bus className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-blue-300">Campus Transportation</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Easy transportation options to get you around campus, into Athens, and across Ohio
          </p>
        </motion.div>



        {/* Service Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 mb-8">
          <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={handleAccordionChange}>
            <AccordionItem value="service-hours" className="border-none">
              <AccordionTrigger hideChevron className="text-2xl font-bold text-left text-gray-900 dark:text-blue-300 px-0 py-0">
                <div className="flex items-center gap-4">
                  <Clock className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  <span>Service Hours</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-6">
                <div className="space-y-4">
                  {serviceHours.map((h, i) => (
                    <Card key={i} className="bg-white dark:bg-popover border-2 border-blue-600 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div className="font-semibold text-gray-900 dark:text-blue-300">
                            {h.days}
                          </div>
                          <div className="font-semibold text-lg text-center md:text-left text-gray-600 dark:text-gray-300">
                            {h.time}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 md:text-right">
                            {h.service}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Transportation Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 mb-8">
          <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={handleAccordionChange}>
            <AccordionItem value="transportation-options" className="border-none">
              <AccordionTrigger hideChevron className="text-2xl font-bold text-left text-gray-900 dark:text-blue-300 px-0 py-0">
                <div className="flex items-center gap-4">
                  <Car className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  <span>Transportation Options</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {transportationOptions.map((opt, i) => (
                    <AccordionItem key={opt.title} value={String(i)} className="bg-white dark:bg-popover border-2 border-blue-600 dark:border-gray-700 rounded-lg overflow-hidden">
                      <AccordionTrigger hideChevron className="text-lg font-bold text-left text-gray-900 dark:text-blue-300 px-4">
                        <div className="flex items-center gap-3">
                          <opt.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          <span>{opt.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <div className="space-y-4">
                          <p className="text-gray-700 dark:text-gray-300">{opt.description}</p>
                          <div className="space-y-2">
                            {opt.details.map((detail, index) => (
                              <div key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {opt.features.map((feature, index) => (
                              <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-md">
                                {feature === "Wi-Fi" && <Wifi className="h-3 w-3" />}
                                {feature === "Cash Fare" && <DollarSign className="h-3 w-3" />}
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 mb-8">
          <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={handleAccordionChange}>
            <AccordionItem value="transportation-faq" className="border-none">
              <AccordionTrigger hideChevron className="text-2xl font-bold text-left text-gray-900 dark:text-blue-300 px-0 py-0">
                <div className="flex items-center gap-4">
                  <HelpCircle className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  <span>Transportation FAQ</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={String(i)} className="bg-white dark:bg-popover border-2 border-blue-600 dark:border-gray-700 rounded-lg overflow-hidden">
                      <AccordionTrigger hideChevron className="text-lg font-medium text-left text-gray-900 dark:text-blue-300 px-4">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-700 dark:text-gray-300 px-4">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
          <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={handleAccordionChange}>
            <AccordionItem value="contact-information" className="border-none">
              <AccordionTrigger hideChevron className="text-2xl font-bold text-left text-gray-900 dark:text-blue-300 px-0 py-0">
                <div className="flex items-center gap-4">
                  <Mail className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  <span>Contact Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="campus-office" className="bg-white dark:bg-popover border-2 border-blue-600 dark:border-gray-700 rounded-lg overflow-hidden">
                                      <AccordionTrigger hideChevron className="text-base font-bold text-left text-gray-900 dark:text-blue-300 px-4">
                  Campus Transportation Office
                </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <div className="space-y-2 pt-0">
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">Location:</span>
                            <span>{contactInfo.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">Phone:</span>
                            <a href={`tel:${contactInfo.phone}`} className="text-blue-600 dark:text-blue-400">{contactInfo.phone}</a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">Email:</span>
                            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 dark:text-blue-400">{contactInfo.email}</a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">Office Hours:</span>
                            <span>{contactInfo.hours}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="gobus-service" className="bg-white dark:bg-popover border-2 border-blue-600 dark:border-gray-700 rounded-lg overflow-hidden">
                                      <AccordionTrigger hideChevron className="text-base font-bold text-left text-gray-900 dark:text-blue-300 px-4">
                  GoBus Customer Service
                </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <div className="space-y-2 pt-0">
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">Phone:</span>
                            <a href={`tel:${contactInfo.gobusPhone}`} className="text-blue-600 dark:text-blue-400">{contactInfo.gobusPhone}</a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">Website:</span>
                            <a href={contactInfo.gobusWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400">ridegobus.com</a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">Boarding:</span>
                            <span>Hocking College Bus Stop (in front of mailroom)</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
} 
