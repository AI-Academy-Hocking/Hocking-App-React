import { 
  DollarSign, FileText, ExternalLink, Phone, Mail, 
  Calendar, CheckCircle, AlertTriangle, Users, 
  GraduationCap, Building, Clock, ArrowLeft,
  Download, BookOpen, Shield, CreditCard, Briefcase,
  Car, Home, Utensils, Calculator, Receipt, MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Billing() {
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
        <h1 className="text-3xl font-bold text-primary mb-4">Billing</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Hocking College's Cashier's Office handles everything related to student billing, including tuition, meal plans, housing, parking permits, payment plans, refunds, and tax forms (1098-T). Their goal is to make payments clear and manageable, offering transparent pricing and flexible payment options.
        </p>
      </div>

      {/* Cashier's Office Contact */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Building className="mr-3 h-6 w-6" />
            Hocking College Cashier's Office
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:740-753-7029" className="text-blue-600 hover:underline">740-753-7029</a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-700 dark:text-gray-300">Concourse, John Light Hall, Hocking College</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-gray-700 dark:text-gray-300">Monday–Friday, 8:00 AM–5:00 PM</p>
                </div>
              </div>
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/billing')}
                className="flex items-center justify-between p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <ExternalLink className="mr-3 h-5 w-5" />
                  <span className="font-semibold">Billing Contact Page</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All-Inclusive Tuition Pricing */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <Calculator className="mr-3 h-6 w-6" />
            All-Inclusive Tuition Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Transparent pricing: tuition, textbooks, laptops, supplies, uniforms, health and career services are bundled, no hidden fees.
          </p>
          
          <button
            onClick={() => handleExternalLink('https://www.hocking.edu/tuition-fees')}
            className="flex items-center justify-between p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors mb-6"
          >
            <div className="flex items-center">
              <FileText className="mr-3 h-5 w-5" />
              <span className="font-semibold">Tuition & Fees Info</span>
            </div>
            <ExternalLink className="h-5 w-5" />
          </button>

          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Cost breakdown:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">12–16 credit hours:</h5>
              <div className="space-y-1 text-sm">
                <p className="text-green-700 dark:text-green-300">• $2,376/semester in-state</p>
                <p className="text-green-700 dark:text-green-300">• $4,630/semester out-of-state</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">Under 12 hours:</h5>
              <p className="text-sm text-green-700 dark:text-green-300">Pay per credit hour (e.g., $594 for 3 credits)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Plan & Residence Payments */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Home className="mr-3 h-6 w-6" />
            Meal Plan & Residence Payments
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Meal plans are loaded to the HawkCard and are required for residential students.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/housing-meal-plans')}
              className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Utensils className="mr-3 h-5 w-5" />
                <span className="font-semibold">Housing & Meal Plan Info</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/housing')}
              className="flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Home className="mr-3 h-5 w-5" />
                <span className="font-semibold">Hocking College Housing</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="text-orange-800 dark:text-orange-200 font-medium">
              Housing and meal plan fees are not included in tuition and must be paid separately.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Parking Permits */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Car className="mr-3 h-6 w-6" />
            Parking Permits
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <div className="flex items-center">
                  <Car className="mr-3 h-5 w-5 text-purple-600" />
                  <span className="font-medium">Regular permit:</span>
                </div>
                <span className="font-bold text-purple-600">$53/year</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <div className="flex items-center">
                  <Car className="mr-3 h-5 w-5 text-purple-600" />
                  <span className="font-medium">Reserved permit:</span>
                </div>
                <span className="font-bold text-purple-600">$150/year</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                Students must complete the vehicle registration form.
              </p>
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/parking-permits')}
                className="flex items-center justify-between p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors w-full"
              >
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  <span className="font-semibold">Order a Parking Permit</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Options */}
      <Card className="mb-8 border-2 border-teal-600">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
            <CreditCard className="mr-3 h-6 w-6" />
            Payment Methods & Options
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cash/Check */}
            <div className="space-y-3">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Cash/Check
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Pay in person at the Cashier's Office or by mail (include your Student ID number).
              </p>
            </div>

            {/* Credit Card */}
            <div className="space-y-3">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Credit Card
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Pay online through Self-Service; $5 convenience fee applies per transaction.
              </p>
              <button
                onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Pay via Self-Service
              </button>
            </div>

            {/* Payment Plan */}
            <div className="space-y-3">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Payment Plan
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Set up an interest-free plan (up to $1,600) for a $30 enrollment fee.
              </p>
              <button
                onClick={() => handleExternalLink('https://www.hocking.edu/payment-plans')}
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Payment Plan Details
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refunds & Withdrawals */}
      <Card className="mb-8 border-2 border-red-600">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="flex items-center text-xl text-red-800 dark:text-red-200">
            <AlertTriangle className="mr-3 h-6 w-6" />
            Refunds & Withdrawals
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 mb-4">
            <p className="text-red-800 dark:text-red-200 font-medium">
              Refunds are available only before the first class meeting. After that, no refund is issued.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => handleExternalLink('https://www.hocking.edu/refund-policy')}
              className="flex items-center justify-between p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <FileText className="mr-3 h-5 w-5" />
                <span className="font-semibold">Refund Policy</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => handleExternalLink('https://bankmobiledisbursements.com/refundchoices/')}
              className="flex items-center justify-between p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <CreditCard className="mr-3 h-5 w-5" />
                <span className="font-semibold">BankMobile Refund Info</span>
              </div>
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 1098-T Tax Forms */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <Receipt className="mr-3 h-6 w-6" />
            1098-T Tax Forms
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Available electronically starting January 31 each year through Self-Service.
          </p>
          
          <button
            onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
            className="flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors mb-4"
          >
            <div className="flex items-center">
              <FileText className="mr-3 h-5 w-5" />
              <span className="font-semibold">Access 1098‑T via Self-Service</span>
            </div>
            <ExternalLink className="h-5 w-5" />
          </button>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <p className="text-indigo-800 dark:text-indigo-200">
              Go to the Tax Information section to download or consent.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-8 border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <BookOpen className="mr-3 h-6 w-6" />
            Comprehensive Student FAQ
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="all-inclusive">
              <AccordionTrigger className="text-left">
                What costs are covered under Hocking's all-inclusive fee?
              </AccordionTrigger>
              <AccordionContent>
                Tuition, course fees, textbooks, supplies, uniforms, health & career services.
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/tuition-fees')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Details Here
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="not-included">
              <AccordionTrigger className="text-left">
                What costs are not included?
              </AccordionTrigger>
              <AccordionContent>
                Housing, meal plans, parking permits, late fees, special programs.
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/housing-meal-plans')}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Housing & Meal Plan Info
                  </button>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/parking-permits')}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Parking Permits Info
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refund-drop">
              <AccordionTrigger className="text-left">
                When do I get a refund if I drop a class?
              </AccordionTrigger>
              <AccordionContent>
                You receive a 100% refund only if dropped before the first scheduled class.
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/refund-policy')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Refund Policy
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-pay">
              <AccordionTrigger className="text-left">
                How can I pay my bill?
              </AccordionTrigger>
              <AccordionContent>
                You may pay with cash, check, or online via Self-Service.
                <button
                  onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Pay with Credit Card via Self-Service
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="more-time">
              <AccordionTrigger className="text-left">
                What if I need more time to pay?
              </AccordionTrigger>
              <AccordionContent>
                Set up a payment plan with a $30 enrollment fee.
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/payment-plans')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Enroll in a Payment Plan
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="excess-aid">
              <AccordionTrigger className="text-left">
                Will excess financial aid be refunded?
              </AccordionTrigger>
              <AccordionContent>
                Yes, through BankMobile after tuition and fees are covered.
                <button
                  onClick={() => handleExternalLink('https://bankmobiledisbursements.com/refundchoices/')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  BankMobile Refund Info
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="access-1098t">
              <AccordionTrigger className="text-left">
                How do I access my 1098‑T?
              </AccordionTrigger>
              <AccordionContent>
                Login to Self-Service and go to "Tax Information."
                <button
                  onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Self-Service Login
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="parking-cost">
              <AccordionTrigger className="text-left">
                How much is a parking permit?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Regular: $53/year</p>
                  <p>Reserved: $150/year</p>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/parking-permits')}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Order Parking Permit
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="new-permit">
              <AccordionTrigger className="text-left">
                Do I need a new permit each year?
              </AccordionTrigger>
              <AccordionContent>
                Permits are valid for the entire academic year. Complete the form to register your vehicle.
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
                <p>Billing Contact Page</p>
                <p>Tuition & Fees Info</p>
                <p>Housing & Meal Plan Info</p>
                <p>Hocking College Housing</p>
                <p>Order a Parking Permit</p>
                <p>Pay via Self-Service</p>
                <p>Payment Plan Details</p>
                <p>Refund Policy</p>
                <p>BankMobile Refund Info</p>
                <p>Access 1098‑T via Self-Service</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Direct Link</h4>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/billing')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/billing
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/tuition-fees')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/tuition-fees
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/housing-meal-plans')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/housing-meal-plans
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/housing')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/housing
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/parking-permits')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/parking-permits
                </button>
                <button
                  onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://selfserve.hocking.edu/SelfService/Home.aspx
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/payment-plans')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/payment-plans
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/refund-policy')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://www.hocking.edu/refund-policy
                </button>
                <button
                  onClick={() => handleExternalLink('https://bankmobiledisbursements.com/refundchoices/')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://bankmobiledisbursements.com/refundchoices/
                </button>
                <button
                  onClick={() => handleExternalLink('https://selfserve.hocking.edu/SelfService/Home.aspx')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  https://selfserve.hocking.edu/SelfService/Home.aspx
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 