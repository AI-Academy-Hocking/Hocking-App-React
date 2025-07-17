import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, MapPin, Calendar, Users, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Activity {
  title: string;
  type: "on-campus" | "off-campus" | "seasonal";
  category: string;
  description: string;
  schedule?: string;
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
    schedule: "Fall semester",
    location: "Main Campus",
    participants: "All students",
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
    title: "Residence Halls & Commuters Olympics",
    type: "on-campus",
    category: "Sports & Competition",
    description: "Compete with other residence halls and commuters in fun athletic events",
    schedule: "Spring semester",
    location: "Main Campus & Student Center",
    participants: "All residence hall students and Commuters",
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
          <div className="relative">
            <PartyPopper className="h-8 w-8 text-blue-600" />
            <MapPin className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Campus Life & Activities</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Discover exciting events and experiences. Get involved in campus life and make the most of your college experience.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* On-Campus Activities */}
        <AccordionItem value="on-campus" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <PartyPopper className="mr-3 h-6 w-6" />
              On-Campus Activities
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {activities.filter(activity => activity.type === 'on-campus').map((activity) => (
                <div key={activity.title} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">{activity.title}</h3>
                    <Badge className="bg-blue-600 text-white">{activity.type}</Badge>
                  </div>
                  <Badge className="bg-blue-200 text-blue-800 mb-3">{activity.category}</Badge>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{activity.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                    {activity.participants && (
                      <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                        <Users className="h-4 w-4" />
                        <span>{activity.participants}</span>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {activity.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                            <span className="text-blue-700 dark:text-blue-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {activity.season && (
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Available Seasons</h4>
                        <div className="flex flex-wrap gap-2">
                          {activity.season.map((season) => (
                            <Badge key={season} className="bg-blue-200 text-blue-800 text-xs">
                              {season}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Off-Campus Activities */}
        <AccordionItem value="off-campus" className="border-2 border-green-600 rounded-lg">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <MapPin className="mr-3 h-6 w-6" />
              Off-Campus Activities
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {activities.filter(activity => activity.type === 'off-campus').map((activity) => (
                <div key={activity.title} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">{activity.title}</h3>
                    <Badge className="bg-green-600 text-white">{activity.type}</Badge>
                  </div>
                  <Badge className="bg-green-200 text-green-800 mb-3">{activity.category}</Badge>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">{activity.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                    {activity.participants && (
                      <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                        <Users className="h-4 w-4" />
                        <span>{activity.participants}</span>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {activity.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            <span className="text-green-700 dark:text-green-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {activity.season && (
                      <div>
                        <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Available Seasons</h4>
                        <div className="flex flex-wrap gap-2">
                          {activity.season.map((season) => (
                            <Badge key={season} className="bg-green-200 text-green-800 text-xs">
                              {season}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 