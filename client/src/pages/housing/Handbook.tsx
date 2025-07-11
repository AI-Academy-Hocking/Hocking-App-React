import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Building2, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HandbookSection {
  title: string;
  category: string;
  content: string[];
  important?: boolean;
}

const handbookSections: HandbookSection[] = [
  {
    title: "Welcome to Campus Living",
    category: "Introduction",
    content: [
      "Welcome to your new home away from home!",
      "This handbook is your guide to successful campus living.",
      "Please review all policies and procedures carefully."
    ],
    important: true
  },
  {
    title: "Community Standards",
    category: "Policies",
    content: [
      "Respect for others and their property",
      "Quiet hours and noise policies",
      "Guest policies and visitation rules",
      "Room decoration guidelines"
    ]
  },
  {
    title: "Safety & Security",
    category: "Safety",
    content: [
      "Emergency procedures and contacts",
      "Building access and key policies",
      "Fire safety guidelines",
      "Personal property security"
    ],
    important: true
  },
  {
    title: "Room Care & Maintenance",
    category: "Facilities",
    content: [
      "Cleaning expectations",
      "Maintenance request procedures",
      "Damage reporting",
      "Room inspection guidelines"
    ]
  },
  {
    title: "Community Resources",
    category: "Support",
    content: [
      "Resident Assistant (RA) support",
      "Counseling services",
      "Academic support resources",
      "Health and wellness services"
    ]
  },
  {
    title: "Dining & Meal Plans",
    category: "Services",
    content: [
      "Dining hall locations and hours",
      "Meal plan options and changes",
      "Special dietary accommodations",
      "Guest meal policies"
    ]
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

export default function Handbook() {
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
          <div className="relative">
            <Book className="h-8 w-8 text-blue-600" />
            <Building2 className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Residence Life Handbook</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Your complete guide to living on campus. Learn about policies, procedures, and resources available to help you succeed.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Important Sections */}
        <AccordionItem value="important" className="border-2 border-red-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-red-50 dark:bg-red-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-red-800 dark:text-red-200">
              <Book className="mr-3 h-6 w-6" />
              Important Information
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {handbookSections.filter(section => section.important).map((section) => (
                <div key={section.title} className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-red-800 dark:text-red-200">{section.title}</h3>
                    <Badge className="bg-red-600 text-white">Important</Badge>
                  </div>
                  <Badge className="bg-red-200 text-red-800 mb-3">{section.category}</Badge>
                  <ul className="space-y-2">
                    {section.content.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        <span className="text-red-700 dark:text-red-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* General Sections */}
        <AccordionItem value="general" className="border-2 border-blue-600 rounded-lg">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <Building2 className="mr-3 h-6 w-6" />
              General Information
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {handbookSections.filter(section => !section.important).map((section) => (
                <div key={section.title} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{section.title}</h3>
                  </div>
                  <Badge className="bg-blue-200 text-blue-800 mb-3">{section.category}</Badge>
                  <ul className="space-y-2">
                    {section.content.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        <span className="text-blue-700 dark:text-blue-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 