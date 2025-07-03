import { Building2, ClipboardCheck, FileCheck, CreditCard, Users, ClipboardList, Wrench, Mail, Book, Square, DollarSign, PartyPopper, MapPin, MessageSquare, Image, FileText } from 'lucide-react';
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
    title: "Residence Life Handbook",
    icon: <div className="relative">
            <Book className="h-8 w-8" />
            <Building2 className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-600 dark:text-blue-400" />
          </div>,
    path: "/housing/handbook",
    description: "Access the complete guide to living on campus"
  },
  {
    title: "Pricing & Rates",
    icon: <div className="relative">
            <Square className="h-8 w-8" />
            <DollarSign className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>,
    path: "/housing/pricing",
    description: "View housing costs and payment options"
  },
  {
    title: "Campus Life & Activities",
    icon: <div className="relative">
            <PartyPopper className="h-8 w-8" />
            <MapPin className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-600 dark:text-blue-400" />
          </div>,
    path: "/housing/activities",
    description: "Discover events and activities for an amazing college experience"
  },
  {
    title: "Campus Social Hub",
    icon: <div className="relative">
            <MessageSquare className="h-8 w-8" />
            <Image className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-600 dark:text-blue-400" />
          </div>,
    path: "/housing/social",
    description: "Share your campus life experiences and connect with others"
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
  },
  {
    title: "Residence Hall Contract",
    icon: <div className="relative">
            <FileText className="h-8 w-8" />
            <FileCheck className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-600 dark:text-blue-400" />
          </div>,
    path: "/housing/contract",
    description: "View and sign the residence hall contract"
  },
  {
    title: "How to Apply",
    description: "Step-by-step guide to complete your housing application",
    icon: <FileText className="h-6 w-6" />,
    path: "/housing/how-to-apply"
  },
  {
    title: "Floor Plans",
    description: "View detailed floor plans for each residence hall",
    icon: <Building2 className="h-6 w-6" />,
    path: "/housing/floor-plans"
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
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-blue-300">Housing Services</h1>
        <p className="text-lg text-gray-600 dark:text-white">
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
              className="hover-card cursor-pointer h-full border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow rounded-xl"
              onClick={() => setLocation(option.path)}
            >
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {option.icon}
                  </div>
                </div>
                <CardTitle className="text-center text-gray-900 dark:text-blue-300">{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-gray-600 dark:text-white">
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