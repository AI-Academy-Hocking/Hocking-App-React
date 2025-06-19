import React from 'react';
import { ArrowLeft, MessageSquare, Pencil, Clock, MapPin, Mail, ChevronDown, ChevronUp, Calendar, Video, Users, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Custom icon for Tutoring (chat bubble with pencil)
const ChatWithPencil = () => (
  <div className="relative">
    <MessageSquare className="h-8 w-8 text-blue-600" />
    <Pencil className="h-4 w-4 text-blue-600 absolute bottom-0 right-0" />
  </div>
);

interface TutorInfo {
  name: string;
  email: string;
  location?: string;
  hours?: string;
  specialties: string[];
  appointmentType: string;
  isVirtual?: boolean;
  isInPerson?: boolean;
}

interface CenterInfo {
  name: string;
  location: string;
  hours: string;
  services: string[];
  tutors: TutorInfo[];
}

function Tutoring() {
  const [openCenter, setOpenCenter] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState<string>("all");

  const centers: CenterInfo[] = [
    {
      name: "Communication Center for Excellence",
      location: "Oakley 207-209",
      hours: "Mon-Fri 9AM-5PM",
      services: [
        "Virtual and in person",
        "Walk-in and by appointment"
      ],
      tutors: [
        {
          name: "Rebecca Grubb",
          email: "grubbr@hocking.edu",
          specialties: ["English", "Speech", "Writing", "Communications", "TEAS Reading: English and Language Usage"],
          appointmentType: "Walk-in and by appointment",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "Hannah Schenk",
          email: "schenkh@hocking.edu",
          specialties: ["English", "Speech", "Writing", "Communications"],
          appointmentType: "Walk-in and by appointment",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "Ben Yussif",
          email: "yussifb@hocking.edu",
          specialties: ["English", "Speech", "Writing", "Communications"],
          appointmentType: "Walk-in and by appointment",
          isVirtual: true,
          isInPerson: true
        }
      ]
    },
    {
      name: "Mathematics Center for Excellence",
      location: "Academic Success Center/Library",
      hours: "Mon-Fri 8AM-5PM",
      services: [
        "Virtual and in-person",
        "Walk-in and by appointment"
      ],
      tutors: [
        {
          name: "Adam Phillips",
          email: "phillipsa@hocking.edu",
          specialties: ["Applied Mathematics", "College Algebra", "Statistics", "Physics", "TEAS Mathematics", "Nursing Dosage Calc."],
          appointmentType: "Walk-in or Book an appointment",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "James Daniels",
          email: "danielsj2@hocking.edu",
          specialties: ["Applied Mathematics", "College Algebra", "Statistics", "Physics", "TEAS Mathematics"],
          appointmentType: "Walk-in or Book an appointment",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "Elliot Wozniak",
          email: "wozniake@hocking.edu",
          specialties: ["Applied Mathematics", "College Algebra", "Statistics", "Physics"],
          appointmentType: "Walk-in or Book an appointment",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "Samantha Benito",
          email: "benitos@hocking.edu",
          specialties: ["Applied Mathematics", "College Algebra", "Statistics", "Physics"],
          appointmentType: "Walk-in or Book an appointment",
          isVirtual: true,
          isInPerson: true
        }
      ]
    },
    {
      name: "A&P/Nursing Center for Excellence",
      location: "Library",
      hours: "Thursdays 8-12, Fridays 8-5, Every other Wednesday",
      services: [
        "Book an appointment",
        "Contact via email to schedule"
      ],
      tutors: [
        {
          name: "Alexander Arrington",
          email: "arringtona@hocking.edu",
          specialties: ["A&P", "Microbiology", "Nursing", "Human Organism", "TEAS Science"],
          appointmentType: "Book an appointment",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "Jennifer Agyeman",
          email: "agyemanj@hocking.edu",
          specialties: ["Nursing"],
          appointmentType: "Book an appointment",
          isVirtual: true,
          isInPerson: true
        }
      ]
    },
    {
      name: "Additional Tutors",
      location: "Various Locations",
      hours: "Varies by tutor",
      services: [
        "Book an appointment",
        "Contact via email to schedule"
      ],
      tutors: [
        {
          name: "Roger Barrows",
          email: "barrowsr@hocking.edu",
          location: "Academic Success Center/Testing Center",
          specialties: ["College Algebra", "Math 1103"],
          appointmentType: "Contact via email to schedule",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "LaDora Ousley",
          email: "ousleyl@hocking.edu",
          location: "Library",
          specialties: ["Intro to Entrepreneurship"],
          appointmentType: "Book an appointment or contact via email to schedule",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "David Herold",
          email: "heroldd@hocking.edu",
          location: "Academic Success Center DVD 114",
          specialties: ["Academic Coaching", "Assistive Technology"],
          appointmentType: "Book an appointment or contact via email to schedule",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "Samuel Dewey",
          email: "deweys@hocking.edu",
          location: "Library and Virtual",
          hours: "Mon 6:30-8:00 PM*, Tue 6:30-8:00 PM*, Wed 6:30-8:00 PM*, Thur 10:00-2:00 PM*",
          specialties: [
            "All PTA classes",
            "A&P I and II",
            "Statistics",
            "College Algebra",
            "Applied Mathematics",
            "All business Classes",
            "Finance Accounting I ECON",
            "Fitness Management"
          ],
          appointmentType: "Book an appointment (email for different arrangements)",
          isVirtual: true,
          isInPerson: true
        },
        {
          name: "Gina Fetty",
          email: "fettyg@hocking.edu",
          location: "Course room and virtual",
          specialties: ["Financial Accounting I and II"],
          appointmentType: "Email to schedule an appointment",
          isVirtual: true,
          isInPerson: true
        }
      ]
    }
  ];

  const allSubjects = React.useMemo(() => {
    const subjects = new Set<string>();
    centers.forEach(center => {
      center.tutors.forEach(tutor => {
        tutor.specialties.forEach(specialty => {
          subjects.add(specialty);
        });
      });
    });
    return Array.from(subjects).sort();
  }, [centers]);

  const filteredCenters = React.useMemo(() => {
    return centers.map(center => ({
      ...center,
      tutors: center.tutors.filter(tutor => {
        const matchesSearch = searchQuery === "" || 
          tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesSubject = selectedSubject === "all" ||
          tutor.specialties.includes(selectedSubject);

        return matchesSearch && matchesSubject;
      })
    })).filter(center => center.tutors.length > 0);
  }, [centers, searchQuery, selectedSubject]);

  const handleBookAppointment = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

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
        <ChatWithPencil />
        <h1 className="text-3xl font-bold text-primary">Tutoring Services</h1>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search tutors or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {allSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Tutoring Services Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <p className="text-lg">Walk-in and by appointment</p>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <p className="text-lg">Virtual and in-person tutoring available</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <p className="text-lg">Flexible scheduling options</p>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <p className="text-lg">Expert tutors in various subjects</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">*Scroll down for the most recent 2025 Semester Updates.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {filteredCenters.map((center, index) => (
          <Collapsible
            key={index}
            open={openCenter === center.name}
            onOpenChange={(isOpen) => setOpenCenter(isOpen ? center.name : null)}
          >
            <Card>
              <CardHeader className="bg-primary-light/10">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full flex justify-between items-center p-0">
                    <div className="flex items-center gap-3">
                      <ChatWithPencil />
                      <CardTitle className="text-xl">{center.name}</CardTitle>
                    </div>
                    {openCenter === center.name ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <p className="text-lg">Location: {center.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <p className="text-lg">Hours: {center.hours}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Services:</h3>
                      <ul className="list-disc list-inside">
                        {center.services.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Tutors:</h3>
                      {center.tutors.map((tutor, i) => (
                        <div key={i} className="border-t pt-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-blue-600" />
                            <p className="text-lg font-medium">{tutor.name}</p>
                          </div>
                          <div className="ml-7 space-y-2">
                            <p className="text-blue-600">{tutor.email}</p>
                            {tutor.location && (
                              <p>Location: {tutor.location}</p>
                            )}
                            {tutor.hours && (
                              <p>Hours: {tutor.hours}</p>
                            )}
                            <p>Appointment: {tutor.appointmentType}</p>
                            <div className="flex gap-2">
                              {tutor.isVirtual && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-sm">
                                  <Video className="h-4 w-4" />
                                  Virtual
                                </span>
                              )}
                              {tutor.isInPerson && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-sm">
                                  <Users className="h-4 w-4" />
                                  In-Person
                                </span>
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="font-medium">Specialties:</p>
                              <ul className="list-disc list-inside">
                                {tutor.specialties.map((specialty, j) => (
                                  <li key={j}>{specialty}</li>
                                ))}
                              </ul>
                            </div>
                            <Button
                              onClick={() => handleBookAppointment(tutor.email)}
                              className="mt-2"
                            >
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">How do I schedule a tutoring session?</h3>
                <p>You can schedule a session by clicking the "Book Appointment" button next to your preferred tutor, or by emailing them directly.</p>
              </div>
              <div>
                <h3 className="font-semibold">What subjects are available for tutoring?</h3>
                <p>We offer tutoring in various subjects including Mathematics, English, Science, Business, and more. Use the subject filter above to find specific subjects.</p>
              </div>
              <div>
                <h3 className="font-semibold">Is virtual tutoring available?</h3>
                <p>Yes, many of our tutors offer both virtual and in-person sessions. Look for the virtual badge next to tutor information.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Tutoring; 