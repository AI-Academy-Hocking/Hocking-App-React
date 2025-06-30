import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UtensilsCrossed, Clock, CreditCard, Calendar, Info, MapPin, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import "../styles/animations.css";

export default function DiningHall() {
  const [location, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('hours');
  const [expandedMealPlan, setExpandedMealPlan] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [dietaryAccommodationsExpanded, setDietaryAccommodationsExpanded] = useState(false);
  const [dietaryOptionsExpanded, setDietaryOptionsExpanded] = useState(false);
  const [allergenInfoExpanded, setAllergenInfoExpanded] = useState(false);
  const [hawksNestExpanded, setHawksNestExpanded] = useState(false);
  const [diamondDawgzExpanded, setDiamondDawgzExpanded] = useState(false);
  const [rhapsodyExpanded, setRhapsodyExpanded] = useState(false);
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

  // Watch for URL changes including query parameters
  useEffect(() => {
    console.log('DiningHall: Location changed to:', location);
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const tabFromUrl = urlParams.get('tab') || 'hours';
    console.log('DiningHall: Setting tab to:', tabFromUrl);
    setSelectedTab(tabFromUrl);
  }, [location]);

  // Handle tab change and update URL
  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    setLocation(`/dining?tab=${newTab}`);
  };

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

  return (
    <div className="container mx-auto py-6 px-4 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex items-center gap-2 mb-2">
        <UtensilsCrossed className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300">
          Hocking College Dining
        </h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-white mb-6">
        Explore our campus dining options, meal plans, weekly menus, and more.
      </p>

      {/* Dropdown Menu */}
      <div className="mb-6">
        <select
          value={selectedTab}
          onChange={(e) => handleTabChange(e.target.value)}
          className="p-2 border-2 border-blue-600 rounded-xl w-full md:w-auto dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
        >
          <option value="hours">Hours Of Operation</option>
          <option value="meal-plans">Meal Plans</option>
          <option value="menu">Weekly Menu</option>
          <option value="dietary">Dietary Info</option>
          <option value="locations">Locations</option>
        </select>
      </div>

      {/* Content Based on Selected Tab */}
      {selectedTab === "hours" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-blue-300 mb-6">
            <Clock className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            Hours of Operation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekdays Card */}
            <div className="border-2 border-blue-600 dark:border-gray-700 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 mb-4 text-center">Monday - Friday</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-300 mb-1">BREAKFAST</div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">7:00 AM - 10:00 AM</div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-300 mb-1">DINNER</div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">10:30 AM - 7:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekend Card */}
            <div className="border-2 border-blue-600 dark:border-gray-700 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 mb-4 text-center">Saturday - Sunday</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-300 mb-1">BRUNCH</div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">11:00 AM - 1:00 PM</div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-300 mb-1">DINNER</div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">11:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-blue-600 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-blue-300">Important Note</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-white">
              Holiday hours may vary. Check announcements for special hours during breaks and holidays.
            </p>
          </div>
        </div>
      )}

      {selectedTab === "meal-plans" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-blue-300 mb-4">
            <CreditCard className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            Meal Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-stretch">
            {/* Full Meal Plan */}
            <div 
              className={`border-2 ${expandedMealPlan === 'full' ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn`}
              onClick={() => setExpandedMealPlan(expandedMealPlan === 'full' ? null : 'full')}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Full Meal Plan</h3>
              </div>
              
              {expandedMealPlan === 'full' && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="text-center mb-4">
                    <span className="text-lg text-gray-900 dark:text-white">19</span>
                    <span className="text-lg text-gray-900 dark:text-white ml-2">meals per week</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-white text-sm mb-4">
                    <li>• 3 meals per day (Mon-Fri)</li>
                    <li>• 2 meals per day (Sat-Sun)</li>
                    <li>• $100 in Hawk Bucks per semester</li>
                  </ul>
                  <p className="text-sm text-gray-500 dark:text-gray-300 text-center">Perfect for residential students</p>
                </div>
              )}
            </div>

            {/* Partial Meal Plan */}
            <div 
              className={`border-2 ${expandedMealPlan === 'partial' ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn`}
              onClick={() => setExpandedMealPlan(expandedMealPlan === 'partial' ? null : 'partial')}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Partial Meal Plan</h3>
              </div>
              
              {expandedMealPlan === 'partial' && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="text-center mb-4">
                    <span className="text-lg text-gray-900 dark:text-white">14</span>
                    <span className="text-lg text-gray-900 dark:text-white ml-2">meals per week</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-white text-sm mb-4">
                    <li>• 2 meals per day (Mon-Fri)</li>
                    <li>• 2 meals per day (Sat-Sun)</li>
                    <li>• $75 in Hawk Dollars per semester</li>
                  </ul>
                  <p className="text-sm text-gray-500 dark:text-gray-300 text-center">Great for most students</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-blue-600 dark:border-gray-700 animate-fadeIn">
            <h4 className="font-medium mb-2 text-gray-900 dark:text-blue-300">How to Update Your Meal Plan</h4>
            <p className="text-gray-600 dark:text-white">
              For more information about meal plans or to upgrade your current plan, 
              please visit the Student Services office in Davidson Hall or call (740) 753-6000.
            </p>
          </div>
        </div>
      )}

      {selectedTab === "menu" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 animate-fadeIn">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-300">This Week's Menu</h2>
            </div>
            <div className="mb-3 text-center">
              <span className="text-sm bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 px-4 py-2 rounded-full font-semibold shadow-sm">March 31 - April 6</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Click on any day to view the full menu details</p>
          </div>
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
              <div 
                key={day.day} 
                className="border-2 border-blue-600 dark:border-gray-700 rounded-2xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn overflow-hidden"
                onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
              >
                <div className="bg-gray-50 dark:bg-gray-700 text-black dark:text-white py-3 px-4 font-medium">
                  <div className="text-lg">{day.day} {day.date}</div>
                </div>
                
                {expandedDay === day.day && (
                  <div className="bg-gray-50 dark:bg-gray-700">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                      <div className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Breakfast</div>
                      <div className="text-sm text-white">{day.menu.breakfast}</div>
                    </div>
                    <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                      <div className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Lunch</div>
                      <div className="text-sm text-white">{day.menu.lunch}</div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">Dinner</div>
                      <div className="text-sm text-white">{day.menu.dinner}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-600 dark:text-white">
            <p>* Menu items are subject to change based on availability.</p>
          </div>
        </div>
      )}

      {selectedTab === "dietary" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-blue-300 mb-4">
            <Info className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            Special Dietary Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className={`border-2 ${dietaryOptionsExpanded ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn`}
              onClick={() => setDietaryOptionsExpanded(!dietaryOptionsExpanded)}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Dietary Accommodations</h3>
              </div>
              
              {dietaryOptionsExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-gray-600 dark:text-white mb-4 text-center">
                    Hocking College Dining Services is committed to accommodating students with various dietary needs and preferences.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-white text-sm">
                    <li className="flex items-start">
                      <span className="inline-flex mr-2 mt-1">•</span>
                      <span>Vegetarian and vegan options available daily</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex mr-2 mt-1">•</span>
                      <span>Gluten-free alternatives at every meal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex mr-2 mt-1">•</span>
                      <span>Dairy-free choices clearly labeled</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex mr-2 mt-1">•</span>
                      <span>Allergen-free station with dedicated preparation area</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div 
              className={`border-2 ${allergenInfoExpanded ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn`}
              onClick={() => setAllergenInfoExpanded(!allergenInfoExpanded)}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Food Allergen Information</h3>
              </div>
              
              {allergenInfoExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-gray-600 dark:text-white mb-4 text-center">
                    All menu items are clearly labeled with the following allergen information:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <span className="inline-flex w-6 h-6 rounded-full bg-red-500 text-white text-xs items-center justify-center mr-2 font-medium flex-shrink-0">G</span>
                      <span className="text-sm">Gluten</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex w-6 h-6 rounded-full bg-yellow-500 text-white text-xs items-center justify-center mr-2 font-medium flex-shrink-0">D</span>
                      <span className="text-sm">Dairy</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex w-6 h-6 rounded-full bg-blue-500 text-white text-xs items-center justify-center mr-2 font-medium flex-shrink-0">N</span>
                      <span className="text-sm">Nuts</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex w-6 h-6 rounded-full bg-gray-600 dark:bg-gray-500 text-white text-xs items-center justify-center mr-2 font-medium flex-shrink-0">S</span>
                      <span className="text-sm">Soy</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex w-6 h-6 rounded-full bg-purple-500 text-white text-xs items-center justify-center mr-2 font-medium flex-shrink-0">E</span>
                      <span className="text-sm">Eggs</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex w-6 h-6 rounded-full bg-orange-500 text-white text-xs items-center justify-center mr-2 font-medium flex-shrink-0">F</span>
                      <span className="text-sm">Fish/Shellfish</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <div 
              className={`border-2 ${dietaryAccommodationsExpanded ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn max-w-md mx-auto`}
              onClick={() => setDietaryAccommodationsExpanded(!dietaryAccommodationsExpanded)}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Contact for Dietary Accommodations</h3>
              </div>
              
              {dietaryAccommodationsExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-gray-600 dark:text-white mb-4 text-center">
                    For specific dietary accommodations or concerns, please contact:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="font-medium text-gray-900 dark:text-blue-300 min-w-[60px]">Contact:</span>
                      <span className="text-gray-600 dark:text-white">Janet M. Smith</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="font-medium text-gray-900 dark:text-blue-300 min-w-[60px]">Email:</span>
                      <a href="mailto:smithj28721@hocking.edu" className="text-blue-600 dark:text-blue-400 hover:underline">
                        smithj28721@hocking.edu
                      </a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="font-medium text-gray-900 dark:text-blue-300 min-w-[60px]">Phone:</span>
                      <a href="tel:7407536000" className="text-blue-600 dark:text-blue-400 hover:underline">
                        (740) 753-6000
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "locations" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-600 dark:border-gray-700 animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-blue-300 mb-4">
            <MapPin className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            Campus Dining Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className={`border-2 ${hawksNestExpanded ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn`}
              onClick={() => setHawksNestExpanded(!hawksNestExpanded)}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Hawks Nest Dining Hall</h3>
              </div>
              
              {hawksNestExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="rounded-xl overflow-hidden border-2 border-blue-600 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-48 mb-4 relative group">
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-gray-700">
                      {imageLoading.hawksNest && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
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
                  <p className="text-gray-600 dark:text-white mb-4 text-center">
                    Our primary dining facility offering a wide variety of food options, including 
                    Grab-and-go and pre-made meals, including subs, sandwiches, and salads.
                  </p>
                  <ul className="space-y-1 text-gray-600 dark:text-white text-sm">
                    <li className="flex items-start">
                      <span className="font-medium w-20">Location:</span>
                      <span>John Light, second Floor</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
      
            <div 
              className={`border-2 ${diamondDawgzExpanded ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn`}
              onClick={() => setDiamondDawgzExpanded(!diamondDawgzExpanded)}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Diamond Dawgz</h3>
              </div>
              
              {diamondDawgzExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="rounded-xl overflow-hidden border-2 border-blue-600 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-48 mb-4 relative group">
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-gray-700">
                      {imageLoading.diamondDawgs && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
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
                  <p className="text-gray-600 dark:text-white mb-4 text-center">
                    A convenient spot for a quick hotdog, burger, fries, or some chicken tenders, or enjoy a refreshing milkshake and ice cream.
                  </p>
                  <ul className="space-y-1 text-gray-600 dark:text-white text-sm">
                    <li className="flex items-start">
                      <span className="font-medium w-20">Location:</span>
                      <span>185 W Canal St Nelsonville, OH 45764</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-20">Phone:</span>
                      <span>(740) 753-6100</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div 
              className={`border-2 ${rhapsodyExpanded ? 'border-blue-400 dark:border-cyan-300' : 'border-blue-600 dark:border-gray-700'} rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn`}
              onClick={() => setRhapsodyExpanded(!rhapsodyExpanded)}
            >
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-300 text-center">Rhapsody Restaurant</h3>
              </div>
              
              {rhapsodyExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="rounded-xl overflow-hidden border-2 border-blue-600 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 h-48 mb-4 relative group">
                    {imageLoading.rhapsody && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
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
                  <p className="text-gray-600 dark:text-white mb-4 text-center">
                    Rhapsody is a student-run restaurant that offers a casual fine dining experience with live music every Friday and Saturday.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-white">
                    <li className="flex items-start">
                      <span className="font-medium w-32">Sunday - Tuesday:</span>
                      <span>(Closed)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Wednesday & Thursday:</span>
                      <span>(5:00 PM - 9:00 PM)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Friday & Saturday:</span>
                      <span>(5:00 PM - 9:00 PM)</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}