import { 
  UtensilsCrossed, Clock, CreditCard, Calendar, Info, MapPin, Loader2, ArrowLeft,
  ExternalLink, Star, Shield, RotateCcw, CheckCircle, BookOpen, Activity, 
  Building, Phone, Mail, Users, Timer, Waves
} from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import "../styles/animations.css";

export default function DiningHall() {
  const [selectedTab, setSelectedTab] = useState("hours");
  const [imageLoading, setImageLoading] = useState({
    hawksNest: true,
    diamondDawgs: true,
    rhapsody: true
  });
  const [images, setImages] = useState({
    hawksNest: '',
    diamondDawgs: '',
    rhapsody: ''
  });

  useEffect(() => {
    // Load images safely
    try {
      import("../components/assets/HawksNest.webp").then(module => {
        setImages(prev => ({ ...prev, hawksNest: module.default }));
      });
      import("../components/assets/DiamondDawgs.jpeg").then(module => {
        setImages(prev => ({ ...prev, diamondDawgs: module.default }));
      });
      import("../components/assets/rhapsody.webp").then(module => {
        setImages(prev => ({ ...prev, rhapsody: module.default }));
      });
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }, []);

  const handleImageLoad = (imageName: keyof typeof imageLoading) => {
    setImageLoading(prev => ({
      ...prev,
      [imageName]: false
    }));
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <UtensilsCrossed className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Hocking College Dining</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Explore our campus dining options, meal plans, weekly menus, and more. We offer a variety of delicious and nutritious options to fuel your academic success.
        </p>
      </div>

      {/* Tab Navigation */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Activity className="mr-3 h-6 w-6" />
            Dining Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: "hours", label: "Hours of Operation", icon: Clock },
              { value: "meal-plans", label: "Meal Plans", icon: CreditCard },
              { value: "menu", label: "Weekly Menu", icon: Calendar },
              { value: "dietary", label: "Dietary Info", icon: Info },
              { value: "locations", label: "Locations", icon: MapPin }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedTab(tab.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedTab === tab.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Based on Selected Tab */}
      {selectedTab === "hours" && (
        <Card className="mb-8 border-2 border-green-600 animate-fadeIn">
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
              <Clock className="mr-3 h-6 w-6" />
              Hours of Operation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-hidden rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30">
              <table className="w-full">
                <thead className="bg-green-100 dark:bg-green-900/50">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold text-green-800 dark:text-green-200">Days</th>
                    <th className="py-3 px-4 text-left font-semibold text-green-800 dark:text-green-200">Breakfast</th>
                    <th className="py-3 px-4 text-left font-semibold text-green-800 dark:text-green-200">Dinner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-200 dark:divide-green-800">
                  <tr className="hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors duration-200">
                    <td className="py-3 px-4 font-medium text-green-700 dark:text-green-300">Monday - Friday</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-300">7:00 AM - 10:00 AM</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-300">10:30 AM - 7:00 PM</td>
                  </tr>
                  <tr className="hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors duration-200">
                    <td className="py-3 px-4 font-medium text-green-700 dark:text-green-300">Saturday - Sunday</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-300">11:00 AM - 1:00 PM</td>
                    <td className="py-3 px-4 text-green-700 dark:text-green-300">11:00 AM - 5:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center">
                <Info className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">* Holiday hours may vary. Check announcements for special hours.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "meal-plans" && (
        <div className="space-y-8">
          <Card className="border-2 border-purple-600 animate-fadeIn">
            <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
              <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
                <CreditCard className="mr-3 h-6 w-6" />
                Meal Plans
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-2 border-purple-600 dark:border-purple-700 rounded-lg shadow-sm bg-purple-50 dark:bg-purple-900/30 p-8 flex flex-col items-center justify-between min-h-[340px] animate-fadeIn shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 text-purple-800 dark:text-purple-200">Full Meal Plan</h3>
                  <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mb-5">19 meals/week</div>
                  <ul className="space-y-3 text-purple-700 dark:text-purple-300 mb-6 text-lg">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-purple-600" />
                      <span>3 meals per day (Mon-Fri)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-purple-600" />
                      <span>2 meals per day (Sat-Sun)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-purple-600" />
                      <span>$100 in Hawk Bucks per semester</span>
                    </li>
                  </ul>
                  <p className="text-base text-purple-600 dark:text-purple-400">Perfect for residential students</p>
                </div>
                <div className="border-2 border-purple-600 dark:border-purple-700 rounded-lg shadow-sm bg-purple-50 dark:bg-purple-900/30 p-8 flex flex-col items-center justify-between min-h-[340px] animate-fadeIn shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 text-purple-800 dark:text-purple-200">Partial Meal Plan</h3>
                  <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mb-5">14 meals/week</div>
                  <ul className="space-y-3 text-purple-700 dark:text-purple-300 mb-6 text-lg">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-purple-600" />
                      <span>2 meals per day (Mon-Fri)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-purple-600" />
                      <span>2 meals per day (Sat-Sun)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-purple-600" />
                      <span>$75 in Hawk Dollars per semester</span>
                    </li>
                  </ul>
                  <p className="text-base text-purple-600 dark:text-purple-400">Great for most students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-600">
            <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
              <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
                <Users className="mr-3 h-6 w-6" />
                How to Update Your Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-700 dark:text-orange-300">Student Services office in Davidson Hall</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-orange-600" />
                    <a href="tel:7407536000" className="text-blue-600 hover:underline text-sm">(740) 753-6000</a>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-orange-600" />
                    <a href="mailto:dining@hocking.edu" className="text-blue-600 hover:underline text-sm">dining@hocking.edu</a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-700 dark:text-orange-300">Office hours: 8:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === "menu" && (
        <Card className="border-2 border-teal-600 animate-fadeIn">
          <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
            <CardTitle className="flex items-center text-xl text-teal-800 dark:text-teal-200">
              <Calendar className="mr-3 h-6 w-6" />
              This Week's Menu
              <Badge className="ml-auto bg-teal-600 text-white">March 31 - April 6</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {[
                { day: "Monday", date: "March 31", menu: {
                  breakfast: "Scrambled Eggs, Bacon, Hash Browns, Toast",
                  lunch: "Italian Pasta Bar, Garlic Bread, Caesar Salad", 
                  dinner: "Grilled Chicken, Roasted Potatoes, Steamed Broccoli"
                }},
                { day: "Tuesday", date: "April 1", menu: {
                  breakfast: "Pancakes, Sausage Links, Fresh Fruit",
                  lunch: "Taco Tuesday: Build Your Own Tacos, Spanish Rice", 
                  dinner: "Stir Fry Station with Chicken/Tofu, Vegetables, Rice"
                }},
                { day: "Wednesday", date: "April 2", menu: {
                  breakfast: "French Toast, Turkey Bacon, Yogurt Parfait",
                  lunch: "Deli Sandwich Bar, Potato Chips, Pasta Salad", 
                  dinner: "Rotisserie Chicken, Mashed Potatoes, Green Beans"
                }},
                { day: "Thursday", date: "April 3", menu: {
                  breakfast: "Breakfast Burritos, Home Fries, Sliced Fruit",
                  lunch: "Burger Bar, French Fries, Garden Salad", 
                  dinner: "Baked Ziti, Garlic Bread, Roasted Vegetables"
                }},
                { day: "Friday", date: "April 4", menu: {
                  breakfast: "Assorted Pastries, Oatmeal Bar, Boiled Eggs",
                  lunch: "Grilled Cheese, Tomato Soup, Vegetable Medley", 
                  dinner: "Pizza Night: Assorted Pizzas, Breadsticks, Salad"
                }}
              ].map((day) => (
                <div key={day.day} className="border-2 border-teal-600 dark:border-teal-700 rounded-lg shadow-sm bg-teal-50 dark:bg-teal-900/30 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn">
                  <div className="bg-teal-600 text-white py-2 px-4 font-medium">
                    <div className="text-lg">{day.day}</div>
                    <div className="text-xs opacity-80">{day.date}</div>
                  </div>
                  <div className="p-3 border-b border-teal-200 dark:border-teal-800">
                    <div className="text-xs uppercase font-semibold text-teal-600 dark:text-teal-400 mb-1">Breakfast</div>
                    <div className="text-sm text-teal-700 dark:text-teal-300">{day.menu.breakfast}</div>
                  </div>
                  <div className="p-3 border-b border-teal-200 dark:border-teal-800">
                    <div className="text-xs uppercase font-semibold text-teal-600 dark:text-teal-400 mb-1">Lunch</div>
                    <div className="text-sm text-teal-700 dark:text-teal-300">{day.menu.lunch}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs uppercase font-semibold text-teal-600 dark:text-teal-400 mb-1">Dinner</div>
                    <div className="text-sm text-teal-700 dark:text-teal-300">{day.menu.dinner}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg border border-teal-200 dark:border-teal-800">
              <div className="flex items-center">
                <Info className="mr-2 h-4 w-4 text-teal-600" />
                <span className="text-sm text-teal-700 dark:text-teal-300">* Menu items are subject to change based on availability.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "dietary" && (
        <div className="space-y-8">
          <Card className="border-2 border-indigo-600 animate-fadeIn">
            <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
              <CardTitle className="flex items-center text-xl text-indigo-800 dark:text-indigo-200">
                <Info className="mr-3 h-6 w-6" />
                Special Dietary Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-indigo-600 dark:border-indigo-700 rounded-lg shadow-sm bg-indigo-50 dark:bg-indigo-900/30 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-800 dark:text-indigo-200">Dietary Accommodations</h3>
                  <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                    Hocking College Dining Services is committed to accommodating students with various dietary needs and preferences.
                  </p>
                  <ul className="space-y-2 text-indigo-700 dark:text-indigo-300">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-indigo-600" />
                      <span>Vegetarian and vegan options available daily</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-indigo-600" />
                      <span>Gluten-free alternatives at every meal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-indigo-600" />
                      <span>Dairy-free choices clearly labeled</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-4 w-4 text-indigo-600" />
                      <span>Allergen-free station with dedicated preparation area</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-2 border-indigo-600 dark:border-indigo-700 rounded-lg shadow-sm bg-indigo-50 dark:bg-indigo-900/30 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-800 dark:text-indigo-200">Food Allergen Information</h3>
                  <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                    All menu items are clearly labeled with the following allergen information:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mr-2">G</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Gluten</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center mr-2">D</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Dairy</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">N</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Nuts</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-white text-gray-800 text-xs flex items-center justify-center mr-2">S</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Soy</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center mr-2">E</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Eggs</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center mr-2">F</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Fish/Shellfish</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-600">
            <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
              <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
                <Users className="mr-3 h-6 w-6" />
                Special Accommodations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-600" />
                      <a href="mailto:smithj28721@hocking.edu" className="text-blue-600 hover:underline text-sm">smithj28721@hocking.edu</a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-gray-600" />
                      <a href="tel:7407536000" className="text-blue-600 hover:underline text-sm">(740) 753-6000</a>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Dietary Specialist</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Janet M. Smith</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Available for consultations</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === "locations" && (
        <div className="space-y-8">
          <Card className="border-2 border-green-600 animate-fadeIn">
            <CardHeader className="bg-green-50 dark:bg-green-900/20">
              <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
                <MapPin className="mr-3 h-6 w-6" />
                Campus Dining Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col h-full animate-fadeIn">
                  <div className="rounded-lg overflow-hidden border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 h-48 mb-4 relative group">
                    <div className="w-full h-full flex items-center justify-center bg-green-100 dark:bg-green-900/50">
                      {imageLoading.hawksNest && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                        </div>
                      )}
                      <img 
                        src={images.hawksNest} 
                        alt="Hawks Nest" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onLoad={() => handleImageLoad('hawksNest')}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Hawks+Nest';
                          handleImageLoad('hawksNest');
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Hawks Nest Dining Hall</h3>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    Our primary dining facility offering a wide variety of food options, including 
                    Grab-and-go and pre-made meals, including subs, sandwiches, and salads.
                  </p>
                  <ul className="space-y-1 text-green-700 dark:text-green-300 mb-4">
                    <li className="flex items-start text-sm">
                      <Building className="mr-2 mt-1 h-4 w-4 text-green-600" />
                      <span>John Light, second Floor</span>
                    </li>
                  </ul>
                </div>
          
                <div className="flex flex-col h-full animate-fadeIn">
                  <div className="rounded-lg overflow-hidden border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 h-48 mb-4 relative group">
                    <div className="w-full h-full flex items-center justify-center bg-green-100 dark:bg-green-900/50">
                      {imageLoading.diamondDawgs && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                        </div>
                      )}
                      <img 
                        src={images.diamondDawgs} 
                        alt="Diamond Dawgz" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onLoad={() => handleImageLoad('diamondDawgs')}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Diamond+Dawgz';
                          handleImageLoad('diamondDawgs');
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Diamond Dawgz</h3>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    A convenient spot for a quick hotdog, burger, fries, or some chicken tenders, or enjoy a refreshing milkshake and ice cream.
                  </p>
                  <ul className="space-y-1 text-green-700 dark:text-green-300 mb-4">
                    <li className="flex items-start text-sm">
                      <MapPin className="mr-2 mt-1 h-4 w-4 text-green-600" />
                      <span>185 W Canal St Nelsonville, OH 45764</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Phone className="mr-2 mt-1 h-4 w-4 text-green-600" />
                      <a href="tel:7407536100" className="text-blue-600 hover:underline">(740) 753-6100</a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-600">
            <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
              <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
                <Star className="mr-3 h-6 w-6" />
                Rhapsody Restaurant
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-purple-700 dark:text-purple-300">
                    Rhapsody is a student-run restaurant that offers a casual fine dining experience with live music every Friday and Saturday.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Hours of Operation</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-purple-600" />
                        <span className="text-sm text-purple-700 dark:text-purple-300">Sunday - Tuesday: Closed</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-purple-600" />
                        <span className="text-sm text-purple-700 dark:text-purple-300">Wednesday & Thursday: 5:00 PM - 9:00 PM</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-purple-600" />
                        <span className="text-sm text-purple-700 dark:text-purple-300">Friday & Saturday: 5:00 PM - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-full md:w-64 h-48 rounded-lg overflow-hidden border border-purple-200 dark:border-purple-800 relative group animate-fadeIn">
                  {imageLoading.rhapsody && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                    </div>
                  )}
                  <img 
                    src={images.rhapsody} 
                    alt="Rhapsody Restaurant" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => handleImageLoad('rhapsody')}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Rhapsody';
                      handleImageLoad('rhapsody');
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FAQ Section */}
      <Card className="border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <BookOpen className="mr-3 h-6 w-6" />
            Frequently Asked Questions (FAQ)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="meal-plan-changes">
              <AccordionTrigger className="text-left">
                How do I change my meal plan?
              </AccordionTrigger>
              <AccordionContent>
                Contact the Student Services office in Davidson Hall or call (740) 753-6000. Changes can typically be made within the first two weeks of each semester.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hawk-bucks">
              <AccordionTrigger className="text-left">
                What are Hawk Bucks and how do I use them?
              </AccordionTrigger>
              <AccordionContent>
                Hawk Bucks are dining dollars included with your meal plan that can be used at any campus dining location. They are loaded onto your student ID card and can be used for additional meals, snacks, or guest meals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="guest-meals">
              <AccordionTrigger className="text-left">
                Can I bring guests to the dining hall?
              </AccordionTrigger>
              <AccordionContent>
                Yes! You can use your Hawk Bucks to purchase guest meals, or guests can pay with cash or card at the entrance. Guest meal prices are typically lower than regular meal prices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dietary-accommodations">
              <AccordionTrigger className="text-left">
                How do I request special dietary accommodations?
              </AccordionTrigger>
              <AccordionContent>
                Contact Janet M. Smith at smithj28721@hocking.edu or call (740) 753-6000. We can accommodate most dietary restrictions and allergies with advance notice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="menu-updates">
              <AccordionTrigger className="text-left">
                How often is the menu updated?
              </AccordionTrigger>
              <AccordionContent>
                The weekly menu is updated every Friday for the following week. Daily specials and changes are posted at the dining hall entrance and on our website.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}