import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const courses = [
  {
    id: "allied-health",
    name: "School of Allied Health and Nursing",
    programs: [
      {
        name: "Associate of Applied Science in Nursing",
        description: "Prepares students for registered nursing practice in various healthcare settings.",
        contact: "740.753.7141",
        email: "nursing@hocking.edu"
      },
      {
        name: "Medical Laboratory Technology",
        description: "Prepares students for careers in medical laboratory science.",
        contact: "740.753.7141",
        email: "mlt@hocking.edu"
      },
      {
        name: "Physical Therapist Assistant",
        description: "Prepares students to work under the supervision of physical therapists.",
        contact: "740.753.7141",
        email: "pta@hocking.edu"
      }
    ]
  },
  {
    id: "arts-science",
    name: "School of General Studies, Arts & Science",
    programs: [
      {
        name: "Associate of Arts",
        description: "General education program for transfer to four-year institutions.",
        contact: "740.753.7141",
        email: "arts@hocking.edu"
      },
      {
        name: "Associate of Science",
        description: "Science-focused program for transfer to four-year institutions.",
        contact: "740.753.7141",
        email: "science@hocking.edu"
      }
    ]
  },
  {
    id: "natural-resources",
    name: "School of Natural Resources & Public Safety",
    programs: [
      {
        name: "Wildlife Resources Management",
        description: "Prepares students for careers in wildlife management and conservation.",
        contact: "740.753.7141",
        email: "wildlife@hocking.edu"
      },
      {
        name: "Forest Management",
        description: "Focuses on sustainable forest management practices.",
        contact: "740.753.7141",
        email: "forestry@hocking.edu"
      },
      {
        name: "Law Enforcement",
        description: "Prepares students for careers in law enforcement and public safety.",
        contact: "740.753.7141",
        email: "law@hocking.edu"
      }
    ]
  },
  {
    id: "workforce",
    name: "School of Workforce Development",
    programs: [
      {
        name: "Business Management",
        description: "Prepares students for careers in business administration and management.",
        contact: "740.753.7141",
        email: "business@hocking.edu"
      },
      {
        name: "Information Technology",
        description: "Focuses on computer systems, networking, and IT support.",
        contact: "740.753.7141",
        email: "it@hocking.edu"
      },
      {
        name: "Manufacturing Engineering",
        description: "Prepares students for careers in manufacturing and industrial technology.",
        contact: "740.753.7141",
        email: "manufacturing@hocking.edu"
      }
    ]
  },
  {
    id: "title-iv",
    name: "Title IV Certificate Programs",
    programs: [
      {
        name: "Emergency Medical Services",
        description: "Prepares students for careers as emergency medical technicians.",
        contact: "740.753.7141",
        email: "ems@hocking.edu"
      },
      {
        name: "Fire Science",
        description: "Provides training for firefighting and emergency services.",
        contact: "740.753.7141",
        email: "fire@hocking.edu"
      }
    ]
  },
  {
    id: "non-title-iv",
    name: "Non-Title IV Certificate Programs",
    programs: [
      {
        name: "Wildlife Management",
        description: "Certificate program in wildlife management and conservation.",
        contact: "740.753.7141",
        email: "wildlife@hocking.edu"
      },
      {
        name: "Forest Management",
        description: "Certificate program in forest management practices.",
        contact: "740.753.7141",
        email: "forestry@hocking.edu"
      }
    ]
  }
];

export default function CourseCatalog() {
  const [activeTab, setActiveTab] = useState("allied-health");

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
          <Tabs defaultValue="allied-health" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 gap-2 mb-4">
              {courses.map((school) => (
                <TabsTrigger key={school.id} value={school.id}>
                  {school.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {courses.map((school) => (
              <TabsContent key={school.id} value={school.id}>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">{school.name}</h2>
                  <div className="grid gap-4">
                    {school.programs.map((program, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <h3 className="font-semibold mb-2">{program.name}</h3>
                          <p className="text-sm text-neutral-dark mb-4">{program.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="font-medium">Contact:</span> {program.contact}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span> {program.email}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 