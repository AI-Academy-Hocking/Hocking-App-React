import { ClipboardList, AlertTriangle, CheckCircle, XCircle, ArrowLeft, Download, Printer } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ChecklistItem {
  category: string;
  items: {
    name: string;
    importance: "recommended" | "optional";
    description?: string;
    season?: "fall" | "spring" | "both";
    weather?: "cold" | "warm" | "rain" | "all";
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
        description: "Standard dorm bed size",
        season: "both",
        weather: "all"
      },
      {
        name: "Twin XL Bedspread/Comforter",
        importance: "recommended",
        season: "both",
        weather: "all"
      },
      {
        name: "Blankets",
        importance: "recommended",
        season: "fall",
        weather: "cold"
      },
      {
        name: "Pillows",
        importance: "recommended",
        season: "both",
        weather: "all"
      },
      {
        name: "Mattress Pad/Topper",
        importance: "optional",
        description: "For extra comfort",
        season: "both",
        weather: "all"
      },
      {
        name: "Towels & Washcloths",
        importance: "recommended",
        season: "both",
        weather: "all"
      }
    ]
  },
  {
    category: "Bathroom Essentials",
    items: [
      {
        name: "Shower Curtain & Bathroom Mats",
        importance: "recommended",
        description: "For North, Downhour, Summit and Sycamore Halls (1 per suite)",
        season: "both",
        weather: "all"
      },
      {
        name: "Toilet Paper",
        importance: "recommended",
        description: "For North, Downhour, Summit and Sycamore",
        season: "both",
        weather: "all"
      },
      {
        name: "Shower Caddy",
        importance: "recommended",
        season: "both",
        weather: "all"
      },
      {
        name: "Shower Shoes/Flip Flops",
        importance: "recommended",
        season: "both",
        weather: "all"
      },
      {
        name: "Personal Hygiene Products",
        importance: "recommended",
        description: "Shampoo, soap, toothbrush, toothpaste, etc.",
        season: "both",
        weather: "all"
      },
      {
        name: "Hair Dryer",
        importance: "recommended",
        season: "both",
        weather: "all"
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
        importance: "recommended",
        season: "both",
        weather: "rain"
      },
      {
        name: "Rain Boots & Rain Jacket",
        importance: "recommended",
        description: "Essential for rainy days",
        season: "both",
        weather: "rain"
      },
      {
        name: "Winter Coat & Gloves",
        importance: "recommended",
        description: "Heavy coat, gloves, hat, scarf",
        season: "fall",
        weather: "cold"
      },
      {
        name: "Snow Boots",
        importance: "recommended",
        description: "Waterproof boots for snow",
        season: "fall",
        weather: "cold"
      },
      {
        name: "Light Jacket/Sweater",
        importance: "recommended",
        description: "For cool spring/fall days",
        season: "spring",
        weather: "warm"
      },
      {
        name: "Bike & Bike Lock",
        importance: "optional",
        season: "both",
        weather: "all"
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

export default function WhatToBring() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('whatToBringProgress');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage whenever checkedItems changes
  useEffect(() => {
    localStorage.setItem('whatToBringProgress', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleItemToggle = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const resetProgress = () => {
    setCheckedItems({});
    localStorage.removeItem('whatToBringProgress');
  };

  const getProgressPercentage = () => {
    const totalItems = checklistItems.reduce((acc, category) => acc + category.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  const printChecklist = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Hocking College - What to Bring Checklist</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .category { margin-bottom: 20px; }
              .category h3 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 5px; }
              .item { margin: 5px 0; padding: 5px; }
              .recommended { background-color: #f0f9ff; }
              .optional { background-color: #fef3c7; }
              .checkbox { width: 20px; height: 20px; margin-right: 10px; }
              .season-badge { background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
              .weather-badge { background: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
            </style>
          </head>
          <body>
            <h1>Hocking College - What to Bring Checklist</h1>
            <p><strong>Progress:</strong> ${getProgressPercentage()}% complete</p>
            ${checklistItems.map(category => `
              <div class="category">
                <h3>${category.category}</h3>
                ${category.items
                  .map(item => `
                    <div class="item ${item.importance}">
                      <input type="checkbox" class="checkbox" ${checkedItems[`${category.category}-${item.name}`] ? 'checked' : ''}>
                      <strong>${item.name}</strong>
                      ${item.season && item.season !== "both" ? `<span class="season-badge">${item.season}</span>` : ''}
                      ${item.weather && item.weather !== "all" ? `<span class="weather-badge">${item.weather}</span>` : ''}
                      ${item.description ? `<br><em>${item.description}</em>` : ''}
                    </div>
                  `).join('')}
              </div>
            `).join('')}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const downloadChecklist = () => {
    const content = `
HOCKING COLLEGE - WHAT TO BRING CHECKLIST
Progress: ${getProgressPercentage()}% complete

${checklistItems.map(category => `
${category.category.toUpperCase()}
${category.items
  .map(item => `[ ] ${item.name}${item.description ? ` - ${item.description}` : ''}${item.season && item.season !== "both" ? ` (${item.season})` : ''}${item.weather && item.weather !== "all" ? ` (${item.weather})` : ''}`)
  .join('\n')}
`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hocking-college-checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <ClipboardList className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">What to Bring</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Essential items checklist for your stay. Make sure you have everything you need for a comfortable and successful college experience.
        </p>
      </div>

      {/* Progress Bar and Controls */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xl text-blue-800 dark:text-blue-200">
          <span>Packing Progress: {getProgressPercentage()}%</span>
          <div className="flex gap-2">
            <Button onClick={printChecklist} variant="outline" size="sm" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button onClick={downloadChecklist} variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button onClick={resetProgress} variant="outline" size="sm">
              Reset
            </Button>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>



      {/* Collapsible Sections */}
      <div className="mb-8">
        <Accordion type="single" collapsible className="border-2 border-green-600 rounded-lg">
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
                      {category.items
                        .map((item) => {
                          const itemId = `${category.category}-${item.name}`;
                          return (
                            <li key={item.name} className="space-y-1">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2 flex-1">
                                  <Checkbox
                                    checked={checkedItems[itemId] || false}
                                    onCheckedChange={() => handleItemToggle(itemId)}
                                    className="text-green-600"
                                  />
                                  <span className={`font-medium ${checkedItems[itemId] ? 'line-through text-green-600' : 'text-green-800 dark:text-green-200'}`}>
                                    {item.name}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  {item.season && item.season !== "both" && (
                                    <Badge className="bg-green-200 text-green-800 text-xs">
                                      {item.season === "fall" ? "🍂 Fall" : "🌸 Spring"}
                                    </Badge>
                                  )}
                                  {item.weather && item.weather !== "all" && (
                                    <Badge className="bg-blue-200 text-blue-800 text-xs">
                                      {item.weather === "cold" ? "❄️ Cold" : item.weather === "rain" ? "🌧️ Rain" : "☀️ Warm"}
                                    </Badge>
                                  )}
                                  <Badge 
                                    className={item.importance === "recommended" ? "bg-green-600 text-white" : "bg-green-200 text-green-800"}
                                  >
                                    {item.importance}
                                  </Badge>
                                </div>
                              </div>
                              {item.description && (
                                <p className="text-sm text-green-700 dark:text-green-300 ml-6">
                                  {item.description}
                                </p>
                              )}
                            </li>
                          );
                        })}
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
                  <div><strong>Questions?</strong> If you have any questions about what to bring or not to bring, please contact the Housing Office at <a href="tel:7407536462" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">(740) 753-6462</a> or <a href="mailto:housing@hocking.edu" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">housing@hocking.edu</a>.</div>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
} 