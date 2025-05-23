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
}

const amenities: Amenity[] = [
  {
    name: "Fitness Center",
    category: "Recreation",
    description: "State-of-the-art fitness facility available to all residents.",
    features: [
      "Cardio equipment",
      "Weight training area",
      "Group exercise rooms",
      "Locker rooms",
      "Fitness classes"
    ],
    location: "Main Campus Center"
  },
  {
    name: "Study Spaces",
    category: "Academic",
    description: "Dedicated areas for individual and group study.",
    features: [
      "Quiet study rooms",
      "Group study areas",
      "Computer labs",
      "Printing facilities",
      "24/7 access"
    ],
    location: "All Residence Halls"
  },
  {
    name: "Laundry Facilities",
    category: "Essential",
    description: "Convenient laundry services in each residence hall.",
    features: [
      "Washers and dryers",
      "Mobile payment options",
      "Laundry alerts",
      "Ironing stations",
      "Folding areas"
    ],
    location: "All Residence Halls"
  },
  {
    name: "Dining Halls",
    category: "Dining",
    description: "Multiple dining options with diverse meal choices.",
    features: [
      "All-you-can-eat meals",
      "Special dietary options",
      "Late-night dining",
      "Grab-and-go options",
      "Meal plan flexibility"
    ],
    location: "Campus Center"
  },
  {
    name: "Recreation Center",
    category: "Recreation",
    description: "Comprehensive recreation facility for sports and activities.",
    features: [
      "Indoor basketball courts",
      "Swimming pool",
      "Racquetball courts",
      "Fitness classes",
      "Equipment rental"
    ],
    location: "Campus Center"
  },
  {
    name: "Common Areas",
    category: "Social",
    description: "Spaces for socializing and community building.",
    features: [
      "TV lounges",
      "Game rooms",
      "Outdoor spaces",
      "BBQ areas",
      "Community kitchens"
    ],
    location: "All Residence Halls"
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
          <h1 className="text-3xl font-bold">Amenities</h1>
          <p className="text-muted-foreground">Discover the facilities and services available to residents</p>
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 