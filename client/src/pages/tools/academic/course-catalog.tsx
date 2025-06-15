import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for programs - replace with actual data
const programs = [
  {
    category: "Natural Resources",
    programs: [
      "Wildlife Resources Management",
      "Forestry",
      "Natural Resources Law Enforcement",
      "Parks and Recreation",
    ],
  },
  {
    category: "Public Safety",
    programs: [
      "Criminal Justice",
      "Fire Science",
      "Emergency Medical Services",
      "Law Enforcement",
    ],
  },
  {
    category: "Health Sciences",
    programs: [
      "Nursing",
      "Physical Therapist Assistant",
      "Medical Laboratory Technology",
      "Radiologic Technology",
    ],
  },
  {
    category: "Business & Hospitality",
    programs: [
      "Business Management",
      "Culinary Arts",
      "Hospitality Management",
      "Tourism Management",
    ],
  },
];

export default function CourseCatalog() {
  const [activeTab, setActiveTab] = useState("overview");

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

      <h1 className="text-2xl font-bold text-primary mb-6">Course Catalog</h1>

      <Card className="mb-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Academic Programs</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="overview">Program Overview</TabsTrigger>
              <TabsTrigger value="catalog">Full Catalog</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                {programs.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.programs.map((program) => (
                        <div
                          key={program}
                          className="p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition"
                        >
                          {program}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="catalog">
              <div className="aspect-[3/4] w-full max-w-3xl mx-auto">
                <iframe
                  src="https://www.hocking.edu/sites/default/files/2024-01/2023-2024%20Academic%20Catalog.pdf"
                  className="w-full h-full rounded-lg border border-neutral-light"
                  title="Hocking College Academic Catalog"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 