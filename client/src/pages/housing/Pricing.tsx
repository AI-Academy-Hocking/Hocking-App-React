import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Square, DollarSign, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PricingOption {
  title: string;
  type: "standard" | "premium" | "special";
  price: string;
  term: string;
  features: string[];
  bestFor: string[];
  notes?: string[];
}

const pricingOptions: PricingOption[] = [
  {
    title: "Premium Single Room",
    type: "premium",
    price: "$3,490.00",
    term: "per semester",
    features: [
      "Private room",
      "Private Bathroom or share bathroom with suitemate",
      "Furniture including Twin XL bed",
      "Closet",
      "Three-draw dresser",
      "Desk and chair",
      "Microwave",
      "Own controlled HVAC Unit",
      "Fridge and microwave",
      "WiFi"
    ],
    bestFor: [
      "Returners",
      "Students who prefer privacy",
      "Final Semester Student"
    ],
    notes: [
      "Limited Availability",
      "Early Application",
      "Can be waitlisted"
    ]
  },
  {
    title: "Standard Double Room",
    type: "standard",
    price: "$2,990.00",
    term: "per semester",
    features: [
      "Shared double occupancy room",
      "Suite-style bathroom",
      "Furniture including Twin XL bed",
      "Closet",
      "Three-draw dresser",
      "Desk and chair",
      "Microwave",
      "Own controlled HVAC Unit",
      "Fridge and microwave",
      "WiFi"
    ],
    bestFor: [
      "First year students",
      "Budget-conscious Students",
      "Traditional college experience"
    ],
    notes: [
      "You are able to request your own roommate in the allotted time given before assignments"
    ]
  },
  {
    title: "Sports Dorm and WHI Program",
    type: "special",
    price: "Contact for pricing",
    term: "",
    features: [],
    bestFor: [],
    notes: [
      "For prices, contact your program director or coach"
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

export default function Pricing() {
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
            <Square className="h-8 w-8 text-blue-600" />
            <DollarSign className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Housing Pricing & Rates</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Explore our housing options and costs. We offer competitive rates for various accommodation types to suit your needs and budget.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Standard Housing Options */}
        <AccordionItem value="standard" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <DollarSign className="mr-3 h-6 w-6" />
              Standard Housing Options
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {pricingOptions.slice(0, 2).map((option) => (
                <div key={option.title} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{option.title}</h3>
                    <Badge className={option.type === "premium" ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"}>
                      {option.type}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-blue-600">{option.price}</span>
                    <span className="text-sm text-blue-700 dark:text-blue-300 ml-2">{option.term}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {option.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Best For</h4>
                      <ul className="space-y-1">
                        {option.bestFor.map((item) => (
                          <li key={item} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {option.notes && (
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Notes</h4>
                        <ul className="space-y-1">
                          {option.notes.map((note) => (
                            <li key={note} className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Special Programs */}
        <AccordionItem value="special" className="border-2 border-green-600 rounded-lg">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <Square className="mr-3 h-6 w-6" />
              Special Programs
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-green-800 dark:text-green-200">{pricingOptions[2].title}</h3>
                <Badge className="bg-green-600 text-white">Special Program</Badge>
              </div>
              <div className="space-y-3">
                {pricingOptions[2].notes && (
                  <div>
                    <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Information</h4>
                    <ul className="space-y-1">
                      {pricingOptions[2].notes.map((note) => (
                        <li key={note} className="text-sm flex items-center gap-2 text-green-700 dark:text-green-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 