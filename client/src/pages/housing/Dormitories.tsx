import { Building2, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Dormitory {
  name: string;
  type: string;
  description: string;
  features: string[];
  image?: string;
}

const dormitories: Dormitory[] = [
  {
    name: "North",
    type: "Male only",
    description: "Traditional male residence hall offering a supportive community environment.",
    features: [
      "Double rooms only",
      "Suite bathrooms",
      "Study lounges",
      "Laundry facilities",
      "24/7 security"
    ]
  },
  {
    name: "Downhour",
    type: "Female only",
    description: "Traditional female residence hall offering a supportive community environment.",
    features: [
      "Double rooms only",
      "Suite bathrooms",
      "Study lounges",
      "Laundry facilities",
      "24/7 security"
    ]
  },
  {
    name: "Hocking Heights",
    type: "Male only / Sports Dorm",
    description: "Specialized housing for student athletes with convenient access to athletic facilities.",
    features: [
      "Double rooms",
      "Community bathrooms",
      "Games lounge",
      "Community kitchen",
      "Laundry facilities",
      "24/7 security"
    ]
  },
  {
    name: "Summit",
    type: "Coed Dorm",
    description: "Modern coeducational housing with contemporary amenities and study spaces.",
    features: [
      "Suite-style living (single rooms with shared bathroom)",
      "Kitchen facilities",
      "Games and study lounges",
      "Social spaces",
      "Parking",
      "24/7 security"
    ]
  },
  {
    name: "Sycamore",
    type: "Coed Dorm",
    description: "Coeducational residence hall featuring suite-style living arrangements.",
    features: [
      "Single and double rooms with private bathrooms",
      "Kitchen facilities",
      "Games and study lounges",
      "Social spaces",
      "Parking",
      "24/7 security"
    ]
  },
  {
    name: "International Housing",
    type: "WHI Program",
    description: "Specialized housing for international students participating in the WHI Program.",
    features: [
      "Apartment, 32, 34, 36, 79, and 81",
      "Single and Double rooms",
      "1 bathroom per Apartment and Kitchen",
      "Laundry facilities",
      "24/7 security"
    ]
  },
  {
    name: "Opportunity House",
    type: "Coed Dorm",
    description: "A supportive community space designed to help students grow and succeed through guided programs and mentorship.",
    features: [
      "Double rooms",
      "2 bathrooms",
      "Laundry facilities",
      "Study room",
      "Social spaces",
      "Community kitchen",
      "24/7 security"
    ]
  }
];

export default function Dormitories() {
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
          <Building2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Dormitories</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Find your perfect home on campus. Explore our residence halls and discover the amenities and community that await you.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Hillside Dormitories */}
        <AccordionItem value="traditional" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <Building2 className="mr-3 h-6 w-6" />
              Hillside Dormitories
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {dormitories.filter(dorm => ['North', 'Downhour', 'Hocking Heights'].includes(dorm.name)).map((dorm) => (
                <div key={dorm.name} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{dorm.name}</h3>
                    <Badge className="bg-blue-600 text-white">{dorm.type}</Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{dorm.description}</p>
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {dorm.features.map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Riverside Dormitories */}
        <AccordionItem value="suite-style" className="border-2 border-green-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <Building2 className="mr-3 h-6 w-6" />
              Riverside Dormitories
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {dormitories.filter(dorm => ['Summit', 'Sycamore'].includes(dorm.name)).map((dorm) => (
                <div key={dorm.name} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">{dorm.name}</h3>
                    <Badge className="bg-green-600 text-white">{dorm.type}</Badge>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">{dorm.description}</p>
                  <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {dorm.features.map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* International Housing and Opportunity House */}
        <AccordionItem value="specialized" className="border-2 border-purple-600 rounded-lg">
          <AccordionTrigger className="bg-purple-50 dark:bg-purple-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-purple-800 dark:text-purple-200">
              <Building2 className="mr-3 h-6 w-6" />
              International Housing and Opportunity House
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {dormitories.filter(dorm => ['International Housing', 'Opportunity House'].includes(dorm.name)).map((dorm) => (
                <div key={dorm.name} className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-purple-800 dark:text-purple-200">{dorm.name}</h3>
                    <Badge className="bg-purple-600 text-white">{dorm.type}</Badge>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">{dorm.description}</p>
                  <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {dorm.features.map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600"></span>
                        {feature}
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