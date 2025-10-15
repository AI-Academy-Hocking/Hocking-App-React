import { useState } from "react";
import { ArrowLeft, GraduationCap, Clock, BookOpen, Phone, Mail, TreePine, Stethoscope, Users, Briefcase, ShieldCheck, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schoolIcons = {
  "allied-health": Stethoscope,
  "arts-science": FileText,
  "natural-resources": TreePine,
  "workforce": Briefcase,
  "title-iv": ShieldCheck,
  "non-title-iv": Users,
};

const courses = [
  {
    id: "allied-health",
    name: "School of Allied Health and Nursing",
    icon: "allied-health",
    programs: [
      { name: "Dental Hygiene", description: "Comprehensive training in dental hygiene and patient care.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "alliedhealth@hocking.edu" },
      { name: "Fitness Management", description: "Prepare for a career in fitness and wellness management.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "alliedhealth@hocking.edu" },
      { name: "Healthcare Informatics", description: "Study the intersection of healthcare and information technology.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "alliedhealth@hocking.edu" },
      { name: "Medical Assistant", description: "Training for clinical and administrative medical assisting roles.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "alliedhealth@hocking.edu" },
      { name: "Nursing – Registered Nursing", description: "Prepares students for registered nursing practice.", degree: "Associate Degree", duration: "2 years", credits: "68 credits", contact: "740.753.7141", email: "nursing@hocking.edu" },
      { name: "LPN to RN Transition Program", description: "Transition program for LPNs to become RNs.", degree: "Associate Degree", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "nursing@hocking.edu" },
      { name: "Nursing – Practical Nursing (LPN)", description: "Prepares students for practical nursing roles.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "nursing@hocking.edu" },
      { name: "Physical Therapy Assistant", description: "Prepares students to work under the supervision of physical therapists.", degree: "Associate Degree", duration: "2 years", credits: "65 credits", contact: "740.753.7141", email: "pta@hocking.edu" },
      { name: "Social Work", description: "Foundational training for a career in social work.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "alliedhealth@hocking.edu" },
      { name: "Massage Therapy Certificate", description: "Certificate program in massage therapy.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "alliedhealth@hocking.edu" },
      { name: "State Tested Nursing Assistant (STNA)", description: "Certificate program for state tested nursing assistants.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "alliedhealth@hocking.edu" },
    ]
  },
  {
    id: "arts-science",
    name: "School of General Studies, Arts & Science",
    icon: "arts-science",
    programs: [
      { name: "Associate of Arts (General Studies)", description: "General education program for transfer to four-year institutions.", degree: "Associate Degree", duration: "2 years", credits: "60 credits", contact: "740.753.7141", email: "arts@hocking.edu" },
      { name: "Associate of Science", description: "Science-focused program for transfer to four-year institutions.", degree: "Associate Degree", duration: "2 years", credits: "60 credits", contact: "740.753.7141", email: "science@hocking.edu" },
      { name: "Associate of Technical Study", description: "Technical study program tailored to student interests.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "arts@hocking.edu" },
      { name: "Associate of Individualized Studies", description: "Individualized program of study for unique career goals.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "arts@hocking.edu" },
      { name: "Ohio Transfer 36", description: "Ohio's statewide transfer module for general education.", degree: "Certificate", duration: "Varies", credits: "36 credits", contact: "740.753.7141", email: "arts@hocking.edu" },
    ]
  },
  {
    id: "natural-resources",
    name: "School of Natural Resources & Public Safety",
    icon: "natural-resources",
    programs: [
      { name: "Canine Assisted Services", description: "Training in canine-assisted therapy and services.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Criminal Justice", description: "Prepares students for careers in law enforcement and public safety.", degree: "Associate Degree", duration: "2 years", credits: "65 credits", contact: "740.753.7141", email: "law@hocking.edu" },
      { name: "Environmental Science", description: "Study of environmental systems and sustainability.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Equine Health and Complementary Therapies", description: "Equine health and alternative therapies.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Equine Teaching and Training", description: "Equine education and training program.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Farrier Science and Business", description: "Training in farrier science and equine business.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Fire and Emergency Services", description: "Firefighting and emergency response training.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Fish Management and Aquaculture Sciences", description: "Aquaculture and fisheries management.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Forest Management", description: "Sustainable forest management practices.", degree: "Associate Degree", duration: "2 years", credits: "68 credits", contact: "740.753.7144", email: "forestry@hocking.edu" },
      { name: "Laboratory Sciences: Cannabis", description: "Cannabis laboratory science and testing.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Natural Resources Law Enforcement", description: "Law enforcement in natural resources.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "law@hocking.edu" },
      { name: "Parks and Museum Education", description: "Education and interpretation for parks and museums.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Timber Harvesting and Tree Care Certificate", description: "Certificate in timber harvesting and tree care.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Wildlife Resource Management", description: "Wildlife management and conservation.", degree: "Associate Degree", duration: "2 years", credits: "68 credits", contact: "740.753.7144", email: "forestry@hocking.edu" },
      { name: "Wilderness Horsemanship", description: "Horsemanship skills for wilderness environments.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "naturalresources@hocking.edu" },
      { name: "Ohio Peace Officer Basic Certificate", description: "Certificate for Ohio peace officers.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "law@hocking.edu" },
    ]
  },
  {
    id: "workforce",
    name: "School of Workforce Development",
    icon: "workforce",
    programs: [
      { name: "Accounting and Financial Services", description: "Accounting and financial services training.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Advanced Manufacturing and Engineering Technologies", description: "Advanced manufacturing and engineering.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Automotive Technology", description: "Automotive technology and repair.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Business Management and Entrepreneurship", description: "Business management and entrepreneurship.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Commercial Driver's License (CDL) Certificate", description: "CDL training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Construction Management: Carpentry", description: "Construction management and carpentry.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Culinary Arts", description: "Culinary arts and food preparation.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Culinary Arts: Baking", description: "Baking and pastry arts.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Cybersecurity and Network Systems", description: "Cybersecurity and network administration.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Early Childhood Teacher Education", description: "Early childhood education and teaching.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Fashion Design and Retail Merchandising", description: "Fashion design and retail management.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Fermentation Science", description: "Fermentation science and technology.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Film and Video Production", description: "Film and video production techniques.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Heavy Equipment Management", description: "Heavy equipment operation and management.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "HVAC (Construction Management – HVAC)", description: "Heating, ventilation, and air conditioning.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Hospitality & Events Management", description: "Hospitality and event management.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Music and Recording Industry", description: "Music production and recording industry.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Real Estate Certificate", description: "Real estate training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Sales Certificate", description: "Sales training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Sports Management", description: "Sports management and administration.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Water and Wastewater Management", description: "Water and wastewater treatment and management.", degree: "Associate Degree", duration: "2 years", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
      { name: "Advanced Welding Certificate", description: "Advanced welding techniques and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "workforce@hocking.edu" },
    ]
  },
  {
    id: "title-iv",
    name: "Title IV Certificate Programs",
    icon: "title-iv",
    programs: [
      { name: "EMT/Paramedic Certificate", description: "EMT and paramedic training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Firefighter Certificate", description: "Firefighter training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Heavy Equipment Operator Certificate", description: "Heavy equipment operation and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Timber Harvesting and Tree Care Certificate", description: "Certificate in timber harvesting and tree care.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Canine Certificates (Canine Groomer, Trainer, etc.)", description: "Canine grooming and training certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Real Estate Certificate", description: "Real estate training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Sales Certificate", description: "Sales training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Massage Therapy Certificate", description: "Massage therapy training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "State Tested Nursing Assistant (STNA)", description: "STNA training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Commercial Driver's License (CDL) Certificate", description: "CDL training and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Advanced Welding Certificate", description: "Advanced welding techniques and certification.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
      { name: "Ohio Peace Officer Basic Certificate", description: "Certificate for Ohio peace officers.", degree: "Certificate", duration: "1 year", credits: "Varies", contact: "740.753.7141", email: "certificates@hocking.edu" },
    ]
  },
  {
    id: "non-title-iv",
    name: "Non-Title IV Certificate Programs",
    icon: "non-title-iv",
    programs: [
      { name: "Wildlife Management", description: "Certificate program in wildlife management and conservation.", degree: "Certificate", duration: "1 year", credits: "30 credits", contact: "740.753.7141", email: "wildlife@hocking.edu" },
      { name: "Forest Management", description: "Certificate program in forest management practices.", degree: "Certificate", duration: "1 year", credits: "30 credits", contact: "740.753.7141", email: "forestry@hocking.edu" },
    ]
  }
];

export default function CourseCatalog() {
  const [selectedSchool, setSelectedSchool] = useState("allied-health");
  const selectedSchoolData = courses.find(school => school.id === selectedSchool);

  // Sort programs alphabetically by name for each school
  const sortedPrograms = selectedSchoolData ? [...selectedSchoolData.programs].sort((a, b) => a.name.localeCompare(b.name)) : [];

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="flex items-center gap-4">
        <Link href="/tools">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-heading font-semibold">Course Catalog</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hocking College Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger className="w-full md:w-[400px] bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-md">
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-lg">
                {courses.map((school) => (
                  <SelectItem key={school.id} value={school.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedSchoolData && (
              <div className="w-full space-y-4">
                <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
                  {(() => {
                    const Icon = schoolIcons[selectedSchoolData.icon as keyof typeof schoolIcons] || GraduationCap;
                    return <Icon className="text-primary h-7 w-7" />;
                  })()}
                  {selectedSchoolData.name}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {sortedPrograms.map((program, index) => (
                    <Card key={index} className="bg-white border-none shadow-md shadow-gray-200 rounded-xl">
                      <CardContent className="pt-6 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <BookOpen className="text-primary h-6 w-6" />
                          <span className="font-bold text-lg text-black">{program.name}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">{program.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {program.degree}</span>
                          <span className="bg-[#1E293B] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"><Clock className="h-4 w-4" /> {program.duration}</span>
                          <span className="bg-[#7C3AED] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"><BookOpen className="h-4 w-4" /> {program.credits}</span>
                        </div>
                        <div className="border-t border-[#334155] pt-3 mt-3 flex flex-col gap-2 text-sm text-gray-700">
                          <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> Contact: {program.contact}</div>
                          <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email: {program.email}</div>
                        </div>
                        <div className="flex justify-center mt-5">
                          <a
                            href="https://www.hocking.edu/majors"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg inline-flex items-center justify-center transition-colors"
                          >
                            Learn More
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
