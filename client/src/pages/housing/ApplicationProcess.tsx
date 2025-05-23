import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <FileCheck className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Application Process</h1>
          <p className="text-muted-foreground">Follow these steps to secure your housing</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {steps.map((step) => (
          <motion.div key={step.title} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{step.title}</CardTitle>
                  <Badge 
                    variant={step.status === "required" ? "destructive" : 
                           step.status === "recommended" ? "default" : "secondary"}
                  >
                    {step.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
                {step.deadline && (
                  <p className="text-sm font-medium mt-2 text-primary">Deadline: {step.deadline}</p>
                )}
              </CardHeader>
              <CardContent>
                <h3 className="text-sm font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {step.requirements.map((requirement) => (
                    <li key={requirement} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 