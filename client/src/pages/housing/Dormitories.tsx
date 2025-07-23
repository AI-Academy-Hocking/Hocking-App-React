import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

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

export default function Dormitories() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <button
          onClick={() => setLocation('/housing')}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Housing Services
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Dormitories</h1>
          <p className="text-muted-foreground">Find your perfect home on campus</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dormitories.map((dorm) => (
          <motion.div key={dorm.name} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{dorm.name}</CardTitle>
                  <Badge variant="secondary">{dorm.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{dorm.description}</p>
              </CardHeader>
              <CardContent>
                <h3 className="text-sm font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {dorm.features.map((feature) => (
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
    </div>
  );
} 