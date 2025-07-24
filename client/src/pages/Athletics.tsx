import { 
  ArrowLeft, Trophy, Users, Calendar, MapPin, Phone, Mail, Clock, ExternalLink,
  Award, Building, Newspaper, Ticket, Facebook, User, BookOpen, Star, Target,
  Heart, Zap, Shield, Crown, Flag, Medal, Gamepad2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface Sport {
  name: string;
  season: string;
  description: string;
  color: string;
  url?: string;
  icon?: React.ComponentType<{ className?: string }>;
  highlights?: string[];
}

interface Coach {
  name: string;
  title: string;
  phone: string;
  email: string;
}

function Athletics() {
  const handleExternalLink = (url: string) => {
    try {
      console.log('Opening external link:', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening external link:', error);
      // Fallback: try to open in same window
      window.location.href = url;
    }
  };

  const coaches: Coach[] = [
    {
      name: "Rick Walker",
      title: "Director of Athletics / Head Softball Coach",
      phone: "740-753-7012",
      email: "walkerr1@hocking.edu"
    },
    {
      name: "Jared Grove",
      title: "Associate AD & Head Baseball Coach",
      phone: "740-753-7206",
      email: "grovej@hocking.edu"
    },
    {
      name: "Craig Moore",
      title: "Associate AD & Head Football Coach / QB Coach",
      phone: "740-753-6173",
      email: "moorec21743@hocking.edu"
    },
    {
      name: "Andrew Brown",
      title: "Head Women's Basketball Coach",
      phone: "740-753-6575",
      email: "browna4@hocking.edu"
    }
  ];

  const mensSports: Sport[] = [
    { 
      name: "Baseball", 
      season: "Spring", 
      description: "Compete in NJCAA and OCCAC with championship aspirations", 
      color: "bg-blue-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Shield,
      highlights: ["NJCAA Competition", "OCCAC Conference", "Spring Season", "Championship Contenders"]
    },
    { 
      name: "Men's Basketball", 
      season: "Winter", 
      description: "Fast-paced action in NJCAA and OCCAC competition", 
      color: "bg-orange-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["High-Energy Games", "Conference Rivals", "Winter Season", "Elite Competition"]
    },
    { 
      name: "Cross Country", 
      season: "Fall", 
      description: "Endurance and determination on the trails", 
      color: "bg-green-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Flag,
      highlights: ["Scenic Trails", "Team Spirit", "Fall Season", "Personal Records"]
    },
    { 
      name: "Football", 
      season: "Fall", 
      description: "Gridiron glory in NJCAA competition", 
      color: "bg-red-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Shield,
      highlights: ["Friday Night Lights", "NJCAA Division", "Fall Season", "Hawk Pride"]
    },
    { 
      name: "Golf", 
      season: "Fall/Spring", 
      description: "Precision and focus on the course", 
      color: "bg-teal-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["Championship Courses", "Dual Season", "Individual Excellence", "Team Unity"]
    },
    { 
      name: "Tennis", 
      season: "Spring", 
      description: "Strategy and skill on the courts", 
      color: "bg-purple-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["Spring Season", "Individual & Doubles", "Strategic Play", "Court Excellence"]
    },
    { 
      name: "Track & Field", 
      season: "Spring", 
      description: "Speed, strength, and athletic excellence", 
      color: "bg-indigo-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Zap,
      highlights: ["Multiple Events", "Spring Season", "Personal Bests", "Team Scoring"]
    },
    { 
      name: "Bowling", 
      season: "Winter", 
      description: "Precision and strategy in the lanes", 
      color: "bg-pink-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["Winter Season", "Precision Sport", "Team Competition", "Strike Zone"]
    }
  ];

  const womensSports: Sport[] = [
    { 
      name: "Women's Basketball", 
      season: "Winter", 
      description: "Empowering women's basketball excellence", 
      color: "bg-pink-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Crown,
      highlights: ["Women's Excellence", "Winter Season", "Conference Champions", "Elite Competition"]
    },
    { 
      name: "Cross Country", 
      season: "Fall", 
      description: "Endurance and determination on the trails", 
      color: "bg-green-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Flag,
      highlights: ["Scenic Trails", "Team Spirit", "Fall Season", "Personal Records"]
    },
    { 
      name: "Flag Football", 
      season: "Fall", 
      description: "Fast-paced flag football action", 
      color: "bg-red-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Shield,
      highlights: ["Fast-Paced Action", "Fall Season", "Strategic Play", "Team Unity"]
    },
    { 
      name: "Softball", 
      season: "Spring", 
      description: "Championship softball in NJCAA and OCCAC", 
      color: "bg-orange-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Shield,
      highlights: ["Spring Season", "Conference Champions", "NJCAA Competition", "Hawk Pride"]
    },
    { 
      name: "Volleyball", 
      season: "Fall", 
      description: "Dynamic volleyball competition", 
      color: "bg-blue-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["Fall Season", "Dynamic Play", "Team Coordination", "Conference Rivals"]
    },
    { 
      name: "Bowling", 
      season: "Winter", 
      description: "Precision and strategy in the lanes", 
      color: "bg-purple-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["Winter Season", "Precision Sport", "Team Competition", "Strike Zone"]
    },
    { 
      name: "Tennis", 
      season: "Spring", 
      description: "Strategy and skill on the courts", 
      color: "bg-teal-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["Spring Season", "Individual & Doubles", "Strategic Play", "Court Excellence"]
    },
    { 
      name: "Track & Field", 
      season: "Spring", 
      description: "Speed, strength, and athletic excellence", 
      color: "bg-indigo-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Zap,
      highlights: ["Multiple Events", "Spring Season", "Personal Bests", "Team Scoring"]
    }
  ];

  const coedSports: Sport[] = [
    { 
      name: "Archery", 
      season: "Year-round", 
      description: "Precision and focus in archery", 
      color: "bg-yellow-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Target,
      highlights: ["Year-Round", "Precision Sport", "Individual Focus", "Target Mastery"]
    },
    { 
      name: "Cheerleading", 
      season: "Year-round", 
      description: "Spirit and athleticism combined", 
      color: "bg-purple-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Heart,
      highlights: ["Year-Round", "School Spirit", "Athletic Performance", "Team Unity"]
    },
    { 
      name: "eSports", 
      season: "Year-round", 
      description: "Competitive gaming excellence", 
      color: "bg-gray-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Gamepad2,
      highlights: ["Year-Round", "Digital Competition", "Strategic Gaming", "Team Coordination"]
    },
    { 
      name: "Equestrian", 
      season: "Year-round", 
      description: "Horse and rider partnership", 
      color: "bg-brown-500", 
      url: "https://www.hocking.edu/athletics",
      icon: Heart,
      highlights: ["Year-Round", "Horse Partnership", "Equestrian Excellence", "Natural Setting"]
    }
  ];

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

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Trophy className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Hocking College Athletics</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Join the Hawks and become part of our championship tradition! Compete in the NJCAA and OCCAC while pursuing your academic dreams.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge className="bg-blue-600 text-white px-4 py-2">NJCAA Division</Badge>
          <Badge className="bg-green-600 text-white px-4 py-2">OCCAC Conference</Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2">Academic Excellence</Badge>
          <Badge className="bg-orange-600 text-white px-4 py-2">Championship Contenders</Badge>
        </div>
        <Button 
          onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          Join the Hawks Today!
        </Button>
      </div>

      {/* Why Join Athletics - New Motivational Section */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <Star className="mr-3 h-6 w-6" />
            Why Join Hocking Athletics?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <Medal className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Championship Success</h4>
              <p className="text-sm text-green-700 dark:text-green-300">Compete at the highest level in NJCAA and OCCAC</p>
            </div>
            <div className="text-center p-4">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Academic Support</h4>
              <p className="text-sm text-green-700 dark:text-green-300">Balance athletics with academic excellence</p>
            </div>
            <div className="text-center p-4">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Team Family</h4>
              <p className="text-sm text-green-700 dark:text-green-300">Build lifelong friendships and connections</p>
            </div>
            <div className="text-center p-4">
              <Zap className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Leadership Skills</h4>
              <p className="text-sm text-green-700 dark:text-green-300">Develop character and leadership abilities</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Hocking Athletics */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Award className="mr-3 h-6 w-6" />
            About Hocking Athletics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Mission & Overview</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To foster athletic excellence, academic success, and community pride through a balanced approach to intercollegiate sports.
              </p>
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                About Hocking Athletics
              </button>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Athletics Mission & Values</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our commitment to developing student-athletes who excel both on the field and in the classroom.
              </p>
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Athletics Mission & Values
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Athletic Staff & Coaches */}
      <Card className="mb-8 border-2 border-teal-600">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
            <User className="mr-3 h-6 w-6" />
            Athletic Staff & Coaches
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {coaches.map((coach, index) => (
              <div key={index} className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">{coach.name}</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300 mb-3">{coach.title}</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-teal-600" />
                    <a href={`tel:${coach.phone}`} className="text-blue-600 hover:underline text-sm">{coach.phone}</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-teal-600" />
                    <a href={`mailto:${coach.email}?subject=Interest in Hocking Athletics`} className="text-blue-600 hover:underline text-sm">{coach.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
            <p className="text-teal-800 dark:text-teal-200 mb-2">
              For a full list of coaches and bios:
            </p>
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Athletics Staff Directory
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Building className="mr-3 h-6 w-6" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold">Athletic Department</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Nelsonville Campus</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold">Main Office</p>
                  <a href="tel:740-753-3591" className="text-blue-600 hover:underline">740-753-3591</a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:athletics@hocking.edu?subject=Interest in Hocking Athletics" className="text-blue-600 hover:underline">athletics@hocking.edu</a>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold">Office Hours</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monday – Friday: 8 a.m.-4 p.m.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sports Teams - Now in Accordion */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Men's Sports */}
        <AccordionItem value="mens-sports" className="border-2 border-blue-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <Users className="mr-3 h-6 w-6" />
              Men's Sports Teams
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mensSports.map((sport, index) => (
                <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-200">{sport.name}</h5>
                    <Badge className={sport.color}>{sport.season}</Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{sport.description}</p>
                  <div className="mb-3">
                    {sport.highlights?.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button 
                onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                View All Men's Sports
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Women's Sports */}
        <AccordionItem value="womens-sports" className="border-2 border-pink-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-pink-50 dark:bg-pink-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-pink-800 dark:text-pink-200">
              <Users className="mr-3 h-6 w-6" />
              Women's Sports Teams
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {womensSports.map((sport, index) => (
                <div key={index} className="p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-pink-800 dark:text-pink-200">{sport.name}</h5>
                    <Badge className={sport.color}>{sport.season}</Badge>
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-300 mb-3">{sport.description}</p>
                  <div className="mb-3">
                    {sport.highlights?.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button 
                onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                View All Women's Sports
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Co-ed Sports */}
        <AccordionItem value="coed-sports" className="border-2 border-green-600 rounded-lg">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <Users className="mr-3 h-6 w-6" />
              Co-ed Sports Teams
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {coedSports.map((sport, index) => (
                <div key={index} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-green-800 dark:text-green-200">{sport.name}</h5>
                    <Badge className={sport.color}>{sport.season}</Badge>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">{sport.description}</p>
                  <div className="mb-3">
                    {sport.highlights?.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button 
                onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                View All Co-ed Sports
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Schedules, Scores & News */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Calendar className="mr-3 h-6 w-6" />
            Schedules, Scores & News
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Each sport's page offers access to schedules, results, rosters, and news headlines. You can also watch live events and highlights.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
              className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Newspaper className="mr-3 h-5 w-5" />
                <span className="font-semibold">Athletics News & Headlines</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
              className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Ticket className="mr-3 h-5 w-5" />
                <span className="font-semibold">Watch Live & Tickets</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Social Media & Media Center */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <Facebook className="mr-3 h-6 w-6" />
            Social Media & Media Center
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Follow the Hawks on Facebook and social platforms for updates, photos, and live commentary.
          </p>
          <button
            onClick={() => handleExternalLink('https://www.facebook.com/HockingHawks')}
            className="flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <Facebook className="mr-3 h-5 w-5" />
              <span className="font-semibold">Hocking Hawks Facebook</span>
            </div>
            <ExternalLink className="h-5 w-5" />
          </button>
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
            <AccordionItem value="sports-offered">
              <AccordionTrigger className="text-left">
                What sports are offered?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p><strong>Men's:</strong> baseball, basketball, cross‑country, football, golf, tennis, track & field, bowling.</p>
                  <p><strong>Women's:</strong> basketball, cross‑country, flag football, softball, volleyball, bowling, tennis, track & field.</p>
                  <p><strong>Co‑ed:</strong> archery, cheerleading, eSports, equestrian.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="conference">
              <AccordionTrigger className="text-left">
                What conference do the Hawks compete in?
              </AccordionTrigger>
              <AccordionContent>
                They compete in the NJCAA and OCCAC.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="schedule-streaming">
              <AccordionTrigger className="text-left">
                How can I view the schedule or live stream games?
              </AccordionTrigger>
              <AccordionContent>
                Visit any sport's page for full schedules, results, and live coverage links.
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Watch Live & Tickets
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tickets">
              <AccordionTrigger className="text-left">
                How do I purchase game tickets?
              </AccordionTrigger>
              <AccordionContent>
                Use the "Tickets" section on the Athletics homepage or team page.
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Watch Live & Tickets
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact-coaches">
              <AccordionTrigger className="text-left">
                How can I contact coaches or staff?
              </AccordionTrigger>
              <AccordionContent>
                Contact directory is listed above, or see the full directory via staff link.
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Athletics Staff Directory
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="social-media">
              <AccordionTrigger className="text-left">
                How do I follow the Hawks on social platforms?
              </AccordionTrigger>
              <AccordionContent>
                Find official updates, photos, and videos on the Hawks Facebook page.
                <button
                  onClick={() => handleExternalLink('https://www.facebook.com/HockingHawks')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Hawks Facebook
                </button>
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
              <h4 className="font-semibold text-gray-900 dark:text-white">Feature</h4>
              <div className="space-y-1 text-sm">
                <p>Athletics Homepage</p>
                <p>All Sports Listing</p>
                <p>Baseball</p>
                <p>Football</p>
                <p>Men's Basketball</p>
                <p>Women's Basketball</p>
                <p>Softball</p>
                <p>Live Games & Tickets</p>
                <p>Hawks Facebook</p>
                <p>Staff Directory</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Link</h4>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  hocking.edu/athletics
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  athletics.hocking.edu/navbar-sports
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Baseball
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Football
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Men's Basketball
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Women's Basketball
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Softball
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Watch Live & Tickets
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.facebook.com/HockingHawks')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/athletics')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Athletics Staff
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Athletics; 