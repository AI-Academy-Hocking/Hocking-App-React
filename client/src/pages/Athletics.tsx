import { 
  ArrowLeft, Trophy, Users, Calendar, MapPin, Phone, Mail, Clock, ExternalLink,
  Award, Building, FileText, BookOpen, Star, Target, Globe, UserCheck, CheckCircle,
  AlertTriangle, RotateCcw, Facebook, Video, Ticket, Newspaper, User, Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Sport {
  name: string;
  season: string;
  description: string;
  color: string;
  url?: string;
}

interface Coach {
  name: string;
  title: string;
  phone: string;
  email: string;
}

function Athletics() {
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
    { name: "Baseball", season: "Spring", description: "Competing in NJCAA and OCCAC", color: "bg-blue-500", url: "https://athletics.hocking.edu/sports/baseball" },
    { name: "Men's Basketball", season: "Winter", description: "Competing in NJCAA and OCCAC", color: "bg-orange-500", url: "https://athletics.hocking.edu/sports/mens-basketball" },
    { name: "Cross Country", season: "Fall", description: "Men's cross country team", color: "bg-green-500", url: "https://athletics.hocking.edu/sports/cross-country" },
    { name: "Football", season: "Fall", description: "Competing in NJCAA", color: "bg-red-500", url: "https://athletics.hocking.edu/sports/football" },
    { name: "Golf", season: "Fall/Spring", description: "Men's golf team", color: "bg-teal-500", url: "https://athletics.hocking.edu/sports/golf" },
    { name: "Tennis", season: "Spring", description: "Men's tennis team", color: "bg-purple-500", url: "https://athletics.hocking.edu/sports/tennis" },
    { name: "Track & Field", season: "Spring", description: "Men's track and field", color: "bg-indigo-500", url: "https://athletics.hocking.edu/sports/track-and-field" },
    { name: "Bowling", season: "Winter", description: "Men's bowling team", color: "bg-pink-500", url: "https://athletics.hocking.edu/sports/bowling" }
  ];

  const womensSports: Sport[] = [
    { name: "Women's Basketball", season: "Winter", description: "Competing in NJCAA and OCCAC", color: "bg-pink-500", url: "https://athletics.hocking.edu/sports/womens-basketball" },
    { name: "Cross Country", season: "Fall", description: "Women's cross country team", color: "bg-green-500", url: "https://athletics.hocking.edu/sports/cross-country" },
    { name: "Flag Football", season: "Fall", description: "Women's flag football team", color: "bg-red-500", url: "https://athletics.hocking.edu/sports/flag-football" },
    { name: "Softball", season: "Spring", description: "Competing in NJCAA and OCCAC", color: "bg-orange-500", url: "https://athletics.hocking.edu/sports/softball" },
    { name: "Volleyball", season: "Fall", description: "Competing in NJCAA and OCCAC", color: "bg-blue-500", url: "https://athletics.hocking.edu/sports/volleyball" },
    { name: "Bowling", season: "Winter", description: "Women's bowling team", color: "bg-purple-500", url: "https://athletics.hocking.edu/sports/bowling" },
    { name: "Tennis", season: "Spring", description: "Women's tennis team", color: "bg-teal-500", url: "https://athletics.hocking.edu/sports/tennis" },
    { name: "Track & Field", season: "Spring", description: "Women's track and field", color: "bg-indigo-500", url: "https://athletics.hocking.edu/sports/track-and-field" }
  ];

  const coedSports: Sport[] = [
    { name: "Archery", season: "Year-round", description: "Co-ed archery team", color: "bg-yellow-500", url: "https://athletics.hocking.edu/sports/archery" },
    { name: "Cheerleading", season: "Year-round", description: "Co-ed cheerleading squad", color: "bg-purple-500", url: "https://athletics.hocking.edu/sports/cheerleading" },
    { name: "eSports", season: "Year-round", description: "Co-ed eSports team", color: "bg-gray-500", url: "https://athletics.hocking.edu/sports/esports" },
    { name: "Equestrian", season: "Year-round", description: "Co-ed equestrian team", color: "bg-brown-500", url: "https://athletics.hocking.edu/sports/equestrian" }
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
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Hocking College's athletic teams, the Hawks, compete in the NJCAA and OCCAC, representing excellence in sportsmanship, academics, and leadership.
        </p>
      </div>

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
                onClick={() => handleExternalLink('https://athletics.hocking.edu/information/mission')}
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Athletics Mission & Values
              </button>
            </div>
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
                  <a href="mailto:athletics@hocking.edu" className="text-blue-600 hover:underline">athletics@hocking.edu</a>
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

      {/* Men's Sports */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Users className="mr-3 h-6 w-6" />
            Men's Sports Teams
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mensSports.map((sport, index) => (
              <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-blue-800 dark:text-blue-200">{sport.name}</h5>
                  <Badge className={sport.color}>{sport.season}</Badge>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">{sport.description}</p>
                {sport.url && (
                  <button
                    onClick={() => handleExternalLink(sport.url!)}
                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Team Page
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Women's Sports */}
      <Card className="mb-8 border-2 border-pink-600">
        <CardHeader className="bg-pink-50 dark:bg-pink-900/20">
          <CardTitle className="flex items-center text-xl text-pink-800 dark:text-pink-200">
            <Users className="mr-3 h-6 w-6" />
            Women's Sports Teams
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {womensSports.map((sport, index) => (
              <div key={index} className="p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-pink-800 dark:text-pink-200">{sport.name}</h5>
                  <Badge className={sport.color}>{sport.season}</Badge>
                </div>
                <p className="text-sm text-pink-700 dark:text-pink-300 mb-2">{sport.description}</p>
                {sport.url && (
                  <button
                    onClick={() => handleExternalLink(sport.url!)}
                    className="flex items-center text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 transition-colors text-sm"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Team Page
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Co-ed Sports */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <Users className="mr-3 h-6 w-6" />
            Co-ed Sports Teams
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coedSports.map((sport, index) => (
              <div key={index} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-green-800 dark:text-green-200">{sport.name}</h5>
                  <Badge className={sport.color}>{sport.season}</Badge>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">{sport.description}</p>
                {sport.url && (
                  <button
                    onClick={() => handleExternalLink(sport.url!)}
                    className="flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors text-sm"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Team Page
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              onClick={() => handleExternalLink('https://athletics.hocking.edu/news')}
              className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Newspaper className="mr-3 h-5 w-5" />
                <span className="font-semibold">Athletics News & Headlines</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleExternalLink('https://athletics.hocking.edu/tickets')}
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
                    <a href={`mailto:${coach.email}`} className="text-blue-600 hover:underline text-sm">{coach.email}</a>
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
              onClick={() => handleExternalLink('https://athletics.hocking.edu/staff-directory')}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Athletics Staff Directory
            </button>
          </div>
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
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/tickets')}
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
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/tickets')}
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
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/staff-directory')}
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
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/navbar-sports')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  athletics.hocking.edu/navbar-sports
                </button>
                <button
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/sports/baseball')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Baseball
                </button>
                <button
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/sports/football')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Football
                </button>
                <button
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/sports/mens-basketball')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Men's Basketball
                </button>
                <button
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/sports/womens-basketball')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Women's Basketball
                </button>
                <button
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/sports/softball')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Softball
                </button>
                <button
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/tickets')}
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
                  onClick={() => handleExternalLink('https://athletics.hocking.edu/staff-directory')}
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