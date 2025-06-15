import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Sample data for degree requirements - replace with actual data
const degreeRequirements = [
  {
    category: "General Education",
    requirements: [
      { name: "English Composition", credits: 6, completed: 6 },
      { name: "Mathematics", credits: 3, completed: 3 },
      { name: "Natural Sciences", credits: 6, completed: 3 },
      { name: "Social Sciences", credits: 6, completed: 6 },
      { name: "Humanities", credits: 3, completed: 3 },
    ],
  },
  {
    category: "Program Requirements",
    requirements: [
      { name: "Core Courses", credits: 24, completed: 18 },
      { name: "Electives", credits: 12, completed: 6 },
      { name: "Capstone Project", credits: 3, completed: 0 },
    ],
  },
];

export default function Graduation() {
  const [activeTab, setActiveTab] = useState("requirements");

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

      <h1 className="text-2xl font-bold text-primary mb-6">Graduation Requirements</h1>

      <Card className="mb-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Degree Progress</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="requirements" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="graduation">Graduation Info</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <div className="space-y-6">
                {degreeRequirements.map((category) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">{category.category}</h3>
                    {category.requirements.map((req) => (
                      <div key={req.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{req.name}</span>
                          <span className="text-sm text-neutral-dark">
                            {req.completed}/{req.credits} credits
                          </span>
                        </div>
                        <Progress value={(req.completed / req.credits) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="graduation">
              <div className="space-y-6">
                <div className="bg-primary-light/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Graduation Application</h3>
                  <p className="text-sm text-neutral-dark mb-4">
                    Submit your graduation application at least one semester before your expected graduation date.
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                  >
                    Apply for Graduation
                  </a>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Important Dates</h3>
                  <div className="grid gap-4">
                    <div className="p-4 border border-neutral-light rounded-lg">
                      <h4 className="font-medium mb-1">Spring 2024 Graduation</h4>
                      <p className="text-sm text-neutral-dark">Application Deadline: February 1, 2024</p>
                      <p className="text-sm text-neutral-dark">Ceremony Date: May 11, 2024</p>
                    </div>
                    <div className="p-4 border border-neutral-light rounded-lg">
                      <h4 className="font-medium mb-1">Summer 2024 Graduation</h4>
                      <p className="text-sm text-neutral-dark">Application Deadline: June 1, 2024</p>
                      <p className="text-sm text-neutral-dark">Ceremony Date: August 3, 2024</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Graduation Resources</h3>
                  <div className="grid gap-4">
                    <a href="#" className="p-4 border border-neutral-light rounded-lg hover:bg-neutral-lightest transition">
                      <h4 className="font-medium mb-1">Graduation Checklist</h4>
                      <p className="text-sm text-neutral-dark">Step-by-step guide to graduation</p>
                    </a>
                    <a href="#" className="p-4 border border-neutral-light rounded-lg hover:bg-neutral-lightest transition">
                      <h4 className="font-medium mb-1">Cap & Gown Information</h4>
                      <p className="text-sm text-neutral-dark">Order your graduation regalia</p>
                    </a>
                    <a href="#" className="p-4 border border-neutral-light rounded-lg hover:bg-neutral-lightest transition">
                      <h4 className="font-medium mb-1">Graduation Ceremony Details</h4>
                      <p className="text-sm text-neutral-dark">Information about the ceremony</p>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 