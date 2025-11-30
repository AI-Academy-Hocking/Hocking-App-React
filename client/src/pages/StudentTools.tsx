import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, FileText, GraduationCap, UserCheck, 
  School, LibraryBig, MonitorSmartphone, 
  Users, Dumbbell, Utensils, Calendar, Home, Trophy,
  Globe, PawPrint, DollarSign, CreditCard, Award, Heart, Briefcase
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
  
  const { data: tools, isLoading, error, refetch } = useQuery<StudentTool[]>({
    queryKey: ['/api/student-tools'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/student-tools');
        if (!response.ok) {
          console.warn('API failed, using fallback data');
          throw new Error('API not available');
        }
        return response.json();
      } catch (err) {
        console.warn('Student tools API error, using fallback data:', err);
        throw err;
      }
    },
    // Reduce retries to fail fast and use fallback data
    retry: 1,
    // Shorter timeout before giving up on API
    retryDelay: 1000,
    // Use stale data while revalidating
    staleTime: 30000, // 30 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    // More comprehensive fallback data
    placeholderData: [
      // Academic tools
      { id: "course-catalog", name: "Course Catalog", description: "Browse available courses", category: "academic", url: "/tools/academic/course-catalog" },
      { id: "advising", name: "Advising", description: "Connect with your advisor", category: "academic", url: "/tools/academic/advising" },
      // Financial tools
      { id: "financial-aid", name: "Financial Aid", description: "View and manage your financial aid", category: "financial", url: "/financial-aid" },
      { id: "billing", name: "Billing", description: "Pay tuition and view statements", category: "financial", url: "/billing" },
      { id: "scholarships", name: "Scholarships", description: "Apply for available scholarships", category: "financial", url: "/scholarships" },
      // Resources tools
      { id: "health-services", name: "Health Services", description: "Schedule health appointments", category: "resources", url: "/campus-health" },
      { id: "career-services", name: "Career Services", description: "Job search and career planning", category: "resources", url: "/career-university-center" },
    ],
  });

  // Debug and handle component state
  useEffect(() => {
    console.log('StudentTools component mounted');
    console.log('- Tools data:', tools?.length || 0, 'items');
    console.log('- Is loading:', isLoading);
    console.log('- Error:', error?.message || 'none');
    
    if (error) {
      console.warn('Using fallback data due to API error:', error.message);
    }
  }, [tools, error, isLoading]);

  // Filter tools by category
  const academicTools = tools?.filter(tool => tool.category === 'academic' && tool.id !== 'graduation') || [];
  const financialTools = tools?.filter(tool => tool.category === 'financial') || [];
  const resourceTools = tools?.filter(tool => tool.category === 'resources') || [];

  // Map of icons to use for tools
  const toolIcons: Record<string, any> = {
    'course-catalog': BookOpen,
    'advising': UserCheck,
    'financial-aid': DollarSign,
    'billing': CreditCard,
    'scholarships': Award,
    'health-services': Heart,
    'career-services': Briefcase,
    'library': LibraryBig,
    'online-learning': MonitorSmartphone,
    'student-organizations': Users,
    'recreation': Dumbbell,
    'dining': Utensils,
    'events': Calendar,
  };

  // Quick links for bottom section
  const quickLinks = [
    { id: 'library', label: 'Academic Success Center', icon: LibraryBig, path: '/academic-success-center' },
    { id: 'online-learning', label: 'Online Learning', icon: MonitorSmartphone, path: '/online-learning' },
    { id: 'student-organizations', label: 'Student Organizations', icon: Users, path: '/student-organizations' },
    { id: 'recreation', label: 'Recreation', icon: Dumbbell, path: '/recreation' },
    { id: 'athletics', label: 'Athletics', icon: Trophy, path: '/athletics' },
    { id: 'dining', label: 'Dining', icon: Utensils, path: '/dining' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/calendar' },
    { id: 'housing', label: 'Housing', icon: Home, path: '/housing' },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 bg-white dark:bg-gray-900">
        <section>
          <h2 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">Student Tools</h2>
          <div className="flex justify-center items-center p-8">
            <div className="text-gray-600 dark:text-gray-400">Loading student tools...</div>
          </div>
        </section>
      </div>
    );
  }

  // Show error state with retry option
  if (error) {
    return (
      <div className="space-y-6 bg-white dark:bg-gray-900">
        <section>
          <h2 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">Student Tools</h2>
          <div className="flex flex-col justify-center items-center p-8 space-y-4">
            <div className="text-red-600 dark:text-red-400">Error loading student tools</div>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">Student Tools</h2>
        
        <Card className="p-6 border-2 border-blue-600 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
          <Tabs defaultValue="academic" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 rounded-xl dark:bg-gray-700">
              <TabsTrigger value="academic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-blue-700 rounded-xl">Academic</TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-blue-700 rounded-xl">Financial</TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-blue-700 rounded-xl">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Graduation */}
                <Link href="/graduation" className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition">
                  <GraduationCap className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Graduation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Graduation requirements, ceremony details, and diploma information</p>
                  </div>
                </Link>
                
                {academicTools.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  
                  // Check if the URL is an internal route (starts with /)
                  if (tool.url.startsWith('/')) {
                    return (
                      <Link 
                        key={tool.id} 
                        href={tool.url}
                        className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
                      >
                        <Icon className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                        </div>
                      </Link>
                    );
                  }
                  
                  // External URL - use anchor tag
                  return (
                    <a 
                      key={tool.id} 
                      href={tool.url} 
                      className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
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
                  
                  // Check if the URL is an internal route (starts with /)
                  if (tool.url.startsWith('/')) {
                    return (
                      <Link 
                        key={tool.id} 
                        href={tool.url}
                        className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
                      >
                        <Icon className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                        </div>
                      </Link>
                    );
                  }
                  
                  // External URL - use anchor tag
                  return (
                    <a 
                      key={tool.id} 
                      href={tool.url} 
                      className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
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
                {/* International Students */}
                <Link href="/international-students" className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition">
                  <Globe className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">International Students</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Resources and support for international students</p>
                  </div>
                </Link>
                
                {/* Canine Boarding & Grooming Facility */}
                <Link href="/canine-facility" className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition">
                  <PawPrint className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Canine Boarding & Grooming Facility</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Professional dog boarding and grooming services</p>
                  </div>
                </Link>
                
                {resourceTools.map((tool) => {
                  const Icon = toolIcons[tool.id] || FileText;
                  
                  // Check if the URL is an internal route (starts with /)
                  if (tool.url.startsWith('/')) {
                    return (
                      <Link 
                        key={tool.id} 
                        href={tool.url}
                        className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
                      >
                        <Icon className="text-gray-900 dark:text-white mr-3 h-5 w-5" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                        </div>
                      </Link>
                    );
                  }
                  
                  // External URL - use anchor tag
                  return (
                    <a 
                      key={tool.id} 
                      href={tool.url} 
                      className="flex items-center p-3 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:bg-neutral-lightest dark:hover:bg-gray-800 transition"
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
        <h2 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-blue-300">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link 
              key={link.id} 
              href={link.path}
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-600 dark:border-gray-700 shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition"
            >
              <link.icon className="text-blue-600 dark:text-blue-400 text-3xl mb-2 h-8 w-8" />
              <span className="font-semibold text-gray-900 dark:text-white">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
