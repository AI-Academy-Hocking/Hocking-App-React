import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, AlertTriangle } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ChecklistItem {
  category: string;
  items: {
    name: string;
    importance: "required" | "recommended" | "optional";
    description?: string;
  }[];
}

const checklistItems: ChecklistItem[] = [
  {
    category: "Necessities",
    items: [
      {
        name: "Safety Pins",
        importance: "required"
      },
      {
        name: "Sewing Kit",
        importance: "required"
      },
      {
        name: "Plastic Baggies",
        importance: "required"
      },
      {
        name: "First Aid Kit",
        importance: "required"
      },
      {
        name: "Medical Card",
        importance: "required",
        description: "If you have health insurance"
      },
      {
        name: "Medicine",
        importance: "required",
        description: "Any prescription and over-the-counter medications you need"
      },
      {
        name: "Laundry Supplies",
        importance: "required",
        description: "Detergent, fabric softener, etc."
      },
      {
        name: "Laundry Basket/Bag",
        importance: "required"
      },
      {
        name: "Umbrella",
        importance: "required"
      },
      {
        name: "Rain/Snow Gear",
        importance: "required",
        description: "Boots, coat, gloves, hat"
      },
      {
        name: "Flashlight",
        importance: "required"
      },
      {
        name: "Batteries",
        importance: "required"
      },
      {
        name: "Paper Towels",
        importance: "required"
      },
      {
        name: "Dishes",
        importance: "required"
      },
      {
        name: "Cups/Glasses",
        importance: "required"
      },
      {
        name: "Storage Tubs",
        importance: "required"
      },
      {
        name: "Broom & Mop with Bucket",
        importance: "required"
      },
      {
        name: "Bike/Bike Lock",
        importance: "required"
      },
      {
        name: "Personal Hygiene Products",
        importance: "required"
      },
      {
        name: "Cleaning Supplies",
        importance: "required"
      },
      {
        name: "Command Hooks/Strips",
        importance: "required"
      },
      {
        name: "Hangers",
        importance: "required"
      },
      {
        name: "Toiletries",
        importance: "required",
        description: "Shampoo, soap, etc."
      }
    ]
  },
  {
    category: "School Supplies",
    items: [
      {
        name: "Notepads",
        importance: "required"
      },
      {
        name: "Calendar",
        importance: "required"
      },
      {
        name: "Paper Clips",
        importance: "required"
      },
      {
        name: "Folders/Binders",
        importance: "required"
      },
      {
        name: "Stapler/Staples",
        importance: "required"
      },
      {
        name: "Rubber Bands",
        importance: "required"
      },
      {
        name: "Pens/Pencils",
        importance: "required"
      },
      {
        name: "Laptop & Supplies",
        importance: "required",
        description: "Required"
      },
      {
        name: "Bulletin Board/White Board",
        importance: "required"
      },
      {
        name: "Sharpies",
        importance: "required"
      },
      {
        name: "Highlighters",
        importance: "required"
      },
      {
        name: "USB/Flash Drive",
        importance: "required"
      },
      {
        name: "Tape",
        importance: "required"
      },
      {
        name: "Scissors",
        importance: "required"
      },
      {
        name: "Ruler",
        importance: "required"
      },
      {
        name: "Backpack",
        importance: "required"
      },
      {
        name: "Envelope/Stamps",
        importance: "required"
      },
      {
        name: "Calculator",
        importance: "required"
      }
    ]
  },
  {
    category: "Room Essentials",
    items: [
      {
        name: "Sheets, Pillowcases",
        importance: "required",
        description: "Twin XL"
      },
      {
        name: "Bedspread",
        importance: "required",
        description: "Twin XL"
      },
      {
        name: "Blankets",
        importance: "required"
      },
      {
        name: "Pillows",
        importance: "required"
      },
      {
        name: "Mattress Pad",
        importance: "optional",
        description: "If preferred"
      },
      {
        name: "Towels/Washcloths",
        importance: "required"
      },
      {
        name: "Coffee Maker/Keurig",
        importance: "optional"
      },
      {
        name: "Alarm Clock",
        importance: "required",
        description: "With backup battery"
      },
      {
        name: "Wastebasket",
        importance: "required"
      },
      {
        name: "Desk Lamp",
        importance: "required"
      }
    ]
  },
  {
    category: "Bathroom Items",
    items: [
      {
        name: "Shower Curtain and Bathroom Mats",
        importance: "required",
        description: "For North and Downhour, Summit and Sycamore Halls (1 per suite)"
      },
      {
        name: "Toilet Paper",
        importance: "required",
        description: "For North, Downhour, Summit and Sycamore"
      },
      {
        name: "Shower Caddy",
        importance: "required"
      },
      {
        name: "Shower Shoes",
        importance: "required"
      },
      {
        name: "Hair Dryer",
        importance: "required"
      },
      {
        name: "Toothbrush/Toothpaste",
        importance: "required"
      },
      {
        name: "Personal Hygiene Products",
        importance: "required"
      }
    ]
  },
  {
    category: "Optional Items",
    items: [
      {
        name: "Area Rugs",
        importance: "optional"
      },
      {
        name: "TV",
        importance: "optional"
      },
      {
        name: "Gaming Consoles",
        importance: "optional",
        description: "If applicable"
      },
      {
        name: "Surge Protectors",
        importance: "optional"
      },
      {
        name: "Over-the-door Mirror",
        importance: "optional"
      },
      {
        name: "Small Bookshelves",
        importance: "optional"
      },
      {
        name: "Posters/Pictures",
        importance: "optional"
      }
    ]
  },
  {
    category: "Prohibited Items",
    items: [
      {
        name: "TV Cable Cords (Coaxial Cables)",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Duct Tape",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Drugs/Alcohol",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Weapons",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Cooking Appliances",
        importance: "required",
        description: "Hot plates, single burner units, sandwich makers, crock pots, instant pots, toasters, toaster ovens, waffle makers"
      },
      {
        name: "Knives",
        importance: "required",
        description: "Longer than 3\" (including kitchen knives)"
      },
      {
        name: "Pets",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Large Furniture",
        importance: "required",
        description: "Including mini-fridges"
      },
      {
        name: "Refrigerator",
        importance: "required",
        description: "Including mini-fridge"
      },
      {
        name: "Microwave",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Thumbtacks",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Halogen Bulbs",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Candles",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Wax Warmers",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Incense",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Weights",
        importance: "required",
        description: "Please use the Student Center for exercise equipment"
      },
      {
        name: "Wireless Routers",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Vapes, Tobacco Products, Cannabis",
        importance: "required",
        description: "Not allowed"
      },
      {
        name: "Weapons",
        importance: "required",
        description: "Sling shots, blow guns, paintball guns, BB guns, airsoft guns, crossbows, ammunition, firearms, explosives and other weapons"
      }
    ]
  }
];

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

export default function WhatToBring() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <ClipboardList className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">What to Bring</h1>
          <p className="text-muted-foreground">Essential items checklist for your stay</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {checklistItems.map((category) => (
          <motion.div key={category.category} variants={item}>
            <Card className={`hover-card h-full ${category.category === "Prohibited Items" ? "border-red-200" : ""}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {category.category === "Prohibited Items" ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  )}
                  <CardTitle>{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item.name} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <Badge 
                          variant={item.importance === "required" ? "destructive" : 
                                 item.importance === "recommended" ? "default" : "secondary"}
                        >
                          {item.importance}
                        </Badge>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground ml-3.5">
                          {item.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200"
      >
        <h2 className="text-xl font-semibold mb-4">Additional Notes from Hocking College Housing</h2>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• Hocking College provides basic furniture in each dorm room, including twin XL beds, desks and chairs, three drawer dressers, closets, microwave, and fridge for individual use.</li>
          <li>• Regarding prohibited items: These restrictions are in place for the safety and well-being of all residents. Fire hazards are a serious concern in residence halls, which is why cooking appliances, candles, and halogen bulbs are not permitted.</li>
          <li>• For exercise, Hocking College has a Student Center with a gym and workout equipment for student use. Do not bring your own.</li>
          <li>• We encourage students to connect to the internet via the wall jacks as personal routers can interfere with the network.</li>
          <li>• If you have any questions about what to bring or not to bring, please don't hesitate to contact the Housing Office.</li>
        </ul>
      </motion.div>
    </div>
  );
} 