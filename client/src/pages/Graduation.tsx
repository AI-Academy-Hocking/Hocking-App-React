import { 
  ArrowLeft, GraduationCap, Phone, Mail, Clock, FileText, Users, AlertCircle,
  Award, Building, Calendar, CheckCircle, AlertTriangle, BookOpen, ExternalLink,
  UserCheck, Target, Globe, Star, Shield, RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function Graduation() {
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

      {/* How to Apply for Graduation */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <UserCheck className="mr-3 h-6 w-6" />
            How to Apply for Graduation
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

      {/* Graduation Pre-Party */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <Calendar className="mr-3 h-6 w-6" />
            Graduation Pre-Party
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
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
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Details such as time and location are provided each term on the graduation webpage.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Cap & Gown Information */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Award className="mr-3 h-6 w-6" />
            Cap & Gown Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Standard Attire</h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">All graduates receive a standard black gown and a blue and gold tassel</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Additional Items</h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">Some programs or organizations may offer additional stoles or cords (e.g., Phi Theta Kappa)</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Ordering Process</h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">Gowns must be ordered by a deadline each term via an external vendor, at no additional cost</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Pick-up</h5>
                <p className="text-sm text-purple-700 dark:text-purple-300">Pick-up typically happens at the Pre-Party or via the Career & University Center if missed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graduation Practice */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Target className="mr-3 h-6 w-6" />
            Graduation Practice
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Required Attendance</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">All students participating in the ceremony are required to attend</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Purpose</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">This is to ensure smooth logistics for the ceremony</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Information</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">Time, place, and expectations posted on the graduation website each term</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Graduation Ceremony */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <Star className="mr-3 h-6 w-6" />
            The Graduation Ceremony
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Ceremony Details</h5>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">The formal Commencement Ceremony is held at the end of each academic term</p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Guests Welcome</h5>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">Family and friends are welcome to attend</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Ceremony Includes</h5>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">Speeches, graduate recognition, and live or recorded streaming</p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Schedule Updates</h5>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">Exact dates, times, and seating arrangements updated every term</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diplomas */}
      <Card className="mb-8 border-2 border-teal-600">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
            <FileText className="mr-3 h-6 w-6" />
            Diplomas
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Delivery Timeline</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">Mailed 6–8 weeks after final grades are posted, assuming all accounts are clear</p>
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Ceremony Policy</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">Diplomas are not handed out during the ceremony</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Multiple Credentials</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">Students earning multiple credentials will receive a diploma for each one</p>
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Replacements</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">Replacement diplomas are available upon request with a processing fee</p>
              </div>
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
            <AccordionItem value="requirements">
              <AccordionTrigger className="text-left">
                What do I need to graduate this term?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>• Complete all required coursework with final grades posted</p>
                  <p>• Submit any official transfer or external transcripts</p>
                  <p>• Apply through Self‑Service, application is free</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="requirements-not-met">
              <AccordionTrigger className="text-left">
                What if I don't meet the requirements by the end of the term?
              </AccordionTrigger>
              <AccordionContent>
                Applications submitted prematurely or with outstanding requirements will be denied. 
                A denial letter is sent, and you'll need to reapply for the next eligible term.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="incomplete-grades">
              <AccordionTrigger className="text-left">
                What if I receive an incomplete ("I" grade) during my final term?
              </AccordionTrigger>
              <AccordionContent>
                Incomplete grades must be resolved before graduation. Once completed, you'll need to reapply for the current term.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="summer-courses">
              <AccordionTrigger className="text-left">
                Can I participate in Commencement if I finish courses in summer?
              </AccordionTrigger>
              <AccordionContent>
                Yes. You may walk in the term's ceremony once your graduation application is approved for that term.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="when-to-apply">
              <AccordionTrigger className="text-left">
                When should I apply for graduation?
              </AccordionTrigger>
              <AccordionContent>
                Apply during your final term or early during priority registration. Applications are processed only for the submitted term. 
                Delaying may postpone your ceremony participation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cleared-to-graduate">
              <AccordionTrigger className="text-left">
                How do I know if I'm cleared to graduate?
              </AccordionTrigger>
              <AccordionContent>
                Preliminary evaluations are completed before term-end. You'll receive either: 
                Preliminary approval letter (on track to graduate) or Denial letter (if requirements are unmet)
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="honors-gpa">
              <AccordionTrigger className="text-left">
                What GPA is required for honors?
              </AccordionTrigger>
              <AccordionContent>
                Graduating with a 3.5 GPA or higher earns Honors distinction.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="diploma-timeline">
              <AccordionTrigger className="text-left">
                When will I receive my diploma?
              </AccordionTrigger>
              <AccordionContent>
                Diplomas are mailed 6–8 weeks after final grades are posted, assuming no holds or balances remain.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="diploma-ceremony">
              <AccordionTrigger className="text-left">
                Are diplomas handed out at Commencement?
              </AccordionTrigger>
              <AccordionContent>
                No, they are mailed only.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="multiple-degrees">
              <AccordionTrigger className="text-left">
                If I earn multiple degrees, will I get multiple diplomas?
              </AccordionTrigger>
              <AccordionContent>
                Yes, it is one diploma for each degree or certificate earned.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="replacement-diploma">
              <AccordionTrigger className="text-left">
                How can I get a replacement diploma?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Submit a written request (including name, DOB, student ID or SSN, address, phone, degree info), 
                  and include a $15 check or money order. Send it to:</p>
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <Building className="mr-3 h-6 w-6" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>
    </div>
  );
} 