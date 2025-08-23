import { 
  ArrowLeft, Globe, Phone, Mail, CheckCircle, 
  MapPin, Clock, 
  Users, BookOpen, Home, Plane, Award, AlertTriangle
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

export default function InternationalStudents() {
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
          <Globe className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">International Students at Hocking College</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Are you an international student ready to begin your college journey in the U.S.? Hocking College offers a unique experience 
          with career-focused programs, hands-on learning, and a supportive student community. Whether you're from the Caribbean, 
          Asia, Africa, or Europe, welcome home!
        </p>
      </div>

      {/* Main Content with Accordion */}
      <Accordion type="single" collapsible className="space-y-6">
        
        {/* International Student Admission Checklist */}
        <AccordionItem value="admission" className="border-2 border-blue-600 dark:border-blue-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <CheckCircle className="mr-3 h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">International Student Admission Checklist</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Before you can join us at Hocking College, here's everything you'll need to submit:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">International Student Application</p>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">$150 Application Fee (non-refundable)</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">Official High School or College Transcripts</p>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">Must be in English or include a certified English translation</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">Copy of Passport ID Page</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">Proof of Financial Support</p>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">A bank statement and sponsorship letter</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">Your Mailing Address</p>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">For official admissions communication</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                    <Clock className="mr-3 h-5 w-5" />
                    Apply By Deadline:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">Fall Semester:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">July 1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">Spring Semester:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">November 1</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-yellow-600 dark:border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <AlertTriangle className="mr-3 h-5 w-5" />
                    IMPORTANT:
                  </h4>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    After applying, contact the DSO (Designated School Official) for visa guidance and to receive your Form I-20.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Visa & Immigration Support */}
        <AccordionItem value="visa" className="border-2 border-green-600 dark:border-green-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <BookOpen className="mr-3 h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-green-600 dark:text-green-400">Visa & Immigration Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                We support you through every step of your international student visa journey.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">Visa Information</h4>
                    <div className="space-y-2 text-green-700 dark:text-green-300">
                      <p>• We issue the Form I-20 for F-1 student visas</p>
                      <p>• Full-time enrollment (12+ credits per semester) is required</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">On-campus Employment</h4>
                    <div className="space-y-2 text-green-700 dark:text-green-300">
                      <p>• Up to 15 hours/week during the semester</p>
                      <p>• Up to 40 hours/week during breaks (with approval)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">DSO Support Services</h4>
                    <div className="space-y-2 text-green-700 dark:text-green-300">
                      <p>• SEVIS compliance</p>
                      <p>• Travel and visa renewals</p>
                      <p>• Transfer procedures</p>
                      <p>• Address updates</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Pro Tip:
                </h4>
                <p className="text-green-700 dark:text-green-300">
                  Keep your immigration documents updated and always check in with your DSO before traveling.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Academic Support */}
        <AccordionItem value="academic" className="border-2 border-purple-600 dark:border-purple-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <BookOpen className="mr-3 h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">Academic Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">Placement Testing</h4>
                    <p className="text-purple-700 dark:text-purple-300">All international students complete placement testing upon arrival</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">English Course Requirements</h4>
                    <div className="space-y-2 text-purple-700 dark:text-purple-300">
                      <p>• Students will complete an English course as part of their program</p>
                      <p>• Courses include grammar, reading, writing, and speaking</p>
                      <p>• Transferring in with English 1510? You may be exempt from additional English courses</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">Additional Support Services</h4>
                  <p className="text-purple-700 dark:text-purple-300">
                    We also offer tutoring, study labs, and writing help, so you're never on your own!
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Scholarships & Payment Options */}
        <AccordionItem value="scholarships" className="border-2 border-orange-600 dark:border-orange-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Award className="mr-3 h-6 w-6 text-orange-600" />
              <span className="text-xl font-semibold text-orange-600 dark:text-orange-400">Scholarships & Payment Options</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 text-lg">GREAT Scholarship</h4>
                  <div className="space-y-2 text-orange-700 dark:text-orange-300">
                    <p>• Available to Jamaican and Bahamian students</p>
                    <p>• Covers in-state tuition rates</p>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 text-lg">Other Financial Options:</h4>
                  <div className="space-y-2 text-orange-700 dark:text-orange-300">
                    <p>• Scholarships through StudyUSA, Fulbright, and EducationUSA</p>
                    <p>• Flexible tuition payment plans through the cashier's office</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
                  Plan Ahead:
                </h4>
                <p className="text-blue-700 dark:text-blue-300">
                  You'll need to cover costs for tuition, housing, travel, food, health insurance, and personal expenses.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Housing for International Students */}
        <AccordionItem value="housing" className="border-2 border-teal-600 dark:border-teal-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Home className="mr-3 h-6 w-6 text-teal-600" />
              <span className="text-xl font-semibold text-teal-600 dark:text-teal-400">Housing for International Students</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                We recommend on-campus housing for international students because it offers:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-600 dark:border-teal-400">
                    <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-3">Residence Life Support</h4>
                    <div className="space-y-2 text-teal-700 dark:text-teal-300">
                      <p>• 24/7 residence life support</p>
                      <p>• Easy access to classrooms and student services</p>
                      <p>• A vibrant social environment</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-600 dark:border-teal-400">
                    <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-3">Accommodations</h4>
                    <div className="space-y-2 text-teal-700 dark:text-teal-300">
                      <p>• Secure and furnished rooms</p>
                      <p>• Shared kitchen spaces for preparing your meals</p>
                      <p>• Campus Safety</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-yellow-600 dark:border-yellow-400">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                  <AlertTriangle className="mr-3 h-5 w-5" />
                  Note:
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Meals are NOT included in housing for students staying in the International Dorms. Students can cook for themselves 
                  or buy meals on campus. For students staying in the other dorms, a 14 meals per week meal plan is added to your account.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Dual-Degree Pathways */}
        <AccordionItem value="pathways" className="border-2 border-indigo-600 dark:border-indigo-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Award className="mr-3 h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Dual-Degree Pathways</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Start your education in the Caribbean, finish it at Hocking!
              </p>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-indigo-600 dark:border-indigo-400">
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-4">We currently partner with:</h4>
                <div className="space-y-3 text-indigo-700 dark:text-indigo-300">
                  <p>• Excelsior Community College (Jamaica)</p>
                  <p>• Western Hospitality Institute (Jamaica)</p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300">
                These partnerships let you transfer to Hocking College and earn your U.S. degree while receiving housing at a reasonable 
                cost and scholarship support.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Travel & Arrival Tips */}
        <AccordionItem value="travel" className="border-2 border-red-600 dark:border-red-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Plane className="mr-3 h-6 w-6 text-red-600" />
              <span className="text-xl font-semibold text-red-600 dark:text-red-400">Travel & Arrival Tips</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-red-600 dark:border-red-400">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">Airport Information</h4>
                    <div className="space-y-2 text-red-700 dark:text-red-300">
                      <p>• Closest Airport: John Glenn Columbus International (CMH)</p>
                      <p>• Students are responsible for their own airport transportation</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-red-600 dark:border-red-400">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">Preparation Tips</h4>
                    <div className="space-y-2 text-red-700 dark:text-red-300">
                      <p>• Pack seasonal clothes, winters in Ohio can be very cold</p>
                      <p>• Arrival details and orientation schedule will be sent once your visa is approved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Support & Contact */}
        <AccordionItem value="contact" className="border-2 border-gray-600 dark:border-gray-400 rounded-2xl overflow-hidden">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Users className="mr-3 h-6 w-6 text-gray-600" />
              <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">Support & Contact</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-600 dark:text-gray-400 text-lg">International Student Services</h4>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <Mail className="mr-4 h-6 w-6 text-gray-600" />
                      <a href="mailto:international@hocking.edu" className="text-blue-600 hover:underline font-medium">
                        international@hocking.edu
                      </a>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <Phone className="mr-4 h-6 w-6 text-gray-600" />
                      <a href="tel:740-753-7058" className="text-blue-600 hover:underline font-medium">
                        740-753-7058
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-600 dark:text-gray-400 text-lg">Location & Hours</h4>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <MapPin className="mr-4 h-6 w-6 text-gray-600" />
                      <span className="text-gray-700 dark:text-gray-300">John Light Hall, Room 241</span>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <Clock className="mr-4 h-6 w-6 text-gray-600" />
                      <span className="text-gray-700 dark:text-gray-300">Monday–Friday, 8:00 AM–5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
} 