import React, { useState } from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "../components/ui/card";
import { School, MapPin, Accessibility, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function LearnMore() {
  const [, setLocation] = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Hocking College information sections
  const hockingInfo = [
    {
      id: 'identity',
      title: 'Our Identity',
      icon: School,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Founded in 1968, Hocking College is a public community college in scenic Nelsonville, Ohio, with campuses in Perry County and City of Logan. It features a 2,300-acre main campus, offers over 60 career-focused programs, and is Ohio's only two-year college with on‑campus housing.
          </p>
        </div>
      )
    },
    {
      id: 'mission',
      title: 'Mission & Core Values',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mission:</h4>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "We serve as a pathway to prosperity, teaching and inspiring all who seek to learn, growing careers and changing lives."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Core Values:</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <Accessibility className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Accessibility</strong> – Ensuring open access and support for all learners</span>
              </li>
              <li className="flex items-start gap-2">
                <School className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Community Engagement</strong> – Integrating service and development with regional partners</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Diversity & Inclusion</strong> – Embracing differences of all kinds</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'academics',
      title: 'Academics & Accreditation',
      icon: Accessibility,
      content: (
        <div className="space-y-4">
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Provides over 60 hands-on programs, from early childhood to cybersecurity, culinary arts, veterinary tech, and many more</li>
            <li>• Offers transferable degrees for students continuing to four-year universities</li>
            <li>• Fully accredited by the Higher Learning Commission</li>
          </ul>
        </div>
      )
    },
    {
      id: 'career-support',
      title: 'Career Support & Workforce Prep',
      icon: School,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Career & University Center:</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Personalized coaching: resumes, cover letters, and interviews</li>
              <li>• Hosts yearly in-person Hiring Events</li>
              <li>• Internship, co-op, and job listings via career and university job board</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Student Employment Services:</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• On-campus jobs, community service roles, and work-study opportunities</li>
              <li>• Work Scholarship options helping cover balances via employment</li>
              <li>• Student employees develop professional soft skills and workplace readiness</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Career Planning Tools:</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Access to Ohio Means Jobs, LinkedIn, Handshake, SkillsFirst, and BLS Occupational Outlook Handbook</li>
              <li>• Downloadable resources like e‑books: "Find Your Ideal Career," "Border States Scholarship," "Residence Hall Guide," etc.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'blog-insights',
      title: 'Insights from Our Blog',
      icon: School,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• Short-term certificates that can lead to promotions or new career directions</p>
          <p>• Highlighted cannabis program aligned with booming industry trends</p>
          <p>• Featured the Canine grooming lab hosting NDGAA events for real-world learning</p>
          <p>• Spotlighted Ready-to-Work courses and the launch of OPOTA peace officer training in Southeast Ohio</p>
        </div>
      )
    },
    {
      id: 'feedback',
      title: 'Student & Parent Feedback',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Elizabeth (Student):</h4>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Without help from TRIO, instructors, and family… instructors will help guide you to your goals and dreams."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Parent Reflections:</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• "Families enjoyed a fun‑filled campus camping weekend."</li>
              <li>• "Student life is rich with clubs, intramurals, guest speakers, and cultural events."</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'affordability',
      title: 'Affordability & Student Support',
      icon: Accessibility,
      content: (
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>• Save an average of $28,000 versus attending a four-year college</p>
          <p>• Offers scholarships, financial aid, flexible payment plans with all-inclusive pricing in select technical programs</p>
          <p>• Support systems: TRIO, Academic Success Center, Accessibility, and Counseling services included</p>
        </div>
      )
    },
    {
      id: 'safety-security',
      title: 'Safety & Security',
      icon: School,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• 24/7 campus police services</p>
          <p>• Emergency alerts and safety escorts</p>
          <p>• Mental health and wellness services</p>
          <p>• Behavioral Intervention Team (BIT) for crisis response and support</p>
        </div>
      )
    },
    {
      id: 'academic-support',
      title: 'Academic Support',
      icon: MapPin,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• Free tutoring and peer mentoring services</p>
          <p>• Academic advising and degree planning tools</p>
          <p>• TRIO support for first-gen, low-income, and disabled students</p>
          <p>• Dedicated transfer advising for four-year university pathways</p>
        </div>
      )
    },
    {
      id: 'parent-resources',
      title: 'Parent Resource Guide',
      icon: School,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• Move-in checklists, what to bring, housing tips</p>
          <p>• FERPA guide to student privacy rights</p>
          <p>• Tips for managing homesickness and student independence</p>
          <p>• Orientation support and parent welcome activities</p>
        </div>
      )
    },
    {
      id: 'student-life',
      title: 'Student Life Essentials',
      icon: MapPin,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• Full list of student clubs, intramurals, and campus activities</p>
          <p>• Dining services information, meal plans, and hours</p>
          <p>• Housing features, amenities, and roommate matching process</p>
          <p>• Campus event calendar updated weekly</p>
        </div>
      )
    },
    {
      id: 'financial-aid',
      title: 'Financial Aid Help',
      icon: Accessibility,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• Net price calculator for estimating costs</p>
          <p>• Access to scholarship database and application guides</p>
          <p>• FAFSA deadlines and financial aid counseling support</p>
          <p>• Payment plan setup tutorials and contact points</p>
        </div>
      )
    },
    {
      id: 'career-outcomes',
      title: 'Career Outcomes',
      icon: School,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• Job placement rates per program</p>
          <p>• Alumni career stories and earnings data</p>
          <p>• Employer testimonials</p>
          <p>• Real-world learning labs and partnerships with hiring companies</p>
        </div>
      )
    },
    {
      id: 'campus-tours',
      title: 'Campus Tours & Contact',
      icon: MapPin,
      content: (
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>• Virtual 360° campus tour option</p>
          <p>• Schedule in-person tours through the app</p>
          <p>• In person chat with current student ambassadors</p>
          <p>• Tour day and open house reminders</p>
        </div>
      )
    },
    {
      id: 'visit-connect',
      title: 'Visit & Connect',
      icon: Accessibility,
      content: (
        <div className="space-y-4">
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p><strong>Nelsonville Campus:</strong> 3301 Hocking Parkway</p>
                <p><strong>Logan Campus:</strong> 30140 Iles Rd</p>
                <p><strong>Perry Campus:</strong> 5454 OH‑37, New Lexington</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <School className="h-4 w-4 text-blue-600" />
            <span><strong>Hours:</strong> Mon–Fri, 8 AM–5 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span><strong>Admissions Contact:</strong> <a href="mailto:admissions@hocking.edu" className="text-blue-600 hover:underline">admissions@hocking.edu</a> | (740) 753‑7050</span>
          </div>
        </div>
      )
    }
  ];

  const handleBackToLogin = () => {
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          onClick={handleBackToLogin}
          variant="ghost"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Landing Page
        </Button>
      </div>

      {/* Header Section */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-blue-300">
          Learn More About Hocking College
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover what makes Hocking College a unique and exceptional place for your education. 
          We serve as a pathway to prosperity, teaching and inspiring all who seek to learn, 
          growing careers and changing lives.
        </p>
      </section>

      {/* Information Sections */}
      <section className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {hockingInfo.map((section) => (
            <Card key={section.id} className="border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 rounded-xl">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between rounded-t-xl"
              >
                <div className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-xl">{section.title}</h3>
                </div>
              </button>
              
              {expandedSections.includes(section.id) && (
                <CardContent className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="pt-4">
                    {section.content}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 rounded-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 mb-3">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join the Hocking College community and begin your journey toward success.
              </p>
              <button
                onClick={handleBackToLogin}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline text-lg font-semibold transition-colors"
              >
                Return to Landing Page
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 