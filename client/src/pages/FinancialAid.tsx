import { 
  DollarSign, FileText, ExternalLink, Phone, 
  Building, Clock, ArrowLeft,
  Download, Shield, CreditCard, Briefcase,
  MapPin, CheckCircle, AlertTriangle, Users
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function FinancialAid() {
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
          <DollarSign className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Financial Aid</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Financial Aid at Hocking College helps students reduce the cost of their education by offering a range of support options including grants, scholarships, loans, and work-study programs. Most students qualify for some form of aid, and Hocking's Financial Aid Office is committed to helping students and their families understand the process, apply for assistance, and stay informed throughout their academic journey.
        </p>
      </div>

      {/* Main Content with Accordion */}
      <Accordion type="single" collapsible className="space-y-6">

      {/* Apply for Financial Aid Section */}
        <AccordionItem value="apply" className="border-2 border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-6 py-4">
            <div className="flex items-center">
              <FileText className="mr-3 h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-blue-800 dark:text-blue-200">Apply for Financial Aid (FAFSA)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
            To begin the financial aid process, students must complete the Free Application for Federal Student Aid (FAFSA):
          </p>
          
              {/* Important Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center text-lg">
                  <Users className="mr-3 h-5 w-5" />
              Important: Create FSA IDs First
            </h4>
                <p className="text-blue-700 dark:text-blue-300">
              Before completing the FAFSA, both you and your parent(s) should create your FSA IDs. 
              After creating the FSA IDs, wait 3-4 business days for them to be fully activated before 
              completing the FAFSA application.
            </p>
          </div>
          
              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleExternalLink('https://studentaid.gov/h/apply-for-aid/fafsa')}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center">
                    <CheckCircle className="mr-4 h-6 w-6" />
                    <div className="text-left">
                      <span className="font-bold text-lg block">Complete the FAFSA Now</span>
                      <span className="text-green-100 text-sm">Start your application</span>
                    </div>
              </div>
                  <ExternalLink className="h-6 w-6" />
            </button>
            
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center mb-3">
                    <Building className="mr-3 h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Hocking College School Code:</span>
              </div>
                  <span className="text-4xl font-bold text-blue-600">007598</span>
            </div>
          </div>

              {/* Parent FSA ID */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                  <Users className="mr-3 h-5 w-5" />
              Parents can assist by creating an FSA ID:
            </h4>
            <button
              onClick={() => handleExternalLink('https://studentaid.gov/fsa-id/create-account/launch')}
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Create a Parent FSA ID
            </button>
          </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      {/* Track Your Financial Aid Status */}
        <AccordionItem value="track" className="border-2 border-green-200 dark:border-green-800 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 px-6 py-4">
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-green-800 dark:text-green-200">Track Your Financial Aid Status</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
            After submitting the FAFSA, students can log in to Hocking's portal to check on required documents and status:
          </p>
          
          <button
            onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg w-full"
          >
            <div className="flex items-center">
                  <Shield className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <span className="font-bold text-lg block">Log in to Financial Aid Self-Service Portal</span>
                    <span className="text-green-100 text-sm">Check your status and requirements</span>
                  </div>
            </div>
                <ExternalLink className="h-6 w-6" />
          </button>

              {/* Status Indicators */}
          <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-green-100 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                  <CheckCircle className="mr-4 h-6 w-6 text-green-600" />
                  <div>
                    <span className="font-semibold text-green-800 dark:text-green-200 block">Green = Complete</span>
                    <span className="text-green-700 dark:text-green-300 text-sm">All requirements met</span>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <AlertTriangle className="mr-4 h-6 w-6 text-yellow-600" />
                  <div>
                    <span className="font-semibold text-yellow-800 dark:text-yellow-200 block">Yellow = Action required</span>
                    <span className="text-yellow-700 dark:text-yellow-300 text-sm">Additional documents needed</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Download & Submit Forms */}
        <AccordionItem value="forms" className="border-2 border-purple-200 dark:border-purple-800 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 px-6 py-4">
            <div className="flex items-center">
              <Download className="mr-3 h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-800 dark:text-purple-200">Download & Submit Financial Aid Forms</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
            If selected for verification or needing to file appeals, students can access and upload forms here:
          </p>
          
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5" />
              Important: Check Self-Service First
            </h4>
                <p className="text-purple-700 dark:text-purple-300">
              Complete the forms that are identified/required in Self-Service. Log in to the Financial Aid 
              Self-Service Portal to see which specific forms you need to submit.
            </p>
          </div>
          
          <button
            onClick={() => handleExternalLink('https://www.hocking.edu/forms')}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg w-full"
          >
            <div className="flex items-center">
                  <FileText className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <span className="font-bold text-lg block">Hocking College Financial Aid Forms</span>
                    <span className="text-purple-100 text-sm">Access all required forms</span>
                  </div>
            </div>
                <ExternalLink className="h-6 w-6" />
          </button>

              <div>
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg">Commonly used forms include:</h4>
                <div className="grid md:grid-cols-2 gap-4">
            {[
              'Dependency Override Request',
              'Special Circumstance Appeal',
              'Summer Enrollment Aid Request',
              'PLUS Loan Adjustment',
              'SAP Appeal',
              'Verification Worksheets (Independent/Dependent)'
            ].map((form, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FileText className="mr-3 h-5 w-5 text-gray-600" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{form}</span>
              </div>
            ))}
          </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      {/* Types of Financial Aid */}
        <AccordionItem value="types" className="border-2 border-orange-200 dark:border-orange-800 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 px-6 py-4">
            <div className="flex items-center">
              <DollarSign className="mr-3 h-6 w-6 text-orange-600" />
              <span className="text-xl font-semibold text-orange-800 dark:text-orange-200">Types of Financial Aid Available</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-3 gap-8">
            {/* Grants */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-700 dark:text-green-300 text-lg">Grants</h4>
                </div>
                <div className="space-y-3 pl-16">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center mb-2">
                      <Badge variant="secondary" className="mr-2">Federal</Badge>
                    </div>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">Federal Pell Grant</span>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center mb-2">
                  <Badge variant="secondary" className="mr-2">State</Badge>
                    </div>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">FSEOG, Ohio College Opportunity Grant, Choose Ohio First, and more</span>
                </div>
              </div>
            </div>

            {/* Loans */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-blue-700 dark:text-blue-300 text-lg">Loans</h4>
                </div>
                <div className="space-y-3 pl-16">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="mr-2">Subsidized</Badge>
                    </div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Interest-free while enrolled</span>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">Unsubsidized</Badge>
                    </div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Interest accrues immediately</span>
                </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">PLUS</Badge>
                    </div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Parent PLUS Loans (credit-based)</span>
                </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">Private</Badge>
                    </div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Private Loans (e.g., Sallie Mae)</span>
                </div>
              </div>
            </div>

            {/* Work-Study */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                  <h4 className="font-bold text-purple-700 dark:text-purple-300 text-lg">Work-Study & Employment</h4>
                </div>
                <div className="space-y-3 pl-16">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center mb-2">
                      <Badge variant="secondary" className="mr-2">Federal</Badge>
              </div>
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Federal Work-Study Program</span>
            </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center mb-2">
                      <Badge variant="secondary" className="mr-2">Campus</Badge>
          </div>
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Campus employment opportunities</span>
            </div>
          </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Information */}
        <AccordionItem value="contact" className="border-2 border-teal-200 dark:border-teal-800 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30 px-6 py-4">
            <div className="flex items-center">
              <Building className="mr-3 h-6 w-6 text-teal-600" />
              <span className="text-xl font-semibold text-teal-800 dark:text-teal-200">Contact Financial Aid Office</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-6 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                  <Phone className="mr-4 h-6 w-6 text-teal-600" />
                  <div>
                    <p className="font-semibold text-teal-800 dark:text-teal-200">Phone</p>
                    <a href="tel:740-753-7058" className="text-teal-600 hover:underline font-medium">740-753-7058</a>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                  <MapPin className="mr-4 h-6 w-6 text-teal-600" />
                  <div>
                    <p className="font-semibold text-teal-800 dark:text-teal-200">Location</p>
                    <p className="text-gray-700 dark:text-gray-300">Concourse, John Light Hall, Hocking College</p>
                  </div>
          </div>
                <div className="flex items-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                  <Clock className="mr-4 h-6 w-6 text-teal-600" />
                  <div>
                    <p className="font-semibold text-teal-800 dark:text-teal-200">Hours</p>
                    <p className="text-gray-700 dark:text-gray-300">Monday–Friday, 8:00 AM–5:00 PM</p>
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