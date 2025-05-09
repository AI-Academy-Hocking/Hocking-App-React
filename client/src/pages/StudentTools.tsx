import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, FileText, GraduationCap, UserCheck, 
  History, School, LibraryBig, MonitorSmartphone, 
  Users, Dumbbell, Utensils, Calendar 
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StudentTool } from "@shared/schema";

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
    { id: 'library', label: 'Library', icon: LibraryBig },
    { id: 'online-learning', label: 'Online Learning', icon: MonitorSmartphone },
    { id: 'student-organizations', label: 'Student Organizations', icon: Users },
    { id: 'recreation', label: 'Recreation', icon: Dumbbell },
    { id: 'dining', label: 'Dining', icon: Utensils },
    { id: 'events', label: 'Events', icon: Calendar },
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
                {academicTools.map((tool) => {
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
            <a 
              key={link.id} 
              href="#" 
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition"
            >
              <link.icon className="text-primary text-3xl mb-2 h-8 w-8" />
              <span className="font-semibold">{link.label}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
