import { 
  ArrowLeft, GraduationCap, Phone, Mail, Clock, FileText, Users, AlertCircle,
  Award, Building, Calendar, CheckCircle, BookOpen,
  UserCheck, Target, Star
} from 'lucide-react';
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Graduation() {
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
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Graduation</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Hocking College welcomes you to your Graduation Hub and congratulates you on completing your degree! 
          This is your all-in-one resource to understand the steps, events, and expectations for graduating from Hocking College.
        </p>
      </div>

      {/* All Sections in Accordion */}
      <Accordion type="single" collapsible className="mb-8">
        {/* How to Apply for Graduation */}
        <AccordionItem value="how-to-apply" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-blue-800 dark:text-blue-200">
              <UserCheck className="mr-3 h-6 w-6" />
              How to Apply for Graduation
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Application Process</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Students must apply for graduation through Self-Service. Applications are free and required even if you don't plan to attend the ceremony.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Apply once you are close to completing your degree or certificate</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Applications are processed only for the submitted term</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Final Approval Requirements</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Completion of all program requirements</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Submission of official transcripts (if applicable)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Clearing of any holds or incomplete grades</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Graduation Pre-Party */}
        <AccordionItem value="graduation-pre-party" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-green-800 dark:text-green-200">
              <Calendar className="mr-3 h-6 w-6" />
              Graduation Pre-Party
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Before each graduation ceremony, Hocking College hosts a Graduation Pre-Party for graduates. At this event, students can:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Pick up their cap and gown (if eligible)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Take professional or fun photos</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enjoy free food, beverages, games, and music</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Get final assistance from various offices</span>
                </div>
              </div>
            </div>
            <Alert className="mt-4 border-2 border-blue-600 rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Details such as time and location are provided each term on the graduation webpage.
              </AlertDescription>
            </Alert>
          </AccordionContent>
        </AccordionItem>

        {/* Cap & Gown Information */}
        <AccordionItem value="cap-gown" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-purple-800 dark:text-purple-200">
              <Award className="mr-3 h-6 w-6" />
              Cap & Gown Information
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Standard Attire</h5>
                  <p className="text-sm text-purple-700 dark:text-purple-300">All graduates receive a standard black gown and a blue and gold tassel</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Additional Items</h5>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Some programs or organizations may offer additional stoles or cords (e.g., Phi Theta Kappa)</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Ordering Process</h5>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Gowns must be ordered by a deadline each term via an external vendor, at no additional cost</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Pick-up</h5>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Pick-up typically happens at the Pre-Party or via the Career & University Center if missed</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Graduation Practice */}
        <AccordionItem value="graduation-practice" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-orange-800 dark:text-orange-200">
              <Target className="mr-3 h-6 w-6" />
              Graduation Practice
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Required Attendance</h5>
                <p className="text-sm text-orange-700 dark:text-orange-300">All students participating in the ceremony are required to attend</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Purpose</h5>
                <p className="text-sm text-orange-700 dark:text-orange-300">This is to ensure smooth logistics for the ceremony</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Information</h5>
                <p className="text-sm text-orange-700 dark:text-orange-300">Time, place, and expectations posted on the graduation website each term</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* The Graduation Ceremony */}
        <AccordionItem value="graduation-ceremony" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-indigo-800 dark:text-indigo-200">
              <Star className="mr-3 h-6 w-6" />
              The Graduation Ceremony
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Ceremony Details</h5>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">The formal Commencement Ceremony is held at the end of each academic term</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Guests Welcome</h5>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">Family and friends are welcome to attend</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Ceremony Includes</h5>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">Speeches, graduate recognition, and live or recorded streaming</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Schedule Updates</h5>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">Exact dates, times, and seating arrangements updated every term</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Diplomas */}
        <AccordionItem value="diplomas" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-teal-800 dark:text-teal-200">
              <FileText className="mr-3 h-6 w-6" />
              Diplomas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Delivery Timeline</h5>
                  <p className="text-sm text-teal-700 dark:text-teal-300">Mailed 6–8 weeks after final grades are posted, assuming all accounts are clear</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Ceremony Policy</h5>
                  <p className="text-sm text-teal-700 dark:text-teal-300">Diplomas are not handed out during the ceremony</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Multiple Credentials</h5>
                  <p className="text-sm text-teal-700 dark:text-teal-300">Students earning multiple credentials will receive a diploma for each one</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl">
                  <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Replacements</h5>
                  <p className="text-sm text-teal-700 dark:text-teal-300">Replacement diplomas are available upon request with a processing fee</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Life After Graduation */}
        <AccordionItem value="life-after-graduation" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-emerald-800 dark:text-emerald-200">
              <Users className="mr-3 h-6 w-6" />
              Life After Graduation
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Graduation isn't the end of your Hocking College journey, it's the start of your next chapter. Whether you're headed into the workforce, transferring to a university, or just need official documents, here's what you need to know:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Career Support */}
              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Career Support Continues
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You still have full access to the Hocking College Career & University Center, even after you graduate. Get help with:
                </p>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Job applications and interview prep</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Resume and cover letter reviews</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Graduate or transfer school advising</span>
                  </div>
                </div>
                <button className="bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors text-sm">
                  Career Services
                </button>
              </div>

              {/* Transfer Resources */}
              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Transferring to Another College?
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Work with our Transfer Resource Center to ensure your credits are transferred correctly.
                </p>
                <button className="bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors text-sm">
                  Transfer Resources
                </button>
              </div>
            </div>

            {/* Stay Connected */}
            <div className="mb-6">
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Stay Connected
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Hocking encourages graduates to stay engaged through alumni events, mentoring opportunities, and campus resources.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold text-emerald-600 dark:text-emerald-400">Alumni Resources:</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Stay connected after graduation through the Hocking College Foundation – Alumni & Friends.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Newsletter: Email <a href="mailto:alumni@foundation.hocking.edu" className="text-blue-600 hover:underline">alumni@foundation.hocking.edu</a> to sign up
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Events: Join us for alumni gatherings and Homecoming</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 text-white px-3 py-1 rounded-xl text-xs">
                      Alumni Page
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs ml-2">
                      Homecoming Info
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-emerald-600 dark:text-emerald-400">Social Media:</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Join the Hocking College Alumni Association on Facebook:
                  </p>
                  <a 
                    href="https://facebook.com/HockingCollegeAlumniAssociation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    facebook.com/HockingCollegeAlumniAssociation
                  </a>
                </div>
              </div>
            </div>

            {/* Student Loan Repayment */}
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Student Loan Repayment Begins Soon
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                Stay on top of repayment timelines and options using federal resources.
              </p>
              <button className="bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors text-sm">
                Loan Repayment Help
              </button>
            </div>

            {/* Transcript Requests */}
            <div>
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Transcript Requests
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                You may need your official transcript for employment, licensure, or college transfers. Here's how to access both official and unofficial records:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-emerald-600 dark:text-emerald-400">Official Transcript (National Student Clearinghouse):</h5>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Fee: $5 + $2.90 per recipient</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Delivery: Mailed (standard or UPS), or held for pickup</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>No email or fax delivery available</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Typically processed in 3 business days</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Available 24/7</span>
                    </div>
                  </div>
                  <button className="bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors text-sm">
                    Order Official Transcript
                  </button>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-emerald-600 dark:text-emerald-400">Unofficial Transcript:</h5>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Access anytime through Self-Service</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Good for personal records or unofficial reviews</span>
                    </div>
                  </div>
                  <button className="bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors text-sm">
                    Transcript Info & Portal
                  </button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ Section */}
        <AccordionItem value="faq" className="border-2 border-blue-600 rounded-2xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-200">
              <BookOpen className="mr-3 h-6 w-6" />
              Frequently Asked Questions (FAQ)
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <Accordion type="single" collapsible className="w-full space-y-3">
                <AccordionItem value="requirements" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                What do I need to graduate this term?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                <div className="space-y-2">
                  <p>• Complete all required coursework with final grades posted</p>
                  <p>• Submit any official transfer or external transcripts</p>
                  <p>• Apply through Self‑Service, application is free</p>
                </div>
              </AccordionContent>
            </AccordionItem>

                <AccordionItem value="requirements-not-met" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                What if I don't meet the requirements by the end of the term?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Applications submitted prematurely or with outstanding requirements will be denied. 
                A denial letter is sent, and you'll need to reapply for the next eligible term.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="incomplete-grades" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                What if I receive an incomplete ("I" grade) during my final term?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Incomplete grades must be resolved before graduation. Once completed, you'll need to reapply for the current term.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="summer-courses" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                Can I participate in Commencement if I finish courses in summer?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Yes. You may walk in the term's ceremony once your graduation application is approved for that term.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="when-to-apply" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                When should I apply for graduation?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Apply during your final term or early during priority registration. Applications are processed only for the submitted term. 
                Delaying may postpone your ceremony participation.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="cleared-to-graduate" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                How do I know if I'm cleared to graduate?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Preliminary evaluations are completed before term-end. You'll receive either: 
                Preliminary approval letter (on track to graduate) or Denial letter (if requirements are unmet)
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="honors-gpa" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                What GPA is required for honors?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Graduating with a 3.5 GPA or higher earns Honors distinction.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="diploma-timeline" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                When will I receive my diploma?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Diplomas are mailed 6–8 weeks after final grades are posted, assuming no holds or balances remain.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="diploma-ceremony" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                Are diplomas handed out at Commencement?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                No, they are mailed only.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="multiple-degrees" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                If I earn multiple degrees, will I get multiple diplomas?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                Yes, it is one diploma for each degree or certificate earned.
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="replacement-diploma" className="border-2 border-blue-600 rounded-2xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                How can I get a replacement diploma?
              </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                <div className="space-y-2">
                  <p>Submit a written request (including name, DOB, student ID or SSN, address, phone, degree info), 
                  and include a $15 check or money order. Send it to:</p>
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      Registrar's Office – Diploma Requests<br />
                      3301 Hocking Parkway<br />
                      Nelsonville, OH 45764
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Information */}
        <AccordionItem value="contact" className="border-2 border-blue-600 rounded-2xl">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-200">
              <Building className="mr-3 h-6 w-6" />
              Contact Information
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Registrar's Office – Graduation Inquiries:</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-gray-600" />
                  <a href="tel:740-753-7042" className="text-blue-600 hover:underline">740‑753‑7042</a>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5 text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">Fax: 740‑753‑7065</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-gray-600" />
                  <a href="mailto:registrar@hocking.edu" className="text-blue-600 hover:underline">registrar@hocking.edu</a>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">Office hours: Mon–Fri, 8 AM–5 PM</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Records & Graduation Applications:</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">Primary Contact: Karen Graves</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-gray-600" />
                  <a href="mailto:gravesk@hocking.edu" className="text-blue-600 hover:underline">gravesk@hocking.edu</a>
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