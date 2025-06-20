import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, FileText, GraduationCap, UserCheck, 
  History, School, LibraryBig, MonitorSmartphone, 
  Users, Dumbbell, Utensils, Calendar, House, Briefcase 
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
// import { StudentTool } from "@shared/schema";
import { Link } from "wouter";

type StudentTool = {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
};

export default function StudentTools() {
  const [activeTab, setActiveTab] = useState("academic");
  
  const { data: tools } = useQuery<StudentTool[]>({
    queryKey: ['/api/student-tools'],
  });

  // Filter tools by category
  const academicTools = tools?.filter(tool => tool.category === 'academic' && tool.id !== 'grades' && tool.id !== 'advising') || [];
  const resourceTools = tools?.filter(tool => tool.category === 'resources') || [];

  // Map of icons to use for tools
  const toolIcons: Record<string, any> = {
    'grades': GraduationCap,
    'course-catalog': BookOpen,
    'office-administration': Briefcase,
    'advising': UserCheck,
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
    { id: 'library', label: 'Library', icon: LibraryBig, path: '/library' },
    { id: 'online-learning', label: 'Online Learning', icon: MonitorSmartphone, path: '/online-learning' },
    { id: 'student-organizations', label: 'Student Organizations', icon: Users, path: '/student-organizations' },
    { id: 'recreation', label: 'Recreation', icon: Dumbbell, path: '/recreation' },
    { id: 'dining', label: 'Dining', icon: Utensils, path: '/dining' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/calendar' },
    { id: 'housing', label: 'Housing', icon: House, path: '/housing' }, // Use an appropriate icon
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Student Tools</h2>
        
        <Card className="overflow-hidden">
          <Tabs defaultValue="academic" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 border-b border-neutral-light">
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicTools.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  const displayName = tool.id === 'course-schedule' ? 'Office & Administration' : (tool.id === 'academic-history' ? 'Career & University Center' : tool.name);
                  return (
                    <Link
                      key={tool.id}
                      href={`/tools/academic/${tool.id}`}
                      className="flex items-center p-3 rounded-lg border border-neutral-light hover:bg-neutral-lightest transition"
                    >
                      <Icon className="text-primary mr-3 h-5 w-5" />
                      <div>
                        <h3 className="font-semibold">{displayName}</h3>
                        <p className="text-sm text-neutral-dark">{tool.description}</p>
                      </div>
                    </Link>
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
