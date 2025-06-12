import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, FileText, GraduationCap, UserCheck, 
  History, School, MonitorSmartphone, 
  Users, Dumbbell, Utensils, Calendar, House,
  MessageSquare, Pencil, Trophy,
  LucideIcon
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

// Define the StudentTool type locally since we can't import it
interface StudentTool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
}

interface QuickLink {
  id: string;
  label: string;
  icon: LucideIcon | React.ComponentType;
  path: string;
}

// Custom icon for Academic Success Center
const ChatWithPencil = () => (
  <div className="relative">
    <MessageSquare className="h-8 w-8 text-blue-600" />
    <Pencil className="h-4 w-4 text-blue-600 absolute bottom-0 right-0" />
  </div>
);

export default function StudentTools() {
  const [activeTab, setActiveTab] = useState("academic");
  
  const { data: tools } = useQuery<StudentTool[]>({
    queryKey: ['/api/student-tools'],
  });

  // Filter tools by category
  const academicTools = tools?.filter(tool => tool.category === 'academic') || [];
  const financialTools = tools?.filter(tool => tool.category === 'financial') || [];
  const resourceTools = tools?.filter(tool => tool.category === 'resources') || [];

  // Map of icons to use for tools
  const toolIcons: Record<string, LucideIcon> = {
    'course-schedule': FileText,
    'grades': GraduationCap,
    'course-catalog': BookOpen,
    'advising': UserCheck,
    'academic-history': History,
    'graduation': School,
    'online-learning': MonitorSmartphone,
    'student-organizations': Users,
    'recreation': Dumbbell,
    'dining': Utensils,
    'events': Calendar,
    'testing-center': FileText,
    'athletics': Trophy,
  };

  // Quick links for bottom section
  const quickLinks: QuickLink[] = [
    { id: 'academic-success', label: 'Academic Success Center', icon: ChatWithPencil, path: '/academic-success' },
    { id: 'testing-center', label: 'Testing Center', icon: FileText, path: '/testing-center' },
    { id: 'online-learning', label: 'Online Learning', icon: MonitorSmartphone, path: '/online-learning' },
    { id: 'student-organizations', label: 'Student Organizations', icon: Users, path: '/student-organizations' },
    { id: 'athletics', label: 'Athletics', icon: Trophy, path: '/athletics' },
    { id: 'recreation', label: 'Recreation', icon: Dumbbell, path: '/recreation' },
    { id: 'dining', label: 'Dining', icon: Utensils, path: '/dining' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/calendar' },
    { id: 'housing', label: 'Housing', icon: House, path: '/housing' },
  ];

  // Add Testing Center to academic tools if it doesn't exist
  const academicToolsWithTesting = [
    {
      id: 'testing-center',
      name: 'Testing Center',
      description: 'Schedule and take tests',
      url: '/testing-center',
      category: 'academic'
    },
    ...(academicTools || [])
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Student Tools</h2>
        
        <Card className="overflow-hidden">
          <Tabs defaultValue="academic" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 border-b border-neutral-light">
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicToolsWithTesting.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  return (
                    <Link 
                      key={tool.id} 
                      href={tool.url}
                      className="flex items-center p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition"
                    >
                      <Icon className="text-primary mr-3 h-5 w-5" />
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-sm text-neutral-dark">{tool.description}</p>
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
                      className="flex items-center p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition"
                    >
                      <Icon className="text-primary mr-3 h-5 w-5" />
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-sm text-neutral-dark">{tool.description}</p>
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
                      className="flex items-center p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition"
                    >
                      <Icon className="text-primary mr-3 h-5 w-5" />
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-sm text-neutral-dark">{tool.description}</p>
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
        <h2 className="text-xl font-heading font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link 
              key={link.id} 
              href={link.path}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition"
            >
              <link.icon className="text-primary text-3xl mb-2 h-8 w-8" />
              <span className="font-semibold">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
