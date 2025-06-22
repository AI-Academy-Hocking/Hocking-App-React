import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PhoneCall, Shield, HeartPulse, AlertTriangle } from "lucide-react";
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
    <div className="container py-6 max-w-2xl bg-white min-h-screen rounded-xl">
      <h1 className="text-3xl font-bold mb-2 text-neutral-900">Campus Safety</h1>
      <div className="space-y-6">
        {/* Emergency Contacts Section */}
        <div className="border border-red-500 rounded-xl bg-red-50 p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500 h-6 w-6" />
            <span className="text-lg font-semibold text-red-700">Emergency Contacts</span>
          </div>
          <div className="space-y-3">
            <Card className="bg-white shadow-none border-none">
              <CardContent className="flex flex-col items-center py-4">
                <PhoneCall className="text-red-500 h-7 w-7 mb-1" />
                <span className="text-xs text-neutral-700">Emergency</span>
                <span className="text-xl font-bold text-red-500">911</span>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-none">
              <CardContent className="flex flex-col items-center py-4">
                <Shield className="text-blue-600 h-7 w-7 mb-1" />
                <span className="text-xs text-neutral-700">Campus Security</span>
                <span className="text-xl font-bold text-blue-600">(740) 753-7050</span>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-none">
              <CardContent className="flex flex-col items-center py-4">
                <HeartPulse className="text-green-600 h-7 w-7 mb-1" />
                <span className="text-xs text-neutral-700">Health Services</span>
                <span className="text-xl font-bold text-green-600">(740) 753-7070</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Procedures Section */}
        <div className="border border-blue-600 rounded-xl bg-blue-50 p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-blue-600 h-6 w-6" />
            <span className="text-lg font-semibold text-blue-700">Safety Procedures</span>
          </div>
          <div className="space-y-3">
            <Card className="bg-white shadow-none border-none">
              <CardContent className="flex flex-col items-center py-4">
                <Shield className="text-blue-600 h-7 w-7 mb-1" />
                <span className="text-xs text-neutral-700">Fire Emergency</span>
                <span className="text-base font-bold text-blue-600">Call 911 and evacuate the building.</span>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-none">
              <CardContent className="flex flex-col items-center py-4">
                <HeartPulse className="text-blue-600 h-7 w-7 mb-1" />
                <span className="text-xs text-neutral-700">Medical Emergency</span>
                <span className="text-base font-bold text-blue-600">Call 911 or Health Services.</span>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-none">
              <CardContent className="flex flex-col items-center py-4">
                <AlertTriangle className="text-blue-600 h-7 w-7 mb-1" />
                <span className="text-xs text-neutral-700">Suspicious Activity</span>
                <span className="text-base font-bold text-blue-600">Report to Campus Security.</span>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-none">
              <CardContent className="flex flex-col items-center py-4">
                <Shield className="text-blue-600 h-7 w-7 mb-1" />
                <span className="text-xs text-neutral-700">Campus Alerts</span>
                <span className="text-base font-bold text-blue-600 text-center">Follow instructions from authorities.</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}