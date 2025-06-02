import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Square, DollarSign } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PricingOption {
  title: string;
  type: "standard" | "premium" | "suite";
  price: string;
  term: string;
  features: string[];
  bestFor: string[];
  notes?: string[];
}

const pricingOptions: PricingOption[] = [
  {
    title: "Standard Double Room",
    type: "standard",
    price: "$3,200",
    term: "per semester",
    features: [
      "Shared double occupancy room",
      "Community bathroom",
      "Basic furnishings",
      "High-speed internet",
      "24/7 security"
    ],
    bestFor: [
      "First-year students",
      "Budget-conscious students",
      "Traditional college experience"
    ]
  },
  {
    title: "Premium Single Room",
    type: "premium",
    price: "$4,500",
    term: "per semester",
    features: [
      "Private single room",
      "Private bathroom",
      "Enhanced furnishings",
      "Priority internet access",
      "Extended quiet hours"
    ],
    bestFor: [
      "Upperclassmen",
      "Students who prefer privacy",
      "Graduate students"
    ],
    notes: [
      "Limited availability",
      "Early application recommended"
    ]
  },
  {
    title: "Suite-Style Living",
    type: "suite",
    price: "$4,000",
    term: "per semester",
    features: [
      "Shared suite with 2-4 students",
      "Private bathroom",
      "Common living area",
      "Kitchenette",
      "Enhanced amenities"
    ],
    bestFor: [
      "Small group living",
      "Students seeking community",
      "Upperclassmen"
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
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full relative">
          <Square className="h-8 w-8 text-primary" />
          <DollarSign className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Housing Pricing & Rates</h1>
          <p className="text-muted-foreground">Explore our housing options and costs</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {pricingOptions.map((option) => (
          <motion.div key={option.title} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{option.title}</CardTitle>
                  <Badge 
                    variant={option.type === "premium" ? "default" : 
                           option.type === "suite" ? "secondary" : "outline"}
                  >
                    {option.type}
                  </Badge>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-primary">{option.price}</span>
                  <span className="text-sm text-muted-foreground ml-2">{option.term}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Features</h3>
                    <ul className="space-y-2">
                      {option.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Best For</h3>
                    <ul className="space-y-2">
                      {option.bestFor.map((item) => (
                        <li key={item} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {option.notes && (
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Notes</h3>
                      <ul className="space-y-2">
                        {option.notes.map((note) => (
                          <li key={note} className="text-sm flex items-center gap-2 text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 