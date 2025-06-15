import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for academic history - replace with actual data
const semesters = [
  {
    term: "Fall 2023",
    courses: [
      { code: "ENG 1101", name: "English Composition I", credits: 3, grade: "A" },
      { code: "MATH 1101", name: "College Algebra", credits: 3, grade: "B+" },
      { code: "BIO 1101", name: "General Biology", credits: 4, grade: "A-" },
    ],
  },
  {
    term: "Spring 2024",
    courses: [
      { code: "ENG 1102", name: "English Composition II", credits: 3, grade: "A" },
      { code: "PSY 1101", name: "Introduction to Psychology", credits: 3, grade: "B" },
      { code: "HIS 1101", name: "World History", credits: 3, grade: "A" },
    ],
  },
];

export default function AcademicHistory() {
  const [activeTab, setActiveTab] = useState("transcript");

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

      <h1 className="text-2xl font-bold text-primary mb-6">Academic History</h1>

      <Card className="mb-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Transcript</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="unofficial">Unofficial Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="transcript">
              <div className="space-y-6">
                <div className="bg-primary-light/5 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">Academic Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-neutral-dark">GPA</p>
                      <p className="text-lg font-semibold">3.75</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-dark">Credits Earned</p>
                      <p className="text-lg font-semibold">19</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-dark">Credits In Progress</p>
                      <p className="text-lg font-semibold">9</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-dark">Credits Remaining</p>
                      <p className="text-lg font-semibold">32</p>
                    </div>
                  </div>
                </div>

                {semesters.map((semester) => (
                  <div key={semester.term} className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">{semester.term}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-light">
                            <th className="text-left py-2">Course</th>
                            <th className="text-left py-2">Name</th>
                            <th className="text-center py-2">Credits</th>
                            <th className="text-center py-2">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {semester.courses.map((course) => (
                            <tr key={course.code} className="border-b border-neutral-light">
                              <td className="py-2">{course.code}</td>
                              <td className="py-2">{course.name}</td>
                              <td className="text-center py-2">{course.credits}</td>
                              <td className="text-center py-2 font-semibold">{course.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unofficial">
              <div className="space-y-6">
                <div className="bg-primary-light/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Request Unofficial Transcript</h3>
                  <p className="text-sm text-neutral-dark mb-4">
                    Download your unofficial transcript for personal use or to share with advisors.
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                  >
                    Download Unofficial Transcript
                  </a>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Official Transcript</h3>
                  <div className="p-4 border border-neutral-light rounded-lg">
                    <p className="text-sm text-neutral-dark mb-4">
                      To request an official transcript, please visit the Registrar's Office or use the online request form.
                    </p>
                    <a
                      href="#"
                      className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                    >
                      Request Official Transcript
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