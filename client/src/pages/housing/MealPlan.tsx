import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface MealPlan {
  name: string;
  type: "basic" | "standard" | "premium";
  description: string;
  features: string[];
  price: string;
  bestFor: string[];
}

const mealPlans: MealPlan[] = [
  {
    name: "Basic Plan",
    type: "basic",
    description: "Essential dining plan for students who prefer flexibility.",
    features: [
      "10 meals per week",
      "Flex dollars included",
      "Access to all dining locations",
      "Carry-out options",
      "Guest meal passes"
    ],
    price: "$1,800 per semester",
    bestFor: [
      "Students who cook occasionally",
      "Light eaters",
      "Off-campus students"
    ]
  },
  {
    name: "Standard Plan",
    type: "standard",
    description: "Most popular plan offering balanced meal options.",
    features: [
      "14 meals per week",
      "More flex dollars",
      "Priority dining access",
      "Late-night dining",
      "Special event meals"
    ],
    price: "$2,200 per semester",
    bestFor: [
      "Most residential students",
      "Regular diners",
      "Social students"
    ]
  },
  {
    name: "Premium Plan",
    type: "premium",
    description: "Comprehensive dining plan with maximum flexibility.",
    features: [
      "Unlimited meals",
      "Maximum flex dollars",
      "VIP dining access",
      "Guest meal passes",
      "Special dietary options"
    ],
    price: "$2,800 per semester",
    bestFor: [
      "Heavy eaters",
      "Athletes",
      "Students with dietary needs"
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

export default function MealPlan() {
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
          <CreditCard className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Meal Plans</h1>
          <p className="text-muted-foreground">Choose the perfect dining plan for your needs</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {mealPlans.map((plan) => (
          <motion.div key={plan.name} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{plan.name}</CardTitle>
                  <Badge 
                    variant={plan.type === "premium" ? "default" : 
                           plan.type === "standard" ? "secondary" : "outline"}
                  >
                    {plan.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                <p className="text-lg font-semibold mt-2 text-primary">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Features</h3>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
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
                      {plan.bestFor.map((item) => (
                        <li key={item} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  );
} 