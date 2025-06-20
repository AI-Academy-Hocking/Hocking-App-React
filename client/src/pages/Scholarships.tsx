import { 
  DollarSign, FileText, ExternalLink, Phone, Mail, 
  Calendar, CheckCircle, AlertTriangle, Users, 
  GraduationCap, Building, Clock, ArrowLeft,
  Download, BookOpen, Shield, CreditCard, Briefcase,
  Car, Home, Utensils, Calculator, Receipt, MapPin,
  Award, Music, Star, Globe, UserCheck, Target, RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Scholarships() {
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
        <h1 className="text-3xl font-bold text-primary mb-4">Scholarships</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Hocking College, through its Foundation, awards over 50 scholarships each year to help students lower the cost of college. These scholarships are available on a first-come, first-served basis and support both new and returning students. Awards are based on merit, financial need, program enrollment, and other unique criteria.
        </p>
      </div>

      {/* Scholarship Application Portal */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Award className="mr-3 h-6 w-6" />
            Scholarship Application Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <button
            onClick={() => handleExternalLink('https://foundation.hocking.edu/scholarships')}
            className="flex items-center justify-between p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mb-6"
          >
            <div className="flex items-center">
              <FileText className="mr-3 h-5 w-5" />
              <span className="font-semibold">Start Scholarship Application</span>
            </div>
            <ExternalLink className="h-5 w-5" />
          </button>
        </CardContent>
      </Card>

      {/* How to Apply */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <UserCheck className="mr-3 h-6 w-6" />
            How to Apply
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            To apply, students must:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                <span className="text-green-800 dark:text-green-200">Be enrolled full-time (12+ credit hours) in a degree or certificate program</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                <span className="text-green-800 dark:text-green-200">Complete the FAFSA using Hocking's school code: 007598</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                <span className="text-green-800 dark:text-green-200">Have an active class schedule</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                <span className="text-green-800 dark:text-green-200">Submit the online scholarship application</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <Building className="mr-3 h-6 w-6" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold">Foundation Office</p>
                  <a href="mailto:wellsd34471@hocking.edu" className="text-blue-600 hover:underline">wellsd34471@hocking.edu</a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold">Contact number</p>
                  <a href="tel:740-753-7010" className="text-blue-600 hover:underline">740-753-7010</a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Types of Scholarships */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Award className="mr-3 h-6 w-6" />
            Types of Scholarships
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Foundation Scholarships */}
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Foundation Scholarships:
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Awarded based on financial need, academic merit, or program of study. Examples:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">• David S. Fraedrich (Nursing)</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-200">• Patrick Gangwer Brewing Scholarship</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg md:col-span-2">
                  <p className="text-sm text-orange-800 dark:text-orange-200">• General scholarships for students in arts, health, business, and technology</p>
                </div>
              </div>
            </div>

            {/* Specialty Scholarships */}
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Specialty Scholarships:
              </h4>
              <div className="space-y-3">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-orange-800 dark:text-orange-200">Band & Choir Scholarship</h5>
                    <Badge variant="secondary">Up to $1,000/semester</Badge>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">Requires MUS-1134 enrollment and audition</p>
                  <a href="mailto:parkj1@hocking.edu" className="text-blue-600 hover:underline text-sm">Email: parkj1@hocking.edu</a>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-orange-800 dark:text-orange-200">Presidential Scholar Award</h5>
                    <Badge variant="secondary">GPA ≥ 3.5</Badge>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Community service and full-time enrollment required</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Other Specific Awards</h5>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Veteran/Military Family, Single Mother, Hearing Impaired, and other specific awards</p>
                </div>
              </div>
            </div>

            {/* Border States Scholarship */}
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Border States Scholarship:
              </h4>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200">$1,755/semester</h5>
                  <Badge variant="secondary">IN, KY, MI, PA, WV</Badge>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">Must live in dorm and have a meal plan</p>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/tuition-and-fees')}
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Tuition & Residency Info
                </button>
              </div>
            </div>

            {/* District Scholars Award */}
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                District Scholars Award:
              </h4>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200">$1,000/year</h5>
                  <Badge variant="secondary">Ohio Counties</Badge>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300">For graduates of high schools in surrounding Ohio counties</p>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-2">Renewable with full-time status and Satisfactory Academic Progress (SAP)</p>
              </div>
            </div>

            {/* Choose Ohio First Scholarship */}
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Choose Ohio First Scholarship:
              </h4>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">For Ohio residents in STEM or short-term certificate programs</h5>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/financial-aid')}
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Financial Aid Page (includes COF info)
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deadlines & Award Periods */}
      <Card className="mb-8 border-2 border-red-600">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="flex items-center text-xl text-red-800 dark:text-red-200">
            <Calendar className="mr-3 h-6 w-6" />
            Deadlines & Award Periods
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">New Students</h5>
              <p className="text-sm text-red-700 dark:text-red-300">Priority Deadline: February 1</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">Returning Students</h5>
              <p className="text-sm text-red-700 dark:text-red-300">Priority Deadline: March 31</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">Program-Based</h5>
              <p className="text-sm text-red-700 dark:text-red-300">May 31 or earlier</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200">
              Most awards are given for the upcoming academic year (fall and spring)
            </p>
            <p className="text-red-800 dark:text-red-200 mt-2">
              Note: Some scholarships like band/choir close earlier than others
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Application Requirements */}
      <Card className="mb-8 border-2 border-teal-600">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
            <FileText className="mr-3 h-6 w-6" />
            Application Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300">Basic Requirements:</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">FAFSA submission and Hocking admission</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Full-time course schedule (12+ credits)</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300">Some scholarships require:</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Essay submission</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Audition video or in-person tryout (Band/Choir)</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Proof of residency (e.g. for Border States)</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">GPA standards (e.g. 2.5+ or 3.5+ for Presidential)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renewal & Award Conditions */}
      <Card className="mb-8 border-2 border-indigo-600">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
          <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
            <RotateCcw className="mr-3 h-6 w-6" />
            Renewal & Award Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Many scholarships are renewable if the student maintains:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-1">Full-time enrollment</h5>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-1">Satisfactory Academic Progress (SAP)</h5>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-1">Program participation or GPA requirements</h5>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <p className="text-indigo-800 dark:text-indigo-200">
              Others may require a new application each year
            </p>
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
            <AccordionItem value="how-many">
              <AccordionTrigger className="text-left">
                How many scholarships are available?
              </AccordionTrigger>
              <AccordionContent>
                Over 50 scholarships are awarded each year by the Hocking College Foundation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-eligible">
              <AccordionTrigger className="text-left">
                Who is eligible to apply?
              </AccordionTrigger>
              <AccordionContent>
                Full-time students (12+ credit hours) who complete the FAFSA and have an active schedule.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="deadlines">
              <AccordionTrigger className="text-left">
                What are the deadlines?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  <p>New students: February 1 (priority)</p>
                  <p>Returning students: March 31</p>
                  <p>Program-specific: May 31</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="need-fafsa">
              <AccordionTrigger className="text-left">
                Do I need to complete FAFSA to apply?
              </AccordionTrigger>
              <AccordionContent>
                Yes. FAFSA is a required part of the scholarship eligibility process.
                <button
                  onClick={() => handleExternalLink('https://studentaid.gov/h/apply-for-aid/fafsa')}
                  className="flex items-center text-blue-600 hover:underline mt-2 text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Complete the FAFSA
                </button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="multiple-scholarships">
              <AccordionTrigger className="text-left">
                Can I apply for more than one scholarship?
              </AccordionTrigger>
              <AccordionContent>
                Yes. You will be considered for all eligible scholarships once you complete the application.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="auto-renewal">
              <AccordionTrigger className="text-left">
                Are scholarships automatically renewed?
              </AccordionTrigger>
              <AccordionContent>
                Some are renewable; others require annual reapplication. Always read the specific scholarship criteria.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="border-states">
              <AccordionTrigger className="text-left">
                What does the Border States Scholarship require?
              </AccordionTrigger>
              <AccordionContent>
                You must live in the dorm, have a meal plan, and be from IN, KY, MI, PA, or WV.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="band-audition">
              <AccordionTrigger className="text-left">
                How do I audition for the Band/Choir Scholarship?
              </AccordionTrigger>
              <AccordionContent>
                Enroll in MUS-1134 and submit a 1–2 minute performance to parkj1@hocking.edu
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="help-questions">
              <AccordionTrigger className="text-left">
                Who can help if I have questions?
              </AccordionTrigger>
              <AccordionContent>
                Contact the Foundation Office at wellsd34471@hocking.edu or call 740‑753‑7010.
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
              <h4 className="font-semibold text-gray-900 dark:text-white">Task</h4>
              <div className="space-y-1 text-sm">
                <p>Apply for Scholarships</p>
                <p>Contact Foundation Office</p>
                <p>Band/Choir Auditions</p>
                <p>FAFSA Application</p>
                <p>Hocking Financial Aid Page</p>
                <p>Tuition & Residency Info</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Link</h4>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => handleExternalLink('https://foundation.hocking.edu/scholarships')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  foundation.hocking.edu/scholarships
                </button>
                <a href="mailto:wellsd34471@hocking.edu" className="text-blue-600 hover:underline block text-left">
                  wellsd34471@hocking.edu
                </a>
                <a href="mailto:parkj1@hocking.edu" className="text-blue-600 hover:underline block text-left">
                  parkj1@hocking.edu
                </a>
                <button
                  onClick={() => handleExternalLink('https://studentaid.gov/h/apply-for-aid/fafsa')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  studentaid.gov/h/apply-for-aid/fafsa
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/financial-aid')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  hocking.edu/financial-aid
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.hocking.edu/tuition-and-fees')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  hocking.edu/tuition-and-fees
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 