import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Clock, ArrowLeft, Dumbbell, Users, MapPin, ExternalLink,
  Calendar, CheckCircle, BookOpen, Activity, 
  Building, Coffee, Waves, Mountain, Timer
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import studentCenterImage from "../components/assets/studentCenter.jpg"; // Import the image
import { Link } from "wouter";

function RecreationPage() {
  const [openSection, setOpenSection] = useState<string>("");
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [facilitiesExpanded, setFacilitiesExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSectionToggle = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  // Close section when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenSection("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Activity className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Recreation & Student Center</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Your hub for fitness, recreation, and student life activities. The Student Center offers state-of-the-art facilities and programs to keep you active and engaged.
        </p>
      </div>

      {/* Hero Image */}
      <Card className="mb-8 overflow-hidden border-2 border-blue-600 rounded-xl">
        <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
          <img 
            src={studentCenterImage} 
            alt="Recreation Center" 
            className="w-full h-full object-cover" 
          />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card 
          className={`cursor-pointer animate-fadeIn rounded-xl overflow-hidden relative bg-white dark:bg-gray-800 ${
            infoExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => setInfoExpanded(!infoExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
              Student Center Information
            </h3>
          </div>
          
          {infoExpanded && (
            <div className="pt-4 px-6 pb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Hours of Operation</p>
                    <p className="text-gray-700 dark:text-gray-300">Monday – Friday: 8:00 AM – 10:00 PM</p>
                    <p className="text-gray-700 dark:text-gray-300">Saturday & Sunday: 11:00 AM – 8:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                    <a href="tel:7407536535" className="text-blue-600 hover:text-blue-800 hover:underline">(740) 753-6535</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <a href="mailto:studentcenter@hocking.edu" className="text-blue-600 hover:text-blue-800 hover:underline">studentcenter@hocking.edu</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <Card 
          className={`cursor-pointer animate-fadeIn rounded-xl overflow-hidden relative bg-white dark:bg-gray-800 ${
            facilitiesExpanded 
              ? 'border-2 border-blue-400 dark:border-cyan-300' 
              : 'border-2 border-blue-600 dark:border-gray-700'
          }`}
          onClick={() => setFacilitiesExpanded(!facilitiesExpanded)}
        >
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
              Available Facilities
            </h3>
          </div>
          
          {facilitiesExpanded && (
            <div className="pt-4 px-6 pb-6">
              <ul className="list-disc list-inside space-y-2 pl-2 text-gray-900 dark:text-white">
                <li>Full-size gymnasium</li>
                <li>Fitness center with cardio and strength equipment</li>
                <li>Student lounge with TV and recreational games</li>
                <li>Study spaces and meeting rooms</li>
                <li>Outdoor recreation equipment rentals</li>
                <li>Indoor pool and diving board</li>
                <li>Rock climbing wall</li>
                <li>Indoor track</li>
              </ul>
            </div>
          )}
        </Card>
      </div>

      {/* Hours & Contact Information */}
      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Hours of Operation & Contact */}
        <AccordionItem value="hours" className="border-2 border-green-600 rounded-xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-green-800 dark:text-green-200">
              <Clock className="mr-3 h-6 w-6" />
              Hours of Operation & Contact
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-700 dark:text-green-300">Hours of Operation</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Monday – Friday: 8:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Saturday & Sunday: 11:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Timer className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Extended hours during finals week</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-green-700 dark:text-green-300">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-green-600" />
                    <a href="tel:7407536535" className="text-blue-600 hover:underline text-sm">(740) 753-6535</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-green-600" />
                    <a href="mailto:studentcenter@hocking.edu" className="text-blue-600 hover:underline text-sm">studentcenter@hocking.edu</a>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Student Center Building</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Fitness Center */}
        <AccordionItem value="fitness" className="border-2 border-purple-600 rounded-xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-purple-800 dark:text-purple-200">
              <Dumbbell className="mr-3 h-6 w-6" />
              Fitness Center
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              State-of-the-art fitness equipment and facilities to help you stay in shape and achieve your fitness goals.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300">Cardio Equipment</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Treadmills and ellipticals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Stationary bikes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Rowing machines</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300">Strength Training</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Free weights and machines</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Functional training area</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">Personal training available</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Indoor Facilities */}
        <AccordionItem value="facilities" className="border-2 border-orange-600 rounded-xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-orange-800 dark:text-orange-200">
              <Building className="mr-3 h-6 w-6" />
              Indoor Facilities
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-orange-600 rounded-xl transition-colors">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
                    <Waves className="mr-2 h-4 w-4" />
                    Indoor Pool
                  </h5>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Full-size pool with diving board and lap lanes</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-orange-600 rounded-xl transition-colors">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
                    <Mountain className="mr-2 h-4 w-4" />
                    Rock Climbing Wall
                  </h5>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Indoor climbing wall with safety equipment</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-orange-600 rounded-xl transition-colors">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    Indoor Track
                  </h5>
                  <p className="text-sm text-orange-700 dark:text-orange-300">200-meter indoor track for running and walking</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-orange-600 rounded-xl transition-colors">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Full-size Gymnasium
                  </h5>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Basketball, volleyball, and indoor sports</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-orange-600 rounded-xl transition-colors">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
                    <Coffee className="mr-2 h-4 w-4" />
                    Student Lounge
                  </h5>
                  <p className="text-sm text-orange-700 dark:text-orange-300">TV, games, and comfortable seating areas</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-2 border-orange-600 rounded-xl transition-colors">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Study Spaces
                  </h5>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Quiet study areas and meeting rooms</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Programs & Activities */}
        <AccordionItem value="programs" className="border-2 border-teal-600 rounded-xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-teal-800 dark:text-teal-200">
              <Calendar className="mr-3 h-6 w-6" />
              Programs & Activities
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 border-2 border-teal-600 rounded-xl transition-colors">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Group Fitness Classes</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">Yoga, Zumba, spinning, and strength training classes</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border-2 border-teal-600 rounded-xl transition-colors">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Intramural Sports</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">Basketball, volleyball, soccer, and flag football leagues</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border-2 border-teal-600 rounded-xl transition-colors">
                <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Outdoor Equipment Rentals</h5>
                <p className="text-sm text-teal-700 dark:text-teal-300">Camping gear, kayaks, and outdoor recreation equipment</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Amenities & Services */}
        <AccordionItem value="amenities" className="border-2 border-indigo-600 rounded-xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-indigo-800 dark:text-indigo-200">
              <CheckCircle className="mr-3 h-6 w-6" />
              Amenities & Services
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Facility Services</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Locker rooms with showers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Equipment checkout</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Personal training sessions</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Additional Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Free Wi-Fi throughout facility</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Vending machines and snack bar</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">Accessible facilities</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ Section */}
        <AccordionItem value="faq" className="border-2 border-gray-600 rounded-xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-200">
              <BookOpen className="mr-3 h-6 w-6" />
              Frequently Asked Questions (FAQ)
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <Accordion type="single" collapsible className="w-full space-y-3">
              <AccordionItem value="membership" className="border-2 border-gray-600 rounded-xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                  Do I need a membership to use the recreation center?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  No membership is required! All current Hocking College students have free access to the recreation center with their student ID.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="equipment" className="border-2 border-gray-600 rounded-xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                  How do I check out equipment?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  Equipment can be checked out at the front desk with your student ID. Most equipment is free, but some items may require a small deposit.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="classes" className="border-2 border-gray-600 rounded-xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                  Are fitness classes included?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  Yes! All group fitness classes are free for students. Check the schedule at the front desk or on our website for current class times.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="guests" className="border-2 border-gray-600 rounded-xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                  Can I bring guests to the recreation center?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  Students can bring one guest per visit. Guests must be accompanied by the student and may be required to sign a waiver.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="lockers" className="border-2 border-gray-600 rounded-xl bg-white dark:bg-gray-800">
                <AccordionTrigger className="text-left px-4 py-3 rounded-t-2xl data-[state=closed]:rounded-b-2xl [&>svg]:hidden">
                  Are lockers available?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  Yes, lockers are available in the locker rooms. You can bring your own lock or rent one from the front desk for a small fee.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Quick Access Links */}
        <AccordionItem value="quick-links" className="border-2 border-gray-600 rounded-xl mb-4">
          <AccordionTrigger className="bg-white dark:bg-gray-800 px-6 py-4 hover:no-underline min-h-[80px] flex items-center rounded-t-xl data-[state=closed]:rounded-b-xl [&>svg]:hidden">
            <div className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-200">
              <ExternalLink className="mr-3 h-6 w-6" />
              Quick Access Links
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Contact</h4>
                <div className="space-y-1 text-sm">
                  <a href="tel:7407536535" className="text-blue-600 hover:underline block text-left">
                    (740) 753-6535
                  </a>
                  <a href="mailto:studentcenter@hocking.edu" className="text-blue-600 hover:underline block text-left">
                    studentcenter@hocking.edu
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Services</h4>
                <div className="space-y-1 text-sm">
                  <p>Fitness Center</p>
                  <p>Indoor Pool</p>
                  <p>Rock Climbing</p>
                  <p>Group Classes</p>
                  <p>Equipment Rental</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default RecreationPage;
