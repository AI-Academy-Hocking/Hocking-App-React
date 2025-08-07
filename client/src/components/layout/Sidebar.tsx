import { useLocation, Link } from "wouter";
import { useAuth } from "../../lib/auth";
import { 
  Home, CalendarDays, Wrench, Map, LogOut, UtensilsCrossed, MessageSquare, Shield,
  LibraryBig, MonitorSmartphone, Users, Dumbbell, Trophy, ChevronDown, ChevronRight,
  GraduationCap, Clock, Calendar, Star, Coffee, Utensils, Music, CreditCard, Info, MapPin,
  Settings, Crown
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

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [location, setLocation] = useLocation();
  const { logout, isAdmin } = useAuth();
  const [isStudentToolsOpen, setIsStudentToolsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDiningOpen, setIsDiningOpen] = useState(false);

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/home' && location === '/') return true;
    if (path === '/') return location === '/';
    return location === path || location.startsWith(path + '/');
  };

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
    { path: "/settings", label: "Settings", icon: Settings, category: "main" },
    
    // Academic & Study
    { path: "/tools", label: "Student Tools", icon: Wrench, category: "academic" },
    { path: "/academic-success-center", label: "Library", icon: LibraryBig, category: "academic" },
    { path: "/online-learning", label: "Online Learning", icon: MonitorSmartphone, category: "academic" },
    
    // Social & Events
    { path: "/events", label: "Events", icon: Calendar, category: "social" },
    { path: "/student-organizations", label: "Student Organizations", icon: Users, category: "social" },
    { path: "/recreation", label: "Recreation", icon: Dumbbell, category: "social" },
    { path: "/athletics", label: "Athletics", icon: Trophy, category: "social" },
    
    // Campus Services
    { path: "/maps", label: "Maps & Directions", icon: Map, category: "services" },
    { path: "/dining", label: "Dining Hall", icon: UtensilsCrossed, category: "services" },
    { path: "/safety", label: "Campus Safety", icon: Shield, category: "services" },
    { path: "/housing", label: "Housing", icon: Home, category: "services" },
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
      case 'main': return 'Main Navigation';
      case 'academic': return 'Academic & Study';
      case 'social': return 'Social & Events';
      case 'services': return 'Campus Services';
      default: return 'Other';
    }
  };

  const handleNavigation = (path: string) => {
    setLocation(path);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Dark overlay when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1998] md:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed md:relative flex flex-col w-64 bg-slate-950/95 backdrop-blur-sm text-white h-full z-[1999] transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
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
            <div key={category} className="mb-8">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-2 border-b border-white/10 pb-1">
                {getCategoryLabel(category)}
              </h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center p-3 rounded-lg hover:bg-white/20 transition-all duration-200 ${
                        isActive(item.path) 
                          ? 'bg-white/30 text-white shadow-lg' 
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${
                        isActive(item.path) ? 'text-white' : 'text-white/70'
                      }`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-700 bg-slate-800/90 backdrop-blur-sm">
          <div className="space-y-2">
            {isAdmin && (
              <button
                onClick={() => handleNavigation('/admin/dashboard')}
                className="flex items-center text-sm text-white hover:text-blue-200 transition w-full p-2 rounded-lg hover:bg-white/10"
              >
                <Crown className="mr-2 h-4 w-4 text-white" />
                <span>Admin Dashboard</span>
              </button>
            )}
            <button 
              onClick={logout} 
              className="flex items-center text-sm text-white hover:text-blue-200 transition w-full p-2 rounded-lg hover:bg-white/10"
            >
              <LogOut className="mr-2 h-4 w-4 text-white" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
