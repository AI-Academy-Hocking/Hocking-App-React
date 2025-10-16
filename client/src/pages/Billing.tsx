import { 
  DollarSign, FileText, ExternalLink, Phone, 
  Building, Clock, ArrowLeft,
  Car, Home, Utensils, Calculator, MapPin, CreditCard, AlertTriangle, Receipt,
  Calendar
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

export default function Billing() {
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
          <DollarSign className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-primary">Billing</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Hocking College's Cashier's Office handles everything related to student billing, including tuition, meal plans, housing, parking permits, payment plans, refunds, and tax forms (1098-T). Their goal is to make payments clear and manageable, offering transparent pricing and flexible payment options.
        </p>
      </div>

      {/* Main Content with Accordion */}
      <Accordion type="single" collapsible className="space-y-6">
        
        {/* Cashier's Office Contact */}
        <AccordionItem value="contact" className="border-2 border-blue-600 dark:border-blue-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-8 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Building className="mr-3 h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hocking College Cashier's Office</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                  <Phone className="mr-4 h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Phone</p>
                    <a href="tel:740-753-7029" className="text-blue-600 hover:underline font-medium">740-753-7029</a>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                  <MapPin className="mr-4 h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Location</p>
                    <p className="text-gray-700 dark:text-gray-300">Concourse, John Light Hall, Hocking College</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                  <Clock className="mr-4 h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Hours</p>
                    <p className="text-gray-700 dark:text-gray-300">Monday–Friday, 8:00 AM–5:00 PM</p>
                  </div>
                </div>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/billing')}
                  className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-xl shadow-lg w-full"
                >
                  <div className="flex items-center">
                    <ExternalLink className="mr-3 h-5 w-5" />
                    <span className="font-semibold">Billing Contact Page</span>
                  </div>
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* All-Inclusive Tuition Pricing */}
        <AccordionItem value="tuition" className="border-2 border-green-600 dark:border-green-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-8 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Calculator className="mr-3 h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-green-600 dark:text-green-400">All-Inclusive Tuition Pricing</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Transparent pricing: tuition, textbooks, laptops, supplies, uniforms, health and career services are bundled, no hidden fees.
              </p>
              
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/tuition-fees')}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg w-full"
              >
                <div className="flex items-center">
                  <FileText className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <span className="font-bold text-lg block">Tuition & Fees Info</span>
                    <span className="text-green-100 text-sm">View detailed pricing breakdown</span>
                  </div>
                </div>
                <ExternalLink className="h-6 w-6" />
              </button>

              <div>
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg">Cost breakdown:</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                    <h5 className="font-semibold text-green-600 dark:text-green-400 mb-3 text-lg">12–16 credit hours:</h5>
                    <div className="space-y-2">
                      <p className="text-gray-700 dark:text-gray-300 font-medium">• $2,376/semester in-state</p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">• $4,630/semester out-of-state</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                    <h5 className="font-semibold text-green-600 dark:text-green-400 mb-3 text-lg">Under 12 hours:</h5>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Pay per credit hour (e.g., $594 for 3 credits)</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Meal Plan & Residence Payments */}
        <AccordionItem value="housing" className="border-2 border-orange-600 dark:border-orange-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-8 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Home className="mr-3 h-6 w-6 text-orange-600" />
              <span className="text-xl font-semibold text-orange-600 dark:text-orange-400">Meal Plan & Residence Payments</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Meal plans are loaded to the HawkCard and are required for residential students.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/housing-meal-plans')}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl shadow-lg"
                >
                  <div className="flex items-center">
                    <Utensils className="mr-4 h-6 w-6" />
                    <div className="text-left">
                      <span className="font-bold text-lg block">Housing & Meal Plan Info</span>
                      <span className="text-orange-100 text-sm">View options and pricing</span>
                    </div>
                  </div>
                  <ExternalLink className="h-6 w-6" />
                </button>
                
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/housing')}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl shadow-lg"
                >
                  <div className="flex items-center">
                    <Home className="mr-4 h-6 w-6" />
                    <div className="text-left">
                      <span className="font-bold text-lg block">Hocking College Housing</span>
                      <span className="text-orange-100 text-sm">Residence hall information</span>
                    </div>
                  </div>
                  <ExternalLink className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                <p className="text-orange-800 dark:text-orange-200 font-medium text-lg">
                  Housing and meal plan fees are not included in tuition and must be paid separately.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Parking Permits */}
        <AccordionItem value="parking" className="border-2 border-purple-600 dark:border-purple-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-8 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Car className="mr-3 h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">Parking Permits</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                  <div className="flex items-center">
                    <Car className="mr-3 h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800 dark:text-purple-200">Regular permit:</span>
                  </div>
                  <span className="font-bold text-purple-600 text-xl">$53/year</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                  <div className="flex items-center">
                    <Car className="mr-3 h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800 dark:text-purple-200">Reserved permit:</span>
                  </div>
                  <span className="font-bold text-purple-600 text-xl">$150/year</span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Students must complete the vehicle registration form.
                </p>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/parking-permits')}
                  className="flex items-center justify-between p-4 bg-purple-600 text-white rounded-xl shadow-lg w-full"
                >
                  <div className="flex items-center">
                    <FileText className="mr-3 h-5 w-5" />
                    <span className="font-semibold">Order a Parking Permit</span>
                  </div>
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Payment Methods & Options */}
        <AccordionItem value="payment" className="border-2 border-teal-600 dark:border-teal-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-8 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <CreditCard className="mr-3 h-6 w-6 text-teal-600" />
              <span className="text-xl font-semibold text-teal-600 dark:text-teal-400">Payment Methods & Options</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cash/Check */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-teal-700 dark:text-teal-300 text-lg">Cash/Check</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Pay in person at the Cashier's Office or by mail (include your Student ID number).
                </p>
              </div>

              {/* Credit Card */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <CreditCard className="h-6 w-6 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-teal-700 dark:text-teal-300 text-lg">Credit Card</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Pay online through Self-Service; $5 convenience fee applies per transaction.
                </p>
                <button
                  onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Pay via Self-Service
                </button>
              </div>

              {/* Payment Plans */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <Calculator className="h-6 w-6 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-teal-700 dark:text-teal-300 text-lg">Payment Plans</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Flexible payment plans available through Nelnet Business Solutions.
                </p>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/payment-plans')}
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Set up Payment Plan
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Refunds & Tax Forms */}
        <AccordionItem value="refunds" className="border-2 border-indigo-600 dark:border-indigo-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-8 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Receipt className="mr-3 h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Refunds & Tax Forms</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                After tuition and fees are paid, any remaining financial aid is refunded to students. Tax forms are available for tax filing.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleExternalLink('https://bankmobiledisbursements.com/refundchoices/')}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl shadow-lg"
                >
                  <div className="flex items-center">
                    <CreditCard className="mr-4 h-6 w-6" />
                    <div className="text-left">
                      <span className="font-bold text-lg block">BankMobile Refund Info</span>
                      <span className="text-indigo-100 text-sm">Set up refund preferences</span>
                    </div>
                  </div>
                  <ExternalLink className="h-6 w-6" />
                </button>
                
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/tax-forms')}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl shadow-lg"
                >
                  <div className="flex items-center">
                    <FileText className="mr-4 h-6 w-6" />
                    <div className="text-left">
                      <span className="font-bold text-lg block">Tax Forms (1098-T)</span>
                      <span className="text-indigo-100 text-sm">Access tax documents</span>
                    </div>
                  </div>
                  <ExternalLink className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-indigo-600 dark:border-indigo-400">
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3 flex items-center">
                  <AlertTriangle className="mr-3 h-5 w-5" />
                  Important Refund Information
                </h4>
                <p className="text-indigo-700 dark:text-indigo-300">
                  Refunds are processed through BankMobile Disbursements. Students must set up their refund preferences 
                  through the BankMobile portal to receive their refunds.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Important Dates & Deadlines */}
        <AccordionItem value="deadlines" className="border-2 border-red-600 dark:border-red-400 rounded-2xl overflow-hidden">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-8 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Clock className="mr-3 h-6 w-6 text-red-600" />
              <span className="text-xl font-semibold text-red-600 dark:text-red-400">Important Dates & Deadlines</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-red-600 dark:border-red-400">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center">
                    <Calendar className="mr-3 h-5 w-5" />
                    Payment Deadlines
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 dark:text-red-300">Fall Semester:</span>
                      <span className="font-semibold text-red-800 dark:text-red-200">August 1st</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 dark:text-red-300">Spring Semester:</span>
                      <span className="font-semibold text-red-800 dark:text-red-200">January 1st</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 dark:text-red-300">Summer Semester:</span>
                      <span className="font-semibold text-red-800 dark:text-red-200">May 1st</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-red-600 dark:border-red-400">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center">
                    <AlertTriangle className="mr-3 h-5 w-5" />
                    Late Payment Fees
                  </h4>
                  <p className="text-red-700 dark:text-red-300 mb-3">
                    Late payment fees may apply if payment is not received by the deadline.
                  </p>
                  <p className="text-red-700 dark:text-red-300">
                    Contact the Cashier's Office immediately if you need to make payment arrangements.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
} 