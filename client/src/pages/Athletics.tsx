import React from 'react';
import { ArrowLeft, Trophy, Phone, Mail, Users, Award, Target, Circle, Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LucideIcon } from 'lucide-react';

interface Sport {
  name: string;
  icon: LucideIcon;
}

function Athletics() {
  const sports: Sport[] = [
    { name: "Archery", icon: Target },
    { name: "Men's Basketball", icon: Circle },
    { name: "Women's Basketball", icon: Circle },
    { name: "Cheerleading", icon: Users },
    { name: "Football", icon: Circle },
    { name: "Women's Volleyball", icon: Trophy },
    { name: "Baseball", icon: Circle },
    { name: "Softball", icon: Circle },
    { name: "Cross Country", icon: Award },
    { name: "Men's Bowling", icon: Award },
    { name: "Women's Bowling", icon: Award },
    { name: "Men's Tennis", icon: Award },
    { name: "Women's Tennis", icon: Award },
    { name: "Men's Track & Field", icon: Award },
    { name: "Women's Track & Field", icon: Award },
    { name: "eSports", icon: Gamepad2 }
  ];

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

      <div className="flex items-center gap-4 mb-8">
        <Trophy className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Athletics</h1>
      </div>

      <Alert className="mb-6">
        <Trophy className="h-4 w-4" />
        <AlertDescription>
          Welcome to Hocking College Athletics! We're committed to excellence in both athletics and academics.
        </AlertDescription>
      </Alert>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Mission Statement</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-neutral-dark mb-4">
            The mission of the Department of Intercollegiate Athletics at Hocking College is to provide opportunities for participation in intercollegiate athletics in an environment that encourages the achievement of athletic excellence and good sportsmanship. We are committed to maintaining a passion for providing the proper balance between participation in athletics and the educational and social life common to all students.
          </p>
          <div className="space-y-2">
            <h3 className="font-semibold">Within this environment we seek to:</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-dark">
              <li>Foster the pursuit of academic excellence</li>
              <li>Enhance opportunities for intercollegiate athletic competition and the achievement of individual and team championship performance</li>
              <li>Support and encourage service to others</li>
              <li>Be a source of pride for the College</li>
            </ul>
          </div>
          <p className="text-neutral-dark mt-4">
            The Hocking College Department of Intercollegiate Athletics conducts programs consistent with both the letter and spirit of the policies and regulations set forth by the National Junior College Athletic Association (NJCAA), the Ohio Community College Athletic Conference (OCCAC), the United States of America Archery Program (USA Archery), the United States Collegiate Archery Association (USCA), and Hocking College. The mission of the Department is, and shall always remain, compatible with the mission of the College.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Administration</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Rick Walker</h3>
                <p className="text-neutral-dark">Director of Athletics</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a href="tel:740-753-7012" className="hover:text-blue-600">(740) 753-7012</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <a href="mailto:Walkerr1@hocking.edu" className="hover:text-blue-600">Walkerr1@hocking.edu</a>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Craig Moore</h3>
                <p className="text-neutral-dark">Associate Athletic Director/Head Football Coach</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a href="tel:740-753-6173" className="hover:text-blue-600">(740) 753-6173</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <a href="mailto:moorec21743@hocking.edu" className="hover:text-blue-600">moorec21743@hocking.edu</a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Sports Programs</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sports.map((sport, index) => (
              <div key={index} className="flex items-center gap-2 p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition">
                <sport.icon className="h-5 w-5 text-blue-600" />
                <span className="font-medium">{sport.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <a href="tel:740-753-6073" className="hover:text-blue-600">
                (740) 753-6073
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <a href="mailto:athletics@hocking.edu" className="hover:text-blue-600">
                athletics@hocking.edu
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Athletics; 