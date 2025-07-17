import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Building2, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ContactInfo {
  title: string;
  icon: React.ReactNode;
  details: string[];
  description?: string;
}

const contactInfo: ContactInfo[] = [
  {
    title: "Main Office",
    icon: <Building2 className="h-6 w-6" />,
    details: [
      "Housing & Residence Life",
      "Room 196 John Light Hall",
      "3301 Hocking Parkway",
      "Nelsonville, OH 45764"
    ],
    description: "For general inquiries and administrative matters"
  },
  {
    title: "Phone",
    icon: <Phone className="h-6 w-6" />,
    details: [
      "Main: (740) 753-7043",
      "Emergency: (740) 753-6598"
    ],
    description: "Available 24/7 for emergencies"
  },
  {
    title: "Email",
    icon: <Mail className="h-6 w-6" />,
    details: [
      "General: housing@hocking.edu"
    ],
    description: "Response within 24-48 business hours"
  },
  {
    title: "Office Hours",
    icon: <Clock className="h-6 w-6" />,
    details: [
      "Monday - Friday: 8:00 AM - 5:00 PM",
      "Saturday: Closed",
      "Sunday: Closed"
    ],
    description: "Summer hours may vary"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Contact form submitted');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link 
          href="/housing"
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Housing</span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <MapPin className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Contact Us</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Get in touch with Housing & Residence Life. We're here to help with all your housing questions and concerns.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Contact Information */}
        <AccordionItem value="contact-info" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <Building2 className="mr-3 h-6 w-6" />
              Contact Information
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{info.title}</h3>
                  </div>
                  {info.description && (
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{info.description}</p>
                  )}
                  <ul className="space-y-2">
                    {info.details.map((detail) => (
                      <li key={detail} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Form */}
        <AccordionItem value="contact-form" className="border-2 border-green-600 rounded-lg">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <Mail className="mr-3 h-6 w-6" />
              Send us a Message
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="maintenance">Maintenance Request</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Name</label>
                  <Input placeholder="Your full name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Email</label>
                  <Input type="email" placeholder="your.email@hocking.edu" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Phone</label>
                  <Input placeholder="Your phone number" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-700 dark:text-green-300">Message</label>
                <Textarea 
                  placeholder="How can we help you?"
                  className="min-h-[150px]"
                />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">Send Message</Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 