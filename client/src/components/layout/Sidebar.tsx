import { useLocation, Link } from "wouter";
import { useAuth } from "../../lib/auth";
import { 
  Home, CalendarDays, Wrench, Map, LogOut, UtensilsCrossed, MessageSquare, Shield,
  LibraryBig, MonitorSmartphone, Users, Dumbbell, Trophy, ChevronDown, ChevronRight,
  GraduationCap, Clock, Calendar, Star, Coffee, Utensils, Music, CreditCard, Info, MapPin
} from "lucide-react";
import HockingLogo from "../../assets/HawkLogo.png";
import { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import "../../styles/sidebar.css";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

interface DropdownItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export default function Sidebar() {
  const [location, setLocation] = useLocation();
  const { logout } = useAuth();
  const [isStudentToolsOpen, setIsStudentToolsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDiningOpen, setIsDiningOpen] = useState(false);



  // Update dropdown states when location changes
  useEffect(() => {
    if (location === '/dining' || location.startsWith('/dining')) {
      setIsDiningOpen(true);
    }
    const studentToolsPaths = ['/tools', '/academic-success-center', '/online-learning', '/student-organizations', '/recreation', '/athletics', '/housing'];
    if (studentToolsPaths.includes(location)) {
      setIsStudentToolsOpen(true);
    }
    const calendarPaths = ['/calendar', '/events', '/academic-calendar', '/activities'];
    if (calendarPaths.includes(location)) {
      setIsCalendarOpen(true);
    }
  }, [location]); // Add location as dependency



  const navItems: NavItem[] = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/maps", label: "Maps & Directions", icon: Map },
    { path: "/resources", label: "Resources", icon: GraduationCap },
    { path: "/safety", label: "Campus Safety", icon: Shield },
  ];

  const studentToolsDropdown: DropdownItem[] = [
    { path: "/tools", label: "Student Tools Dashboard", icon: Wrench },
    { path: "/academic-success-center", label: "Library", icon: LibraryBig },
    { path: "/online-learning", label: "Online Learning", icon: MonitorSmartphone },
    { path: "/student-organizations", label: "Student Organizations", icon: Users },
    { path: "/recreation", label: "Recreation", icon: Dumbbell },
    { path: "/athletics", label: "Athletics", icon: Trophy },
    { path: "/housing", label: "Housing", icon: Home },
  ];

  const calendarDropdown: DropdownItem[] = [
    { path: "/calendar", label: "Full Calendar View", icon: Calendar },
    { path: "/calendar?type=academic", label: "Academic Calendar", icon: GraduationCap },
    { path: "/calendar?type=activities", label: "Student Activities", icon: Users },
    { path: "/calendar?view=upcoming", label: "Upcoming Events", icon: Clock },
    { path: "/calendar?view=today", label: "Today's Events", icon: Star },
  ];

  const diningDropdown: DropdownItem[] = [
    { path: "/dining?tab=hours", label: "Hours Of Operation", icon: Clock },
    { path: "/dining?tab=meal-plans", label: "Meal Plans", icon: CreditCard },
    { path: "/dining?tab=menu", label: "Weekly Menu", icon: Calendar },
    { path: "/dining?tab=dietary", label: "Dietary Info", icon: Info },
    { path: "/dining?tab=locations", label: "Locations", icon: MapPin },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-950/95 backdrop-blur-sm text-white h-full relative sidebar-fade">
      {/* Soft fade overlay */}
      <div 
        className="absolute top-0 right-0 w-24 h-full pointer-events-none z-50"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0.4) 100%)',
          mixBlendMode: 'overlay',
          filter: 'blur(12px)'
        }}
      ></div>
      
      <div className="p-4 border-b border-slate-700 bg-blue-600/95 dark:bg-blue-900/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img 
            src={HockingLogo} 
            alt="Hocking College Logo" 
            className="h-12" 
          />
          <span className="text-white font-bold text-xl">Menu</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto no-scrollbar p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
                            <button
                onClick={() => setLocation(item.path)}
                className="flex items-center p-2 rounded-full transition w-full text-left text-white no-highlight-button"
              >
                                  <item.icon className="mr-3 h-5 w-5 text-blue-300" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
          
          {/* Calendar Dropdown */}
          <li className="mb-2">
            <div
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full flex items-center justify-between p-2 rounded-full transition text-white cursor-pointer"
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
            </div>
            
            {isCalendarOpen && (
              <ul className="mt-2 ml-4 space-y-1">
                {calendarDropdown.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => setLocation(item.path)}
                      className="flex items-center p-2 rounded-full transition text-sm w-full text-left text-gray-300 focus:outline-none focus:ring-0 hover:bg-transparent"
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
          <li className="mb-2">
            <button
              onClick={() => setIsDiningOpen(!isDiningOpen)}
              className="w-full flex items-center justify-between p-2 rounded-full transition text-white focus:outline-none focus:ring-0 hover:bg-transparent"
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
                      onClick={() => setLocation(item.path)}
                      className="flex items-center p-2 rounded-full transition text-sm w-full text-left text-gray-300 focus:outline-none focus:ring-0 hover:bg-transparent"
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
          <li className="mb-2">
            <button
              onClick={() => setIsStudentToolsOpen(!isStudentToolsOpen)}
              className="w-full flex items-center justify-between p-2 rounded-full transition text-white focus:outline-none focus:ring-0 hover:bg-transparent"
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
                      onClick={() => setLocation(item.path)}
                      className="flex items-center p-2 rounded-full transition text-sm w-full text-left text-gray-300 focus:outline-none focus:ring-0 hover:bg-transparent"
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
      
      <div className="p-4 border-t border-slate-700 bg-slate-800/90 backdrop-blur-sm">
        <button 
          onClick={logout} 
          className="flex items-center text-sm text-white hover:text-blue-200 transition"
        >
          <LogOut className="mr-1 h-4 w-4 text-white" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
