import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, AlertTriangle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ChecklistItem {
  category: string;
  items: {
    name: string;
    importance: "recommended" | "optional";
    description?: string;
  }[];
}

interface ProhibitedItem {
  name: string;
  description?: string;
}

const checklistItems: ChecklistItem[] = [
  {
    category: "Bedding & Linens",
    items: [
      {
        name: "Twin XL Sheets & Pillowcases",
        importance: "recommended",
        description: "Standard dorm bed size"
      },
      {
        name: "Twin XL Bedspread/Comforter",
        importance: "recommended"
      },
      {
        name: "Blankets",
        importance: "recommended"
      },
      {
        name: "Pillows",
        importance: "recommended"
      },
      {
        name: "Mattress Pad/Topper",
        importance: "optional",
        description: "For extra comfort"
      },
      {
        name: "Towels & Washcloths",
        importance: "recommended"
      }
    ]
  },
  {
    category: "Bathroom Essentials",
    items: [
      {
        name: "Shower Curtain & Bathroom Mats",
        importance: "recommended",
        description: "For North, Downhour, Summit and Sycamore Halls (1 per suite)"
      },
      {
        name: "Toilet Paper",
        importance: "recommended",
        description: "For North, Downhour, Summit and Sycamore"
      },
      {
        name: "Shower Caddy",
        importance: "recommended"
      },
      {
        name: "Shower Shoes/Flip Flops",
        importance: "recommended"
      },
      {
        name: "Personal Hygiene Products",
        importance: "recommended",
        description: "Shampoo, soap, toothbrush, toothpaste, etc."
      },
      {
        name: "Hair Dryer",
        importance: "recommended"
      }
    ]
  },
  {
    category: "School & Study Supplies",
    items: [
      {
        name: "Laptop & Charger",
        importance: "recommended"
      },
      {
        name: "Backpack",
        importance: "recommended"
      },
      {
        name: "Notebooks, Paper, Folders",
        importance: "recommended"
      },
      {
        name: "Pens, Pencils, Highlighters",
        importance: "recommended"
      },
      {
        name: "Calculator",
        importance: "recommended"
      },
      {
        name: "USB Flash Drive",
        importance: "recommended"
      },
      {
        name: "Desk Lamp",
        importance: "recommended"
      },
      {
        name: "Bulletin Board/White Board",
        importance: "optional"
      },
      {
        name: "Calendar/Planner",
        importance: "recommended"
      }
    ]
  },
  {
    category: "Room Organization",
    items: [
      {
        name: "Storage Tubs/Bins",
        importance: "recommended"
      },
      {
        name: "Hangers",
        importance: "recommended"
      },
      {
        name: "Command Hooks/Strips",
        importance: "recommended",
        description: "For hanging items without damaging walls"
      },
      {
        name: "Wastebasket",
        importance: "recommended"
      },
      {
        name: "Small Bookshelf",
        importance: "optional"
      },
      {
        name: "Area Rug",
        importance: "optional"
      }
    ]
  },
  {
    category: "Cleaning & Maintenance",
    items: [
      {
        name: "Cleaning Supplies",
        importance: "recommended",
        description: "All-purpose cleaner, paper towels, etc."
      },
      {
        name: "Broom & Mop with Bucket",
        importance: "recommended"
      },
      {
        name: "Laundry Supplies",
        importance: "recommended",
        description: "Detergent, fabric softener, etc."
      },
      {
        name: "Laundry Basket/Bag",
        importance: "recommended"
      }
    ]
  },
  {
    category: "Health & Safety",
    items: [
      {
        name: "First Aid Kit",
        importance: "recommended"
      },
      {
        name: "Prescription Medications",
        importance: "recommended"
      },
      {
        name: "Over-the-Counter Medications",
        importance: "recommended",
        description: "Pain relievers, cold medicine, etc."
      },
      {
        name: "Medical Insurance Card",
        importance: "recommended"
      },
      {
        name: "Flashlight",
        importance: "recommended"
      },
      {
        name: "Batteries",
        importance: "recommended"
      }
    ]
  },
  {
    category: "Weather & Transportation",
    items: [
      {
        name: "Umbrella",
        importance: "recommended"
      },
      {
        name: "Rain/Snow Gear",
        importance: "recommended",
        description: "Boots, coat, gloves, hat"
      },
      {
        name: "Bike & Bike Lock",
        importance: "optional"
      }
    ]
  },
  {
    category: "Kitchen & Dining",
    items: [
      {
        name: "Dishes, Cups, Glasses",
        importance: "recommended"
      },
      {
        name: "Coffee Maker/Keurig",
        importance: "optional"
      },
      {
        name: "Alarm Clock",
        importance: "recommended",
        description: "With backup battery"
      }
    ]
  },
  {
    category: "Entertainment & Personal",
    items: [
      {
        name: "TV",
        importance: "optional"
      },
      {
        name: "Gaming Consoles",
        importance: "optional"
      },
      {
        name: "Surge Protectors",
        importance: "recommended"
      },
      {
        name: "Posters/Pictures",
        importance: "optional"
      },
      {
        name: "Over-the-door Mirror",
        importance: "optional"
      }
    ]
  }
];

const prohibitedItems: ProhibitedItem[] = [
  {
    name: "Cooking Appliances",
    description: "Hot plates, single burner units, sandwich makers, crock pots, instant pots, toasters, toaster ovens, waffle makers"
  },
  {
    name: "Microwave",
    description: "Not allowed - provided by housing"
  },
  {
    name: "Refrigerator/Mini-Fridge",
    description: "Not allowed - provided by housing"
  },
  {
    name: "Large Furniture",
    description: "Including additional furniture that doesn't fit in provided space"
  },
  {
    name: "Candles, Wax Warmers, Incense",
    description: "Fire hazards are not permitted"
  },
  {
    name: "Halogen Bulbs",
    description: "Fire hazard - use LED bulbs instead"
  },
  {
    name: "Thumbtacks, Duct Tape",
    description: "Can damage walls - use Command strips instead"
  },
  {
    name: "TV Cable Cords (Coaxial Cables)",
    description: "Not needed - use streaming services"
  },
  {
    name: "Wireless Routers",
    description: "Can interfere with campus network - use provided WiFi"
  },
  {
    name: "Weights/Exercise Equipment",
    description: "Use the Student Center gym instead"
  },
  {
    name: "Knives (longer than 3\")",
    description: "Including kitchen knives - small utility knives are okay"
  },
  {
    name: "Weapons",
    description: "Firearms, ammunition, explosives, slingshots, paintball guns, BB guns, airsoft guns, crossbows, and other weapons"
  },
  {
    name: "Drugs, Alcohol, Tobacco Products",
    description: "Including vapes and cannabis products"
  },
  {
    name: "Pets",
    description: "Service animals must be pre-approved"
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
          <ClipboardList className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">What to Bring</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Essential items checklist for your stay. Make sure you have everything you need for a comfortable and successful college experience.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Recommended Items */}
        <AccordionItem value="recommended" className="border-2 border-green-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <CheckCircle className="mr-3 h-6 w-6" />
              Recommended Items to Bring
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checklistItems.map((category) => (
                <div key={category.category} className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item.name} className="space-y-1">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            <span className="font-medium text-green-800 dark:text-green-200">{item.name}</span>
                          </div>
                          <Badge 
                            className={item.importance === "recommended" ? "bg-green-600 text-white" : "bg-green-200 text-green-800"}
                          >
                            {item.importance}
                          </Badge>
                        </div>
                        {item.description && (
                          <p className="text-sm text-green-700 dark:text-green-300 ml-3.5">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Prohibited Items */}
        <AccordionItem value="prohibited" className="border-2 border-red-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-red-50 dark:bg-red-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-red-800 dark:text-red-200">
              <XCircle className="mr-3 h-6 w-6" />
              Items NOT Allowed
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-4">
              {prohibitedItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">{item.name}</p>
                    {item.description && (
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Important Notes */}
        <AccordionItem value="notes" className="border-2 border-blue-600 rounded-lg">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <AlertTriangle className="mr-3 h-6 w-6" />
              Important Notes from Hocking College Housing
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <ul className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <div><strong>Furniture Provided:</strong> Hocking College provides basic furniture in each dorm room, including twin XL beds, desks and chairs, three drawer dressers, closets, microwave, and fridge for individual use.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <div><strong>Safety First:</strong> Prohibited items are restricted for the safety and well-being of all residents. Fire hazards are a serious concern in residence halls.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <div><strong>Exercise Equipment:</strong> Use the Student Center gym and workout equipment instead of bringing your own weights or exercise equipment.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <div><strong>Internet Access:</strong> Connect to the internet via the provided WiFi. Personal routers can interfere with the campus network.</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <div><strong>Questions?</strong> If you have any questions about what to bring or not to bring, please contact the Housing Office at (740) 753-6462 or <a href="mailto:housing@hocking.edu" className="text-blue-600 hover:underline">housing@hocking.edu</a>.</div>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 