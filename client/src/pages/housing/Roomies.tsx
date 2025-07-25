import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface RoommateProfile {
  name: string;
  year: string;
  major: string;
  interests: string[];
  preferences: string[];
  compatibility: number;
  status: "available" | "matched" | "pending";
}

const roommateProfiles: RoommateProfile[] = [
  {
    name: "Alex Johnson",
    year: "Sophomore",
    major: "Computer Science",
    interests: [
      "Programming",
      "Gaming",
      "Music",
      "Sports"
    ],
    preferences: [
      "Early riser",
      "Clean and organized",
      "Quiet study environment",
      "No pets"
    ],
    compatibility: 95,
    status: "available"
  },
  {
    name: "Sarah Chen",
    year: "Freshman",
    major: "Business Administration",
    interests: [
      "Reading",
      "Photography",
      "Cooking",
      "Travel"
    ],
    preferences: [
      "Night owl",
      "Social",
      "Pet friendly",
      "Music lover"
    ],
    compatibility: 88,
    status: "available"
  },
  {
    name: "Michael Rodriguez",
    year: "Junior",
    major: "Engineering",
    interests: [
      "Robotics",
      "Hiking",
      "Chess",
      "Art"
    ],
    preferences: [
      "Moderate schedule",
      "Study focused",
      "Tech enthusiast",
      "Fitness oriented"
    ],
    compatibility: 92,
    status: "matched"
  },
  {
    name: "Emma Wilson",
    year: "Sophomore",
    major: "Psychology",
    interests: [
      "Yoga",
      "Writing",
      "Nature",
      "Volunteering"
    ],
    preferences: [
      "Early riser",
      "Vegetarian",
      "Quiet environment",
      "Plant friendly"
    ],
    compatibility: 85,
    status: "pending"
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

export default function Roomies() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <button
          onClick={() => setLocation('/housing')}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Housing Services
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Find Your Roommate</h1>
          <p className="text-muted-foreground">Connect with potential roommates based on compatibility</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {roommateProfiles.map((profile) => (
          <motion.div key={profile.name} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{profile.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{profile.major} • {profile.year}</p>
                  </div>
                  <Badge 
                    variant={profile.status === "available" ? "default" : 
                           profile.status === "matched" ? "secondary" : "outline"}
                  >
                    {profile.status}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Compatibility:</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${profile.compatibility}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{profile.compatibility}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="default" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Preferences</h3>
                    <ul className="space-y-2">
                      {profile.preferences.map((preference) => (
                        <li key={preference} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {preference}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="w-full"
                    variant={profile.status === "available" ? "default" : "ghost"}
                    disabled={profile.status !== "available"}
                  >
                    {profile.status === "available" ? "Connect" : 
                     profile.status === "matched" ? "Matched" : "Pending"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  );
} 