import { 
  Briefcase, Phone, Clock, ArrowLeft, ExternalLink, CheckCircle, Activity,
  MapPin, Mail, 
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
            <Activity className="mr-3 h-6 w-6" />
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
                <Activity className="mr-3 h-5 w-5" />
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
            <Activity className="mr-3 h-6 w-6" />
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

      {/* On-Campus Student Jobs Section */}
      <Card className="mb-8 border-2 border-pink-600">
        <CardHeader className="bg-pink-50 dark:bg-pink-900/20">
          <CardTitle className="flex items-center text-xl text-pink-800 dark:text-pink-200">
            <Briefcase className="mr-3 h-6 w-6" />
            On-Campus Student Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-3">Student Worker Program</h3>
              <p className="text-pink-700 dark:text-pink-300 mb-4">
                Hocking College offers on-campus employment opportunities for students through the Student Worker Program. These roles provide real-world experience, supplemental income, and valuable workplace skills right on campus.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">Types of Jobs Available:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Administrative assistants (departments, offices)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Lab assistants or tutors</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Library and tech support staff</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Residence hall/front desk staff</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Facilities/maintenance helpers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Dining services and event assistants</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-pink-600 dark:text-pink-400 mt-3 italic">
                Note: Job assignments are based on available openings and matched with a student's program or skillset when possible.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">How to Apply:</h4>
              <p className="text-pink-700 dark:text-pink-300 mb-3">All student employment is coordinated through Human Resources. Students must:</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                  <span className="text-sm text-pink-700 dark:text-pink-300">Search available jobs using the job board.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                  <span className="text-sm text-pink-700 dark:text-pink-300">Complete the required student employment paperwork.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                  <span className="text-sm text-pink-700 dark:text-pink-300">Await assignment approval from HR.</span>
                </div>
              </div>
              
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/studentjobs')}
                className="flex items-center justify-between p-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors mb-6"
              >
                <div className="flex items-center">
                  <Briefcase className="mr-3 h-5 w-5" />
                  <span className="font-semibold">Apply for Student Jobs – Job Board</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">Required Documents:</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Valid photo ID (driver's license or state ID)</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Social Security card</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Class schedule</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Completed tax forms (W-4)</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Direct deposit form</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-pink-600 dark:text-pink-400 italic">
                Note: Full employment requirements and paperwork instructions are available after you log in to the portal linked above.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-3">Human Resources – Contact Info:</h4>
              <p className="text-pink-700 dark:text-pink-300 mb-3">For all student job applications and inquiries, contact:</p>
              <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="font-semibold text-pink-800 dark:text-pink-200">Human Resources Department</div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-pink-600" />
                    <span className="text-sm text-pink-700 dark:text-pink-300">Oakley Hall, 2nd Floor</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-pink-600" />
                    <a href="tel:740-753-7050" className="text-blue-600 hover:underline text-sm">740‑753‑7050</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-pink-600" />
                    <a href="mailto:hr@hocking.edu" className="text-blue-600 hover:underline text-sm">hr@hocking.edu</a>
                  </div>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/hr')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    HR Department Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Join the Hocking College Team – Faculty & Staff Employment Section */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <Users2 className="mr-3 h-6 w-6" />
            Join the Hocking College Team – Faculty & Staff Employment
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Professional Opportunities</h3>
              <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                Hocking College is always looking for dedicated professionals who are passionate about student success, career readiness, and community engagement. Whether you're an experienced educator or an industry expert ready to teach, we welcome you to explore our current openings.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Faculty & Staff Opportunities:</h4>
              <p className="text-indigo-700 dark:text-indigo-300 mb-3">Open positions include:</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Full-time and adjunct faculty roles</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Administrative and staff positions</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Student support, technical, and operational roles</span>
                  </div>
                </div>
              </div>
              <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                View all current job openings and apply online through our secure portal.
              </p>
              
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/employment')}
                className="flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors mb-6"
              >
                <div className="flex items-center">
                  <Briefcase className="mr-3 h-5 w-5" />
                  <span className="font-semibold">View Available Jobs</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">How to Apply:</h4>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Visit the Employment Opportunities page.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Browse current faculty/staff openings.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Click the job title for a full description.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Submit your application and required documents through the online portal.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Contact the Human Resources Department with any questions.</span>
                </div>
              </div>
              
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/employment/apply')}
                className="flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  <span className="font-semibold">Start Application Process</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </button>
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
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Human Resources Department</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Oakley Hall, 2nd Floor</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="tel:740-753-7050" className="text-blue-600 hover:underline">740‑753‑7050</a>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="mailto:hr@hocking.edu" className="text-blue-600 hover:underline">hr@hocking.edu</a>
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

            <AccordionItem value="dependency-override">
              <AccordionTrigger className="text-left">
                Can I still get aid if my parents don't support me?
              </AccordionTrigger>
              <AccordionContent>
                Yes. You may be eligible for a Dependency Override. This requires documentation and an appeal form available online.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="summer-aid">
              <AccordionTrigger className="text-left">
                Is there financial aid available for summer classes?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Submit the Summer Enrollment Aid Request Form, and check if you're eligible for federal or state grants.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="parent-help">
              <AccordionTrigger className="text-left">
                Can parents help with FAFSA or aid questions?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Parents can assist with FAFSA by creating their own FSA ID. They can also contact the Financial Aid Office directly for assistance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="campus-job-how">
              <AccordionTrigger className="text-left">
                How do I get a job on campus?
              </AccordionTrigger>
              <AccordionContent>
                Search jobs on the job board and follow HR's employment procedures.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="campus-job-approval">
              <AccordionTrigger className="text-left">
                Who approves my student job?
              </AccordionTrigger>
              <AccordionContent>
                The Human Resources Department handles all approvals and paperwork.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="work-study">
              <AccordionTrigger className="text-left">
                Are there work-study positions?
              </AccordionTrigger>
              <AccordionContent>
                Yes, ask HR about work-study eligibility based on your FAFSA.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="international-students-work">
              <AccordionTrigger className="text-left">
                Can international students work on campus?
              </AccordionTrigger>
              <AccordionContent>
                Only if they meet federal visa guidelines. Please check with HR for eligibility.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="work-hours">
              <AccordionTrigger className="text-left">
                How many hours can I work?
              </AccordionTrigger>
              <AccordionContent>
                Typically up to 20 hours per week during semesters; check with HR for seasonal limits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="summer-housing-work">
              <AccordionTrigger className="text-left">
                Is summer housing available and can I work more hours in the summer?
              </AccordionTrigger>
              <AccordionContent>
                Yes, summer housing is available and you can work up to 40 hours per week during the summer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faculty-apply-where">
              <AccordionTrigger className="text-left">
                Where do I apply for faculty or staff jobs?
              </AccordionTrigger>
              <AccordionContent>
                Visit the Employment Opportunities Page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faculty-documents">
              <AccordionTrigger className="text-left">
                What documents are required to apply?
              </AccordionTrigger>
              <AccordionContent>
                Typically a resume, cover letter, transcripts (for faculty), and references. Each listing details what is required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="multiple-applications">
              <AccordionTrigger className="text-left">
                Can I apply for more than one position?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you may submit separate applications for multiple open positions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="application-problems">
              <AccordionTrigger className="text-left">
                Who do I contact if I have a problem with my application?
              </AccordionTrigger>
              <AccordionContent>
                Reach out to the HR Office at Email: hr@hocking.edu or Contact Number: 740‑753‑7050.
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