import { 
  Briefcase, Phone, Clock, ArrowLeft, ExternalLink, CheckCircle, BookOpen, Activity,
  MapPin, Users, AlertTriangle, GraduationCap, Mail, Calendar, Download, 
  FileText, Building, UserCheck, Target, Award, Users2, HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function CareerUniversityCenter() {
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Career & University Center</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The Career & University Center supports students and alumni in launching careers, transferring to four-year institutions, and developing professional readiness. From personalized coaching to resume writing, job fairs, and a free Career Closet, this service ensures students are prepared for life after college.
        </p>
      </motion.div>

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

      {/* Career Coaching & Advising Section */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <UserCheck className="mr-3 h-6 w-6" />
            Career Coaching & Advising
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">1-on-1 Appointments and Drop-in Coaching</h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Personalized support for all aspects of career development and professional growth.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Available Services:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Resume & cover letter review</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Job and internship search strategies</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Interview prep & mock interviews</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Transfer & graduate school planning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Career assessment & goal setting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Professional networking guidance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Location & Hours</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">John Light Hall, Room 191</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Monday–Friday, 8:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Quick Access</h4>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/career-services')}
                  className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span className="text-sm">Career Services Homepage</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Closet Section */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Award className="mr-3 h-6 w-6" />
            Career Closet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-3">Free Professional Attire Resource</h3>
              <p className="text-purple-700 dark:text-purple-300 mb-4">
                A free resource providing business and business-casual attire for students preparing for interviews, job fairs, and presentations. Clothing is donated and maintained by students and staff; alterations available at low cost.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">What's Available:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Professional business attire</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Business-casual clothing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Accessories & shoes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Low-cost alterations</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Contact Career Closet</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-purple-600" />
                    <a href="mailto:hccareer@hocking.edu" className="text-blue-600 hover:underline text-sm">hccareer@hocking.edu</a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-purple-600" />
                    <a href="tel:740-753-6076" className="text-blue-600 hover:underline text-sm">740-753-6076</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Boards & Resume Tools Section */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Target className="mr-3 h-6 w-6" />
            Job Boards & Resume Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-3">Access a Variety of Tools and Platforms</h3>
              <p className="text-orange-700 dark:text-orange-300 mb-4">
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
                onClick={() => handleExternalLink('https://jobseeker.ohiomeansjobs.monster.com')}
                className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Building className="mr-3 h-5 w-5" />
                  <span className="font-semibold">Ohio Means Jobs</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => handleExternalLink('https://www.linkedin.com')}
                className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Users2 className="mr-3 h-5 w-5" />
                  <span className="font-semibold">LinkedIn</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workshops & Career Events Section */}
      <Card className="mb-8 border-2 border-teal-600">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
            <Calendar className="mr-3 h-6 w-6" />
            Workshops & Career Events
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-3">Professional Development Workshops</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                    <span className="text-sm text-teal-700 dark:text-teal-300">Resume & cover letter writing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                    <span className="text-sm text-teal-700 dark:text-teal-300">LinkedIn & Handshake navigation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                    <span className="text-sm text-teal-700 dark:text-teal-300">Career planning & goal setting</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                    <span className="text-sm text-teal-700 dark:text-teal-300">Interview preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                    <span className="text-sm text-teal-700 dark:text-teal-300">Networking strategies</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                    <span className="text-sm text-teal-700 dark:text-teal-300">Professional etiquette</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-3">Major Hiring Events</h4>
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-teal-800 dark:text-teal-200">Fall Career Fair</h5>
                      <p className="text-sm text-teal-700 dark:text-teal-300">October 21, 2025</p>
                    </div>
                    <Badge variant="secondary" className="bg-teal-600 text-white">Fall 2025</Badge>
                  </div>
                </div>
                <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-teal-800 dark:text-teal-200">Spring Career Fair</h5>
                      <p className="text-sm text-teal-700 dark:text-teal-300">February 10, 2026</p>
                      <p className="text-sm text-teal-700 dark:text-teal-300">11:00 AM – 2:00 PM at the Student Center</p>
                    </div>
                    <Badge variant="secondary" className="bg-teal-600 text-white">Spring 2026</Badge>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/career-services/events')}
              className="flex items-center justify-between p-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Calendar className="mr-3 h-5 w-5" />
                <span className="font-semibold">Career Services Events</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Transfer & Graduate School Support Section */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <GraduationCap className="mr-3 h-6 w-6" />
            Transfer & Graduate School Support
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Comprehensive Transfer & Graduate School Assistance</h3>
              <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                Expert guidance to help you successfully transfer to four-year institutions or pursue graduate education.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Assistance with:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">School/program research</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Application processes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Personal statement & essay writing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Admissions interview prep</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Additional Services:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Transfer credit evaluation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Financial aid guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Scholarship opportunities</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Campus visit coordination</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced App Features Section */}
      <Card className="mb-8 border-2 border-pink-600">
        <CardHeader className="bg-pink-50 dark:bg-pink-900/20">
          <CardTitle className="flex items-center text-xl text-pink-800 dark:text-pink-200">
            <Download className="mr-3 h-6 w-6" />
            Enhanced App Features & Student Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">Career Assessment Tools</h4>
                <p className="text-pink-700 dark:text-pink-300 mb-3">Help students discover their strengths and interests:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleExternalLink('https://www.onetcenter.org/IP.html')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    O*NET Interest Profiler
                  </button>
                  <button
                    onClick={() => handleExternalLink('https://www.careeronestop.org')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    CareerOneStop
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">Career Fair Prep Kit</h4>
                <p className="text-pink-700 dark:text-pink-300 mb-3">A downloadable guide that covers:</p>
                <div className="space-y-1 text-sm text-pink-700 dark:text-pink-300">
                  <div>• What to wear</div>
                  <div>• What to bring</div>
                  <div>• How to introduce yourself</div>
                  <div>• How to follow up</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">RSVP and Calendar Integration</h4>
                <p className="text-pink-700 dark:text-pink-300">Let students RSVP for events via app with auto-reminders synced to their Google or Outlook calendar.</p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">Video Library (Future Addition)</h4>
                <p className="text-pink-700 dark:text-pink-300 mb-2">Short tutorials:</p>
                <div className="space-y-1 text-sm text-pink-700 dark:text-pink-300">
                  <div>• How to build a resume</div>
                  <div>• Virtual interview tips</div>
                  <div>• Using Handshake and LinkedIn</div>
                  <div>• Dressing professionally</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-8 border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <Phone className="mr-3 h-6 w-6" />
            Contact Directory
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-900/30">
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Name / Role</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Location</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Phone</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Career & University Center</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">John Light Hall, Room 191</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="tel:740-753-6076" className="text-blue-600 hover:underline">740‑753‑6076</a>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="mailto:hccareer@hocking.edu" className="text-blue-600 hover:underline">hccareer@hocking.edu</a>
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Terry Koons, Career Center Manager</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Same</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="tel:740-753-6132" className="text-blue-600 hover:underline">740‑753‑6132</a>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="mailto:koonst@hocking.edu" className="text-blue-600 hover:underline">koonst@hocking.edu</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-8 border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <HelpCircle className="mr-3 h-6 w-6" />
            Frequently Asked Questions (FAQ)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="who-can-use">
              <AccordionTrigger className="text-left">
                Who can use Career Services?
              </AccordionTrigger>
              <AccordionContent>
                All students and alumni.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger className="text-left">
                Where is it located?
              </AccordionTrigger>
              <AccordionContent>
                John Light Hall, Room 191
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="drop-in-hours">
              <AccordionTrigger className="text-left">
                What are the drop-in hours?
              </AccordionTrigger>
              <AccordionContent>
                Monday–Friday, 8:00 AM – 5:00 PM
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="schedule-session">
              <AccordionTrigger className="text-left">
                How do I schedule a session?
              </AccordionTrigger>
              <AccordionContent>
                Call 740‑753‑6076 or email hccareer@hocking.edu
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="job-listings">
              <AccordionTrigger className="text-left">
                Are there job listings online?
              </AccordionTrigger>
              <AccordionContent>
                Yes, through:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Hocking Job Board</li>
                  <li>SkillsFirst</li>
                  <li>Handshake</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="career-closet">
              <AccordionTrigger className="text-left">
                What is the Career Closet?
              </AccordionTrigger>
              <AccordionContent>
                A free, on-campus wardrobe resource for interviews and job fairs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="graduate-school">
              <AccordionTrigger className="text-left">
                Do you help with graduate school planning?
              </AccordionTrigger>
              <AccordionContent>
                Yes—everything from choosing a program to reviewing your essays.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Links Summary */}
      <Card className="border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <ExternalLink className="mr-3 h-6 w-6" />
            Quick Links Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Action</h4>
              <div className="space-y-1 text-sm">
                <p>Career Services Home</p>
                <p>Job Search Tools</p>
                <p>Email Career Closet</p>
                <p>Career Assessment</p>
                <p>Event Info</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Direct Link</h4>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/career-services')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  hocking.edu/career-services
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/job-board')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Job Board · SkillsFirst
                </button>
                <button
                  onClick={() => handleExternalLink('mailto:hccareer@hocking.edu')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  hccareer@hocking.edu
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.onetcenter.org/IP.html')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  O*NET Interest Profiler
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/career-services/events')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Career Services Events
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 