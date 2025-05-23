import { Building2, ClipboardCheck, FileCheck, CreditCard, Users, ClipboardList, Wrench, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

interface HousingOption {
  title: string;
  icon: React.ReactNode;
  path: string;
  description: string;
}

const housingOptions: HousingOption[] = [
  {
    title: "Dormitories",
    icon: <Building2 className="h-8 w-8" />,
    path: "/housing/dormitories",
    description: "Explore our residence halls and find your perfect home"
  },
  {
    title: "Amenities",
    icon: <ClipboardCheck className="h-8 w-8" />,
    path: "/housing/amenities",
    description: "Discover the facilities and services available to residents"
  },
  {
    title: "Application Process",
    icon: <FileCheck className="h-8 w-8" />,
    path: "/housing/application",
    description: "Learn about the steps to secure your housing"
  },
  {
    title: "Meal Plan",
    icon: <CreditCard className="h-8 w-8" />,
    path: "/housing/meal-plan",
    description: "View and select your dining options"
  },
  {
    title: "Roomies",
    icon: <Users className="h-8 w-8" />,
    path: "/housing/roomies",
    description: "Find and connect with potential roommates"
  },
  {
    title: "What to Bring",
    icon: <ClipboardList className="h-8 w-8" />,
    path: "/housing/what-to-bring",
    description: "Essential items checklist for your stay"
  },
  {
    title: "Maintenance Request",
    icon: <Wrench className="h-8 w-8" />,
    path: "/housing/maintenance",
    description: "Report and track maintenance issues"
  },
  {
    title: "Contact Us",
    icon: <Mail className="h-8 w-8" />,
    path: "/housing/contact",
    description: "Get in touch with housing services"
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

export default function Housing() {
  const [, setLocation] = useLocation();

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Housing Services</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about living on campus
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {housingOptions.map((option) => (
          <motion.div key={option.title} variants={item}>
            <Card
              className="hover-card cursor-pointer h-full"
              onClick={() => setLocation(option.path)}
            >
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    {option.icon}
                  </div>
                </div>
                <CardTitle className="text-center">{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 