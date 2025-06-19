import { ArrowLeft, GraduationCap, Phone, Mail, Clock, FileText, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Graduation() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <GraduationCap className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Graduation</h1>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Welcome to Your Graduation Hub</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Hocking College welcomes you to your Graduation Hub and congratulates you on completing your degree! 
            This is your all-in-one resource to understand the steps, events, and expectations for graduating from Hocking College.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">How to Apply for Graduation</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Students must apply for graduation through Self-Service.
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Applications are free and required even if you don't plan to attend the ceremony</li>
                  <li>• Apply once you are close to completing your degree or certificate</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Final graduation approval depends on:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Completion of all program requirements</li>
                  <li>• Submission of official transcripts (if applicable)</li>
                  <li>• Clearing of any holds or incomplete grades</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Graduation Pre-Party</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Before each graduation ceremony, Hocking College hosts a Graduation Pre-Party for graduates. At this event, students can:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Pick up their cap and gown (if eligible)</li>
              <li>• Take professional or fun photos</li>
              <li>• Enjoy free food, beverages, games, and music</li>
              <li>• Get final assistance from the Registrar's Office, Financial Aid, and Career Services</li>
            </ul>
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Details such as time and location are provided each term on the graduation webpage.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Cap & Gown Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• All graduates receive a standard black gown and a blue and gold tassel</li>
                <li>• Some programs or organizations may offer additional stoles or cords (e.g., Phi Theta Kappa)</li>
                <li>• Gowns must be ordered by a deadline each term via an external vendor, at no additional cost</li>
                <li>• Pick-up typically happens at the Pre-Party or via the Career & University Center if missed</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Graduation Practice</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• All students participating in the ceremony are required to attend a Graduation Practice session</li>
                <li>• This is to ensure smooth logistics for the ceremony</li>
                <li>• Information about time, place, and expectations is posted on the graduation website each term</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">The Graduation Ceremony</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• The formal Commencement Ceremony is held at the end of each academic term</li>
              <li>• Family and friends are welcome to attend</li>
              <li>• The ceremony includes speeches, graduate recognition, and live or recorded streaming</li>
              <li>• Exact dates, times, and seating arrangements are updated every term on the Hocking College website</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Diplomas</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Diplomas are not handed out during the ceremony</li>
              <li>• They are mailed out approximately 6–8 weeks after final grades are posted, assuming all accounts are clear</li>
              <li>• Replacement diplomas are available upon request with a processing fee</li>
              <li>• Students earning multiple credentials will receive a diploma for each one</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Graduation Requirements & Ceremony FAQ</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">What do I need to graduate this term?</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Complete all required coursework with final grades posted</li>
                  <li>• Submit any official transfer or external transcripts</li>
                  <li>• Apply through Self‑Service, application is free</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What if I don't meet the requirements by the end of the term?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Applications submitted prematurely or with outstanding requirements will be denied. 
                  A denial letter is sent, and you'll need to reapply for the next eligible term.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What if I receive an incomplete ("I" grade) during my final term?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Incomplete grades must be resolved before graduation. Once completed, you'll need to reapply for the current term.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Can I participate in Commencement if I finish courses in summer?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes. You may walk in the term's ceremony once your graduation application is approved for that term.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">When should I apply for graduation?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Apply during your final term or early during priority registration. Applications are processed only for the submitted term. 
                  Delaying may postpone your ceremony participation.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">How do I know if I'm cleared to graduate?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Preliminary evaluations are completed before term-end. You'll receive either: 
                  Preliminary approval letter (on track to graduate) or Denial letter (if requirements are unmet)
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What GPA is required for honors?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Graduating with a 3.5 GPA or higher earns Honors distinction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Diploma FAQs</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">When will I receive my diploma?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Diplomas are mailed 6–8 weeks after final grades are posted, assuming no holds or balances remain.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Are diplomas handed out at Commencement?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  No, they are mailed only.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">If I earn multiple degrees, will I get multiple diplomas?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, it is one diploma for each degree or certificate earned.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">How can I get a replacement diploma?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Submit a written request (including name, DOB, student ID or SSN, address, phone, degree info), 
                  and include a $15 check or money order. Send it to:
                </p>
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    Registrar's Office – Diploma Requests<br />
                    3301 Hocking Parkway<br />
                    Nelsonville, OH 45764
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Registrar's Office – Graduation Inquiries:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a href="tel:740-753-7042" className="hover:text-blue-600">
                    740‑753‑7042
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Fax: 740‑753‑7065</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a href="mailto:registrar@hocking.edu" className="hover:text-blue-600">
                    registrar@hocking.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Office hours: Mon–Fri, 8 AM–5 PM</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Records & Graduation Applications:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Primary Contact: Karen Graves</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a href="mailto:gravesk@hocking.edu" className="hover:text-blue-600">
                    gravesk@hocking.edu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 