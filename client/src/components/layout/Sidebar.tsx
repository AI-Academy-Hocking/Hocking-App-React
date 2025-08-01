import { useLocation, Link } from "wouter";
import { useAuth } from "../../lib/auth";
import { 
  Home, 
  CalendarDays, 
  Wrench, 
  Map, 
  LogOut, 
  UtensilsCrossed, 
  Shield,
  Calendar
} from "lucide-react";
import HockingLogo from "../../assets/HawkLogo.png";
import { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import "../../styles/sidebar.css";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  category?: string;
}

interface DropdownItem {
  path: string;
  label: string;
  icon: LucideIcon;
  category?: string;
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
    // Main Navigation
    { path: "/home", label: "Home", icon: Home, category: "main" },
    { path: "/calendar", label: "Calendar", icon: CalendarDays, category: "main" },
    
    // Academic & Study
    { path: "/tools", label: "Student Tools", icon: Wrench, category: "academic" },
    
    // Social & Events
    { path: "/events", label: "Events", icon: Calendar, category: "social" },
    
    // Campus Services
    { path: "/maps", label: "Maps & Directions", icon: Map, category: "services" },
    { path: "/dining", label: "Dining Hall", icon: UtensilsCrossed, category: "services" },
    { path: "/safety", label: "Campus Safety", icon: Shield, category: "services" },
  ];

  const groupedItems = navItems.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'main': return 'Main';
      case 'academic': return 'Academic';
      case 'social': return 'Social';
      case 'services': return 'Campus Services';
      default: return 'Other';
    }
  };

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
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 px-2">
              {getCategoryLabel(category)}
            </h3>
            <ul>
              {items.map((item) => (
                <li key={item.path} className="mb-1">
                  <Link 
                    href={item.path}
                    className={`flex items-center p-2 rounded-lg hover:bg-white/20 transition ${
                      isActive(item.path) ? 'bg-white/30' : ''
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-white" />
                    <span className="text-white text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
