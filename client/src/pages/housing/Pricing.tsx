import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Square, DollarSign, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

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
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {pricingOptions.slice(0, 2).map((option) => (
          <motion.div key={option.title} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{option.title}</CardTitle>
                  <Badge 
                    variant={option.type === "premium" ? "default" : "secondary"}
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-md mx-auto mt-6"
      >
        <motion.div variants={item}>
          <Card className="hover-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{pricingOptions[2].title}</CardTitle>
                <Badge variant="outline">Special Program</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingOptions[2].notes && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Notes</h3>
                    <ul className="space-y-2">
                      {pricingOptions[2].notes.map((note) => (
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
      </motion.div>
      </div>
    </div>
  );
} 