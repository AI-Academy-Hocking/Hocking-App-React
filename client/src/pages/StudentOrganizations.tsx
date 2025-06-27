import { 
  Calendar, Mail, Award, ArrowLeft, Users, Building, Phone, ExternalLink,
  UserCheck, Target, Globe, Star, CheckCircle, BookOpen, Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function StudentOrganizationsPage() {
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
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Student Organizations</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Hocking College offers a variety of student organizations to enhance your college experience, develop leadership skills, and connect with peers who share your interests.
        </p>
      </div>

      {/* Student Government Association */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Award className="mr-3 h-6 w-6" />
            Student Government Association
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            The voice of the student body, advocating for student interests and organizing campus events.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700 dark:text-blue-300">Meetings: Every Tuesday, 5:00 PM</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700 dark:text-blue-300">Open to all students</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-blue-600" />
                <a href="mailto:sga@hocking.edu" className="text-blue-600 hover:underline text-sm">sga@hocking.edu</a>
              </div>
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700 dark:text-blue-300">Student Center</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outdoor Adventure Club */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <Globe className="mr-3 h-6 w-6" />
            Outdoor Adventure Club
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Experience hiking, camping, rock climbing, and more with fellow adventure enthusiasts.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">Meetings: Every Wednesday, 6:00 PM</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">Outdoor activities and trips</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-green-600" />
                <a href="mailto:adventure@hocking.edu" className="text-blue-600 hover:underline text-sm">adventure@hocking.edu</a>
              </div>
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">Recreation Center</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arts & Culture Society */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Star className="mr-3 h-6 w-6" />
            Arts & Culture Society
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Celebrates diversity through art exhibitions, performances, and cultural events.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-700 dark:text-purple-300">Meetings: Every Thursday, 5:30 PM</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-700 dark:text-purple-300">Cultural events and performances</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-purple-600" />
                <a href="mailto:arts@hocking.edu" className="text-blue-600 hover:underline text-sm">arts@hocking.edu</a>
              </div>
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-700 dark:text-purple-300">Arts Center</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Business Leaders */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Target className="mr-3 h-6 w-6" />
            Future Business Leaders
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Develop professional skills through networking events, guest speakers, and business competitions.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-700 dark:text-orange-300">Meetings: Every Monday, 4:00 PM</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-700 dark:text-orange-300">Professional development</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-orange-600" />
                <a href="mailto:business@hocking.edu" className="text-blue-600 hover:underline text-sm">business@hocking.edu</a>
              </div>
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-700 dark:text-orange-300">Business Building</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Your Own Organization */}
      <Card className="mb-8 border-2 border-teal-600">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
            <UserCheck className="mr-3 h-6 w-6" />
            Start Your Own Organization
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Have an idea for a new student organization? We're here to help you get started!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300">Contact the Student Life Office</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-teal-600" />
                  <a href="mailto:studentlife@hocking.edu" className="text-blue-600 hover:underline text-sm">studentlife@hocking.edu</a>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-teal-600" />
                  <a href="tel:7407536462" className="text-blue-600 hover:underline text-sm">(740) 753-6462</a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300">Getting Started</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-teal-700 dark:text-teal-300">Submit organization proposal</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-teal-700 dark:text-teal-300">Recruit founding members</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-teal-700 dark:text-teal-300">Establish bylaws and structure</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits of Joining */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <Shield className="mr-3 h-6 w-6" />
            Benefits of Joining Student Organizations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Leadership Development</h5>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">Build leadership skills and gain experience in organizing events and managing teams</p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Networking</h5>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">Connect with peers who share your interests and build professional relationships</p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Resume Building</h5>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">Enhance your resume with extracurricular activities and leadership experience</p>
            </div>
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
            <AccordionItem value="join-organization">
              <AccordionTrigger className="text-left">
                How do I join a student organization?
              </AccordionTrigger>
              <AccordionContent>
                Contact the organization directly via email or attend one of their meetings. Most organizations welcome new members throughout the academic year.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="start-organization">
              <AccordionTrigger className="text-left">
                How do I start a new student organization?
              </AccordionTrigger>
              <AccordionContent>
                Contact the Student Life Office at studentlife@hocking.edu or call (740) 753-6462. They will guide you through the process of submitting a proposal and establishing your organization.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="meeting-times">
              <AccordionTrigger className="text-left">
                When do organizations typically meet?
              </AccordionTrigger>
              <AccordionContent>
                Meeting times vary by organization. Most meet weekly during the evening hours. Check the specific organization's contact information for current meeting schedules.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="costs">
              <AccordionTrigger className="text-left">
                Are there costs to join organizations?
              </AccordionTrigger>
              <AccordionContent>
                Most organizations are free to join. Some may have optional dues for special events or activities. Contact the specific organization for details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="time-commitment">
              <AccordionTrigger className="text-left">
                How much time do organizations require?
              </AccordionTrigger>
              <AccordionContent>
                Time commitment varies by organization. Most require 1-2 hours per week for meetings, with additional time for events and activities. You can participate as much or as little as your schedule allows.
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
              <h4 className="font-semibold text-gray-900 dark:text-white">Organization</h4>
              <div className="space-y-1 text-sm">
                <p>Student Government Association</p>
                <p>Outdoor Adventure Club</p>
                <p>Arts & Culture Society</p>
                <p>Future Business Leaders</p>
                <p>Student Life Office</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Contact</h4>
              <div className="space-y-1 text-sm">
                <a href="mailto:sga@hocking.edu" className="text-blue-600 hover:underline block text-left">
                  sga@hocking.edu
                </a>
                <a href="mailto:adventure@hocking.edu" className="text-blue-600 hover:underline block text-left">
                  adventure@hocking.edu
                </a>
                <a href="mailto:arts@hocking.edu" className="text-blue-600 hover:underline block text-left">
                  arts@hocking.edu
                </a>
                <a href="mailto:business@hocking.edu" className="text-blue-600 hover:underline block text-left">
                  business@hocking.edu
                </a>
                <a href="mailto:studentlife@hocking.edu" className="text-blue-600 hover:underline block text-left">
                  studentlife@hocking.edu
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentOrganizationsPage;
