import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, MapPin, Calendar, Users, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface Activity {
  title: string;
  type: "on-campus" | "off-campus" | "seasonal";
  category: string;
  description: string;
  schedule: string;
  location: string;
  participants?: string;
  features: string[];
  season?: string[];
}

const activities: Activity[] = [
  {
    title: "Welcome Week",
    type: "on-campus",
    category: "Orientation",
    description: "Kick off your college journey with exciting events and activities!",
    schedule: "First week of Fall semester",
    location: "Various campus locations",
    participants: "All new students",
    features: [
      "Campus tours",
      "Social mixers",
      "Resource fairs",
      "Welcome concert",
      "Dorm competitions"
    ]
  },
  {
    title: "Hocking Hills Adventures",
    type: "off-campus",
    category: "Outdoor Recreation",
    description: "Explore the natural beauty of Hocking Hills State Park",
    schedule: "Monthly trips",
    location: "Hocking Hills State Park",
    features: [
      "Hiking trails",
      "Waterfall visits",
      "Rock climbing",
      "Camping trips",
      "Photography opportunities"
    ],
    season: ["Spring", "Summer", "Fall"]
  },
  {
    title: "Residence Hall Olympics",
    type: "on-campus",
    category: "Sports & Competition",
    description: "Compete with other residence halls in fun athletic events",
    schedule: "Spring semester",
    location: "Campus Recreation Center",
    participants: "All residence hall students",
    features: [
      "Team sports",
      "Individual competitions",
      "Spirit events",
      "Prizes and trophies",
      "Community building"
    ]
  },
  {
    title: "Downtown Athens Exploration",
    type: "off-campus",
    category: "Local Culture",
    description: "Discover the vibrant culture of Athens",
    schedule: "Weekly guided tours",
    location: "Athens Downtown",
    features: [
      "Local restaurants",
      "Art galleries",
      "Live music venues",
      "Shopping districts",
      "Historical sites"
    ]
  },
  {
    title: "Study Break Events",
    type: "on-campus",
    category: "Wellness",
    description: "Take a break from studying with fun activities",
    schedule: "During exam weeks",
    location: "Residence Halls",
    features: [
      "Stress relief activities",
      "Free snacks",
      "Game nights",
      "Movie screenings",
      "Wellness workshops"
    ]
  },
  {
    title: "Seasonal Festivals",
    type: "off-campus",
    category: "Community Events",
    description: "Experience local festivals and celebrations",
    schedule: "Throughout the year",
    location: "Athens and surrounding areas",
    features: [
      "Pumpkin Festival",
      "Spring Arts Festival",
      "Summer Music Festival",
      "Holiday celebrations",
      "Food festivals"
    ],
    season: ["Spring", "Summer", "Fall", "Winter"]
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

export default function Activities() {
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
        <div className="p-3 bg-primary/10 rounded-full relative">
          <PartyPopper className="h-8 w-8 text-primary" />
          <MapPin className="h-4 w-4 absolute -bottom-1 -right-1 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Campus Life & Activities</h1>
          <p className="text-muted-foreground">Discover exciting events and experiences</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {activities.map((activity) => (
          <motion.div key={activity.title} variants={item}>
            <Card className="hover-card h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{activity.title}</CardTitle>
                  <Badge 
                    variant={activity.type === "on-campus" ? "default" : 
                           activity.type === "off-campus" ? "secondary" : "outline"}
                  >
                    {activity.type}
                  </Badge>
                </div>
                <Badge variant="secondary" className="mt-2">{activity.category}</Badge>
                <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{activity.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{activity.location}</span>
                  </div>
                  {activity.participants && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{activity.participants}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Features</h3>
                    <ul className="space-y-2">
                      {activity.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {activity.season && (
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Available Seasons</h3>
                      <div className="flex flex-wrap gap-2">
                        {activity.season.map((season) => (
                          <Badge key={season} variant="outline">
                            {season}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
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
