import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from 'lucide-react';
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
    category: "Bedding",
    items: [
      {
        name: "Twin XL Sheets",
        importance: "required",
        description: "Extra-long twin sheets (80\" x 36\")"
      },
      {
        name: "Pillows",
        importance: "required"
      },
      {
        name: "Comforter/Blanket",
        importance: "required"
      },
      {
        name: "Mattress Pad",
        importance: "recommended",
        description: "For extra comfort"
      }
    ]
  },
  {
    category: "Bathroom",
    items: [
      {
        name: "Shower Caddy",
        importance: "required"
      },
      {
        name: "Towels",
        importance: "required",
        description: "Bath, hand, and washcloths"
      },
      {
        name: "Toiletries",
        importance: "required",
        description: "Toothbrush, toothpaste, soap, etc."
      },
      {
        name: "Shower Shoes",
        importance: "recommended",
        description: "For shared bathrooms"
      }
    ]
  },
  {
    category: "Electronics",
    items: [
      {
        name: "Laptop/Computer",
        importance: "required"
      },
      {
        name: "Phone Charger",
        importance: "required"
      },
      {
        name: "Power Strip",
        importance: "recommended",
        description: "With surge protection"
      },
      {
        name: "Ethernet Cable",
        importance: "optional",
        description: "For faster internet connection"
      }
    ]
  },
  {
    category: "Study Supplies",
    items: [
      {
        name: "Notebooks",
        importance: "required"
      },
      {
        name: "Pens/Pencils",
        importance: "required"
      },
      {
        name: "Desk Lamp",
        importance: "recommended"
      },
      {
        name: "Backpack",
        importance: "required"
      }
    ]
  },
  {
    category: "Room Organization",
    items: [
      {
        name: "Storage Bins",
        importance: "recommended",
        description: "For under-bed storage"
      },
      {
        name: "Hangers",
        importance: "required"
      },
      {
        name: "Laundry Basket",
        importance: "required"
      },
      {
        name: "Command Hooks",
        importance: "recommended",
        description: "For wall organization"
      }
    ]
  },
  {
    category: "Personal Items",
    items: [
      {
        name: "Clothing",
        importance: "required",
        description: "Seasonal items and hangers"
      },
      {
        name: "First Aid Kit",
        importance: "recommended"
      },
      {
        name: "Medications",
        importance: "required"
      },
      {
        name: "Photos/Decorations",
        importance: "optional",
        description: "To personalize your space"
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
            <Card className="hover-card h-full">
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
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
    </div>
  );
} 