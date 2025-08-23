import { 
  Calendar, Mail, Award, ArrowLeft, Building, Phone, ExternalLink,
  FileText, UserCheck, CheckCircle, Star, Target, Globe, MapPin, AlertTriangle, RotateCcw
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

export default function Scholarships() {
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
          <Award className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-primary">Scholarships</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Hocking College, through its Foundation, awards over 50 scholarships each year to help students lower the cost of college. These scholarships are available on a first-come, first-served basis and support both new and returning students. Awards are based on merit, financial need, program enrollment, and other unique criteria.
        </p>
      </div>

      {/* Main Content with Accordion */}
      <Accordion type="single" collapsible className="space-y-6">
        
        {/* Scholarship Application Portal */}
        <AccordionItem value="apply" className="border-2 border-blue-600 dark:border-blue-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Award className="mr-3 h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">Scholarship Application Portal</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Start your scholarship application process through the Hocking College Foundation portal.
              </p>
              
              <button
                onClick={() => handleExternalLink('https://foundation.hocking.edu/scholarships')}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl shadow-lg w-full"
              >
                <div className="flex items-center justify-start w-full">
                  <FileText className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <span className="font-bold text-lg block">Start Scholarship Application</span>
                    <span className="text-blue-100 text-sm">Apply for Foundation scholarships</span>
                  </div>
                </div>
                <ExternalLink className="h-6 w-6" />
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* How to Apply */}
        <AccordionItem value="requirements" className="border-2 border-green-600 dark:border-green-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <UserCheck className="mr-3 h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-green-600 dark:text-green-400">How to Apply</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                To apply, students must meet the following requirements:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-green-600" />
                    <span className="text-green-800 dark:text-green-200 font-medium">Be enrolled full-time (12+ credit hours) in a degree or certificate program</span>
                  </div>
                  <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-green-600" />
                    <span className="text-green-800 dark:text-green-200 font-medium">Complete the FAFSA using Hocking's school code: 007598</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-green-600" />
                    <span className="text-green-800 dark:text-green-200 font-medium">Have an active class schedule</span>
                  </div>
                  <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <CheckCircle className="mr-4 h-6 w-6 text-green-600" />
                    <span className="text-green-800 dark:text-green-200 font-medium">Submit the online scholarship application</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Information */}
        <AccordionItem value="contact" className="border-2 border-purple-600 dark:border-purple-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Building className="mr-3 h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">Contact Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                  <Mail className="mr-4 h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-semibold text-purple-800 dark:text-purple-200">Foundation Office</p>
                    <a href="mailto:wellsd34471@hocking.edu" className="text-blue-600 hover:underline font-medium">wellsd34471@hocking.edu</a>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                  <Phone className="mr-4 h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-semibold text-purple-800 dark:text-purple-200">Contact number</p>
                    <a href="tel:740-753-7010" className="text-blue-600 hover:underline font-medium">740-753-7010</a>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Types of Scholarships */}
        <AccordionItem value="types" className="border-2 border-orange-600 dark:border-orange-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Award className="mr-3 h-6 w-6 text-orange-600" />
              <span className="text-xl font-semibold text-orange-600 dark:text-orange-400">Types of Scholarships</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              {/* Foundation Scholarships */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-bold text-orange-600 dark:text-orange-400 text-lg">Foundation Scholarships</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Awarded based on financial need, academic merit, or program of study. Examples:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">• David S. Fraedrich (Nursing)</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">• Patrick Gangwer Brewing Scholarship</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400 md:col-span-2">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">• General scholarships for students in arts, health, business, and technology</p>
                  </div>
                </div>
              </div>

              {/* Specialty Scholarships */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-bold text-orange-600 dark:text-orange-400 text-lg">Specialty Scholarships</h4>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-orange-600 dark:text-orange-400 text-lg">Band & Choir Scholarship</h5>
                      <span className="font-bold text-red-600">Up to $1,000/semester</span>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400 mb-3">Requires MUS-1134 enrollment and audition</p>
                    <a href="mailto:parkj1@hocking.edu" className="text-blue-600 hover:underline text-sm font-medium">Email: parkj1@hocking.edu</a>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-orange-600 dark:text-orange-400 text-lg">Presidential Scholar Award</h5>
                      <span className="font-bold text-red-600">GPA ≥ 3.5</span>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Community service and full-time enrollment required</p>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                    <h5 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 text-lg">Other Specific Awards</h5>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Veteran/Military Family, Single Mother, Hearing Impaired, and other specific awards</p>
                  </div>
                </div>
              </div>

              {/* Border States Scholarship */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-bold text-orange-600 dark:text-orange-400 text-lg">Border States Scholarship</h4>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-orange-600 dark:text-orange-400 text-lg">$1,755/semester</h5>
                    <span className="font-bold text-red-600">IN, KY, MI, PA, WV</span>
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 mb-3">Must live in dorm and have a meal plan</p>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/tuition-and-fees')}
                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Tuition & Residency Info
                  </button>
                </div>
              </div>

              {/* District Scholars Award */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-bold text-orange-600 dark:text-orange-400 text-lg">District Scholars Award</h4>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-orange-600 dark:text-orange-400 text-lg">$1,000/year</h5>
                    <span className="font-bold text-red-600">Ohio Counties</span>
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 mb-3">For graduates of high schools in surrounding Ohio counties</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Renewable with full-time status and Satisfactory Academic Progress (SAP)</p>
                </div>
              </div>

              {/* Choose Ohio First Scholarship */}
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-bold text-orange-600 dark:text-orange-400 text-lg">Choose Ohio First Scholarship</h4>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <h5 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 text-lg">For Ohio residents in STEM or short-term certificate programs</h5>
                  <button
                    onClick={() => handleExternalLink('https://www.hocking.edu/financial-aid')}
                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Financial Aid Page (includes COF info)
                  </button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Deadlines & Award Periods */}
        <AccordionItem value="deadlines" className="border-2 border-red-600 dark:border-red-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Calendar className="mr-3 h-6 w-6 text-red-600" />
              <span className="text-xl font-semibold text-red-600 dark:text-red-400">Deadlines & Award Periods</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
                    <Calendar className="mr-3 h-5 w-5" />
                    Application Deadlines
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 dark:text-red-300">Fall Semester:</span>
                      <span className="font-semibold text-red-600 dark:text-red-400">March 1st</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 dark:text-red-300">Spring Semester:</span>
                      <span className="font-semibold text-red-600 dark:text-red-400">October 1st</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 dark:text-red-300">Summer Semester:</span>
                      <span className="font-semibold text-red-600 dark:text-red-400">February 1st</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
                    <AlertTriangle className="mr-3 h-5 w-5" />
                    Important Notes
                  </h4>
                  <div className="space-y-3 text-sm">
                    <p className="text-red-700 dark:text-red-300">
                      • Applications are reviewed on a first-come, first-served basis
                    </p>
                    <p className="text-red-700 dark:text-red-300">
                      • Early application is strongly recommended
                    </p>
                    <p className="text-red-700 dark:text-red-300">
                      • Awards are typically announced 4-6 weeks after deadline
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Renewal Requirements */}
        <AccordionItem value="renewal" className="border-2 border-teal-600 dark:border-teal-400 rounded-2xl overflow-hidden">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <RotateCcw className="mr-3 h-6 w-6 text-teal-600" />
              <span className="text-xl font-semibold text-teal-600 dark:text-teal-400">Renewal Requirements</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Most scholarships require annual renewal. Students must maintain eligibility criteria to continue receiving awards.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-600 dark:border-teal-400">
                  <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-4 flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5" />
                    Academic Requirements
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-teal-700 dark:text-teal-300">• Maintain minimum GPA (typically 2.5-3.0)</p>
                    <p className="text-teal-700 dark:text-teal-300">• Complete required credit hours per semester</p>
                    <p className="text-teal-700 dark:text-teal-300">• Meet Satisfactory Academic Progress (SAP)</p>
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-600 dark:border-teal-400">
                  <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-4 flex items-center">
                    <FileText className="mr-3 h-5 w-5" />
                    Renewal Process
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-teal-700 dark:text-teal-300">• Reapply annually through the portal</p>
                    <p className="text-teal-700 dark:text-teal-300">• Update FAFSA information</p>
                    <p className="text-teal-700 dark:text-teal-300">• Submit any additional required documents</p>
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