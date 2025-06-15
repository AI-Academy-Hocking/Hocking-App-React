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
      {
        name: "Associate of Applied Science in Nursing",
        description: "Prepares students for registered nursing practice in various healthcare settings.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "68 credits",
        contact: "740.753.7141",
        email: "nursing@hocking.edu"
      },
      {
        name: "Medical Laboratory Technology",
        description: "Prepares students for careers in medical laboratory science.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "65 credits",
        contact: "740.753.7141",
        email: "mlt@hocking.edu"
      },
      {
        name: "Physical Therapist Assistant",
        description: "Prepares students to work under the supervision of physical therapists.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "65 credits",
        contact: "740.753.7141",
        email: "pta@hocking.edu"
      }
    ]
  },
  {
    id: "arts-science",
    name: "School of General Studies, Arts & Science",
    icon: "arts-science",
    programs: [
      {
        name: "Associate of Arts",
        description: "General education program for transfer to four-year institutions.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "60 credits",
        contact: "740.753.7141",
        email: "arts@hocking.edu"
      },
      {
        name: "Associate of Science",
        description: "Science-focused program for transfer to four-year institutions.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "60 credits",
        contact: "740.753.7141",
        email: "science@hocking.edu"
      }
    ]
  },
  {
    id: "natural-resources",
    name: "School of Natural Resources & Public Safety",
    icon: "natural-resources",
    programs: [
      {
        name: "Forestry and Wildlife Management",
        description: "Comprehensive training in forest management and wildlife conservation.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "68 credits",
        contact: "740.753.7144",
        email: "forestry@hocking.edu"
      },
      {
        name: "Law Enforcement",
        description: "Prepares students for careers in law enforcement and public safety.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "65 credits",
        contact: "740.753.7141",
        email: "law@hocking.edu"
      }
    ]
  },
  {
    id: "workforce",
    name: "School of Workforce Development",
    icon: "workforce",
    programs: [
      {
        name: "Business Management",
        description: "Prepares students for careers in business administration and management.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "60 credits",
        contact: "740.753.7141",
        email: "business@hocking.edu"
      },
      {
        name: "Information Technology",
        description: "Focuses on computer systems, networking, and IT support.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "60 credits",
        contact: "740.753.7141",
        email: "it@hocking.edu"
      },
      {
        name: "Manufacturing Engineering",
        description: "Prepares students for careers in manufacturing and industrial technology.",
        degree: "Associate Degree",
        duration: "2 years",
        credits: "60 credits",
        contact: "740.753.7141",
        email: "manufacturing@hocking.edu"
      }
    ]
  },
  {
    id: "title-iv",
    name: "Title IV Certificate Programs",
    icon: "title-iv",
    programs: [
      {
        name: "Emergency Medical Services",
        description: "Prepares students for careers as emergency medical technicians.",
        degree: "Certificate",
        duration: "1 year",
        credits: "30 credits",
        contact: "740.753.7141",
        email: "ems@hocking.edu"
      },
      {
        name: "Fire Science",
        description: "Provides training for firefighting and emergency services.",
        degree: "Certificate",
        duration: "1 year",
        credits: "30 credits",
        contact: "740.753.7141",
        email: "fire@hocking.edu"
      }
    ]
  },
  {
    id: "non-title-iv",
    name: "Non-Title IV Certificate Programs",
    icon: "non-title-iv",
    programs: [
      {
        name: "Wildlife Management",
        description: "Certificate program in wildlife management and conservation.",
        degree: "Certificate",
        duration: "1 year",
        credits: "30 credits",
        contact: "740.753.7141",
        email: "wildlife@hocking.edu"
      },
      {
        name: "Forest Management",
        description: "Certificate program in forest management practices.",
        degree: "Certificate",
        duration: "1 year",
        credits: "30 credits",
        contact: "740.753.7141",
        email: "forestry@hocking.edu"
      }
    ]
  }
];

export default function CourseCatalog() {
  const [selectedSchool, setSelectedSchool] = useState("allied-health");
  const selectedSchoolData = courses.find(school => school.id === selectedSchool);

  return (
    <div className="space-y-6">
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
              <SelectTrigger className="w-[400px]">
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
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
                  {selectedSchoolData.programs.map((program, index) => (
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
                          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg">Learn More</Button>
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