import React from 'react';
import { ArrowLeft, BookOpen, Phone, Mail, Users, Clock, Brain, Calculator, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function LearningLabs() {
  const [activeTab, setActiveTab] = React.useState("math");

  const labs = [
    {
      id: "math",
      title: "Math Center for Excellence",
      description: "Get help with mathematics courses and develop your problem-solving skills",
      contact: {
        name: "Adam Phillips",
        phone: "740-753-6498",
        email: "phillipsa@hocking.edu"
      },
      icon: Calculator,
      subjects: ["Algebra", "Calculus", "Statistics", "Math Fundamentals"],
      hours: "Monday - Friday: 9:00 AM - 5:00 PM"
    },
    {
      id: "ap-nursing",
      title: "A&P/Nursing Center for Excellence",
      description: "Specialized support for Anatomy & Physiology and Nursing courses",
      contact: {
        name: "Alexander Arrington",
        phone: "740-753-6369",
        email: "arringtona@hocking.edu"
      },
      icon: Stethoscope,
      subjects: ["Anatomy", "Physiology", "Nursing Fundamentals", "Medical Terminology"],
      hours: "Monday - Friday: 9:00 AM - 5:00 PM"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/academic-success">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Academic Success Center</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Brain className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Learning Labs</h1>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">About Learning Labs</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-lg mb-4">
            The Learning Labs are subject-focused centers where students work toward success in collaboration with on-site instructors.
            Our dedicated staff provides personalized assistance to help you excel in your coursework.
          </p>
          <div className="flex items-center gap-2 text-blue-600">
            <Users className="h-5 w-5" />
            <span className="font-medium">One-on-one and group tutoring available</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labs.map((lab) => (
          <Card key={lab.id} className="overflow-hidden">
            <CardHeader className="bg-primary-light/10">
              <div className="flex items-center gap-3">
                <lab.icon className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-xl">{lab.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-4">{lab.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>{lab.hours}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a href={`tel:${lab.contact.phone}`} className="hover:text-blue-600">
                    {lab.contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a href={`mailto:${lab.contact.email}`} className="hover:text-blue-600">
                    {lab.contact.email}
                  </a>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Subjects Covered:</h3>
                  <div className="flex flex-wrap gap-2">
                    {lab.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="ghost" className="w-full mt-4">
                  Schedule Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <BookOpen className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Study Materials</h3>
                <p>Access practice problems, study guides, and reference materials</p>
                <Button variant="ghost" className="mt-2">View Resources</Button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Group Study Sessions</h3>
                <p>Join peer study groups and collaborative learning sessions</p>
                <Button variant="ghost" className="mt-2">Find Groups</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LearningLabs; 