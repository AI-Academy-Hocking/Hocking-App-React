import * as React from "react";
import { useState, useEffect } from "react";
import { 
  Menu, Moon, Sun, LogOut, Home, Calendar, Wrench, Map, UtensilsCrossed, Shield,
  LibraryBig, MonitorSmartphone, Users, Dumbbell, Trophy, ChevronDown, ChevronRight,
  GraduationCap, Clock, Star, Coffee, Utensils, Music, CreditCard, Info, MapPin, CalendarDays,
  Settings, Crown, Search, X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetPortal, SheetOverlay } from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/auth";
import { Link, useLocation } from "wouter";
import HawkLogo from "../../assets/HawkLogo.png";
import { SearchBar } from "@/components/SearchBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import NotificationBell from "../NotificationBell";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/maps", label: "Maps & Directions", icon: Map },
  { path: "/resources", label: "Resources", icon: GraduationCap },
  { path: "/safety", label: "Campus Safety", icon: Shield },
  { path: "/settings", label: "Settings", icon: Settings },

];

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'social' | 'calendar' | 'general' | 'alert';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

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
  const { user, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [location, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Mobile dropdown states
  const [isStudentToolsOpen, setIsStudentToolsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDiningOpen, setIsDiningOpen] = useState(false);

  const isActive = (path: string) => location === path;

  // Load notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const notificationsWithDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // @ts-ignore
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setIsNotificationOpen(false);
    if (notification.actionUrl) {
      setLocation(notification.actionUrl);
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
  };

  const handleMenuOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
    onMobileMenuChange?.(open);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const closeSearch = () => {
    setIsSearchExpanded(false);
  };

  // Close search when location changes (user navigates to a new page)
  useEffect(() => {
    if (isSearchExpanded) {
      setIsSearchExpanded(false);
    }
  }, [location, isSearchExpanded]);

  // Listen for search result clicks to close mobile search overlay
  useEffect(() => {
    const handleSearchResultClick = () => {
      setIsSearchExpanded(false);
    };

    window.addEventListener('searchResultClicked', handleSearchResultClick);
    
    return () => {
      window.removeEventListener('searchResultClicked', handleSearchResultClick);
    };
  }, []);

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
    <>
      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <div className="fixed inset-0 z-[3000] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-0 left-0 right-0 bg-blue-900 dark:bg-blue-950 p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <SearchBar />
              <button
                onClick={closeSearch}
                className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className="fixed inset-0 z-[1999] bg-black/20 backdrop-blur-md"
                  onClick={() => handleMenuOpenChange(false)}
                />
                <div className="fixed inset-y-0 left-0 z-[2000] h-full w-64 bg-slate-950/60 backdrop-blur-sm border-none p-0 flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-[state=closed]:duration-300 data-[state=open]:duration-500">
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
                            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition w-full text-left text-white"
                          >
                            <item.icon className="mr-3 h-5 w-5 text-blue-300" />
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
                                  className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition text-sm w-full text-left text-gray-300"
                                >
                                  <item.icon className="mr-3 h-4 w-4 text-blue-300" />
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
                                  className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition text-sm w-full text-left text-gray-300"
                                >
                                  <item.icon className="mr-3 h-4 w-4 text-blue-300" />
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
                                  className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition text-sm w-full text-left text-gray-300"
                                >
                                  <item.icon className="mr-3 h-4 w-4 text-blue-300" />
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
                    <div className="space-y-2">
                      {isAdmin && (
                        <button
                          onClick={() => {
                            handleNavigation('/admin/dashboard');
                          }}
                          className="flex items-center text-sm text-white hover:text-blue-200 transition w-full"
                        >
                          <Crown className="mr-1 h-4 w-4 text-white" />
                          <span>Admin Dashboard</span>
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          logout();
                          handleMenuOpenChange(false);
                        }} 
                        className="flex items-center text-sm text-white hover:text-blue-200 transition w-full"
                      >
                        <LogOut className="mr-1 h-4 w-4 text-white" />
                        <span>Return To Welcome Page</span>
                      </button>
                    </div>
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

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <NotificationBell />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-yellow-400"
              aria-label="Toggle light/dark mode"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
