import { Sparkles, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Amenity {
  name: string;
  category: string;
  description: string;
  features: string[];
  location: string;
  hours?: string[];
}

const amenities: Amenity[] = [
  {
    name: "Fitness Center",
    category: "Wellness",
    description: "State-of-the-art fitness facilities for all students",
    features: [
      "Modern exercise equipment",
      "Cardio machines",
      "Weight training area",
      "Group exercise space",
      "Locker rooms"
    ],
    location: "Student's Center"
  },
  {
    name: "Study Spaces",
    category: "Academic",
    description: "Dedicated spaces for studying and group work",
    features: [
      "Quiet study areas",
      "Group study rooms",
      "TV for movie watching",
      "Projectors for presentations",
      "Comfortable seating"
    ],
    location: "Various locations across campus"
  },
  {
    name: "Laundry Facilities",
    category: "Convenience",
    description: "Free laundry services for all residents",
    features: [
      "Free washers and dryers",
      "Folding areas",
      "Waiting areas",
      "24/7 access",
      "Multiple locations"
    ],
    location: "All residence halls"
  },
  {
    name: "Dining Hall",
    category: "Dining",
    description: "Main campus dining facility offering diverse meal options",
    features: [
      "Breakfast service",
      "Lunch service",
      "Dinner service",
      "Diverse menu options",
      "All-you-can-eat dining"
    ],
    location: "Second floor of John Light Hall"
  },
  {
    name: "Student's Center",
    category: "Recreation",
    description: "Central hub for student activities and recreation",
    features: [
      "Gym",
      "Rock wall climbing",
      "Indoor track",
      "Pool",
      "Club activities",
      "Sports facilities",
      "Fitness areas",
      "Aerobics room",
      "Aquatics center",
      "Flag Football Intramural League",
      "Basketball courts",
      "Pickleball courts",
      "Table Tennis",
      "Golf Driving Range",
      "Basketball and Softball Intramural Leagues",
      "Volleyball courts",
      "Hawk Shop"
    ],
    location: "Central Campus",
    hours: [
      "Main Facility:",
      "Weekdays: 8 AM - 8 PM",
      "Weekends: 11 AM - 6 PM",
      "",
      "Pool:",
      "Weekdays: 8 AM - 12 PM",
      "",
      "Climbing Wall:",
      "Please call to request a climbing time",
      "",
      "Hawk Shop:",
      "Monday-Friday: 1-4 PM"
    ]
  }
];



export default function Amenities() {
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
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Campus Amenities</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Discover the facilities and services available to you. From fitness centers to study spaces, we provide everything you need for a complete college experience.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Wellness & Fitness */}
        <AccordionItem value="wellness" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <Sparkles className="mr-3 h-6 w-6" />
              Wellness & Fitness
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {amenities.filter(amenity => ['Fitness Center', 'Student\'s Center'].includes(amenity.name)).map((amenity) => (
                <div key={amenity.name} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{amenity.name}</h3>
                    <Badge className="bg-blue-600 text-white">{amenity.category}</Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{amenity.description}</p>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">Location: {amenity.location}</p>
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Features</h4>
                  <ul className="space-y-1 mb-3">
                    {amenity.features.map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {amenity.hours && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Hours</h4>
                      <ul className="space-y-1">
                        {amenity.hours.map((hour, index) => (
                          <li key={index} className="text-sm text-blue-700 dark:text-blue-300">
                            {hour}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Academic & Convenience */}
        <AccordionItem value="academic" className="border-2 border-green-600 rounded-lg">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <Sparkles className="mr-3 h-6 w-6" />
              Academic & Convenience
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {amenities.filter(amenity => ['Study Spaces', 'Laundry Facilities', 'Dining Hall'].includes(amenity.name)).map((amenity) => (
                <div key={amenity.name} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">{amenity.name}</h3>
                    <Badge className="bg-green-600 text-white">{amenity.category}</Badge>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">{amenity.description}</p>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-3">Location: {amenity.location}</p>
                  <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {amenity.features.map((feature) => (
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
      </Accordion>
    </div>
  );
} 