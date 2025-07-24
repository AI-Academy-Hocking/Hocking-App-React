import { Building2, ClipboardCheck, FileCheck, CreditCard, Users, ClipboardList, Wrench, Mail, Book, DollarSign, PartyPopper, MessageSquare, FileText, Sparkles, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    icon: <Book className="h-8 w-8" />,
    path: "/housing/handbook",
    description: "Access the complete guide to living on campus"
  },
  {
    title: "Pricing & Rates",
    icon: <DollarSign className="h-8 w-8" />,
    path: "/housing/pricing",
    description: "View housing costs and payment options"
  },
  {
    title: "Campus Life & Activities",
    icon: <PartyPopper className="h-8 w-8" />,
    path: "/housing/activities",
    description: "Discover events and activities for an amazing college experience"
  },
  {
    title: "Campus Social Hub",
    icon: <MessageSquare className="h-8 w-8" />,
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
    icon: <FileText className="h-8 w-8" />,
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
  const [location, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Watch for URL changes including query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get('tab') || 'overview';
    setSelectedTab(tabFromUrl);
  }, [location]);

  // Handle tab change and update URL
  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    setLocation(`/housing?tab=${newTab}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-blue-300">Housing Services</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about living on campus
          </p>
        </motion.div>

        {/* Dropdown Menu */}
        <div className="mb-6">
          <select
            value={selectedTab}
            onChange={(e) => handleTabChange(e.target.value)}
            className="p-2 border-2 border-blue-600 rounded-xl w-full md:w-auto dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
          >
            <option value="overview">Housing Overview</option>
            <option value="dormitories">Dormitories & Floor Plans</option>
            <option value="pricing">Pricing & Rates</option>
            <option value="application">Application Process</option>
            <option value="amenities">Amenities & Services</option>
            <option value="roomies">Roommate Finder</option>
            <option value="what-to-bring">What to Bring</option>
            <option value="meal-plan">Meal Plans</option>
            <option value="activities">Campus Activities</option>
            <option value="handbook">Residence Life Handbook</option>
            <option value="maintenance">Maintenance Requests</option>
            <option value="contact">Contact Information</option>
          </select>
        </div>

        {/* Content Based on Selected Tab */}
        {selectedTab === "overview" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300 mb-4">Welcome to Campus Living</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick access cards */}
              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow border-2 border-blue-600 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Residence Halls</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Explore our dormitories and find your perfect home away from home.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow border-2 border-blue-600 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Housing Costs</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">View pricing for different room types and payment options.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow border-2 border-blue-600 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FileCheck className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Apply Now</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Start your housing application and secure your spot on campus.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "pricing" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <DollarSign className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Housing Pricing & Rates</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-600">Premium Single Room</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$3,490.00</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">per semester</div>
                  <ul className="space-y-1 text-sm">
                    <li>• Private room</li>
                    <li>• Private or shared bathroom</li>
                    <li>• Twin XL bed & furniture</li>
                    <li>• Own HVAC control</li>
                    <li>• Fridge and microwave</li>
                    <li>• WiFi included</li>
                  </ul>
                  <div className="mt-4 text-xs text-gray-500">
                    Best for: Returners, privacy-focused students
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-600">Standard Double Room</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$2,990.00</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">per semester</div>
                  <ul className="space-y-1 text-sm">
                    <li>• Shared double occupancy</li>
                    <li>• Suite-style bathroom</li>
                    <li>• Twin XL bed & furniture</li>
                    <li>• Own HVAC control</li>
                    <li>• Fridge and microwave</li>
                    <li>• WiFi included</li>
                  </ul>
                  <div className="mt-4 text-xs text-gray-500">
                    Best for: First-year students, budget-conscious
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "contact" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <Mail className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Contact Housing Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Main Office</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>Housing & Residence Life</p>
                    <p>123 Campus Drive</p>
                    <p>Athens, OH 45701</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Phone Numbers</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>Main: (740) 555-0123</p>
                    <p>Emergency: (740) 555-0124</p>
                    <p>Maintenance: (740) 555-0125</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Email Addresses</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>General: housing@hocking.edu</p>
                    <p>Maintenance: maintenance@hocking.edu</p>
                    <p>Billing: housing-billing@hocking.edu</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Office Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                    <p>Emergency: 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "amenities" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <Sparkles className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Campus Amenities</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Fitness Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Modern exercise equipment</li>
                    <li>• Cardio machines</li>
                    <li>• Weight training area</li>
                    <li>• Group exercise space</li>
                    <li>• Locker rooms</li>
                  </ul>
                  <div className="mt-3 text-xs text-gray-500">Location: Student Center</div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Study Spaces
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Quiet study areas</li>
                    <li>• Group study rooms</li>
                    <li>• TV for movie watching</li>
                    <li>• Projectors for presentations</li>
                    <li>• Comfortable seating</li>
                  </ul>
                  <div className="mt-3 text-xs text-gray-500">Available 24/7</div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Laundry Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Free washers and dryers</li>
                    <li>• Folding areas</li>
                    <li>• Waiting areas</li>
                    <li>• Vending machines</li>
                    <li>• Mobile app notifications</li>
                  </ul>
                  <div className="mt-3 text-xs text-gray-500">Every residence hall</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "application" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <FileCheck className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Application Process</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-600 mb-2">Step 1: Complete Application</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Submit your housing application with personal information and preferences.</p>
                    <div className="text-xs text-gray-500 mt-2">Deadline: March 1st</div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-600 mb-2">Step 2: Pay Deposit</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Submit your $200 housing deposit to secure your spot.</p>
                    <div className="text-xs text-gray-500 mt-2">Due within 2 weeks</div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-orange-600 mb-2">Step 3: Choose Meal Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Select from our available meal plan options.</p>
                    <div className="text-xs text-gray-500 mt-2">Required for all residents</div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-purple-600 mb-2">Step 4: Submit Health Forms</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Provide immunization records and health information.</p>
                    <div className="text-xs text-gray-500 mt-2">Deadline: August 1st</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "dormitories" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <Building2 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Residence Halls</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Hawks Hall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Capacity:</span>
                      <span className="text-sm">200 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Room Types:</span>
                      <span className="text-sm">Single & Double</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Bathrooms:</span>
                      <span className="text-sm">Suite-style</span>
                    </div>
                    <div className="text-sm">
                      <strong>Features:</strong> Study lounges, game rooms, laundry facilities
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Dawg House</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Capacity:</span>
                      <span className="text-sm">150 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Room Types:</span>
                      <span className="text-sm">Double & Triple</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Bathrooms:</span>
                      <span className="text-sm">Community</span>
                    </div>
                    <div className="text-sm">
                      <strong>Features:</strong> Computer lab, fitness area, outdoor patio
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "roomies" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Roommate Finder</h2>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white dark:bg-blue-900/20 border-2 border-blue-600 dark:border-blue-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">How It Works</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Complete your roommate questionnaire</li>
                    <li>2. Browse potential roommate profiles</li>
                    <li>3. Connect with compatible matches</li>
                    <li>4. Request to room together</li>
                  </ol>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Find Your Roommate
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "meal-plan" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Meal Plans</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-green-500">
                <CardHeader>
                  <CardTitle className="text-green-600">Full Meal Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold">19 meals/week</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      3 meals per day (Mon-Fri)<br/>
                      2 meals per day (Sat-Sun)
                    </div>
                    <div className="text-sm">
                      <strong>Includes:</strong> $100 Hawk Dollars per semester
                    </div>
                    <div className="text-xs text-gray-500">Best for: Students who eat all meals on campus</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-blue-600">Partial Meal Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold">14 meals/week</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      2 meals per day (Mon-Fri)<br/>
                      2 meals per day (Sat-Sun)
                    </div>
                    <div className="text-sm">
                      <strong>Includes:</strong> $75 Hawk Dollars per semester
                    </div>
                    <div className="text-xs text-gray-500">Best for: Most students</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "what-to-bring" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <ClipboardList className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">What to Bring</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-green-500">
                <CardHeader>
                  <CardTitle className="text-green-600">✅ Recommended Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Twin XL sheets and pillowcases</li>
                    <li>• Comforter or sleeping bag</li>
                    <li>• Pillows</li>
                    <li>• Towels (bath and face)</li>
                    <li>• Personal toiletries</li>
                    <li>• School and office supplies</li>
                    <li>• Hangers for closet</li>
                    <li>• Laundry basket and detergent</li>
                    <li>• First aid kit</li>
                    <li>• Snacks for your room</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-600">❌ Prohibited Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Candles or incense</li>
                    <li>• Space heaters</li>
                    <li>• Extension cords without surge protection</li>
                    <li>• Hot plates or cooking appliances</li>
                    <li>• Pets (except approved service animals)</li>
                    <li>• Alcohol or illegal substances</li>
                    <li>• Weapons of any kind</li>
                    <li>• Halogen lamps</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "maintenance" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <Wrench className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Maintenance Requests</h2>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white dark:bg-orange-900/20 border-2 border-orange-600 dark:border-orange-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Emergency Maintenance</h3>
                  <p className="text-sm mb-2">For urgent issues like flooding, electrical problems, or security concerns:</p>
                  <div className="text-lg font-bold text-orange-600">Call: (740) 555-0124</div>
                  <div className="text-xs text-gray-500 mt-1">Available 24/7</div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Submit a Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Issue Type</label>
                      <select className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        <option>Plumbing</option>
                        <option>Electrical</option>
                        <option>HVAC</option>
                        <option>Furniture</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea className="w-full p-2 border rounded-md h-24 dark:bg-gray-700 dark:border-gray-600" placeholder="Describe the issue..."></textarea>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                      Submit Request
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "handbook" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <Book className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Residence Life Handbook</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Community Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Respect for others and property</li>
                    <li>• Quiet hours: 10 PM - 8 AM</li>
                    <li>• Guest policies and visitation</li>
                    <li>• Room decoration guidelines</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Safety & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Emergency procedures</li>
                    <li>• Building access policies</li>
                    <li>• Fire safety guidelines</li>
                    <li>• Personal property security</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Room Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Cleaning expectations</li>
                    <li>• Maintenance procedures</li>
                    <li>• Damage reporting</li>
                    <li>• Room inspection guidelines</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Support Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Resident Assistant support</li>
                    <li>• Counseling services</li>
                    <li>• Academic resources</li>
                    <li>• Health and wellness</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "activities" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <PartyPopper className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">Campus Life & Activities</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PartyPopper className="h-5 w-5" />
                    Social Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Welcome Week activities</li>
                    <li>• Movie nights</li>
                    <li>• Game tournaments</li>
                    <li>• Holiday celebrations</li>
                    <li>• Themed parties</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Educational Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Study skills workshops</li>
                    <li>• Time management seminars</li>
                    <li>• Financial literacy programs</li>
                    <li>• Health and wellness talks</li>
                    <li>• Career development sessions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Community Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Local volunteer opportunities</li>
                    <li>• Community clean-up events</li>
                    <li>• Charity fundraisers</li>
                    <li>• Food drives</li>
                    <li>• Mentoring programs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
