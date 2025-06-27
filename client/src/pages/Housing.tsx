import { 
  Building2, ClipboardCheck, FileCheck, CreditCard, Users, ClipboardList, Wrench, Mail, Book, Square, DollarSign, PartyPopper, MapPin, MessageSquare, Image, FileText, ArrowLeft,
  ExternalLink, Star, CheckCircle, BookOpen, Activity, 
  Building, Phone, Clock, Home, Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HousingOption {
  title: string;
  icon: React.ReactNode;
  path: string;
  description: string;
  category: string;
}

const housingOptions: HousingOption[] = [
  {
    title: "Dormitories",
    icon: <Building2 className="h-8 w-8" />,
    path: "/housing/dormitories",
    description: "Explore our residence halls and find your perfect home",
    category: "accommodation"
  },
  {
    title: "Residence Life Handbook",
    icon: <div className="relative">
            <Book className="h-8 w-8" />
            <Building2 className="h-4 w-4 absolute -bottom-1 -right-1 text-primary" />
          </div>,
    path: "/housing/handbook",
    description: "Access the complete guide to living on campus",
    category: "resources"
  },
  {
    title: "Pricing & Rates",
    icon: <div className="relative">
            <Square className="h-8 w-8" />
            <DollarSign className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>,
    path: "/housing/pricing",
    description: "View housing costs and payment options",
    category: "financial"
  },
  {
    title: "Campus Life & Activities",
    icon: <div className="relative">
            <PartyPopper className="h-8 w-8" />
            <MapPin className="h-4 w-4 absolute -bottom-1 -right-1 text-primary" />
          </div>,
    path: "/housing/activities",
    description: "Discover events and activities for an amazing college experience",
    category: "activities"
  },
  {
    title: "Campus Social Hub",
    icon: <div className="relative">
            <MessageSquare className="h-8 w-8" />
            <Image className="h-4 w-4 absolute -bottom-1 -right-1 text-primary" />
          </div>,
    path: "/housing/social",
    description: "Share your campus life experiences and connect with others",
    category: "social"
  },
  {
    title: "Amenities",
    icon: <ClipboardCheck className="h-8 w-8" />,
    path: "/housing/amenities",
    description: "Discover the facilities and services available to residents",
    category: "facilities"
  },
  {
    title: "Application Process",
    icon: <FileCheck className="h-8 w-8" />,
    path: "/housing/application",
    description: "Learn about the steps to secure your housing",
    category: "application"
  },
  {
    title: "Meal Plan",
    icon: <CreditCard className="h-8 w-8" />,
    path: "/housing/meal-plan",
    description: "View and select your dining options",
    category: "dining"
  },
  {
    title: "Roomies",
    icon: <Users className="h-8 w-8" />,
    path: "/housing/roomies",
    description: "Find and connect with potential roommates",
    category: "social"
  },
  {
    title: "What to Bring",
    icon: <ClipboardList className="h-8 w-8" />,
    path: "/housing/what-to-bring",
    description: "Essential items checklist for your stay",
    category: "resources"
  },
  {
    title: "Maintenance Request",
    icon: <Wrench className="h-8 w-8" />,
    path: "/housing/maintenance",
    description: "Report and track maintenance issues",
    category: "services"
  },
  {
    title: "Contact Us",
    icon: <Mail className="h-8 w-8" />,
    path: "/housing/contact",
    description: "Get in touch with housing services",
    category: "contact"
  },
  {
    title: "Residence Hall Contract",
    icon: <div className="relative">
            <FileText className="h-8 w-8" />
            <FileCheck className="h-4 w-4 absolute -bottom-1 -right-1 text-primary" />
          </div>,
    path: "/housing/contract",
    description: "View and sign the residence hall contract",
    category: "legal"
  },
  {
    title: "How to Apply",
    description: "Step-by-step guide to complete your housing application",
    icon: <FileText className="h-6 w-6" />,
    path: "/housing/how-to-apply",
    category: "application"
  },
  {
    title: "Floor Plans",
    description: "View detailed floor plans for each residence hall",
    icon: <Building2 className="h-6 w-6" />,
    path: "/housing/floor-plans",
    category: "accommodation"
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

const getCategoryColor = (category: string) => {
  const colors = {
    accommodation: "blue",
    resources: "green",
    financial: "purple",
    activities: "orange",
    social: "teal",
    facilities: "indigo",
    application: "pink",
    dining: "yellow",
    services: "red",
    contact: "gray",
    legal: "brown"
  };
  return colors[category as keyof typeof colors] || "gray";
};

export default function Housing() {
  const [, setLocation] = useLocation();

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <Home className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Housing Services</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Everything you need to know about living on campus. From finding your perfect room to understanding campus life, we're here to make your housing experience exceptional.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <Activity className="mr-3 h-6 w-6" />
            Housing Quick Facts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
              <div className="text-sm text-green-700 dark:text-green-300">Residence Halls</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">500+</div>
              <div className="text-sm text-green-700 dark:text-green-300">Students Housed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
              <div className="text-sm text-green-700 dark:text-green-300">Security</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
              <div className="text-sm text-green-700 dark:text-green-300">Furnished Rooms</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Housing Options Grid */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Building className="mr-3 h-6 w-6" />
            Housing Services & Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {housingOptions.map((option) => {
              const color = getCategoryColor(option.category);
              const colorClasses = {
                blue: "border-blue-600 hover:border-blue-700 bg-blue-50 dark:bg-blue-900/30",
                green: "border-green-600 hover:border-green-700 bg-green-50 dark:bg-green-900/30",
                purple: "border-purple-600 hover:border-purple-700 bg-purple-50 dark:bg-purple-900/30",
                orange: "border-orange-600 hover:border-orange-700 bg-orange-50 dark:bg-orange-900/30",
                teal: "border-teal-600 hover:border-teal-700 bg-teal-50 dark:bg-teal-900/30",
                indigo: "border-indigo-600 hover:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30",
                pink: "border-pink-600 hover:border-pink-700 bg-pink-50 dark:bg-pink-900/30",
                yellow: "border-yellow-600 hover:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30",
                red: "border-red-600 hover:border-red-700 bg-red-50 dark:bg-red-900/30",
                gray: "border-gray-600 hover:border-gray-700 bg-gray-50 dark:bg-gray-900/30",
                brown: "border-amber-600 hover:border-amber-700 bg-amber-50 dark:bg-amber-900/30"
              };
              
              return (
                <motion.div key={option.title} variants={item}>
                  <Card
                    className={`hover-card cursor-pointer h-full border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${colorClasses[color as keyof typeof colorClasses]}`}
                    onClick={() => setLocation(option.path)}
                  >
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                          {option.icon}
                        </div>
                      </div>
                      <CardTitle className="text-center text-sm">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Star className="mr-3 h-6 w-6" />
            Important Housing Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300">Application Deadlines</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Fall Semester: May 1st</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Spring Semester: November 1st</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300">Required Documents</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Housing application</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">$200 deposit</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Emergency contact form</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Phone className="mr-3 h-6 w-6" />
            Housing Office Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-orange-600" />
                  <a href="tel:7407536462" className="text-blue-600 hover:underline text-sm">(740) 753-6462</a>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-orange-600" />
                  <a href="mailto:housing@hocking.edu" className="text-blue-600 hover:underline text-sm">housing@hocking.edu</a>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-700 dark:text-orange-300">Student Center, Room 201</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300">Office Hours</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-700 dark:text-orange-300">Monday - Friday: 8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-700 dark:text-orange-300">Saturday: 9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-700 dark:text-orange-300">Sunday: Closed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-8 border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <BookOpen className="mr-3 h-6 w-6" />
            Frequently Asked Questions (FAQ)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="application-process">
              <AccordionTrigger className="text-left">
                How do I apply for housing?
              </AccordionTrigger>
              <AccordionContent>
                Complete the online housing application, submit the required $200 deposit, and provide emergency contact information. Applications are processed on a first-come, first-served basis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="room-assignment">
              <AccordionTrigger className="text-left">
                How are room assignments made?
              </AccordionTrigger>
              <AccordionContent>
                Room assignments are based on application date, roommate preferences, and availability. We do our best to accommodate your preferences, but assignments are not guaranteed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="move-in-dates">
              <AccordionTrigger className="text-left">
                When can I move in?
              </AccordionTrigger>
              <AccordionContent>
                Move-in dates are typically the weekend before classes begin. Specific dates and times will be communicated via email and posted on the housing portal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="roommate-matching">
              <AccordionTrigger className="text-left">
                How does roommate matching work?
              </AccordionTrigger>
              <AccordionContent>
                You can request a specific roommate or use our roommate matching system. The system considers lifestyle preferences, study habits, and other factors to find compatible roommates.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancellation-policy">
              <AccordionTrigger className="text-left">
                What is the cancellation policy?
              </AccordionTrigger>
              <AccordionContent>
                Cancellations must be submitted in writing 30 days before the semester begins. Deposits are refundable minus a $50 processing fee if cancelled within the required timeframe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Access Links */}
      <Card className="border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <ExternalLink className="mr-3 h-6 w-6" />
            Quick Access Links
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Essential Services</h4>
              <div className="space-y-1 text-sm">
                <p>Housing Application</p>
                <p>Room Selection</p>
                <p>Maintenance Requests</p>
                <p>Meal Plan Selection</p>
                <p>Residence Hall Contract</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Resources</h4>
              <div className="space-y-1 text-sm">
                <p>Residence Life Handbook</p>
                <p>Floor Plans</p>
                <p>What to Bring Checklist</p>
                <p>Pricing & Rates</p>
                <p>Contact Information</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 