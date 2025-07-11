import { 
  Heart, Phone, Clock, ArrowLeft, ExternalLink, CheckCircle, BookOpen, Activity,
  MapPin, Users, AlertTriangle, Stethoscope, Brain, ChevronDown, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function CampusHealth() {
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
          <Heart className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-primary">Campus Health & Wellness</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The Hawks Center for Well‑Being is a vital resource that supports the physical and mental health of all Hocking College students. 
          Located in John Light Hall, Room 241, the center provides walk-in and scheduled services, including access to doctors, 
          licensed counselors, and wellness professionals throughout the academic year.
        </p>
      </div>

      {/* Quick Stats */}
      <Card className="mb-8 border-2 border-red-600">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="flex items-center text-xl text-red-800 dark:text-red-200">
            <Activity className="mr-3 h-6 w-6" />
            Health & Wellness Quick Facts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">2x</div>
              <div className="text-sm text-red-700 dark:text-red-300">Weekly Doctor Visits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">2x</div>
              <div className="text-sm text-red-700 dark:text-red-300">Weekly Counseling</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">24/7</div>
              <div className="text-sm text-red-700 dark:text-red-300">Crisis Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">100%</div>
              <div className="text-sm text-red-700 dark:text-red-300">Confidential</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content with Accordion */}
      <Accordion type="single" collapsible className="space-y-6">
        
        {/* Medical Care Section */}
        <AccordionItem value="medical" className="border-2 border-blue-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-6 py-4">
            <div className="flex items-center">
              <Stethoscope className="mr-3 h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-blue-800 dark:text-blue-200">Medical Care – Hawks Center for Well‑Being</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">On-Campus Doctor Availability</h3>
                <p className="text-blue-700 dark:text-blue-300">
                  A licensed doctor is on campus twice per week, offering physicals, wellness exams, sick visits, and screenings.
                </p>
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-4">Available Services:</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">Physicals & acute visits</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">COVID-19, strep, flu testing</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">Pregnancy & STD testing</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">Contraceptives & birth control</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">Drug screenings</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">Health education & resources</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-4">Clinic Location & Hours</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">John Light Hall, Room 241</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">Tuesdays: 8:30 AM – 12:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-blue-700 dark:text-blue-300">Thursdays: 1:30 PM – 4:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-4">Quick Access</h4>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/student-life/health-wellness')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="mr-3 h-5 w-5" />
                    <span>Campus Health & Wellness Homepage</span>
                  </button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mental Health & Counseling Section */}
        <AccordionItem value="mental" className="border-2 border-green-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 px-6 py-4">
            <div className="flex items-center">
              <Brain className="mr-3 h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-green-800 dark:text-green-200">Mental Health & Counseling Services</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">Licensed Counselors Available On Campus Twice Per Week</h3>
                <div className="space-y-3">
                  <p className="text-green-700 dark:text-green-300">Sessions include brief therapy, stress management, academic support, and crisis care.</p>
                  <p className="text-green-700 dark:text-green-300">Open to students, faculty, and staff.</p>
                </div>
              </div>

              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Dorm-Based Support</h4>
                <p className="text-green-700 dark:text-green-300">
                  The counseling team also visits residence halls every two weeks, alternating locations, to provide in-dorm counseling sessions and promote wellness access across campus.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-4">How to Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-green-600" />
                      <a href="tel:740-753-7079" className="text-blue-600 hover:underline">740‑753‑7079</a>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Wednesdays: 8:30 AM – 12:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Fridays: 8:00 AM – 5:30 PM</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-4">Quick Access</h4>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/student-life/health-wellness/counseling')}
                    className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    <ExternalLink className="mr-3 h-5 w-5" />
                    <span>Mental Health & Counseling Services</span>
                  </button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Emergency & Crisis Services */}
        <AccordionItem value="emergency" className="border-2 border-orange-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 px-6 py-4">
            <div className="flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6 text-orange-600" />
              <span className="text-xl font-semibold text-orange-800 dark:text-orange-200">Emergency & Crisis Services</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-3">Mental Health Crisis Support</h3>
                <p className="text-orange-700 dark:text-orange-300 mb-3">
                  Immediate assistance through the Hopewell Health 24/7 Crisis Hotline
                </p>
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-orange-600" />
                  <a href="tel:1-888-475-8484" className="text-blue-600 hover:underline">1‑888‑475‑8484</a>
                </div>
              </div>

              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Campus Emergency Response</h4>
                <p className="text-orange-700 dark:text-orange-300 mb-3">
                  Contact Campus Safety for immediate campus response:
                </p>
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-orange-600" />
                  <a href="tel:740-753-6598" className="text-blue-600 hover:underline">740‑753‑6598</a>
                </div>
              </div>

              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Behavioral Intervention Team (BIT)</h4>
                <p className="text-orange-700 dark:text-orange-300 mb-3">
                  Coordinates assessments, support strategies, and referrals for students experiencing emotional or behavioral distress.
                </p>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/student-life/health-wellness/behavioral-intervention-team')}
                  className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
                >
                  <ExternalLink className="mr-3 h-5 w-5" />
                  <span>Learn More About BIT</span>
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Wellness Resources */}
        <AccordionItem value="wellness" className="border-2 border-purple-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 px-6 py-4">
            <div className="flex items-center">
              <BookOpen className="mr-3 h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-800 dark:text-purple-200">Wellness Resources & Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-4">Health Education</h4>
                  <div className="space-y-3 text-purple-700 dark:text-purple-300">
                    <p>• Nutrition and healthy eating</p>
                    <p>• Exercise and physical activity</p>
                    <p>• Sleep hygiene and stress management</p>
                    <p>• Substance abuse prevention</p>
                  </div>
                </div>
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-4">Wellness Programs</h4>
                  <div className="space-y-3 text-purple-700 dark:text-purple-300">
                    <p>• Mindfulness and meditation sessions</p>
                    <p>• Yoga and fitness classes</p>
                    <p>• Wellness workshops and seminars</p>
                    <p>• Peer support groups</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-4">Online Resources</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/student-life/health-wellness/resources')}
                    className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <ExternalLink className="mr-3 h-5 w-5" />
                    <span>Health & Wellness Resources</span>
                  </button>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/student-life/health-wellness/events')}
                    className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <ExternalLink className="mr-3 h-5 w-5" />
                    <span>Wellness Events Calendar</span>
                  </button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Information */}
        <AccordionItem value="contact" className="border-2 border-gray-600 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/30 px-6 py-4">
            <div className="flex items-center">
              <Users className="mr-3 h-6 w-6 text-gray-600" />
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">Contact Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">General Inquiries</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-gray-600" />
                      <a href="tel:740-753-7079" className="text-blue-600 hover:underline">740‑753‑7079</a>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-gray-600" />
                      <span className="text-gray-700 dark:text-gray-300">John Light Hall, Room 241</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Hours of Operation</h4>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p>• Medical Services: Tues & Thurs (see times above)</p>
                    <p>• Counseling: Wed & Fri (see times above)</p>
                    <p>• Crisis Support: 24/7 via hotline</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Important Notes</h4>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>• All services are confidential and free to enrolled students</p>
                  <p>• Walk-in appointments available during operating hours</p>
                  <p>• Emergency services available 24/7 through crisis hotline</p>
                  <p>• Services available to students, faculty, and staff</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
} 