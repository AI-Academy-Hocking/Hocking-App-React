import { useState } from "react";
import { ArrowLeft, Calendar, FileText, GraduationCap, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Sample graduation requirements - this would be replaced with actual data from the catalog
const requirements = [
  {
    category: "Credit Requirements",
    items: [
      "Complete a minimum of 60 semester credit hours",
      "Maintain a minimum cumulative GPA of 2.0",
      "Complete all required courses in your program",
      "Complete at least 15 semester credit hours at Hocking College"
    ]
  },
  {
    category: "General Education Requirements",
    items: [
      "Complete all required general education courses",
      "Meet the Success Skills requirements",
      "Complete any program-specific general education requirements"
    ]
  },
  {
    category: "Program Requirements",
    items: [
      "Complete all required courses in your major",
      "Meet any program-specific requirements",
      "Complete any required internships or clinical experiences"
    ]
  }
];

// Sample important dates - this would be replaced with actual data from the catalog
const importantDates = [
  {
    date: "March 1, 2024",
    event: "Spring Graduation Application Deadline",
    description: "Last day to apply for Spring 2024 graduation"
  },
  {
    date: "May 10, 2024",
    event: "Spring Commencement Ceremony",
    description: "Spring 2024 graduation ceremony"
  },
  {
    date: "October 1, 2024",
    event: "Fall Graduation Application Deadline",
    description: "Last day to apply for Fall 2024 graduation"
  },
  {
    date: "December 13, 2024",
    event: "Fall Commencement Ceremony",
    description: "Fall 2024 graduation ceremony"
  }
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

      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-2xl text-primary">Graduation</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="requirements" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
              <TabsTrigger value="dates">Important Dates</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <div className="space-y-6">
                {requirements.map((category, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="application">
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Graduation Application</h3>
                    <div className="space-y-4">
                      <p className="text-neutral-dark">
                        To apply for graduation, you must complete the following steps:
                      </p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Meet with your academic advisor to review your progress</li>
                        <li>Complete the graduation application form</li>
                        <li>Pay the graduation fee</li>
                        <li>Submit any required documentation</li>
                      </ol>
                      <div className="flex gap-4 mt-6">
                        <Button className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Download Application
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          View Commencement Info
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Graduation Resources</h3>
                    <div className="space-y-2">
                      <Link href="/graduation-checklist" className="block p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition">
                        Graduation Checklist
                      </Link>
                      <Link href="/commencement" className="block p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition">
                        Commencement Information
                      </Link>
                      <Link href="/faq" className="block p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition">
                        Graduation FAQ
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="dates">
              <div className="space-y-6">
                {importantDates.map((date, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">{date.event}</h3>
                          <p className="text-sm text-neutral-dark">{date.description}</p>
                          <p className="text-sm font-medium mt-1">{date.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 
