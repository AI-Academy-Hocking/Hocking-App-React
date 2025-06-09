import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
      "Single and double rooms",
      "Community bathrooms",
      "Study lounges",
      "Laundry facilities",
      "24/7 security"
    ]
  },
  {
    name: "Downhour",
    type: "Female only",
    description: "Traditional female residence hall with a focus on academic success and community building.",
    features: [
      "Single and double rooms",
      "Community bathrooms",
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
      "Private bathrooms",
      "Athletic study center",
      "Fitness facilities",
      "Team meeting rooms"
    ]
  },
  {
    name: "Summit",
    type: "Coed Dorm",
    description: "Modern coeducational housing with contemporary amenities and study spaces.",
    features: [
      "Suite-style living",
      "Private bathrooms",
      "Kitchen facilities",
      "Study lounges",
      "Social spaces"
    ]
  },
  {
    name: "Sycamore",
    type: "Coed Dorm",
    description: "Coeducational residence hall featuring suite-style living arrangements.",
    features: [
      "Suite-style living",
      "Private bathrooms",
      "Kitchen facilities",
      "Study lounges",
      "Social spaces"
    ]
  },
  {
    name: "International Housing",
    type: "WHI Program",
    description: "Specialized housing for international students participating in the WHI Program.",
    features: [
      "Single and double rooms",
      "Private bathrooms",
      "Cultural center",
      "Language labs",
      "International student support"
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
  return (
    <div className="container mx-auto p-6">
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
  );
} 