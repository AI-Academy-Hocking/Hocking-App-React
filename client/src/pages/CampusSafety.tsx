import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PhoneCall, ExternalLink, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SafetyAlert {
  id: number;
  title: string;
  content: string;
  severity: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  location: string | null;
}

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
  const [activeTab, setActiveTab] = useState("alerts");
  const [resourceCategory, setResourceCategory] = useState<string>("all");

  // Fetch active safety alerts
  const { data: activeAlerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ["/api/safety/alerts", { active: true }],
    queryFn: async () => {
      const response = await fetch("/api/safety/alerts?active=true");
      if (!response.ok) {
        throw new Error("Failed to fetch safety alerts");
      }
      return response.json() as Promise<SafetyAlert[]>;
    }
  });

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

  // Helper function to get severity style
  const getSeverityStyles = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "emergency":
        return {
          badge: "bg-red-500 hover:bg-red-600",
          alert: "border-red-500 bg-red-50 text-red-900",
          icon: <AlertTriangle className="h-5 w-5 text-red-600" />
        };
      case "warning":
        return {
          badge: "bg-amber-500 hover:bg-amber-600",
          alert: "border-amber-500 bg-amber-50 text-amber-900",
          icon: <AlertTriangle className="h-5 w-5 text-amber-600" />
        };
      case "info":
      default:
        return {
          badge: "bg-blue-500 hover:bg-blue-600",
          alert: "border-blue-500 bg-blue-50 text-blue-900", 
          icon: <Info className="h-5 w-5 text-blue-600" />
        };
    }
  };

  return (
    <div className="container py-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Campus Safety</h1>
      <p className="text-muted-foreground mb-6">
        Access emergency resources and stay updated with safety alerts
      </p>

      <Tabs defaultValue="alerts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="alerts" className="relative">
            Alerts
            {activeAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {activeAlerts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {alertsLoading ? (
            <div className="space-y-4">
              <div className="h-24 animate-pulse rounded-lg bg-muted"></div>
              <div className="h-24 animate-pulse rounded-lg bg-muted"></div>
            </div>
          ) : activeAlerts.length > 0 ? (
            activeAlerts.map((alert) => {
              const styles = getSeverityStyles(alert.severity);
              return (
                <Alert key={alert.id} className={styles.alert}>
                  <div className="flex items-start">
                    {styles.icon}
                    <div className="ml-3 w-full">
                      <div className="flex items-center justify-between">
                        <AlertTitle className="text-lg font-semibold">
                          {alert.title}
                        </AlertTitle>
                        <Badge className={styles.badge}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <AlertDescription className="mt-2">
                        <p className="mb-2">{alert.content}</p>
                        {alert.location && (
                          <p className="text-sm font-medium mt-2">
                            Location: {alert.location}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2">
                          {new Date(alert.startDate).toLocaleString()}
                        </p>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              );
            })
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <Info className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">All Clear</h3>
                  <p className="text-muted-foreground">
                    There are no active safety alerts at this time.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={resourceCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setResourceCategory("all")}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={resourceCategory === category ? "default" : "outline"}
                size="sm"
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
                          href={resource.url}
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
                <h4 className="font-medium text-blue-800">Campus Police</h4>
                <a href="tel:740-753-6598" className="text-blue-700">740-753-6598</a>
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Health Center</h4>
                <a href="tel:740-753-6487" className="text-blue-700">740-753-6487</a>
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Counseling Services</h4>
                <a href="tel:740-753-6789" className="text-blue-700">740-753-6789</a>
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Campus Security</h4>
                <a href="tel:740-753-1234" className="text-blue-700">740-753-1234</a>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}