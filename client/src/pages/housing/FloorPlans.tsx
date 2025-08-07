import { useState } from "react";
import { Building2, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface Building {
  name: string;
  description: string;
  code: string;
}

const buildings: Building[] = [
  {
    name: "Downhour & North",
    description: "Residence Halls",
    code: "DN"
  },
  {
    name: "Hocking Heights",
    description: "Residence Hall",
    code: "HH"
  },
  {
    name: "Summit",
    description: "Residence Hall",
    code: "SUM"
  },
  {
    name: "Sycamore",
    description: "Residence Hall",
    code: "SY"
  }
];

export default function FloorPlans() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(buildings[0]);
  
  const renderFloorPlanContent = () => {
    switch (selectedBuilding.code) {
      case "DN":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Downhour/North Halls - Suite Floor Plan
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Suite-style dormitory with four bedrooms and shared bathroom facilities
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="max-w-4xl w-full">
                <img 
                  src="/North.png" 
                  alt="Downhour and North Suite Floor Plan"
                  className="w-full h-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-center py-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Floor Plan Image Not Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Please ensure the floor plan image is placed in the public folder.
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Expected location: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">client/public/downhour-north-floor-plan.png</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "HH":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Hocking Heights - Double Room Floor Plan
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Double occupancy room with two beds, desks, and wardrobes
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="max-w-4xl w-full">
                <img 
                  src="/hocking-heights-floor-plan.png" 
                  alt="Hocking Heights Double Room Floor Plan"
                  className="w-full h-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-center py-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Floor Plan Image Not Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Please ensure the floor plan image is placed in the public folder.
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Expected location: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">client/public/hocking-heights-floor-plan.png</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "SUM":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Summit Hall - Floor Plan
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Co-ed residence hall with suite-style living arrangements
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="max-w-4xl w-full">
                <img 
                  src="/summit.png" 
                  alt="Summit Hall Floor Plan"
                  className="w-full h-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-center py-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Floor Plan Image Not Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Please ensure the floor plan image is placed in the public folder.
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Expected location: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">client/public/summit.png</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "SY":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Sycamore Hall - Floor Plan
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Co-ed residence hall with modern amenities and comfortable living spaces
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="max-w-4xl w-full">
                <img 
                  src="/Sycamore.png" 
                  alt="Sycamore Hall Floor Plan"
                  className="w-full h-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-center py-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Floor Plan Image Not Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Please ensure the floor plan image is placed in the public folder.
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Expected location: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">client/public/sycamore.png</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {selectedBuilding.name} Floor Plans
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Floor plan content will be added here for {selectedBuilding.name}.
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link 
          href="/housing"
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Housing</span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Building2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Floor Plans</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          View detailed floor plans for each residence hall. Explore the layout and room configurations to help you choose your perfect housing option.
        </p>
      </div>

      {/* Building Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {buildings.map((building) => (
          <button
            key={building.code}
            className={`flex items-center gap-3 p-4 rounded-lg border transition w-full text-left ${
              selectedBuilding.code === building.code 
                ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-600' 
                : 'hover:bg-blue-50 dark:hover:bg-blue-900/30 border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => setSelectedBuilding(building)}
          >
            <Building2 className="h-6 w-6 text-blue-600" />
            <div>
              <div className="font-semibold text-blue-800 dark:text-blue-200 text-lg">
                {building.name}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <Badge className="bg-blue-600 text-white mr-2">{building.code}</Badge>
                {building.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Floor Plan Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {renderFloorPlanContent()}
      </div>
    </div>
  );
} 