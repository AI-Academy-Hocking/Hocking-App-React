import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, FileText, GraduationCap, UserCheck, 
  History, School, LibraryBig, MonitorSmartphone, 
  Users, Dumbbell, Utensils, Calendar, Home, Trophy
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
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
  
  const { data: tools } = useQuery<StudentTool[]>({
    queryKey: ['/api/student-tools'],
    queryFn: async () => {
      const response = await fetch('/api/student-tools');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // Filter tools by category
  const academicTools = tools?.filter(tool => tool.category === 'academic') || [];
  const financialTools = tools?.filter(tool => tool.category === 'financial') || [];
  const resourceTools = tools?.filter(tool => tool.category === 'resources') || [];

  // Map of icons to use for tools
  const toolIcons: Record<string, any> = {
    'course-schedule': FileText,
    'grades': GraduationCap,
    'course-catalog': BookOpen,
    'advising': UserCheck,
    'academic-history': History,
    'graduation': School,
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
        
        <Card className="p-6 border-2 border-blue-600 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800">
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
                    <a 
                      key={tool.id} 
                      href={tool.url} 
                      className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
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
            
            <TabsContent value="financial" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {financialTools.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  return (
                    <a 
                      key={tool.id} 
                      href={tool.url} 
                      className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
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
                      className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
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
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition"
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
