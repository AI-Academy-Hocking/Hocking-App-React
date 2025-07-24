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
  Calendar,
  Users,
  Trophy,
  LayoutDashboard,
  Heart
} from "lucide-react";
import HockingLogo from "../../assets/HawkLogo.png";
import { LucideIcon } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  category?: string;
}

export default function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location === path;

  const navItems: NavItem[] = [
    // Main Navigation
    { path: "/home", label: "Home", icon: Home, category: "main" },
    { path: "/calendar", label: "Calendar", icon: CalendarDays, category: "main" },
    
    // Academic & Study
    { path: "/tools", label: "Student Tools", icon: Wrench, category: "academic" },
    { path: "/study-groups", label: "Study Groups", icon: Users, category: "academic" },
    
    // Social & Events
    { path: "/events", label: "Events", icon: Calendar, category: "social" },
    { path: "/social-hub", label: "Social Hub", icon: Users, category: "social" },
    
    // Gamification & Wellness
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, category: "features" },
    { path: "/achievements", label: "Achievements", icon: Trophy, category: "features" },
    { path: "/wellness", label: "Wellness", icon: Heart, category: "features" },
    
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
      case 'features': return 'Features';
      case 'services': return 'Campus Services';
      default: return 'Other';
    }
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-black/50 backdrop-blur-sm text-white h-full">
      <div className="p-4 border-b border-white/20 bg-black/30">
        <img 
          src={HockingLogo} 
          alt="Hocking College Logo" 
          className="h-12" 
        />
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
      
      <div className="p-4 border-t border-white/20 bg-black/30">
        <button 
          onClick={logout} 
          className="flex items-center text-sm text-white hover:text-white/80 transition"
        >
          <LogOut className="mr-1 h-4 w-4 text-white" />
          <span>Return To Welcome Page</span>
        </button>
      </div>
    </div>
  );
}
