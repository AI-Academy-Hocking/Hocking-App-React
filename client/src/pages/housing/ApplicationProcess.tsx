import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, ArrowLeft } from 'lucide-react';
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
  {
    title: "Submit Health Forms",
    status: "required",
    description: "Provide necessary health information and immunization records.",
    requirements: [
      "Immunization records",
      "Health insurance information",
      "Medical history",
      "Emergency contact details"
    ],
    deadline: "August 1st"
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
        <AccordionItem value="optional" className="border-2 border-blue-600 rounded-lg">
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
      </Accordion>
    </div>
  );
} 