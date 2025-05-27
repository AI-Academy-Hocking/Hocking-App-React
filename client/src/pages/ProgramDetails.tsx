import React from 'react';
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const programs = [
  { 
    id: '1', 
    name: 'Computer Science',
    description: 'Our Computer Science program prepares students for careers in software development, systems analysis, and other technology-focused roles.',
    courses: ['Introduction to Programming', 'Data Structures', 'Database Systems', 'Web Development', 'Software Engineering'],
    careers: ['Software Developer', 'Systems Analyst', 'Database Administrator', 'Web Developer']
  },
  { 
    id: '2', 
    name: 'Business Administration',
    description: 'The Business Administration program provides a comprehensive foundation in business principles, management, and entrepreneurship.',
    courses: ['Business Fundamentals', 'Marketing Principles', 'Financial Accounting', 'Business Law', 'Strategic Management'],
    careers: ['Business Manager', 'Marketing Specialist', 'Financial Analyst', 'Entrepreneur']
  },
  { 
    id: '3', 
    name: 'Psychology',
    description: 'Our Psychology program explores human behavior and mental processes, preparing students for careers in counseling and research.',
    courses: ['Introduction to Psychology', 'Developmental Psychology', 'Abnormal Psychology', 'Research Methods', 'Cognitive Psychology'],
    careers: ['Counselor', 'Research Assistant', 'Human Resources Specialist', 'Mental Health Worker']
  },
  { 
    id: '4', 
    name: 'Biology',
    description: 'The Biology program offers comprehensive study of living organisms, preparing students for careers in healthcare and research.',
    courses: ['General Biology', 'Cell Biology', 'Genetics', 'Ecology', 'Human Anatomy'],
    careers: ['Research Scientist', 'Laboratory Technician', 'Environmental Consultant', 'Healthcare Professional']
  },
  { 
    id: '5', 
    name: 'Mathematics',
    description: 'Our Mathematics program develops strong analytical and problem-solving skills, preparing students for various technical careers.',
    courses: ['Calculus', 'Linear Algebra', 'Differential Equations', 'Statistics', 'Number Theory'],
    careers: ['Data Analyst', 'Statistician', 'Actuary', 'Mathematics Teacher']
  }
];

export default function ProgramDetails() {
  const [, params] = useRoute<{ id: string }>("/programs/:id");
  const programId = params?.id;
  const program = programs.find(p => p.id === programId);

  if (!program) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Program not found</p>
            <Link href="/home">
              <a className="block mt-4 text-center text-primary hover:text-primary-dark">
                Return to Home
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/home">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{program.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{program.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Curriculum</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {program.courses.map((course, index) => (
              <li key={index} className="text-gray-600">{course}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Career Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {program.careers.map((career, index) => (
              <li key={index} className="text-gray-600">{career}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 