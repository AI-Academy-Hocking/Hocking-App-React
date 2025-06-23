import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProcessSection {
  title: string;
  content: string[];
  important?: boolean;
}

const processSections: ProcessSection[] = [
  {
    title: "How to Apply",
    content: [
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
    ],
    important: true
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

export default function HowToApply() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">How to Apply</h1>
          <p className="text-muted-foreground">Step-by-step guide to complete your housing application</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {processSections.map((section) => (
          <motion.div key={section.title} variants={item}>
            <Card className={`hover-card ${section.important ? "border-blue-200" : ""}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{section.title}</CardTitle>
                  {section.important && (
                    <Badge variant="default">Important</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.content.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {item}
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