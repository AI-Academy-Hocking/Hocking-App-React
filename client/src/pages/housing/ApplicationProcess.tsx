import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, ArrowLeft, ExternalLink, LogIn, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Step {
  title: string;
  status: "required" | "optional" | "recommended";
  description: string;
  requirements: string[];
  deadline?: string;
}

const steps: Step[] = [
  {
    title: "Submit Application",
    status: "required",
    description: "Complete the online housing application form with your personal information and preferences.",
    requirements: [
      "Valid student ID",
      "Emergency contact information",
      "Housing preferences",
      "Roommate preferences",
      "Special accommodation requests"
    ],
    deadline: "May 1st for Fall Semester"
  },
  {
    title: "Pay Housing Deposit",
    status: "required",
    description: "Secure your housing spot by submitting the required deposit payment.",
    requirements: [
      "Non-refundable deposit",
      "Payment method information",
      "Confirmation number",
      "Student account verification"
    ],
    deadline: "Within 2 weeks of application"
  },
  {
    title: "Select Room",
    status: "required",
    description: "Choose your preferred room and building based on availability.",
    requirements: [
      "Completed application",
      "Paid deposit",
      "Room selection appointment",
      "Backup room preferences"
    ],
    deadline: "June 1st - July 15th"
  },
  {
    title: "Complete Roommate Matching",
    status: "optional",
    description: "Use our roommate matching system to find compatible roommates.",
    requirements: [
      "Personal profile",
      "Lifestyle preferences",
      "Study habits",
      "Sleep schedule"
    ]
  },
  {
    title: "Sign Housing Agreement",
    status: "required",
    description: "Review and sign the housing agreement and policies.",
    requirements: [
      "Digital signature",
      "Policy acknowledgment",
      "Terms acceptance",
      "Parent/guardian consent (if under 18)"
    ],
    deadline: "Before move-in"
  },

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

export default function ApplicationProcess() {
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
          <FileCheck className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Application Process</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Follow these steps to secure your housing. Our streamlined process makes it easy to find your perfect home on campus.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Required Steps */}
        <AccordionItem value="required" className="border-2 border-red-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-red-50 dark:bg-red-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-red-800 dark:text-red-200">
              <FileCheck className="mr-3 h-6 w-6" />
              Required Steps
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {steps.filter(step => step.status === 'required').map((step) => (
                <div key={step.title} className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-red-800 dark:text-red-200">{step.title}</h3>
                    <Badge className="bg-red-600 text-white">{step.status}</Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">{step.description}</p>
                  {step.deadline && (
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-3">Deadline: {step.deadline}</p>
                  )}
                  <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {step.requirements.map((requirement) => (
                      <li key={requirement} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Optional Steps */}
        <AccordionItem value="optional" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <FileCheck className="mr-3 h-6 w-6" />
              Optional Steps
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {steps.filter(step => step.status === 'optional').map((step) => (
                <div key={step.title} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{step.title}</h3>
                    <Badge className="bg-blue-600 text-white">{step.status}</Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{step.description}</p>
                  {step.deadline && (
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">Deadline: {step.deadline}</p>
                  )}
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {step.requirements.map((requirement) => (
                      <li key={requirement} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Step-by-Step Application Guide */}
        <AccordionItem value="step-by-step" className="border-2 border-green-600 rounded-lg">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <FileCheck className="mr-3 h-6 w-6" />
              Step-by-Step Application Guide
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-green-800 dark:text-green-200">How to Apply</h3>
                <Badge className="bg-green-600 text-white">Important</Badge>
              </div>
              <ul className="space-y-2">
                {[
                  "Access the housing portal at hocking.erezlife.com using your Hocking College student email",
                  "Complete your profile in the 'Profiles' section before proceeding",
                  "Select your cohort: New Student, Current/Returning Student, WHI Program, or Football Camp",
                  "Click 'View Applications' and then 'Apply Now' for your desired semester",
                  "Choose your residence preference:",
                  "• North Hall (Male Only, Double Occupancy)",
                  "• Downhour Hall (Female Only, Double Occupancy)",
                  "• Hocking Heights (Male Only, Double Occupancy)",
                  "• Summit Hall (Co-ed, Single Room, Shared Bathroom)",
                  "• Sycamore Hall (Co-ed, Mixed Single and Double Room Occupancy)",
                  "• Starbrick Village (WHI Program Only, Co-ed shared facilities)",
                  "Complete the application with required information:",
                  "• Felony conviction history",
                  "• Registered Sex Offender status",
                  "• Vaccination status",
                  "• Emergency contact information",
                  "• Housing contract agreement",
                  "• Age verification",
                  "Click 'Confirm Application' and submit",
                  "For special requests (single rooms, roommates, etc.), email housing@hocking.edu immediately after submission",
                  "For ESA animal requests, contact heroldd@hocking.edu",
                  "For meal plan exemptions, contact heroldd@hocking.edu",
                  "All special requests have strict deadlines. Late submissions may not be processed",
                  "Students must submit all requests and required documentation within the posted time frame on the Hocking College website"
                ].map((item, index) => {
                  // Function to render email links
                  const renderWithEmailLinks = (text: string) => {
                    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
                    const parts = text.split(emailRegex);
                    
                    return parts.map((part, partIndex) => {
                      if (emailRegex.test(part)) {
                        return (
                          <a 
                            key={partIndex} 
                            href={`mailto:${part}`} 
                            className="text-green-600 hover:underline"
                          >
                            {part}
                          </a>
                        );
                      }
                      return part;
                    });
                  };

                  return (
                    <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                      <span>{renderWithEmailLinks(item)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Housing Portal Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-green-100 dark:bg-green-900/30 border-b border-green-200 dark:border-green-700">
            <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
              <CheckCircle className="mr-3 h-6 w-6" />
              Ready to Apply? Access the Housing Portal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="mb-4">
                <LogIn className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                <p className="text-green-700 dark:text-green-300 text-lg font-medium">
                  After reading the application process, click the following link to sign into the housing portal
                </p>
              </div>
              <p className="text-green-600 dark:text-green-400 text-sm mb-4">
                Complete your profile and apply for housing
              </p>
              
              <a
                href="https://hocking.erezlife.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <ExternalLink className="h-5 w-5" />
                Access Housing Portal
                <span className="text-xs opacity-80">(hocking.erezlife.com)</span>
              </a>
              
              <div className="mt-4 text-xs text-green-600 dark:text-green-400">
                <p>🔗 Opens in new tab • Secure login required</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-green-200 dark:border-green-700">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 text-sm font-bold">1</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">Sign In</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 text-sm font-bold">2</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">Complete Profile</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 text-sm font-bold">3</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">Apply for Housing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 