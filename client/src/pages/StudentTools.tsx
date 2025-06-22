import { Card } from "@/components/ui/card";
import { 
  BookOpen, FileText, GraduationCap, Briefcase,
  School, LibraryBig, MonitorSmartphone, 
  Users, Dumbbell, Utensils, Calendar,
  DoorOpen  
} from "lucide-react";
import { Link } from "wouter";

type StudentTool = {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
};

export default function StudentTools() {
  
  // Define academic tools with proper routing to the academic tool pages
  const academicTools = [
    {
      id: 'course-catalog',
      name: 'Course Catalog',
      description: 'Browse all academic programs and course offerings',
      category: 'academic',
      url: '/tools/academic/course-catalog'
    },
    {
      id: 'graduation',
      name: 'Graduation',
      description: 'Graduation requirements, application process, and important dates',
      category: 'academic',
      url: '/tools/academic/graduation'
    },
    {
      id: 'office-administration',
      name: 'Office & Administration',
      description: 'Contact information for key administrative offices',
      category: 'academic',
      url: '/tools/academic/office-administration'
    },
    {
      id: 'career-university-center',
      name: 'Career & University Center',
      description: 'Career counseling, resume building, and transfer services',
      category: 'academic',
      url: '/tools/academic/career-university-center'
    },
    {
      id: 'advising',
      name: 'Academic Advising',
      description: 'Connect with your academic advisor and access advising resources',
      category: 'academic',
      url: '/tools/academic/advising'
    }
  ];

  // Map of icons to use for tools
  const toolIcons: Record<string, any> = {
    'course-catalog': BookOpen,
    'graduation': GraduationCap,
    'office-administration': Briefcase,
    'career-university-center': Briefcase,
    'advising': School,
    'library': LibraryBig,
    'online-learning': MonitorSmartphone,
    'student-organizations': Users,
    'recreation': Dumbbell,
    'dining': Utensils,
    'events': Calendar,
  };

  // Quick links for bottom section
  const quickLinks = [
    { id: 'library', label: 'Library', icon: LibraryBig, path: '/library' },
    { id: 'online-learning', label: 'Online Learning', icon: MonitorSmartphone, path: '/online-learning' },
    { id: 'student-organizations', label: 'Student Organizations', icon: Users, path: '/student-organizations' },
    { id: 'recreation', label: 'Recreation', icon: Dumbbell, path: '/recreation' },
    { id: 'dining', label: 'Dining', icon: Utensils, path: '/dining' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/calendar' },
    { id: 'housing', label: 'Housing', icon: DoorOpen, path: '/housing' }, 
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-center">Academic Tools</h2>
        
        <Card className="overflow-hidden p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicTools.map((tool) => {
              const Icon = toolIcons[tool.id] || FileText;
              return (
                <Link
                  key={tool.id}
                  href={tool.url}
                  className="flex items-center p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition"
                >
                  <Icon className="text-blue-600 mr-3 h-5 w-5" />
                  <div>
                    <h3 className={`font-semibold ${tool.id === 'course-catalog' || tool.id === 'graduation' ? 'text-blue-600' : ''}`}>{tool.name}</h3>
                    <p className={`text-sm ${tool.id === 'course-catalog' || tool.id === 'graduation' ? 'text-blue-600' : 'text-neutral-dark'}`}>{tool.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link 
              key={link.id} 
              href={link.path}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition"
            >
              <link.icon className="text-blue-600 text-3xl mb-2 h-8 w-8" />
              <span className="font-semibold">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
