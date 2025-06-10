import React from 'react';
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, Clock, BookOpen, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";

interface ProgramDetails {
  id: string;
  name: string;
  category: string;
  details: {
    title: string;
    description: string;
    courses: string[];
    careers: string[];
    degreeType: string;
    programLength: string;
    lastUpdated: string;
  } | null;
}

export default function ProgramDetails() {
  const [, params] = useRoute<{ id: string }>("/programs/:id");
  const programId = params?.id;

  const { data: program, isLoading, error } = useQuery<ProgramDetails>({
    queryKey: ['program', programId],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/programs/${programId}`);
        if (!response.ok) {
          console.error('Program fetch failed:', await response.text());
          throw new Error('Program not found');
        }
        const data = await response.json();
        console.log('Fetched program data:', data);
        return data;
      } catch (err) {
        console.error('Error fetching program:', err);
        throw err;
      }
    },
    enabled: !!programId
  });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Skeleton className="h-8 w-64" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !program) {
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
        <div>
          <h1 className="text-2xl font-bold">{program.name}</h1>
          <p className="text-sm text-gray-500">{program.category}</p>
        </div>
      </div>

      {program.details ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Degree Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {program.details.degreeType && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Degree Type:</span> {program.details.degreeType}
                    </p>
                  )}
                  {program.details.programLength && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Program Length:</span> {program.details.programLength}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Last Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {new Date(program.details.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Program Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-line">{program.details.description}</p>
            </CardContent>
          </Card>

          {program.details.courses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {program.details.courses.map((course, index) => (
                    <li key={index} className="text-gray-600">{course}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {program.details.careers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {program.details.careers.map((career, index) => (
                    <li key={index} className="text-gray-600">{career}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-gray-500">
              Program details are currently being updated. Please check back later.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 