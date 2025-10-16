import { 
  ArrowLeft, PawPrint, Phone, Mail, MapPin, Clock, Star, Award, Shield,
  Users, Heart, Scissors
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

export default function CanineFacility() {
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
          <PawPrint className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Canine Boarding & Grooming at Hocking College</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Treat your pet to a top-quality boarding and grooming experience while supporting student learning in our facility! 
          Operated as a hands-on lab for the Canine Assisted Services and grooming certificate programs, our services are 
          offered under expert supervision by licensed professionals.
        </p>
      </div>

      {/* Main Content with Accordion */}
      <Accordion type="single" collapsible className="space-y-6">
        
        {/* About Our Facility */}
        <AccordionItem value="about" className="border-2 border-blue-600 dark:border-blue-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Shield className="mr-3 h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">About Our Facility</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Our services are offered under expert supervision by licensed professionals including:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                  <Shield className="mr-4 h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Licensed Veterinary Technician</span>
                </div>
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                  <Award className="mr-4 h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Certified Groomer (NDGAA-certified)</span>
                </div>
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-blue-400">
                  <Award className="mr-4 h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Certified Pet Trainer (CPDT-KA)</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Operating Hours & Contact */}
        <AccordionItem value="contact" className="border-2 border-green-600 dark:border-green-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Clock className="mr-3 h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-green-600 dark:text-green-400">Operating Hours & Contact</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                  <Clock className="mr-4 h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-600 dark:text-green-400">Lobby Hours:</p>
                    <p className="text-green-700 dark:text-green-300">Mon–Fri, 7:30 AM–5:30 PM</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Weekend & after-hours: By appointment only</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                  <MapPin className="mr-4 h-6 w-6 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">222 Myers Street, Nelsonville, OH 45764</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                  <Mail className="mr-4 h-6 w-6 text-green-600" />
                  <a href="mailto:hcbg@hocking.edu" className="text-blue-600 hover:underline font-medium">
                    hcbg@hocking.edu
                  </a>
                </div>
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-600 dark:border-green-400">
                  <Phone className="mr-4 h-6 w-6 text-green-600" />
                  <a href="tel:740-300-5056" className="text-blue-600 hover:underline font-medium">
                    740‑300‑5056
                  </a>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Why Choose Hocking's Facility */}
        <AccordionItem value="why" className="border-2 border-purple-600 dark:border-purple-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Star className="mr-3 h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">Why Choose Hocking's Facility?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">Expert Care</h4>
                    <p className="text-purple-700 dark:text-purple-300">Licensed, experienced staff (30+ years each)</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">Student Supervision</h4>
                    <p className="text-purple-700 dark:text-purple-300">Supervision by professionally certified grooming and training students</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">Environment</h4>
                    <p className="text-purple-700 dark:text-purple-300">Clean, calm, climate-controlled environment praised by clients</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">Learning Experience</h4>
                    <p className="text-purple-700 dark:text-purple-300">Live-learning experience supports future canine-care professionals</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-600 dark:border-purple-400">
                <p className="text-purple-700 dark:text-purple-300 font-medium">Available for both dogs and cats</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Boarding Services */}
        <AccordionItem value="boarding" className="border-2 border-orange-600 dark:border-orange-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Heart className="mr-3 h-6 w-6 text-orange-600" />
              <span className="text-xl font-semibold text-orange-600 dark:text-orange-400">Boarding Services</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-4 text-lg">Daycare Boarding:</h4>
                  <div className="space-y-2 text-orange-700 dark:text-orange-300">
                    <p>• $10 for up to 4 hours</p>
                    <p>• $20 for full day</p>
                    <p>• Daycare + Training: $30/day (includes training sessions)</p>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-4 text-lg">Overnight Boarding:</h4>
                  <div className="space-y-2 text-orange-700 dark:text-orange-300">
                    <p>• $25–$35/night (based on size/accommodations)</p>
                    <p>• Including supervised outdoor time, quality bedding, toys</p>
                    <p>• Cat Boarding: $20/night, in a separate, cat-only area</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-600 dark:border-orange-400">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-4 text-lg">Health & Safety:</h4>
                <div className="space-y-2 text-orange-700 dark:text-orange-300">
                  <p>• Indoor, climate-controlled environment</p>
                  <p>• Frequent enclosure cleaning and supervised play</p>
                  <p>• Medications and special diets accommodated (owner must provide)</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Grooming Services */}
        <AccordionItem value="grooming" className="border-2 border-teal-600 dark:border-teal-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Scissors className="mr-3 h-6 w-6 text-teal-600" />
              <span className="text-xl font-semibold text-teal-600 dark:text-teal-400">Grooming Services</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Prioritized as a low-cost, high-quality service with benefits you'll appreciate:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-600 dark:border-teal-400">
                  <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-4 text-lg">All-inclusive TLC Treatment:</h4>
                  <p className="text-teal-700 dark:text-teal-300 mb-3">
                    Includes HydroSurge bath, nail trimming, ear cleaning, anal gland check, dematting, deshedding, and paw trim
                  </p>
                  <p className="text-teal-700 dark:text-teal-300">Typical grooming takes 3–6 hours</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-600 dark:border-teal-400">
                  <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-4 text-lg">Rates:</h4>
                  <div className="space-y-2 text-teal-700 dark:text-teal-300">
                    <p>• Dogs: start at $20 (≤15 lbs), up to $55+ (over 101 lbs)</p>
                    <p>• Cats: start at $50 (≤10 lbs), $55+ (over 10 lbs)</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-600 dark:border-teal-400">
                <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-4 text-lg">Additional Services:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-teal-700 dark:text-teal-300">
                  <div className="space-y-2">
                    <p>• Nail grinding – $5</p>
                    <p>• Paw treatment package – $20</p>
                  </div>
                  <div className="space-y-2">
                    <p>• Flea/tick shampoos – $10–$20</p>
                    <p>• Extra scissoring/clipper work – $10/15 min</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Training Services */}
        <AccordionItem value="training" className="border-2 border-indigo-600 dark:border-indigo-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Users className="mr-3 h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Training Services</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Options designed for puppies and adult dogs:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-indigo-600 dark:border-indigo-400">
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-lg">Daycare with Training:</h4>
                  <p className="text-indigo-700 dark:text-indigo-300">$30/day – includes manners and confidence-building supervised by certified trainers</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-indigo-600 dark:border-indigo-400">
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-lg">Group Canine Basic Manners Class:</h4>
                  <p className="text-indigo-700 dark:text-indigo-300">$80 for 6 weeks (1-hour weekly sessions) + AKC CGC testing ($25 exam fee + AKC processing)</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-indigo-600 dark:border-indigo-400 md:col-span-2">
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-lg">Private Sessions:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-indigo-700 dark:text-indigo-300">
                    <p>• With Certified Trainer: $60/hr</p>
                    <p>• With Intern Trainer (supervised): $30/hr</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Required Pet Health & Intake */}
        <AccordionItem value="health" className="border-2 border-red-600 dark:border-red-400 rounded-2xl overflow-hidden mb-6">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Shield className="mr-3 h-6 w-6 text-red-600" />
              <span className="text-xl font-semibold text-red-600 dark:text-red-400">Required Pet Health & Intake</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Before your first visit, please submit pet documentation:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-red-600 dark:border-red-400">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-4 text-lg">Current vaccinations:</h4>
                  <div className="space-y-4 text-red-700 dark:text-red-300">
                    <div>
                      <p className="font-medium">Dogs:</p>
                      <p>Parvo, Rabies, Distemper; Recommended: Bordetella, fecal exam</p>
                    </div>
                    <div>
                      <p className="font-medium">Cats:</p>
                      <p>FVRCP, Rabies; Recommended: FeLV testing</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-red-600 dark:border-red-400">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-4 text-lg">Additional Requirements:</h4>
                  <div className="space-y-2 text-red-700 dark:text-red-300">
                    <p>• Flea/tick prevention 48–72 hrs before visit</p>
                    <p>• Provide veterinary records at drop-off or via email within 72 hours of appointment</p>
                    <p>• Bring medications, food, and toys; bedding provided but optional</p>
                    <p>• Trial Day Recommended before first overnight stay</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Client Feedback & Pet Stories */}
        <AccordionItem value="feedback" className="border-2 border-gray-600 dark:border-gray-400 rounded-2xl overflow-hidden">
          <AccordionTrigger hideChevron={true} className="bg-white dark:bg-gray-800 px-6 py-6 min-h-[100px]">
            <div className="flex items-center justify-start w-full">
              <Star className="mr-3 h-6 w-6 text-gray-600" />
              <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">Client Feedback & Pet Stories</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-8 bg-white dark:bg-gray-900">
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-600 dark:text-gray-400 mb-3">Ken & Buddy (Mixed Breed, Grooming Client)</p>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "The Boarding and Grooming facility is outstanding. It's the cleanest, calmest place we've been to. 
                  Buddy used to hate nail trims, but now he trots right in like it's a spa day. I wouldn't go anywhere else."
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
} 