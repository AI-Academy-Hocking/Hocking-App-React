import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PhoneCall, Shield, HeartPulse, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBackNavigation } from "@/hooks/use-back-navigation";

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
  const { goBack } = useBackNavigation();

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
    <div className="container py-6 max-w-2xl bg-white dark:bg-[#151c26] min-h-screen rounded-xl">
      {/* Back Navigation */}
      <div className="flex items-center mb-6">
        <button 
          onClick={goBack}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-primary dark:text-white">Campus Safety</h1>
      <div className="space-y-6">
        {/* Emergency Contacts Section */}
        <div className="border border-red-500 rounded-xl bg-neutral-100 dark:bg-[#353e4a] p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500 h-6 w-6" />
            <span className="text-lg font-semibold text-red-500">Emergency Contacts</span>
          </div>
          <div className="space-y-3">
            <Card className="bg-white dark:bg-[#151c26] shadow-none border border-red-500 dark:border-none rounded-xl">
              <CardContent className="flex flex-col items-center py-4">
                <PhoneCall className="text-red-500 h-7 w-7 mb-1" />
                <span className="text-xs text-black dark:text-white">Emergency</span>
                <span className="text-xl font-bold text-red-500">911</span>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-[#151c26] shadow-none border border-blue-600 dark:border-none rounded-xl">
              <CardContent className="flex flex-col items-center py-4">
                <Shield className="text-blue-600 h-7 w-7 mb-1" />
                <span className="text-xs text-black dark:text-white">Campus Security</span>
                <span className="text-xl font-bold text-blue-600">(740) 753-7050</span>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-[#151c26] shadow-none border border-green-600 dark:border-none rounded-xl">
              <CardContent className="flex flex-col items-center py-4">
                <HeartPulse className="text-green-600 h-7 w-7 mb-1" />
                <span className="text-xs text-black dark:text-white">Health Services</span>
                <span className="text-xl font-bold text-green-600">(740) 753-6598</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Procedures Section */}
        <div className="bg-neutral-100 dark:bg-[#353e4a] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-blue-600 h-5 w-5" />
            <span className="text-base font-semibold text-black dark:text-blue-300">Safety Procedures</span>
          </div>
          <Separator className="bg-neutral-300 dark:bg-[#2a3240] my-3" />
          <ul className="text-neutral-800 dark:text-white text-sm space-y-2">
            <li>Fire Emergency: Call 911 and evacuate the building.</li>
            <li>Medical Emergency: Call 911 or Health Services.</li>
            <li>Report suspicious activity to Campus Security.</li>
            <li>Follow campus alerts and instructions from authorities.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
