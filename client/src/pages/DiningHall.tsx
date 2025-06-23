import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UtensilsCrossed, Clock, CreditCard, Calendar, Info, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
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

  return (
    <div className="container mx-auto py-6 px-4 bg-white dark:bg-[#151c26] min-h-screen">
      <div className="flex items-center gap-2 mb-2">
        <UtensilsCrossed className="h-8 w-8 text-primary dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-primary dark:text-white">
          Hocking College Dining
        </h1>
      </div>
      <p className="text-lg text-neutral-600 dark:text-white mb-6">
        Explore our campus dining options, meal plans, weekly menus, and more.
      </p>

      {/* Dropdown Menu */}
      <div className="mb-6">
        <select
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="p-2 border border-neutral-300 rounded-md w-full md:w-auto dark:bg-[#353e4a] dark:text-white dark:border-[#2a3240]"
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
        <div className="bg-white dark:bg-[#353e4a] rounded-lg shadow-md p-6 border border-neutral-200 dark:border-[#2a3240] animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-white mb-4">
            <Clock className="h-7 w-7 text-primary dark:text-blue-400" />
            Hours of Operation
          </h2>
          <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-[#2a3240] bg-neutral-50 dark:bg-[#2a3240]">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-[#2a3240]">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold dark:text-white">Days</th>
                  <th className="py-3 px-4 text-left font-semibold dark:text-white">Breakfast</th>
                  <th className="py-3 px-4 text-left font-semibold dark:text-white">Dinner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-[#2a3240]">
                <tr className="hover:bg-primary/10 dark:hover:bg-blue-500/20 transition-colors duration-200">
                  <td className="py-3 px-4 font-medium dark:text-white">Monday - Friday</td>
                  <td className="py-3 px-4 dark:text-white">7:00 AM - 10:00 AM</td>
                  <td className="py-3 px-4 dark:text-white">10:30 AM - 7:00 PM</td>
                </tr>
                <tr className="hover:bg-primary/10 dark:hover:bg-blue-500/20 transition-colors duration-200">
                  <td className="py-3 px-4 font-medium dark:text-white">Saturday - Sunday</td>
                  <td className="py-3 px-4 dark:text-white">11:00 AM - 1:00 PM</td>
                  <td className="py-3 px-4 dark:text-white">11:00 AM - 5:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-neutral-600 dark:text-white">
            <p>* Holiday hours may vary. Check announcements for special hours.</p>
          </div>
        </div>
      )}

      {selectedTab === "meal-plans" && (
        <div className="bg-white dark:bg-[#353e4a] rounded-lg shadow-md p-6 border border-neutral-200 dark:border-[#2a3240] animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-white mb-4">
            <CreditCard className="h-7 w-7 text-primary dark:text-blue-400" />
            Meal Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-stretch">
            <div className="border-2 border-blue-600 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 p-8 flex flex-col items-center justify-between min-h-[340px] animate-fadeIn shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Full Meal Plan</h3>
              <div className="text-2xl font-extrabold text-primary dark:text-blue-400 mb-5">19 meals/week</div>
              <ul className="space-y-3 text-neutral-700 dark:text-white mb-6 text-lg">
                <li className="flex items-start">
                  <span className="inline-flex mr-2 mt-1">•</span>
                  <span>3 meals per day (Mon-Fri)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex mr-2 mt-1">•</span>
                  <span>2 meals per day (Sat-Sun)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex mr-2 mt-1">•</span>
                  <span>$100 in Hawk Bucks per semester</span>
                </li>
              </ul>
              <p className="text-base text-neutral-500 dark:text-white/70">Perfect for residential students</p>
            </div>
            <div className="border-2 border-blue-600 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 p-8 flex flex-col items-center justify-between min-h-[340px] animate-fadeIn shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Partial Meal Plan</h3>
              <div className="text-2xl font-extrabold text-primary dark:text-blue-400 mb-5">14 meals/week</div>
              <ul className="space-y-3 text-neutral-700 dark:text-white mb-6 text-lg">
                <li className="flex items-start">
                  <span className="inline-flex mr-2 mt-1">•</span>
                  <span>2 meals per day (Mon-Fri)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex mr-2 mt-1">•</span>
                  <span>2 meals per day (Sat-Sun)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex mr-2 mt-1">•</span>
                  <span>$75 in Hawk Dollars per semester</span>
                </li>
              </ul>
              <p className="text-base text-neutral-500 dark:text-white/70">Great for most students</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-neutral-50 dark:bg-[#2a3240] rounded-lg border border-neutral-200 dark:border-[#2a3240] animate-fadeIn">
            <h4 className="font-medium mb-2 dark:text-white">How to Update Your Meal Plan</h4>
            <p className="text-neutral-600 dark:text-white">
              For more information about meal plans or to upgrade your current plan, 
              please visit the Student Services office in Davidson Hall or call (740) 753-6000.
            </p>
          </div>
        </div>
      )}

      {selectedTab === "menu" && (
        <div className="bg-white dark:bg-[#353e4a] rounded-lg shadow-md p-6 border border-neutral-200 dark:border-[#2a3240] animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-7 w-7 text-primary dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">This Week's Menu</h2>
            <span className="text-sm bg-primary/10 text-primary dark:bg-blue-500/20 dark:text-white px-3 py-1 rounded-full ml-auto">March 31 - April 6</span>
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
              <div key={day.day} className="border-2 border-blue-600 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn dark:bg-[#2a3240] dark:border-[#2a3240]">
                <div className="bg-primary text-white py-2 px-4 font-medium">
                  <div className="text-lg">{day.day}</div>
                  <div className="text-xs opacity-80">{day.date}</div>
                </div>
                <div className="p-3 border-b border-neutral-200">
                  <div className="text-xs uppercase font-semibold text-neutral-500 mb-1">Breakfast</div>
                  <div className="text-sm">{day.menu.breakfast}</div>
                </div>
                <div className="p-3 border-b border-neutral-200">
                  <div className="text-xs uppercase font-semibold text-neutral-500 mb-1">Lunch</div>
                  <div className="text-sm">{day.menu.lunch}</div>
                </div>
                <div className="p-3">
                  <div className="text-xs uppercase font-semibold text-neutral-500 mb-1">Dinner</div>
                  <div className="text-sm">{day.menu.dinner}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-neutral-600 dark:text-white">
            <p>* Menu items are subject to change based on availability.</p>
          </div>
        </div>
      )}

      {selectedTab === "dietary" && (
        <div className="bg-white dark:bg-[#353e4a] rounded-lg shadow-md p-6 border border-neutral-200 dark:border-[#2a3240] animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-white mb-4">
            <Info className="h-7 w-7 text-primary dark:text-blue-400" />
            Special Dietary Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-600 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn dark:bg-[#2a3240]">
              <h3 className="text-lg font-semibold mb-3 dark:text-white">Dietary Accommodations</h3>
              <p className="text-neutral-600 dark:text-white mb-4">
                Hocking College Dining Services is committed to accommodating students with various dietary needs and preferences.
              </p>
              <ul className="space-y-2 text-neutral-600 dark:text-white">
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
            
            <div className="border-2 border-blue-600 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn dark:bg-[#2a3240]">
              <h3 className="text-lg font-semibold mb-3 dark:text-white">Food Allergen Information</h3>
              <p className="text-neutral-600 dark:text-white mb-4">
                All menu items are clearly labeled with the following allergen information:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mr-2">G</span>
                  <span>Gluten</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center mr-2">D</span>
                  <span>Dairy</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">N</span>
                  <span>Nuts</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-white text-gray-800 text-xs flex items-center justify-center mr-2">S</span>
                  <span>Soy</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center mr-2">E</span>
                  <span>Eggs</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center mr-2">F</span>
                  <span>Fish/Shellfish</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-neutral-50 dark:bg-[#2a3240] rounded-lg border border-neutral-200 dark:border-[#2a3240] animate-fadeIn">
            <h4 className="font-medium mb-2 dark:text-white">Special Accommodations</h4>
            <p className="text-neutral-600 dark:text-white">
              For specific dietary accommodations or concerns, please contact Janet M.Smith
              <a href="mailto:dining@hocking.edu" className="text-primary hover:underline ml-1">smithj28721@hocking.edu</a> or call (740) 753-6000.
            </p>
          </div>
        </div>
      )}

      {selectedTab === "locations" && (
        <div className="bg-white dark:bg-[#353e4a] rounded-lg shadow-md p-6 border border-neutral-200 dark:border-[#2a3240] animate-fadeIn">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-white mb-4">
            <MapPin className="h-7 w-7 text-primary dark:text-blue-400" />
            Campus Dining Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col h-full animate-fadeIn">
              <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-[#2a3240] bg-neutral-50 dark:bg-[#2a3240] h-48 mb-4 relative group">
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  {imageLoading.hawksNest && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                      <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-blue-400" />
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
              <h3 className="text-xl font-semibold mb-2">Hawks Nest Dining Hall</h3>
              <p className="text-neutral-600 dark:text-white mb-4">
                Our primary dining facility offering a wide variety of food options, including 
                Grab-and-go and pre-made meals, including subs, sandwiches, and salads.
              </p>
              <ul className="space-y-1 text-neutral-600 dark:text-white mb-4">
                <li className="flex items-start text-sm">
                  <span className="font-medium w-20">Location:</span>
                  <span>John Light, second Floor</span>
                </li>
              </ul>
            </div>
      
            <div className="flex flex-col h-full animate-fadeIn">
              <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-[#2a3240] bg-neutral-50 dark:bg-[#2a3240] h-48 mb-4 relative group">
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  {imageLoading.diamondDawgs && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                      <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-blue-400" />
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
              <h3 className="text-xl font-semibold mb-2">Diamond Dawgz</h3>
              <p className="text-neutral-600 dark:text-white mb-4">
                A convenient spot for a quick hotdog, burger, fries, or some chicken tenders, or enjoy a refreshing milkshake and ice cream.
              </p>
              <ul className="space-y-1 text-neutral-600 dark:text-white mb-4">
                <li className="flex items-start text-sm">
                  <span className="font-medium w-20">Location:</span>
                  <span>185 W Canal St Nelsonville, OH 45764</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="font-medium w-20">Phone:</span>
                  <span>(740) 753-6100</span>
                </li>
              </ul>
            </div>
          </div>
      
          <div className="mt-6 p-4 bg-neutral-50 dark:bg-[#2a3240] rounded-lg border border-neutral-200 dark:border-[#2a3240] flex flex-col md:flex-row items-start gap-4 animate-fadeIn">
            <div className="flex-1">
              <h3 className="font-medium mb-2">Rhapsody Restaurant</h3>
              <p className="text-neutral-600 dark:text-white mb-2">
                Rhapsody is a student-run restaurant that offers a casual fine dining experience with live music every Friday and Saturday.
              </p>
              <ul className="space-y-1 text-sm">
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
            <div className="flex-shrink-0 w-full md:w-64 h-48 rounded-lg overflow-hidden border border-neutral-200 dark:border-[#2a3240] relative group animate-fadeIn">
              {imageLoading.rhapsody && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-blue-400" />
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
        </div>
      )}
    </div>
  );
}