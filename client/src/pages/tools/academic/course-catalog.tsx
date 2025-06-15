import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample course data - this would be replaced with actual data from the catalog
const courses = [
  {
    id: "allied-health",
    name: "School of Allied Health and Nursing",
    programs: [
      {
        name: "Nursing",
        description: "Prepare for a career in nursing with hands-on training and clinical experience.",
        contact: "740.753.6350"
      },
      {
        name: "Medical Assisting",
        description: "Learn essential skills for medical office procedures and patient care.",
        contact: "740.753.6350"
      }
    ]
  },
  {
    id: "arts-science",
    name: "School of Arts and Science",
    programs: [
      {
        name: "Business Management",
        description: "Develop skills in business operations, management, and leadership.",
        contact: "740.753.7122"
      },
      {
        name: "Criminal Justice",
        description: "Prepare for careers in law enforcement, corrections, and security.",
        contact: "740.753.7122"
      }
    ]
  },
  {
    id: "natural-resources",
    name: "School of Natural Resources and Public Safety",
    programs: [
      {
        name: "Wildlife Resources",
        description: "Study wildlife management, conservation, and environmental science.",
        contact: "740.753.6304"
      },
      {
        name: "Forestry",
        description: "Learn sustainable forest management and conservation practices.",
        contact: "740.753.6304"
      }
    ]
  },
  {
    id: "workforce",
    name: "School of Workforce Development",
    programs: [
      {
        name: "Industrial Technology",
        description: "Gain skills in manufacturing, maintenance, and industrial processes.",
        contact: "740.753.7018"
      },
      {
        name: "Welding Technology",
        description: "Master welding techniques and industrial fabrication.",
        contact: "740.753.7018"
      }
    ]
  }
];

export default function CourseCatalog() {
  const [activeTab, setActiveTab] = useState("allied-health");

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

      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-2xl text-primary">Course Catalog</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="allied-health" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              {courses.map((school) => (
                <TabsTrigger key={school.id} value={school.id}>
                  {school.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {courses.map((school) => (
              <TabsContent key={school.id} value={school.id}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{school.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {school.programs.map((program, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <h4 className="font-semibold mb-2">{program.name}</h4>
                          <p className="text-sm text-neutral-dark mb-4">{program.description}</p>
                          <p className="text-sm">
                            <span className="font-medium">Contact:</span> {program.contact}
                          </p>
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