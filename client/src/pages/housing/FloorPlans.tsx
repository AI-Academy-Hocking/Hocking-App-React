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
    gid: string;
  }[];
}

const buildings: Building[] = [
  {
    name: "North Hall",
    description: "Male Only, Double Occupancy",
    code: "NOHL",
    floors: [
      { label: "Floor 2", gid: "934520048" },
      { label: "Floor 3", gid: "1283261361" },
      { label: "Floor 4", gid: "977390809" },
      { label: "Floor 5", gid: "1628062900" },
      { label: "Floor 6", gid: "351410270" },
      { label: "Floor 7", gid: "96825177" }
    ]
  },
  {
    name: "Downhour Hall",
    description: "Female Only, Double Occupancy",
    code: "DRHL",
    floors: [
      { label: "Floor 2", gid: "605805088" },
      { label: "Floor 3", gid: "869272327" },
      { label: "Floor 4", gid: "983011990" },
      { label: "Floor 5", gid: "1076599400" },
      { label: "Floor 6", gid: "1549755572" },
      { label: "Floor 7", gid: "1506478925" }
    ]
  },
  {
    name: "Hocking Heights",
    description: "Male Only, Double Occupancy",
    code: "HH",
    floors: [
      { label: "Floor 1", gid: "540165963" },
      { label: "Floor 2 (L)", gid: "1912887235" },
      { label: "Floor 2 (S)", gid: "1117356637" },
      { label: "Floor 2", gid: "470338677" },
      { label: "Floor 2 (Alt)", gid: "112036219" },
      { label: "Floor 3 (S)", gid: "357359095" },
      { label: "Floor 3 (L)", gid: "627845899" },
      { label: "Floor 3 (New A)", gid: "1260931559" },
      { label: "Floor 3 (New B)", gid: "2013317195" }
    ]
  },
  {
    name: "Summit Hall",
    description: "Co-ed, Single Room, Shared Bathroom",
    code: "SUM",
    floors: [
      { label: "Floor 1", gid: "875306229" },
      { label: "Floor 2", gid: "520551152" }
    ]
  },
  {
    name: "Sycamore Hall",
    description: "Co-ed, Mixed Single and Double Room Occupancy",
    code: "SY",
    floors: [
      { label: "Floor 1", gid: "1822412565" },
      { label: "Floor 2", gid: "659261022" }
    ]
  },
  {
    name: "Starbrick Village",
    description: "WHI Program Only, Co-ed shared facilities",
    code: "SBV",
    floors: [
      { label: "International House", gid: "991777198" },
      { label: "Opportunity House", gid: "84020514" }
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
                  className={`flex items-center gap-2 p-3 rounded-xl border border-neutral-light transition w-full text-left ${selectedBuilding.code === building.code ? 'bg-primary/10 border-primary' : 'hover:bg-neutral-lightest'}`}
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
                      key={floor.gid}
                      src={`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/preview?rm=minimal&widget=true&headers=false&gid=${floor.gid}`}
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