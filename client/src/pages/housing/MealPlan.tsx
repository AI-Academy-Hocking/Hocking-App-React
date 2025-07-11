import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
          <CreditCard className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Meal Plans</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Choose the perfect dining plan for your needs. We offer flexible options to suit your eating habits and lifestyle.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Basic Plans */}
        <AccordionItem value="basic" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <CreditCard className="mr-3 h-6 w-6" />
              Basic & Standard Plans
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mealPlans.filter(plan => ['basic', 'standard'].includes(plan.type)).map((plan) => (
                <div key={plan.name} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{plan.name}</h3>
                    <Badge className={plan.type === "standard" ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"}>
                      {plan.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{plan.description}</p>
                  <p className="text-lg font-semibold text-blue-600 mb-3">{plan.price}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                            <span className="text-blue-700 dark:text-blue-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Best For</h4>
                      <ul className="space-y-1">
                        {plan.bestFor.map((item) => (
                          <li key={item} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                            <span className="text-blue-700 dark:text-blue-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Premium Plans */}
        <AccordionItem value="premium" className="border-2 border-green-600 rounded-lg">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <CreditCard className="mr-3 h-6 w-6" />
              Premium Plans
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mealPlans.filter(plan => plan.type === 'premium').map((plan) => (
                <div key={plan.name} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">{plan.name}</h3>
                    <Badge className="bg-green-600 text-white">{plan.type}</Badge>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">{plan.description}</p>
                  <p className="text-lg font-semibold text-green-600 mb-3">{plan.price}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            <span className="text-green-700 dark:text-green-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Best For</h4>
                      <ul className="space-y-1">
                        {plan.bestFor.map((item) => (
                          <li key={item} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            <span className="text-green-700 dark:text-green-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 