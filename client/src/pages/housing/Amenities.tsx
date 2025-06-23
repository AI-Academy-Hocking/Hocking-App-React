import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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

export default function Amenities() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Campus Amenities</h1>
          <p className="text-muted-foreground">Discover the facilities and services available to you</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {amenities.map((amenity) => (
          <motion.div key={amenity.name} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{amenity.name}</CardTitle>
                  <Badge variant="secondary">{amenity.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{amenity.description}</p>
                <p className="text-sm font-medium mt-2">Location: {amenity.location}</p>
              </CardHeader>
              <CardContent>
                <h3 className="text-sm font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {amenity.features.map((feature) => (
                    <li key={feature} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {amenity.hours && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-3">Hours</h3>
                    <ul className="space-y-1">
                      {amenity.hours.map((hour, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {hour}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 