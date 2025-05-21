
import React from 'react';
import { Users, Calendar, Mail, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StudentOrganizationsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6">Student Organizations</h1>
      
      <p className="mb-6">Hocking College offers a variety of student organizations to enhance your college experience, develop leadership skills, and connect with peers who share your interests.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl text-primary">Student Government Association</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4">The voice of the student body, advocating for student interests and organizing campus events.</p>
            <div className="flex items-center gap-2 text-neutral-dark">
              <Calendar className="h-4 w-4" />
              <span>Meetings: Every Tuesday, 5:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-dark mt-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:sga@hocking.edu" className="text-primary hover:underline">sga@hocking.edu</a>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl text-primary">Outdoor Adventure Club</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4">Experience hiking, camping, rock climbing, and more with fellow adventure enthusiasts.</p>
            <div className="flex items-center gap-2 text-neutral-dark">
              <Calendar className="h-4 w-4" />
              <span>Meetings: Every Wednesday, 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-dark mt-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:adventure@hocking.edu" className="text-primary hover:underline">adventure@hocking.edu</a>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl text-primary">Arts & Culture Society</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4">Celebrates diversity through art exhibitions, performances, and cultural events.</p>
            <div className="flex items-center gap-2 text-neutral-dark">
              <Calendar className="h-4 w-4" />
              <span>Meetings: Every Thursday, 5:30 PM</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-dark mt-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:arts@hocking.edu" className="text-primary hover:underline">arts@hocking.edu</a>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl text-primary">Future Business Leaders</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4">Develop professional skills through networking events, guest speakers, and business competitions.</p>
            <div className="flex items-center gap-2 text-neutral-dark">
              <Calendar className="h-4 w-4" />
              <span>Meetings: Every Monday, 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-dark mt-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:business@hocking.edu" className="text-primary hover:underline">business@hocking.edu</a>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Start Your Own Organization</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="mb-4">Have an idea for a new student organization? We're here to help you get started!</p>
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Contact the Student Life Office</p>
              <p className="text-neutral-dark">Email: <a href="mailto:studentlife@hocking.edu" className="text-primary hover:underline">studentlife@hocking.edu</a></p>
              <p className="text-neutral-dark">Phone: <a href="tel:7407536462" className="text-primary hover:underline">(740) 753-6462</a></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentOrganizationsPage;
