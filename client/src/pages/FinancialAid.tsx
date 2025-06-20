import { 
  DollarSign, FileText, ExternalLink, Phone, Mail, 
  Calendar, CheckCircle, AlertTriangle, Users, 
  GraduationCap, Building, Clock, ArrowLeft,
  Download, BookOpen, Shield, CreditCard, Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function FinancialAid() {
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
        <h1 className="text-3xl font-bold text-primary mb-4">Financial Aid</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Financial Aid at Hocking College helps students reduce the cost of their education by offering a range of support options including grants, scholarships, loans, and work-study programs. Most students qualify for some form of aid, and Hocking's Financial Aid Office is committed to helping students and their families understand the process, apply for assistance, and stay informed throughout their academic journey.
        </p>
      </div>

      {/* Apply for Financial Aid Section */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <FileText className="mr-3 h-6 w-6" />
            Apply for Financial Aid (FAFSA)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            To begin the financial aid process, students must complete the Free Application for Federal Student Aid (FAFSA):
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleExternalLink('https://studentaid.gov/h/apply-for-aid/fafsa')}
              className="flex items-center justify-between p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <CheckCircle className="mr-3 h-5 w-5" />
                <span className="font-semibold">Complete the FAFSA Now</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center mb-2">
                <Building className="mr-2 h-5 w-5 text-blue-600" />
                <span className="font-semibold">Hocking College School Code:</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">007598</span>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Parents can assist by creating an FSA ID:
            </h4>
            <button
              onClick={() => handleExternalLink('https://studentaid.gov/fsa-id/create-account/launch')}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Create a Parent FSA ID
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Track Your Financial Aid Status */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <CheckCircle className="mr-3 h-6 w-6" />
            Track Your Financial Aid Status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            After submitting the FAFSA, students can log in to Hocking's portal to check on required documents and status:
          </p>
          
          <button
            onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
            className="flex items-center justify-between p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors mb-4"
          >
            <div className="flex items-center">
              <Shield className="mr-3 h-5 w-5" />
              <span className="font-semibold">Log in to Financial Aid Self-Service Portal</span>
            </div>
            <ExternalLink className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">Green = Complete</span>
            </div>
            <div className="flex items-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <AlertTriangle className="mr-3 h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800 dark:text-yellow-200">Yellow = Action required</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download & Submit Forms */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Download className="mr-3 h-6 w-6" />
            Download & Submit Financial Aid Forms
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            If selected for verification or needing to file appeals, students can access and upload forms here:
          </p>
          
          <button
            onClick={() => handleExternalLink('https://www.hocking.edu/forms')}
            className="flex items-center justify-between p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors mb-6"
          >
            <div className="flex items-center">
              <FileText className="mr-3 h-5 w-5" />
              <span className="font-semibold">Hocking College Financial Aid Forms</span>
            </div>
            <ExternalLink className="h-5 w-5" />
          </button>

          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Commonly used forms include:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Dependency Override Request',
              'Special Circumstance Appeal',
              'Summer Enrollment Aid Request',
              'PLUS Loan Adjustment',
              'SAP Appeal',
              'Verification Worksheets (Independent/Dependent)'
            ].map((form, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <FileText className="mr-3 h-4 w-4 text-gray-600" />
                <span className="text-gray-700 dark:text-gray-300">{form}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Types of Financial Aid */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <DollarSign className="mr-3 h-6 w-6" />
            Types of Financial Aid Available
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Grants */}
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Grants:
              </h4>
              <div className="space-y-2 pl-6">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">Federal</Badge>
                  <span className="text-sm">Federal Pell Grant (up to ~$7,395 per year)</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">State</Badge>
                  <span className="text-sm">FSEOG, Ohio College Opportunity Grant, Choose Ohio First, and more</span>
                </div>
              </div>
            </div>

            {/* Loans */}
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Loans:
              </h4>
              <div className="space-y-2 pl-6">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">Subsidized</Badge>
                  <span className="text-sm">Interest-free while enrolled</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">Unsubsidized</Badge>
                  <span className="text-sm">Interest accrues immediately</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">PLUS</Badge>
                  <span className="text-sm">Parent PLUS Loans (credit-based)</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">Private</Badge>
                  <span className="text-sm">Private Loans (e.g., Sallie Mae)</span>
                </div>
              </div>
            </div>

            {/* Work-Study */}
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Work-Study & Employment:
              </h4>
              <div className="space-y-2 pl-6">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">Federal</Badge>
                  <span className="text-sm">Federal Work-Study Program</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">College</Badge>
                  <span className="text-sm">Hocking College Work Scholarship (up to $1,200)</span>
                </div>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/studentjobs')}
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Student Job Listings
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disbursement & Refund Information */}
      <Card className="mb-8 border-2 border-teal-600">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
            <Calendar className="mr-3 h-6 w-6" />
            Disbursement & Refund Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            After aid is applied to tuition, fees, and housing, any remaining funds are refunded to the student:
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Typical Disbursement Dates (Spring Example):</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-sm">First: February 17–22</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-sm">Second: April 21</span>
              </div>
            </div>
          </div>

          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Refunds are issued through BankMobile Disbursements.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => handleExternalLink('https://bankmobiledisbursements.com/refundchoices/')}
              className="flex items-center justify-between p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <CreditCard className="mr-3 h-5 w-5" />
                <span className="font-semibold">BankMobile Refund Info</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/financial-aid-refund-policy')}
              className="flex items-center justify-between p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <FileText className="mr-3 h-5 w-5" />
                <span className="font-semibold">Hocking College Refund Policy</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Special Conditions & Appeals */}
      <Card className="mb-8 border-2 border-red-600">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="flex items-center text-xl text-red-800 dark:text-red-200">
            <AlertTriangle className="mr-3 h-6 w-6" />
            Special Conditions & Appeals
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Students facing challenges or special financial situations may be eligible for additional help:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">Special Circumstance Appeals</h5>
              <p className="text-sm text-red-700 dark:text-red-300">(e.g., change in family income)</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">Dependency Override</h5>
              <p className="text-sm text-red-700 dark:text-red-300">(for students unable to provide parent info)</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h5 className="font-semibold text-red-800 dark:text-red-200 mb-1">Satisfactory Academic Progress (SAP) Appeal</h5>
              <p className="text-sm text-red-700 dark:text-red-300">(for academic standing issues)</p>
            </div>
          </div>

          <button
            onClick={() => handleExternalLink('https://www.hocking.edu/forms')}
            className="flex items-center justify-between p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <Download className="mr-3 h-5 w-5" />
              <span className="font-semibold">Download All Appeal & Verification Forms</span>
            </div>
            <ExternalLink className="h-5 w-5" />
          </button>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <Phone className="mr-3 h-6 w-6" />
            Contact Financial Aid for Help
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            If students or parents need personalized assistance, they can contact the appropriate advisor based on last name:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-indigo-100 dark:bg-indigo-900/30">
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Advisor</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Last Names</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Email</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Debra Canter</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">A–L</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="mailto:canterd@hocking.edu" className="text-blue-600 hover:underline">canterd@hocking.edu</a>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="tel:740-753-7060" className="text-blue-600 hover:underline">740-753-7060</a>
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Mary Russell</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">M–Z</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="mailto:russellm@hocking.edu" className="text-blue-600 hover:underline">russellm@hocking.edu</a>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="tel:740-753-7182" className="text-blue-600 hover:underline">740-753-7182</a>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">Stephen Powell</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">R–Z</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="mailto:powells@hocking.edu" className="text-blue-600 hover:underline">powells@hocking.edu</a>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">
                    <a href="tel:740-753-7061" className="text-blue-600 hover:underline">740-753-7061</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/financial-aid')}
              className="flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <ExternalLink className="mr-3 h-5 w-5" />
                <span className="font-semibold">Visit the Hocking College Financial Aid Page</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
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
            <AccordionItem value="school-code">
              <AccordionTrigger className="text-left">
                What is Hocking College's school code for the FAFSA?
              </AccordionTrigger>
              <AccordionContent>
                Hocking College's school code is <strong>007598</strong>. You'll need this when completing the FAFSA application.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-apply">
              <AccordionTrigger className="text-left">
                How do I apply for financial aid?
              </AccordionTrigger>
              <AccordionContent>
                Complete the Free Application for Federal Student Aid (FAFSA) at studentaid.gov. Make sure to include Hocking College's school code.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="yearly-fafsa">
              <AccordionTrigger className="text-left">
                Do I need to complete the FAFSA every year?
              </AccordionTrigger>
              <AccordionContent>
                Yes. You must submit a new FAFSA for each academic year to remain eligible for aid.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="documents">
              <AccordionTrigger className="text-left">
                How will I know if I need to submit more documents?
              </AccordionTrigger>
              <AccordionContent>
                Log in to the Financial Aid Self-Service Portal. Yellow highlighted items require your attention or documents; green items are complete.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="forms">
              <AccordionTrigger className="text-left">
                Where can I find and submit required financial aid forms?
              </AccordionTrigger>
              <AccordionContent>
                All required forms are available on Hocking's website. You can access them through the Financial Aid Forms link above.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="types-of-aid">
              <AccordionTrigger className="text-left">
                What types of financial aid are available?
              </AccordionTrigger>
              <AccordionContent>
                Hocking offers: Federal & State Grants (Pell, SEOG, OCOG, etc.), Subsidized & Unsubsidized Loans, Parent PLUS Loans, Work-Study Programs, and Scholarships and Work Scholarships.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disbursement">
              <AccordionTrigger className="text-left">
                When is financial aid disbursed?
              </AccordionTrigger>
              <AccordionContent>
                Aid is disbursed in two parts per semester. Disbursement begins 30 days after classes start. You can view exact dates in the portal or refund policy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refunds">
              <AccordionTrigger className="text-left">
                How will I receive my financial aid refund?
              </AccordionTrigger>
              <AccordionContent>
                Refunds are distributed through BankMobile. You can set up your refund preferences through their portal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="special-circumstances">
              <AccordionTrigger className="text-left">
                What if my family's financial situation has changed?
              </AccordionTrigger>
              <AccordionContent>
                You may qualify for a Special Circumstance Appeal. Submit the appropriate form found in the Financial Aid Forms section above.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="academic-requirements">
              <AccordionTrigger className="text-left">
                What happens if I don't meet the academic requirements?
              </AccordionTrigger>
              <AccordionContent>
                If you fall below Satisfactory Academic Progress (SAP) standards, you may lose aid eligibility but can appeal. Visit the forms page to submit an SAP Appeal.
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
          </Accordion>
        </CardContent>
      </Card>

      {/* Link Summary */}
      <Card className="border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <ExternalLink className="mr-3 h-6 w-6" />
            Link Summary (Tap to Open)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Purpose</h4>
              <div className="space-y-1 text-sm">
                <p>FAFSA Application</p>
                <p>Create Parent FSA ID</p>
                <p>Financial Aid Portal (Self-Service)</p>
                <p>Financial Aid Forms</p>
                <p>BankMobile Refund Info</p>
                <p>Hocking Refund Policy</p>
                <p>Student Job Listings</p>
                <p>Hocking Financial Aid Homepage</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Direct Link</h4>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => handleExternalLink('https://studentaid.gov/h/apply-for-aid/fafsa')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://studentaid.gov/h/apply-for-aid/fafsa
                </button>
                <button
                  onClick={() => handleExternalLink('https://studentaid.gov/fsa-id/create-account/launch')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://studentaid.gov/fsa-id/create-account/launch
                </button>
                <button
                  onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://selfserve.hocking.edu/SelfService/Home.aspx
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/forms')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/forms
                </button>
                <button
                  onClick={() => handleExternalLink('https://bankmobiledisbursements.com/refundchoices/')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://bankmobiledisbursements.com/refundchoices/
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/financial-aid-refund-policy')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/financial-aid-refund-policy
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/studentjobs')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/studentjobs
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/financial-aid')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/financial-aid
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 