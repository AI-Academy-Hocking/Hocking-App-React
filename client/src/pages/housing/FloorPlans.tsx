import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2 } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Building {
  name: string;
  description: string;
  code: string;
  floors: {
    label: string;
    sheetName: string;
  }[];
}

const buildings: Building[] = [
  {
    name: "North Hall",
    description: "Male Only, Double Occupancy",
    code: "NOHL",
    floors: [
      { label: "Floor 2", sheetName: "2FL NOHL" },
      { label: "Floor 3", sheetName: "3FL NOHL" },
      { label: "Floor 4", sheetName: "4FL NOHL" },
      { label: "Floor 5", sheetName: "5FL NOHL" },
      { label: "Floor 6", sheetName: "6FL NOHL" },
      { label: "Floor 7", sheetName: "7FL NOHL" }
    ]
  },
  {
    name: "Downhour Hall",
    description: "Female Only, Double Occupancy",
    code: "DRHL",
    floors: [
      { label: "Floor 2", sheetName: "2FL DRHL" },
      { label: "Floor 3", sheetName: "3FL DRHL" },
      { label: "Floor 4", sheetName: "4FL DRHL" },
      { label: "Floor 5", sheetName: "5FL DRHL" },
      { label: "Floor 6", sheetName: "6FL DRHL" },
      { label: "Floor 7", sheetName: "7FL DRHL" }
    ]
  },
  {
    name: "Hocking Heights",
    description: "Male Only, Double Occupancy",
    code: "HH",
    floors: [
      { label: "Floor 1", sheetName: "1FL HH" },
      { label: "Floor 2 (L)", sheetName: "2FL(L) HH" },
      { label: "Floor 2 (S)", sheetName: "2FL(S) HH" },
      { label: "Floor 2", sheetName: "2FLHH" },
      { label: "Floor 2 (Alt)", sheetName: "2FL HH" },
      { label: "Floor 3 (S)", sheetName: "3FL (S) HH" },
      { label: "Floor 3 (L)", sheetName: "(L) HH" },
      { label: "Floor 3 (New A)", sheetName: "3FL (NEW A) HH" },
      { label: "Floor 3 (New B)", sheetName: "3FL (NEWB) HH" }
    ]
  },
  {
    name: "Summit Hall",
    description: "Co-ed, Single Room, Shared Bathroom",
    code: "SUM",
    floors: [
      { label: "Floor 1", sheetName: "1FL SUM" },
      { label: "Floor 2", sheetName: "2FL SUM" }
    ]
  },
  {
    name: "Sycamore Hall",
    description: "Co-ed, Mixed Single and Double Room Occupancy",
    code: "SY",
    floors: [
      { label: "Floor 1", sheetName: "1FL SY" },
      { label: "Floor 2", sheetName: "2FL SY" }
    ]
  },
  {
    name: "Starbrick Village",
    description: "WHI Program Only, Co-ed shared facilities",
    floors: [
      { name: "First Floor", sheetName: "YOUR_SHEET_ID_13" },
      { name: "Second Floor", sheetName: "YOUR_SHEET_ID_14" }
    ]
  }
];

const SPREADSHEET_ID = "1KWlVPX6emo5YsDdJsWBNAbO05fKJPUiLRxD6nSd45jI";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function FloorPlans() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(buildings[0]);
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Floor Plans</h1>
          <p className="text-muted-foreground">View detailed floor plans for each residence hall</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Residence Hall Floor Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {buildings.map((building) => (
                <button
                  key={building.code}
                  className={`flex items-center gap-2 p-3 rounded-lg border border-neutral-light transition w-full text-left ${selectedBuilding.code === building.code ? 'bg-primary/10 border-primary' : 'hover:bg-neutral-lightest'}`}
                  onClick={() => setSelectedBuilding(building)}
                >
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{building.name}</div>
                    <div className="text-sm text-muted-foreground">
                      <Badge variant="outline" className="mr-2">{building.code}</Badge>
                      {building.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Tabs defaultValue={selectedBuilding.floors[0].label} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {selectedBuilding.floors.map((floor) => (
                  <TabsTrigger
                    key={floor.label}
                    value={floor.label}
                  >
                    {floor.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {selectedBuilding.floors.map((floor) => (
                <TabsContent key={floor.label} value={floor.label}>
                  <div className="aspect-[4/3] w-full">
                    <iframe
                      src={`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/preview?rm=minimal&widget=true&headers=false&gid=${encodeURIComponent(floor.sheetName)}`}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 