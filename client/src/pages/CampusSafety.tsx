import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PhoneCall, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SafetyResource {
  id: number;
  title: string;
  description: string;
  category: string;
  phoneNumber: string | null;
  url: string | null;
  icon: string | null;
  order: number | null;
}

export default function CampusSafety() {
  const [resourceCategory, setResourceCategory] = useState<string>("all");

  // Fetch safety resources (filtered by category if selected)
  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ["/api/safety/resources", resourceCategory],
    queryFn: async () => {
      const url = resourceCategory !== "all" 
        ? `/api/safety/resources?category=${resourceCategory}`
        : "/api/safety/resources";
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch safety resources");
      }
      return response.json() as Promise<SafetyResource[]>;
    }
  });

  // Get unique resource categories
  const categories = resources && resources.length > 0
    ? Array.from(new Set(resources.map(resource => resource.category)))
    : [];

  return (
    <div className="container py-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Campus Safety</h1>
      <p className="text-muted-foreground mb-6">
        Access emergency resources and campus safety information
      </p>

      <div className="space-y-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">Campus Security</CardTitle>
            <CardDescription className="text-blue-700">
              24/7 Emergency Response and Campus Security Services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Contact</h4>
                <a href="tel:740-753-6598" className="flex items-center gap-2 text-blue-700 hover:text-blue-900">
                  <PhoneCall className="h-4 w-4" />
                  740-753-6598
                </a>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Location</h4>
                <p className="text-blue-700">Hocking College Safety Department</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={resourceCategory === "all" ? "default" : "ghost"}
            onClick={() => setResourceCategory("all")}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={resourceCategory === category ? "default" : "ghost"}
              onClick={() => setResourceCategory(category)}
              className="rounded-full"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {resourcesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-lg bg-muted"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    {resource.title}
                    <Badge variant="outline" className="ml-2">
                      {resource.category}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {resource.phoneNumber && (
                      <a
                        href={`tel:${resource.phoneNumber}`}
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        <PhoneCall className="h-4 w-4" />
                        {resource.phoneNumber}
                      </a>
                    )}
                    {resource.url && (
                      <a
                        href={resource.url?.startsWith("http") ? resource.url : `https://www.hocking.edu${resource.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Emergency Contacts</h3>
          <p className="text-blue-700 mb-3">In case of an emergency, always call 911 first.</p>
          <Separator className="bg-blue-200 my-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h4 className="font-medium text-blue-800">Campus Security</h4>
              <a href="tel:740-753-6598" className="text-blue-700">740-753-6598</a>
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Health Center</h4>
              <a href="tel:740-753-3591" className="text-blue-700">740-753-3591</a>
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Nelsonville Police Department</h4>
              <a href="tel:740-753-1922" className="text-blue-700">740-753-1922</a>
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Anonymous Tip Line</h4>
              <a
                href="https://www.hocking.edu/campus-safety#reports"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}