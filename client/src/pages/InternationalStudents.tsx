import { ArrowLeft, Globe, Phone, Mail, MapPin, Clock, FileText, Users, GraduationCap, Shield, Heart, CheckCircle, DollarSign, Home, Plane, BookOpen, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function InternationalStudents() {
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
        <Globe className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">International Students at Hocking College</h1>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Welcome to Hocking!</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you an international student ready to begin your college journey in the U.S.? Hocking College offers a unique experience 
            with career-focused programs, hands-on learning, and a supportive student community. Whether you're from the Caribbean, 
            Asia, Africa, or Europe, welcome home!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">International Student Admission Checklist</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Before you can join us at Hocking College, here's everything you'll need to submit:
            </p>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">International Student Application</p>
                  <p className="text-sm">$150 Application Fee (non-refundable)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Official High School or College Transcripts</p>
                  <p className="text-sm">Must be in English or include a certified English translation</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Copy of Passport ID Page</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Proof of Financial Support</p>
                  <p className="text-sm">A bank statement and sponsorship letter</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Your Mailing Address</p>
                  <p className="text-sm">For official admissions communication</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-semibold text-blue-800 dark:text-blue-200">Apply By Deadline:</p>
              <p className="text-blue-700 dark:text-blue-300">Fall Semester: July 1</p>
              <p className="text-blue-700 dark:text-blue-300">Spring Semester: November 1</p>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                IMPORTANT: After applying, contact the DSO (Designated School Official) for visa guidance and to receive your Form I-20.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Visa & Immigration Support</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We support you through every step of your international student visa journey.
            </p>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>• We issue the Form I-20 for F-1 student visas</p>
              <p>• Full-time enrollment (12+ credits per semester) is required</p>
              <p>• On-campus employment is allowed:</p>
              <div className="ml-4 space-y-1">
                <p>• Up to 15 hours/week during the semester</p>
                <p>• Up to 40 hours/week during breaks (with approval)</p>
              </div>
              <p>• The DSO helps you with:</p>
              <div className="ml-4 space-y-1">
                <p>• SEVIS compliance</p>
                <p>• Travel and visa renewals</p>
                <p>• Transfer procedures</p>
                <p>• Address updates</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold text-green-800 dark:text-green-200">
                Pro Tip: Keep your immigration documents updated and always check in with your DSO before traveling.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">ESL & Academic Support</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>• All international students complete placement testing upon arrival</p>
              <p>• ESL (English as a Second Language) classes available if needed</p>
              <p>• Courses include grammar, reading, writing, and speaking</p>
              <p>• Transferring in with English 1510? You may be exempt from ESL</p>
              <p>• We also offer tutoring, study labs, and writing help, so you're never on your own!</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Scholarships & Payment Options</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">GREAT Scholarship</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• Available to Jamaican and Bahamian students</p>
                  <p>• Covers in-state tuition rates</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Other Financial Options:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• Scholarships through StudyUSA, Fulbright, and EducationUSA</p>
                  <p>• Flexible tuition payment plans through the cashier's office</p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">
                  Plan Ahead: You'll need to cover costs for tuition, housing, travel, food, health insurance, and personal expenses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Housing for International Students</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We recommend on-campus housing for international students because it offers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>• 24/7 residence life support</p>
              <p>• Easy access to classrooms and student services</p>
              <p>• A vibrant social environment</p>
              <p>• Secure and furnished rooms</p>
              <p>• Shared kitchen spaces for preparing your meals</p>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>• Campus Safety</p>
            </div>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="font-semibold text-yellow-800 dark:text-yellow-200">
              Note: Meals are NOT included in housing for students staying in the International Dorms. Students can cook for themselves 
              or buy meals on campus. For students staying in the other dorms, a 14 meals per week meal plan is added to your account.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Dual-Degree Pathways</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Start your education in the Caribbean, finish it at Hocking!
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">We currently partner with:</p>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>• Excelsior Community College (Jamaica)</p>
            <p>• Western Hospitality Institute (Jamaica)</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            These partnerships let you transfer to Hocking College and earn your U.S. degree while receiving housing at a reasonable 
            cost and scholarship support.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Travel & Arrival Tips</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>• Closest Airport: John Glenn Columbus International (CMH)</p>
              <p>• Pack seasonal clothes, winters in Ohio can be very cold</p>
              <p>• Students are responsible for their own airport transportation</p>
              <p>• Arrival details and orientation schedule will be sent once your visa is approved</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Support & Contact</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">International Student Services</h4>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <a href="mailto:international@hocking.edu" className="hover:text-blue-600">
                    international@hocking.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a href="tel:+17407537050" className="hover:text-blue-600">
                    +1 (740) 753-7050
                  </a>
                </div>
                <p>DSO Contact: Provided upon acceptance</p>
              </div>
              <p className="text-blue-600 font-medium">We're here to guide you from admission to graduation!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Get Started Today!</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Everything you need to begin your international student journey is right here in the app:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Apply Now!
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Get Admission Checklist!
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Visit Website!
            </button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
              Book DSO Appointment!
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">International Student FAQs</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-8">
            {/* VISA & IMMIGRATION */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-600">VISA & IMMIGRATION:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Q1: How do I get my Form I-20?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Once you are accepted and provide proof of financial support, your DSO will issue the I-20 via email or mail.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q2: What visa do I need?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    You'll need to apply for an F-1 Student Visa at your local U.S. Embassy or Consulate.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q3: Can I work while studying?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes, F-1 students may work on campus only, up to 15 hours/week during the semester and more during breaks (with permission).
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q4: What happens if I travel during breaks?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    You must get a travel signature on your I-20 from your DSO before leaving the U.S.
                  </p>
                </div>
              </div>
            </div>

            {/* HOUSING & LIVING */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">HOUSING & LIVING:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Q5: Is on-campus housing required?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    It's not required, but strongly recommended for international students for safety, convenience, and social connection.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q6: Are meals included in housing?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    No. Meal plans must be purchased separately, or you can prepare your own meals in shared kitchen spaces when staying 
                    in the International Dorms. For the students staying in the other dorms, you are assigned a meal plan.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q7: What should I bring for my dorm room?</p>
                  <div className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <p>• Twin XL bed sheets</p>
                    <p>• Pillow & blanket</p>
                    <p>• Towels & toiletries</p>
                    <p>• Power adapters (U.S. standard voltage is 120V)</p>
                    <p>• Cooking supplies (if needed)</p>
                    <p>• Personal items & decorations</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Q8: Can I live off-campus?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes, but you'll be responsible for transportation, leases, and utilities. Hocking College does not currently assist with off-campus housing.
                  </p>
                </div>
              </div>
            </div>

            {/* ACADEMICS & ESL */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-600">ACADEMICS & ESL:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Q9: Will I take English placement tests?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Only if needed, all international students are required to be proficient in English.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q10: What academic support is available?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Tutoring, writing centers, library resources, and instructor office hours are available to all students.
                  </p>
                </div>
              </div>
            </div>

            {/* SCHOLARSHIPS & FINANCES */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-600">SCHOLARSHIPS & FINANCES:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Q11: What scholarships can international students apply for?</p>
                  <div className="space-y-1 text-gray-700 dark:text-gray-300">
                    <p>• GREAT Scholarship for Jamaican and Bahamian students</p>
                    <p>• External options like StudyUSA, EducationUSA, and Fulbright</p>
                    <p>• You must apply separately for each</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Q12: Can I set up a U.S. bank account?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes. We recommend opening an account with a local bank such as Chase, Huntington, or PNC. 
                    Bring your passport, I-20, proof of address, and student ID.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q13: Do I need health insurance?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes, health insurance is strongly recommended. You may be required to purchase a U.S.-based policy. Ask the DSO for approved providers.
                  </p>
                </div>
              </div>
            </div>

            {/* TRAVEL & ARRIVAL */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">TRAVEL & ARRIVAL:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Q14: What airport should I fly into?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Fly into John Glenn Columbus International Airport (CMH).
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q15: Does Hocking offer airport pickup?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Limited pickup may be available. You must request in advance. We recommend arriving at least 5 days before orientation.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q16: When should I arrive?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    You should plan to arrive in the U.S. no more than 30 days before the program start date on your I-20.
                  </p>
                </div>
              </div>
            </div>

            {/* LIFE IN OHIO */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-600">LIFE IN OHIO:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Q17: What's the weather like?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Ohio has four seasons. Winters (Dec–Mar) can be very cold with snow. Bring warm clothes or plan to shop upon arrival.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q18: What can I do for fun?</p>
                  <p className="text-gray-700 dark:text-gray-300">Explore:</p>
                  <div className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <p>• On-campus events</p>
                    <p>• Hiking and parks in Hocking Hills</p>
                    <p>• Student clubs</p>
                    <p>• Bowling, movie nights, clubbing, and festivals in Nelsonville & Athens</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Q19: How do I get around without a car?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    There's limited public transportation. Most students walk, bike, or arrange carpooling. Having a bike is helpful on campus.
                  </p>
                </div>
              </div>
            </div>

            {/* COMMUNITY & SUPPORT */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-teal-600">COMMUNITY & SUPPORT:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Q20: Who can I contact for help?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your DSO and International Services Office are your main contacts. You can also talk to your RA (Resident Assistant) if you live on campus.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Q21: Is there a place for international students to meet others?</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes! Look out for International Student Meetups, clubs, Coffee Hours, and cultural events posted in this app's "Events" tab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 