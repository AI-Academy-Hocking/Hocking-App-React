import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UtensilsCrossed, Clock, CreditCard, Calendar, Info, MapPin } from "lucide-react";
import HawksNest from "../components/assets/HawksNest.webp";
import DiamondDawgs from "../components/assets/DiamondDawgs.jpeg";
import Rhapsody from "../components/assets/rhapsody.jpg";


export default function DiningHall() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center gap-2 mb-2">
        <UtensilsCrossed className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
          Hocking College Dining
        </h1>
      </div>
      <p className="text-lg text-neutral-600 mb-6">
        Explore our campus dining options, meal plans, weekly menus, and more.
      </p>
      
      <Tabs defaultValue="hours" className="mb-8">
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-0">
          <TabsTrigger value="hours" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Hours</span>
          </TabsTrigger>
          <TabsTrigger value="meal-plans" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            <span>Meal Plans</span>
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Weekly Menu</span>
          </TabsTrigger>
          <TabsTrigger value="dietary" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>Dietary Info</span>
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Locations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hours" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Hours of Operation</h2>
            <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
              <table className="w-full">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold">Days</th>
                    <th className="py-3 px-4 text-left font-semibold">Breakfast</th>
                    <th className="py-3 px-4 text-left font-semibold">Dinner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="py-3 px-4 font-medium">Monday - Friday</td>
                    <td className="py-3 px-4">7:00 AM - 10:00 AM</td>
                    <td className="py-3 px-4">10:30 AM - 7:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Saturday - Sunday</td>
                    <td className="py-3 px-4" colSpan={2}>11:00 AM - 1:00 PM</td>
                    <td className="py-3 px-4">11:00 AM - 5:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-neutral-600">
              <p>* Holiday hours may vary. Check announcements for special hours.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="meal-plans" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Meal Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-neutral-200 rounded-lg p-5 hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">Full Meal Plan</h3>
                <div className="text-xl font-bold text-primary mb-4">19 meals/week</div>
                <ul className="space-y-2 text-neutral-600 mb-4">
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
                <p className="text-sm text-neutral-500">Perfect for residential students</p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-5 hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">Partial Meal Plan</h3>
                <div className="text-xl font-bold text-primary mb-4">14 meals/week</div>
                <ul className="space-y-2 text-neutral-600 mb-4">
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
                <p className="text-sm text-neutral-500">Great for most students</p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-5 hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">Commuter Plan</h3>
                <div className="text-xl font-bold text-primary mb-4">5 meals/week</div>
                <ul className="space-y-2 text-neutral-600 mb-4">
                  <li className="flex items-start">
                    <span className="inline-flex mr-2 mt-1">•</span>
                    <span>1 meal per day (Mon-Fri)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex mr-2 mt-1">•</span>
                    <span>$50 in Hawk Dollars per semester</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex mr-2 mt-1">•</span>
                    <span>Discounted rates on additional meals</span>
                  </li>
                </ul>
                <p className="text-sm text-neutral-500">Ideal for commuter students</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-medium mb-2">How to Update Your Meal Plan</h4>
              <p className="text-neutral-600">
                For more information about meal plans or to upgrade your current plan, 
                please visit the Student Services office in Davidson Hall or call (740) 753-6000.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="menu" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-primary">This Week's Menu</h2>
              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">March 31 - April 6</span>
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
                <div key={day.day} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
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
            
            <div className="mt-4 text-sm text-neutral-600">
              <p>* Menu items are subject to change based on availability.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="dietary" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Special Dietary Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-neutral-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3">Dietary Accommodations</h3>
                <p className="text-neutral-600 mb-4">
                  Hocking College Dining Services is committed to accommodating students with various dietary needs and preferences.
                </p>
                <ul className="space-y-2 text-neutral-600">
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
              
              <div className="border border-neutral-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3">Food Allergen Information</h3>
                <p className="text-neutral-600 mb-4">
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
                    <span className="inline-block w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mr-2">S</span>
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
            
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-medium mb-2">Special Accommodations</h4>
              <p className="text-neutral-600">
                For specific dietary accommodations or concerns, please contact Janet M.Smith
                <a href="mailto:dining@hocking.edu" className="text-primary hover:underline ml-1">smithj28721@hocking.edu</a> or call (740) 753-6000.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="locations" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Campus Dining Locations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col h-full">
                <div className="rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 h-48 mb-4">
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <img src={HawksNest} alt="Hawks Nest" className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Hawks Nest Dining Hall</h3>
                <p className="text-neutral-600 mb-4">
                  Our primary dining facility offering a wide variety of food options, including 
                  Grab-and-go and pre made meals,including subs,sandwiches, and salads.
                </p>
                <ul className="space-y-1 text-neutral-600 mb-4">
                  <li className="flex items-start text-sm">
                    <span className="font-medium w-20">Location:</span>
                    <span>John Light, second Floor</span>
                  </li>
                  <li className="flex items-start text-sm">
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 h-48 mb-4">
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <img src={DiamondDawgs} alt="Diamond Dawgz" className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Diamond Dawgz</h3>
                <p className="text-neutral-600 mb-4">
                  A convient spot for a quick hotdog,burger, fries or some chicken tenders, or enoy a refreshing milkshake and icecream.

                </p>
                <ul className="space-y-1 text-neutral-600 mb-4">
                  <li className="flex items-start text-sm">
                    <span className="font-medium w-20">Location:</span>
                    <span>185 W canal St Nelsonville,OH 45764</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="font-medium w-20">Phone:</span>
                    <span>(740) 753-6100</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="font-medium mb-2">Rhapsody Restaunt</h3>
              <p className="text-neutral-600 mb-2">
                Rhapsody is a student ran restaunt that offers a causual fine dinning expirence with live music every friday and saturday.
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="font-medium w-20">Sunday - Tuesday :</span>
                  <span>(closed)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-20">wednesday & Thursday:</span>
                  <span>(5:00 PM - 9:00 PM)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-20">Friday & Saturday:</span>
                  <span> (5:00 PM - 9:00 PM)</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}