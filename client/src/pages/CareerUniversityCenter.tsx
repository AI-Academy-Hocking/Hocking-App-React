import { 
  Briefcase, Phone, Clock, ArrowLeft, ExternalLink, CheckCircle, Activity,
  MapPin, Mail, 
  FileText, Building, UserCheck, Target, Award, Users2,
  GraduationCap, Calendar, Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

export default function CareerUniversityCenter() {
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Back Navigation */}
      <div className="flex items-center mb-8">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors group">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Career & University Center</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The Career & University Center supports students and alumni in launching careers, transferring to four-year institutions, and developing professional readiness. From personalized coaching to resume writing, job fairs, and a free Career Closet, this service ensures students are prepared for life after college.
        </p>
      </div>

      {/* Quick Stats */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Activity className="mr-3 h-6 w-6" />
            Career & University Center Quick Facts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1-on-1</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Career Coaching</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Free</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Career Closet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2x</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Major Hiring Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Transfer Support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content with Accordion */}
      <Accordion type="single" collapsible className="space-y-6">
        
        {/* Career Coaching & Advising Section */}
        <AccordionItem value="coaching" className="border-2 border-green-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 px-6 py-4">
            <div className="flex items-center">
              <UserCheck className="mr-3 h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-green-800 dark:text-green-200">Career Coaching & Advising</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">1-on-1 Appointments and Drop-in Coaching</h3>
                <p className="text-green-700 dark:text-green-300">
                  Personalized support for all aspects of career development and professional growth.
                </p>
              </div>

              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-4">Available Services:</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Resume & cover letter review</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Job and internship search strategies</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Interview prep & mock interviews</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Transfer & graduate school planning</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Career assessment & goal setting</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Professional networking guidance</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-4">Location & Hours</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">John Light Hall, Room 191</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Monday–Friday, 8:00 AM – 5:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-4">Quick Access</h4>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/career-services')}
                    className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    <ExternalLink className="mr-3 h-5 w-5" />
                    <span>Career Services Homepage</span>
                  </button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Career Closet Section */}
        <AccordionItem value="closet" className="border-2 border-purple-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 px-6 py-4">
            <div className="flex items-center">
              <Award className="mr-3 h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-800 dark:text-purple-200">Career Closet</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-3">Free Professional Attire Resource</h3>
                <p className="text-purple-700 dark:text-purple-300">
                  A free resource providing business and business-casual attire for students preparing for interviews, job fairs, and presentations. Clothing is donated and maintained by students and staff; alterations available at low cost.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-4">What's Available:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-purple-600" />
                      <span className="text-purple-700 dark:text-purple-300">Professional business attire</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-purple-600" />
                      <span className="text-purple-700 dark:text-purple-300">Business-casual clothing</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-purple-600" />
                      <span className="text-purple-700 dark:text-purple-300">Accessories & shoes</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-purple-600" />
                      <span className="text-purple-700 dark:text-purple-300">Low-cost alterations</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-4">Contact Career Closet</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 text-purple-600" />
                      <a href="mailto:hccareer@hocking.edu" className="text-blue-600 hover:underline">hccareer@hocking.edu</a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-purple-600" />
                      <a href="tel:740-753-6076" className="text-blue-600 hover:underline">740-753-6076</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Job Boards & Resume Tools Section */}
        <AccordionItem value="tools" className="border-2 border-orange-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 px-6 py-4">
            <div className="flex items-center">
              <Target className="mr-3 h-6 w-6 text-orange-600" />
              <span className="text-xl font-semibold text-orange-800 dark:text-orange-200">Job Boards & Resume Tools</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-3">Access a Variety of Tools and Platforms</h3>
                <p className="text-orange-700 dark:text-orange-300">
                  Comprehensive job search and career development resources to help you succeed.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/job-board')}
                  className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Briefcase className="mr-3 h-5 w-5" />
                    <span className="font-semibold">Hocking Job Board</span>
                  </div>
                  <ExternalLink className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleExternalLink('https://www.skillsfirst.com')}
                  className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <FileText className="mr-3 h-5 w-5" />
                    <span className="font-semibold">SkillsFirst Resume Builder</span>
                  </div>
                  <ExternalLink className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleExternalLink('https://www.indeed.com')}
                  className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Briefcase className="mr-3 h-5 w-5" />
                    <span className="font-semibold">Indeed Job Search</span>
                  </div>
                  <ExternalLink className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleExternalLink('https://www.linkedin.com/jobs')}
                  className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Users2 className="mr-3 h-5 w-5" />
                    <span className="font-semibold">LinkedIn Jobs</span>
                  </div>
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Transfer & Graduate School Support */}
        <AccordionItem value="transfer" className="border-2 border-teal-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30 px-6 py-4">
            <div className="flex items-center">
              <GraduationCap className="mr-3 h-6 w-6 text-teal-600" />
              <span className="text-xl font-semibold text-teal-800 dark:text-teal-200">Transfer & Graduate School Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-3">Comprehensive Transfer Assistance</h3>
                <p className="text-teal-700 dark:text-teal-300">
                  Expert guidance for students planning to transfer to four-year institutions or pursue graduate education.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-4">Transfer Services:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">Transfer credit evaluation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">Application assistance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">Financial aid guidance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">Campus visit coordination</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-4">Graduate School Support:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">Program research assistance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">Application essay review</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">GRE/GMAT preparation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300">Interview preparation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Job Fairs & Networking Events */}
        <AccordionItem value="events" className="border-2 border-indigo-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 px-6 py-4">
            <div className="flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">Job Fairs & Networking Events</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Connect with Employers and Professionals</h3>
                <p className="text-indigo-700 dark:text-indigo-300">
                  Regular events throughout the year to help students build professional networks and explore career opportunities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-4">Major Events:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Star className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">Fall Career Fair (October)</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">Spring Career Fair (March)</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">Industry-specific networking events</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">Alumni networking sessions</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-4">Event Benefits:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">Direct employer contact</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">On-the-spot interviews</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">Resume feedback</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-300">Industry insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Workshops & Training */}
        <AccordionItem value="workshops" className="border-2 border-red-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-6 py-4">
            <div className="flex items-center">
              <Building className="mr-3 h-6 w-6 text-red-600" />
              <span className="text-xl font-semibold text-red-800 dark:text-red-200">Workshops & Training</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-3">Professional Development Programs</h3>
                <p className="text-red-700 dark:text-red-300">
                  Regular workshops and training sessions to enhance your professional skills and career readiness.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-4">Workshop Topics:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Resume writing & optimization</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Interview techniques & strategies</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Professional networking</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Salary negotiation</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-4">Training Programs:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Professional communication</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Leadership development</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Industry-specific skills</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Digital literacy & tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Information */}
        <AccordionItem value="contact" className="border-2 border-gray-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/30 px-6 py-4">
            <div className="flex items-center">
              <Users2 className="mr-3 h-6 w-6 text-gray-600" />
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">Contact Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">General Contact</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-gray-600" />
                      <a href="tel:740-753-6076" className="text-blue-600 hover:underline">740-753-6076</a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 text-gray-600" />
                      <a href="mailto:hccareer@hocking.edu" className="text-blue-600 hover:underline">hccareer@hocking.edu</a>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-gray-600" />
                      <span className="text-gray-700 dark:text-gray-300">John Light Hall, Room 191</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Hours of Operation</h4>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p>• Monday–Friday: 8:00 AM – 5:00 PM</p>
                    <p>• Walk-in appointments available</p>
                    <p>• Evening appointments by request</p>
                    <p>• Virtual consultations available</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Important Notes</h4>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>• All services are free to enrolled students and alumni</p>
                  <p>• Appointments recommended for specialized services</p>
                  <p>• Career Closet available during business hours</p>
                  <p>• Resume review turnaround: 2-3 business days</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
} 