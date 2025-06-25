import * as React from "react";
import { useState, useEffect } from "react";
import { 
  Menu, Moon, Sun, LogOut, Home, Calendar, Wrench, Map, UtensilsCrossed, Shield,
  LibraryBig, MonitorSmartphone, Users, Dumbbell, Trophy, ChevronDown, ChevronRight,
  GraduationCap, Clock, Star, Coffee, Utensils, Music, CreditCard, Info, MapPin, CalendarDays
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetPortal, SheetOverlay } from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/auth";
import { Link, useLocation } from "wouter";
import HawkLogo from "../../assets/HawkLogo.png";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/maps", label: "Maps & Directions", icon: Map },
  { path: "/safety", label: "Campus Safety", icon: Shield },
];

const studentToolsDropdown = [
  { path: "/tools", label: "Student Tools Dashboard", icon: Wrench },
  { path: "/academic-success-center", label: "Library", icon: LibraryBig },
  { path: "/online-learning", label: "Online Learning", icon: MonitorSmartphone },
  { path: "/student-organizations", label: "Student Organizations", icon: Users },
  { path: "/recreation", label: "Recreation", icon: Dumbbell },
  { path: "/athletics", label: "Athletics", icon: Trophy },
  { path: "/housing", label: "Housing", icon: Home },
];

const calendarDropdown = [
  { path: "/calendar", label: "Full Calendar View", icon: Calendar },
  { path: "/calendar?type=academic", label: "Academic Calendar", icon: GraduationCap },
  { path: "/calendar?type=activities", label: "Student Activities", icon: Users },
  { path: "/calendar?view=upcoming", label: "Upcoming Events", icon: Clock },
  { path: "/calendar?view=today", label: "Today's Events", icon: Star },
];

const diningDropdown = [
  { path: "/dining?tab=hours", label: "Hours Of Operation", icon: Clock },
  { path: "/dining?tab=meal-plans", label: "Meal Plans", icon: CreditCard },
  { path: "/dining?tab=menu", label: "Weekly Menu", icon: Calendar },
  { path: "/dining?tab=dietary", label: "Dietary Info", icon: Info },
  { path: "/dining?tab=locations", label: "Locations", icon: MapPin },
];

interface HeaderProps {
  onMobileMenuChange?: (isOpen: boolean) => void;
}

export default function Header({ onMobileMenuChange }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [location, setLocation] = useLocation();

  // Mobile dropdown states
  const [isStudentToolsOpen, setIsStudentToolsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDiningOpen, setIsDiningOpen] = useState(false);

  // Simplified active state checking
  const isActive = (path: string) => {
    // For paths with query parameters, just check if we start with the base path
    if (path.includes('?')) {
      const basePath = path.split('?')[0];
      return location.startsWith(basePath);
    }
    // For exact paths, check for exact match
    return location === path;
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
  };

  const handleMenuOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
    onMobileMenuChange?.(open);
  };

  // Only update dropdown states on initial load, not on every navigation
  useEffect(() => {
    // Only auto-open on first load if we're on a relevant page
    const isOnStudentTools = location.includes('/tools') || location.includes('/academic-success-center') || 
        location.includes('/online-learning') || location.includes('/student-organizations') || 
        location.includes('/recreation') || location.includes('/athletics') || location.includes('/housing');
    const isOnCalendar = location === '/calendar' || location.includes('calendar');
    const isOnDining = location === '/dining' || location.startsWith('/dining');
    
    if (isOnDining && !isDiningOpen) {
      setIsDiningOpen(true);
    }
    if (isOnStudentTools && !isStudentToolsOpen) {
      setIsStudentToolsOpen(true);
    }
    if (isOnCalendar && !isCalendarOpen) {
      setIsCalendarOpen(true);
    }
  }, []);

  const handleNavigation = (path: string) => {
    console.log('Mobile: Navigating to:', path);
    console.log('Mobile: Current location before:', location);
    
    // Close menu first
    handleMenuOpenChange(false);
    
    // Try wouter navigation
    setLocation(path);
    
    // If the location doesn't change after a brief delay, force navigation
    setTimeout(() => {
      if (window.location.pathname + window.location.search !== path) {
        console.log('Mobile: Wouter navigation failed, using window.location');
        window.location.href = path;
      }
    }, 100);
  };

  const handleDiningNavigation = handleNavigation;

  return (
    <header className="bg-blue-900 dark:bg-blue-950 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={handleMenuOpenChange}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden p-1 text-yellow-400 hover:bg-yellow-100 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)]"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetPortal>
              <div 
                className="fixed inset-0 z-[1999] bg-transparent"
                onClick={() => handleMenuOpenChange(false)}
              />
              <div className="fixed inset-y-0 left-0 z-[2000] h-full w-64 bg-gray-800/60 backdrop-blur-sm border-none p-0 flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-[state=closed]:duration-300 data-[state=open]:duration-500">
                <div className="p-4 border-b-2 border-white !bg-blue-600/70 dark:!bg-blue-900/70 backdrop-blur-sm" style={{ backgroundColor: 'rgba(37, 99, 235, 0.7)' }}>
                  <div className="flex items-center">
                    <img 
                      src={HawkLogo} 
                      alt="Hocking College Logo" 
                      className="h-8 w-auto object-contain" 
                    />
                    <div className="flex-1 flex justify-center">
                      <span className="text-white font-bold text-lg">Menu</span>
                    </div>
                  </div>
                </div>
                <nav className="flex-1 p-4 overflow-y-auto">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <button 
                          onClick={() => handleNavigation(item.path)}
                          className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition w-full text-left ${
                            isActive(item.path) ? 'bg-gray-700 text-white' : 'text-white'
                          }`}
                        >
                          <item.icon className={`mr-3 h-5 w-5 ${
                            isActive(item.path) ? 'text-white' : 'text-blue-300'
                          }`} />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    ))}
                    
                    {/* Calendar Dropdown */}
                    <li>
                      <button
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition text-white"
                      >
                        <div className="flex items-center">
                          <CalendarDays className="mr-3 h-5 w-5 text-blue-300" />
                          <span>Calendar & Events</span>
                        </div>
                        {isCalendarOpen ? (
                          <ChevronDown className="h-4 w-4 text-blue-300" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-blue-300" />
                        )}
                      </button>
                      
                      {isCalendarOpen && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {calendarDropdown.map((item) => (
                            <li key={item.path}>
                              <button
                                onClick={() => handleNavigation(item.path)}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition text-sm w-full text-left ${
                                  isActive(item.path) ? 'bg-gray-700 text-white' : 'text-gray-300'
                                }`}
                              >
                                <item.icon className={`mr-3 h-4 w-4 ${
                                  isActive(item.path) ? 'text-white' : 'text-blue-300'
                                }`} />
                                <span>{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>

                    {/* Dining Dropdown */}
                    <li>
                      <button
                        onClick={() => setIsDiningOpen(!isDiningOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition text-white"
                      >
                        <div className="flex items-center">
                          <UtensilsCrossed className="mr-3 h-5 w-5 text-blue-300" />
                          <span>Dining & Hours</span>
                        </div>
                        {isDiningOpen ? (
                          <ChevronDown className="h-4 w-4 text-blue-300" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-blue-300" />
                        )}
                      </button>
                      
                      {isDiningOpen && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {diningDropdown.map((item) => (
                            <li key={item.path}>
                              <button
                                onClick={() => handleDiningNavigation(item.path)}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition text-sm w-full text-left ${
                                  isActive(item.path) ? 'bg-gray-700 text-white' : 'text-gray-300'
                                }`}
                              >
                                <item.icon className={`mr-3 h-4 w-4 ${
                                  isActive(item.path) ? 'text-white' : 'text-blue-300'
                                }`} />
                                <span>{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                    
                    {/* Student Tools Dropdown */}
                    <li>
                      <button
                        onClick={() => setIsStudentToolsOpen(!isStudentToolsOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition text-white"
                      >
                        <div className="flex items-center">
                          <Wrench className="mr-3 h-5 w-5 text-blue-300" />
                          <span>Student Tools</span>
                        </div>
                        {isStudentToolsOpen ? (
                          <ChevronDown className="h-4 w-4 text-blue-300" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-blue-300" />
                        )}
                      </button>
                      
                      {isStudentToolsOpen && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {studentToolsDropdown.map((item) => (
                            <li key={item.path}>
                              <button
                                onClick={() => handleNavigation(item.path)}
                                className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition text-sm w-full text-left ${
                                  isActive(item.path) ? 'bg-gray-700 text-white' : 'text-gray-300'
                                }`}
                              >
                                <item.icon className={`mr-3 h-4 w-4 ${
                                  isActive(item.path) ? 'text-white' : 'text-blue-300'
                                }`} />
                                <span>{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </ul>
                </nav>
                
                <div className="p-4 border-t border-gray-700 bg-gray-800/60 backdrop-blur-sm">
                  <button 
                    onClick={() => {
                      logout();
                      handleMenuOpenChange(false);
                    }} 
                    className="flex items-center text-sm text-white hover:text-blue-200 transition"
                  >
                    <LogOut className="mr-1 h-4 w-4 text-white" />
                    <span>Return To Welcome Page</span>
                  </button>
                </div>
              </div>
            </SheetPortal>
          </Sheet>
          <img 
            src={HawkLogo} 
            alt="Hocking College Logo" 
            className="h-8 w-auto object-contain" 
          />
          <h1 className="text-xl font-bold text-yellow-400 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)]">
            Hocking College
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
          aria-label="Toggle light/dark mode"
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>
    </header>
  );
}
