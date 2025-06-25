import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, FileText, GraduationCap, UserCheck, 
  History, School, LibraryBig, MonitorSmartphone, 
  Users, Dumbbell, Utensils, Calendar, Home, Trophy, Briefcase
} from "lucide-react";
import { Link } from "wouter";

// Define the StudentTool interface locally since we can't import it
interface StudentTool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
}

export default function StudentTools() {
  const [activeTab, setActiveTab] = useState("academic");
  
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

  // Define financial tools
  const financialTools: StudentTool[] = [
    {
      id: 'financial-aid',
      name: 'Financial Aid',
      description: 'Apply for financial aid, scholarships, and payment plans',
      category: 'financial',
      url: '/financial-aid'
    },
    {
      id: 'payment-plan',
      name: 'Payment Plans',
      description: 'Set up payment plans and manage your account',
      category: 'financial',
      url: '/payment-plan'
    }
  ];

  // Define resource tools
  const resourceTools: StudentTool[] = [
    {
      id: 'library',
      name: 'Library',
      description: 'Access library resources and study materials',
      category: 'resources',
      url: '/library'
    },
    {
      id: 'online-learning',
      name: 'Online Learning',
      description: 'Access online courses and learning resources',
      category: 'resources',
      url: '/online-learning'
    }
  ];

  // Map of icons to use for tools
  const toolIcons: Record<string, any> = {
    'course-catalog': BookOpen,
    'graduation': GraduationCap,
    'office-administration': Briefcase,
    'career-university-center': Briefcase,
    'advising': School,
    'financial-aid': UserCheck,
    'payment-plan': History,
    'library': LibraryBig,
    'online-learning': MonitorSmartphone,
    'student-organizations': Users,
    'recreation': Dumbbell,
    'dining': Utensils,
    'events': Calendar,
  };

  // Quick links for bottom section
  const quickLinks = [
    { id: 'library', label: 'Library', icon: LibraryBig, path: '/academic-success-center' },
    { id: 'online-learning', label: 'Online Learning', icon: MonitorSmartphone, path: '/online-learning' },
    { id: 'student-organizations', label: 'Student Organizations', icon: Users, path: '/student-organizations' },
    { id: 'recreation', label: 'Recreation', icon: Dumbbell, path: '/recreation' },
    { id: 'athletics', label: 'Athletics', icon: Trophy, path: '/athletics' },
    { id: 'dining', label: 'Dining', icon: Utensils, path: '/dining' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/calendar' },
    { id: 'housing', label: 'Housing', icon: Home, path: '/housing' },
  ];

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">Student Tools</h2>
        
        <Card className="p-6 border-2 border-blue-600 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800">
          <Tabs defaultValue="academic" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 border-b border-gray-200 dark:border-0">
              <TabsTrigger value="academic" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Academic</TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Financial</TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicTools.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  return (
                    <Link
                      key={tool.id}
                      href={tool.url}
                      className="flex items-center p-3 rounded-lg border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
                    >
                      <Icon className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {financialTools.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  return (
                    <a 
                      key={tool.id} 
                      href={tool.url} 
                      className="flex items-center p-3 rounded-lg border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
                    >
                      <Icon className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceTools.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  return (
                    <a 
                      key={tool.id} 
                      href={tool.url} 
                      className="flex items-center p-3 rounded-lg border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
                    >
                      <Icon className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link 
              key={link.id} 
              href={link.path}
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-600 dark:border-gray-700 shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition"
            >
              <link.icon className="text-blue-600 dark:text-white text-3xl mb-2 h-8 w-8" />
              <span className="font-semibold text-gray-900 dark:text-white">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
