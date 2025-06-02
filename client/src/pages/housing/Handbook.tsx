import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Building2 } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HandbookSection {
  title: string;
  category: string;
  content: string[];
  important?: boolean;
}

const handbookSections: HandbookSection[] = [
  {
    title: "Welcome to Campus Living",
    category: "Introduction",
    content: [
      "Welcome to your new home away from home!",
      "This handbook is your guide to successful campus living.",
      "Please review all policies and procedures carefully."
    ],
    important: true
  },
  {
    title: "Community Standards",
    category: "Policies",
    content: [
      "Respect for others and their property",
      "Quiet hours and noise policies",
      "Guest policies and visitation rules",
      "Room decoration guidelines"
    ]
  },
  {
    title: "Safety & Security",
    category: "Safety",
    content: [
      "Emergency procedures and contacts",
      "Building access and key policies",
      "Fire safety guidelines",
      "Personal property security"
    ],
    important: true
  },
  {
    title: "Room Care & Maintenance",
    category: "Facilities",
    content: [
      "Cleaning expectations",
      "Maintenance request procedures",
      "Damage reporting",
      "Room inspection guidelines"
    ]
  },
  {
    title: "Community Resources",
    category: "Support",
    content: [
      "Resident Assistant (RA) support",
      "Counseling services",
      "Academic support resources",
      "Health and wellness services"
    ]
  },
  {
    title: "Dining & Meal Plans",
    category: "Services",
    content: [
      "Dining hall locations and hours",
      "Meal plan options and changes",
      "Special dietary accommodations",
      "Guest meal policies"
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

export default function Handbook() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full relative">
          <Book className="h-8 w-8 text-primary" />
          <Building2 className="h-4 w-4 absolute -bottom-1 -right-1 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Residence Life Handbook</h1>
          <p className="text-muted-foreground">Your complete guide to living on campus</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {handbookSections.map((section) => (
          <motion.div key={section.title} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{section.title}</CardTitle>
                  {section.important && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                </div>
                <Badge variant="secondary" className="mt-2">{section.category}</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.content.map((item) => (
                    <li key={item} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {item}
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